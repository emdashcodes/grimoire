# Grimoire — Architecture & Implementation Plan

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    Grimoire App                       │
│                                                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │  Electron    │  │  React +     │  │  Shared     │ │
│  │  Main        │  │  shadcn/ui   │  │  Types      │ │
│  │  Process     │  │  Renderer    │  │             │ │
│  └──────┬───────┘  └──────┬───────┘  └─────────────┘ │
│         │    IPC (typed)   │                          │
│         ├──────────────────┤                          │
│         │                                             │
│  ┌──────▼─────────────────────────────────────────┐  │
│  │              Services (Main Process)             │  │
│  │                                                   │  │
│  │  AgentManager ─── ACP ──→ claude-code-acp        │  │
│  │  VaultService ─── chokidar + fs                  │  │
│  │  DbService ─── better-sqlite3 (FTS5)             │  │
│  │  MemoryManager ─── injection/extraction           │  │
│  │  TerminalService ─── child_process               │  │
│  │  PluginManager ─── plugin lifecycle              │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Application Shell (Electron)

### Process split
- **Main process**: All native I/O — ACP subprocess management, SQLite, file watchers, MCP servers, terminal execution
- **Renderer process**: React UI, sandboxed via `contextBridge`
- **Preload script**: Typed `window.grimoire` API bridging IPC channels

### Typed IPC
Single `src/shared/ipc-channels.ts` file defines every channel with full TypeScript types. Both main and renderer import it. Methods use `ipcRenderer.invoke()` (request/response) for CRUD operations and `ipcRenderer.on()` (push) for streaming agent updates.

### State management
**Zustand** with domain slices: `agent`, `vault`, `tasks`, `ui`, `memory`, `plugins`. Agent streaming updates push from main via `webContents.send()` into the store — no polling.

### File system layout
```
~/.grimoire/                    # App data
  config.json                   # Global config (theme, default vault, agent configs)
  agents/                       # Agent configurations
    claude-code.json            # { command, args, env, capabilities }
    gemini-cli.json             # Future
  plugins/                      # Installed Grimoire plugins
  db/
    grimoire.db                 # SQLite (WAL mode)
  logs/

~/Grimoire/                     # Default vault (existing)
  .grimoire/                    # Vault-specific config (coexists with .obsidian/)
    vault.json                  # Vault metadata, memory config, templates
  Memory/                       # Generalized memory system
  Journal/
  ...
```

---

## 2. Agent Layer (ACP)

### Connection model
Grimoire is an **ACP Client**. It spawns agent subprocesses (stdio transport) and communicates via JSON-RPC using `@agentclientprotocol/sdk`'s `ClientSideConnection`.

```
Grimoire ──stdio──→ claude-code-acp (subprocess)
                  → gemini-cli (future)
                  → codex-cli (future)
```

### AgentManager service
- `initializeAgent(agentId)` — spawn subprocess, run ACP `initialize` handshake, store capabilities
- `createSession(agentId, { cwd, mcpServers })` — call `session/new`, get sessionId
- `loadSession(agentId, sessionId)` — call `session/load`, replay history via `session/update` stream
- `prompt(sessionId, contentBlocks[])` — call `session/prompt`, forward `session/update` notifications to renderer
- `cancel(sessionId)` — call `session/cancel`

### Client-side capability implementation
Grimoire implements what the agent needs from the client:
- **`fs/read_text_file`** — read from vault/project. If file is open in editor, return unsaved buffer content
- **`fs/write_text_file`** — write to disk, trigger vault re-index
- **`terminal/*`** — spawn child processes via `node:child_process`, manage lifecycle, stream output
- **`session/request_permission`** — forward to renderer as modal dialog, return user choice

### Streaming UI
`session/update` notifications map to conversation blocks:
- `agent_message_chunk` → append to streaming message bubble (markdown)
- `tool_call` / `tool_call_update` → tool call cards with status, diffs, terminal output
- `plan` → plan panel with checklist
- `available_commands_update` → update slash command palette
- `config_options_update` → update session config bar (model/mode dropdowns)

### MCP server passthrough
Grimoire collects MCP servers from: vault config, plugin configs, user global config. Passes them to `session/new` so the agent connects to them directly. This means existing MCP tools (Perplexity, ContextA8C, etc.) work without change.

### Multi-agent support
Agent configs live in `~/.grimoire/agents/*.json`. Each defines `command`, `args`, `env`. The session creation UI lets users pick which agent. The UI is agent-agnostic — it renders whatever `configOptions` the agent provides.

---

## 3. Knowledge Layer

### SQLite schema (key tables)
```sql
-- Vaults
CREATE TABLE vaults (id, name, path, created_at, last_indexed_at);

-- Notes (indexed from markdown on disk)
CREATE TABLE notes (id, vault_id, path, title, created_at, modified_at, frontmatter JSON, content_hash);

-- Full-text search
CREATE VIRTUAL TABLE notes_fts USING fts5(title, content, tags, tokenize='porter unicode61');

-- WikiLinks / backlinks
CREATE TABLE links (source_note_id, target_note_id, target_path, line_number);

-- Tags
CREATE TABLE tags (note_id, tag);
```

SQLite is the **derived index**, not the source of truth. Markdown files on disk are canonical. The DB rebuilds from files on any machine.

### VaultService
- **chokidar** watches vault directories for changes
- On file change: parse frontmatter, extract links/tags, update FTS index
- In-memory file tree cache for fast sidebar rendering
- Create/rename/delete with automatic backlink updates

### Search
Two modes, unified in one search bar:
1. **Full-text** — FTS5 queries with stemming and ranking
2. **Structured** — SQL on metadata: `tag:work`, `modified:>2026-01-01`

### Editor
**CodeMirror 6** — same engine as Obsidian, native markdown support, extensible.
Key extensions: WikiLink autocomplete (`[[`), tag autocomplete (`#`), frontmatter panel, vim mode (optional).

### Daily notes
Auto-create from template on access. Configurable path format and template per vault in `.grimoire/vault.json`.

---

## 4. Memory System (generalized from Ada)

### How it works
Memory is a **vault-scoped protocol**, not agent-specific. All agents sharing a vault share the same memory.

**Injection (session start):**
1. Read core memory files (configurable list in `.grimoire/vault.json`)
2. Read reference file headers for context
3. Read recent session summaries (configurable count)
4. Include as `ContentBlock::Resource` entries in the first `session/prompt`

**Extraction (session end):**
1. Read conversation history from the session
2. Call a lightweight LLM (Haiku) with transcript + JSON schema
3. Write session log as markdown with YAML frontmatter to `Memory/Sessions/YYYY/MM/DD/{session-id}.md`
4. Apply core file updates if extraction identifies new information

### Configuration (per vault)
```json
// .grimoire/vault.json → memory section
{
  "memory": {
    "coreFiles": ["Memory/Core/Profile.md", "Memory/Core/Work.md", "Memory/Core/People.md"],
    "refDirectories": ["Memory/Core/refs/"],
    "sessionLogDirectory": "Memory/Sessions",
    "injection": { "recentSessionCount": 3, "maxTokenBudget": 30000 },
    "extraction": { "model": "haiku", "enabled": true }
  }
}
```

### Backwards compatibility with Ada
The session log format (YAML frontmatter with `session_id`, `title`, `summary`, `emotional_tone` + markdown body) is preserved. Existing `~/Grimoire/Ada/Memory/` files work as-is.

---

## 5. Task Management

- SQLite-backed tasks with `title`, `description`, `status`, `priority`, `session_id` link
- Task panel in the context sidebar — shows active tasks, grouped by session or standalone
- Agent plan entries can optionally sync as tasks
- Tasks persist across sessions
- Manual creation from UI or from note checkboxes (`- [ ]` syntax)

---

## 6. Plugin System

### Claude Code plugin compatibility
Existing Claude Code plugins (skills, hooks, commands) work unchanged — they're loaded by the agent (claude-code-acp) based on the session's working directory. Grimoire just sets the correct `cwd`.

### Grimoire-level plugins
For extending the app itself (views, app commands, memory providers):
```typescript
interface GrimoirePlugin {
  activate(context: PluginContext): Promise<void>;
  deactivate(): Promise<void>;
  commands?: Command[];
  views?: ViewContribution[];
  mcpServers?: McpServerConfig[];
}
```

Plugin configs stored in `~/.grimoire/plugins/`. Auto-generated settings UI from declared config schema. For v1, local install from directory path. Marketplace deferred to v2.

---

## 7. UI Layout

```
┌──────────────────────────────────────────────────────┐
│  Title Bar (frameless macOS, custom controls)          │
├────────┬──────────────────────────────┬──────────────┤
│        │                              │              │
│ Side-  │      Main Content Area       │  Context     │
│ bar    │                              │  Panel       │
│        │  Chat view (streaming,       │              │
│ Mode:  │   tool cards, plan panel)    │  - Progress  │
│ - Chat │                              │  - Memory    │
│ - Vault│  Editor view (CodeMirror 6,  │  - Tasks     │
│ - Tasks│   frontmatter, backlinks)    │  - Backlinks │
│ - Cal  │                              │  - Skills    │
│        │  Task view (list, filters)   │              │
│ File   │                              │              │
│ tree / │  Calendar view (month +      │              │
│ session│   daily note)                │              │
│ list   │                              │              │
│        ├──────────────────────────────┤              │
│        │  Input Bar / Status Bar       │              │
├────────┴──────────────────────────────┴──────────────┤
│  Status Bar (agent status, vault, word count)          │
└──────────────────────────────────────────────────────┘
```

**Component library:** shadcn/ui (Radix + Tailwind). Custom components for chat bubbles, tool call cards, plan panels, file tree, slash command palette, permission dialogs.

**Themes:** CSS custom properties, light/dark, follows OS by default. Purple accent (fitting the grimoire aesthetic).

---

## 8. Project Structure

```
grimoire/
├── package.json                 # Workspace root
├── electron-builder.yml
├── .claude/skills/              # Dev-time skills (existing)
│
├── packages/
│   ├── main/                    # Electron main process
│   │   └── src/
│   │       ├── index.ts         # Entry point
│   │       ├── preload.ts       # Context bridge
│   │       ├── ipc/             # IPC handlers per domain
│   │       ├── services/        # AgentManager, VaultService, DbService,
│   │       │                    # MemoryManager, TerminalService, PluginManager
│   │       └── db/
│   │           └── schema.sql
│   │
│   ├── renderer/                # React app
│   │   └── src/
│   │       ├── App.tsx
│   │       ├── store/           # Zustand slices
│   │       ├── views/           # ChatView, EditorView, TaskView, CalendarView, SettingsView
│   │       ├── components/
│   │       │   ├── chat/        # MessageBubble, ToolCallCard, PlanPanel, InputBar, SlashPalette
│   │       │   ├── vault/       # FileTree, NoteEditor, BacklinksPanel, SearchResults
│   │       │   ├── tasks/       # TaskList, TaskCard
│   │       │   ├── layout/      # Sidebar, ContextPanel, StatusBar, TitleBar
│   │       │   └── ui/          # shadcn/ui components
│   │       └── hooks/           # useAgent, useVault, useStream
│   │
│   └── shared/                  # Shared types
│       └── src/
│           ├── ipc-channels.ts
│           └── types/           # agent.ts, vault.ts, task.ts, memory.ts, plugin.ts
│
├── plugins/                     # Built-in Grimoire plugins
└── scripts/                     # Dev, build, migrate-obsidian
```

### Tech stack
| Layer | Choice | Why |
|-------|--------|-----|
| Shell | Electron | Node.js required for ACP subprocess spawning |
| Bundler | Vite (renderer) + tsup (main) | Fast HMR, native ESM |
| UI | React + shadcn/ui + Tailwind | Component library already skilled |
| State | Zustand | Minimal, TypeScript-native, slice pattern |
| Editor | CodeMirror 6 | Same as Obsidian, native markdown, extensible |
| DB | better-sqlite3 (FTS5) | Synchronous in main process, full SQL control |
| ACP | @agentclientprotocol/sdk | Official TypeScript SDK, ClientSideConnection |
| File watch | chokidar | Battle-tested, cross-platform |
| Packaging | electron-builder | macOS dmg, auto-update |
| Tests | Vitest (unit) + Playwright (E2E) | Fast, Electron-compatible |

### Key dependencies
```
@agentclientprotocol/sdk    # ACP client
better-sqlite3              # SQLite native addon
chokidar                    # File watching
@codemirror/view            # Markdown editor
zustand                     # State management
react-markdown + remark-gfm # Chat markdown rendering
xterm.js                    # Terminal output display
diff2html                   # Diff visualization
```

---

## 9. Implementation Phases

**CRITICAL: Use agent teams for each phase.** Spawn parallel agents for independent workstreams. Create a team, define tasks, assign to agents, and coordinate via task lists.

### Phase 1: Skeleton — Electron + ACP chat
Get a window on screen that talks to Claude Code.

**Team structure (3 agents):**
- **Agent A: Scaffolding + Main Process** — Initialize monorepo (Electron + Vite + React + TS + Tailwind), set up packages/main, create `AgentManager` service, implement ACP `initialize` handshake and `session/new`
- **Agent B: Renderer + Chat UI** — Set up packages/renderer with React + shadcn/ui + Tailwind, build minimal layout (sidebar + chat area + input bar), implement streaming message display with markdown rendering
- **Agent C: Shared Types + IPC Bridge** — Set up packages/shared, define typed IPC channels, create preload script with `contextBridge`, wire up agent IPC handlers

**Integration point:** Once all three are done, connect the IPC bridge so the renderer can trigger prompts and receive streaming updates.

### Phase 2: Chat features — Full Cowork parity

**Team structure (3 agents):**
- **Agent A: Tool Call UI + Plan Panel** — Build ToolCallCard component (status, diff viewer, terminal output via xterm.js), PlanPanel with checkmarks, PermissionDialog modal
- **Agent B: ACP Client Capabilities** — Implement `fs/read_text_file`, `fs/write_text_file`, `terminal/*` methods, session cancellation (`session/cancel`)
- **Agent C: Session Management UI** — Session config bar (model/mode from `configOptions`), slash command palette, session list sidebar (create, switch, resume via `session/load`)

### Phase 3: Knowledge vault — Replace Obsidian

**Team structure (3 agents):**
- **Agent A: SQLite + Vault Indexer** — Schema setup, migrations, VaultService with chokidar watchers, FTS5 indexing, structured search
- **Agent B: CodeMirror Editor** — CodeMirror 6 setup, markdown extensions, WikiLink syntax + autocomplete, tag autocomplete, frontmatter panel
- **Agent C: Vault UI** — File tree sidebar, search results view, daily notes, backlinks panel, calendar view

### Phase 4: Memory system

**Team structure (2 agents):**
- **Agent A: Memory Injection** — MemoryManager service, vault memory config, core file reading, session summary reading, ContentBlock assembly for first prompt
- **Agent B: Memory Extraction** — Session end hook, LLM summarization pipeline, session log writing (Ada-compatible format), core file update pipeline

### Phase 5: Tasks, plugins, polish

**Team structure (3 agents):**
- **Agent A: Task System** — SQLite task schema, TaskService CRUD, task UI (list, filters, session linking), plan-to-task sync
- **Agent B: Plugin System** — PluginManager service, plugin loading/lifecycle, plugin config UI, built-in productivity plugin
- **Agent C: Polish + Packaging** — Theme system (light/dark, CSS vars), app menu, global shortcuts, tray icon, electron-builder config, macOS packaging

---

## 10. Verification

After each phase, verify:

**Phase 1:** Launch app → see chat UI → type message → get streamed Claude response → markdown renders correctly

**Phase 2:** Tool calls show cards with diffs/terminal → can grant/deny permissions → slash commands autocomplete → can switch sessions → can resume a previous session

**Phase 3:** Open vault → browse file tree → create/edit notes → WikiLinks resolve → search finds content → daily note creates from template → backlinks show

**Phase 4:** Start session → memory context injected in first prompt (verify via agent's system prompt or conversation log) → end session → session log written to vault → core files updated

**Phase 5:** Create tasks → tasks persist across sessions → install plugin → plugin loads → app packages as .dmg → auto-update works

---

## Critical files to reference during implementation

- `.claude/skills/agent-client-protocol/references/` — ACP protocol specs (initialization, session setup, prompt turn, tool calls, terminals, file system, config options, schema)
- `.claude/skills/electron-js/references/` — Electron APIs (IPC, BrowserWindow, process model, security, packaging)
- `.claude/skills/shadcn-ui/references/` — UI component docs
- `.claude/skills/interface-design/references/` — Design principles and critique protocol
- `~/Dev/ada/hooks/` — Reference implementation for memory injection/extraction hooks
- `~/Dev/ada/src/memory/` — Reference implementation for session summarization

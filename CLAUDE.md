# Grimoire

Grimoire is a native Electron desktop app that replaces Obsidian (knowledge management) and Cowork/Claude Code (AI agent interface). It's an ACP client that connects to Claude Code, Gemini CLI, and other agents.

## Plan

The full architecture and implementation plan is in `plan.md`. Read it before starting any work.

## Skills

This project has documentation skills in `.claude/skills/`. **ALWAYS activate the relevant skill before writing code in that domain:**

- **agent-client-protocol** — ACP protocol, session lifecycle, TypeScript SDK. Use when working on the agent layer, ACP connections, session management, streaming, tool calls.
- **electron-js** — Electron APIs, IPC, BrowserWindow, process model, packaging. Use when working on the main process, preload scripts, window management, native features.
- **shadcn-ui** — shadcn/ui components, Radix primitives, Tailwind patterns. Use when building UI components, forms, dialogs, dropdowns.
- **interface-design** — Design principles, craft-focused UI critique. Use when designing layouts, reviewing visual quality, building the theme system.

## Development Workflow: Agent Teams

**CRITICAL: Use agent teams for parallel development.** This project has independent packages (main, renderer, shared) and independent feature domains. Maximize parallelism by spawning teams:

- **Phase 1 team example:** One agent scaffolds Electron main process + ACP connection, another builds the React renderer + basic chat UI, a third sets up shared types + IPC channels
- **Phase 2 team example:** One agent builds tool call cards + plan panel, another implements ACP client capabilities (fs/terminal), a third builds session management UI
- **Phase 3 team example:** One agent builds SQLite + vault indexer, another builds the CodeMirror editor, a third builds file tree + search UI

Always prefer parallel work across independent packages/features. Use task lists to coordinate.

## Tech Stack

- **Electron** (main process: Node.js, renderer: React)
- **Vite** (renderer bundling) + **tsup** (main process bundling)
- **React + shadcn/ui + Tailwind CSS** (UI)
- **Zustand** (state management, domain slices)
- **CodeMirror 6** (markdown editor)
- **better-sqlite3** (SQLite with FTS5)
- **@agentclientprotocol/sdk** (ACP TypeScript client)
- **chokidar** (file watching)
- **TypeScript** throughout

## Project Structure

Monorepo with three packages:
- `packages/main/` — Electron main process (services, IPC handlers, DB)
- `packages/renderer/` — React app (views, components, store, hooks)
- `packages/shared/` — Shared types and IPC channel definitions

## UI Reference

Screenshots of Cowork (the app Grimoire replaces) are in `references/cowork/`. Read these images when building UI components to understand the UX patterns we're drawing from and improving upon.

## Key Patterns

- **Typed IPC**: Single `packages/shared/src/ipc-channels.ts` defines all channels. Both main and renderer import it.
- **Services in main**: AgentManager, VaultService, DbService, MemoryManager, TerminalService, PluginManager
- **Zustand slices**: agent, vault, tasks, ui, memory, plugins
- **ACP streaming**: Main process forwards `session/update` notifications to renderer via `webContents.send()`

## CI Testing Workflow

When running in GitHub Actions (CI=true), you can build and interactively test the Electron app:

1. Install dependencies: `npm ci`
2. Build all packages: `npm run build`
3. Launch Electron with CDP: `ELECTRON_IS_PACKAGED=true DISPLAY=:99 npx electron . --remote-debugging-port=9222 --no-sandbox &`
4. Wait for app to start: `sleep 5`
5. Use Playwright MCP tools (`mcp__playwright__browser_snapshot`, etc.) to interact with and verify the app
6. If you find issues, fix them, rebuild, and re-test

The virtual display (Xvfb) is already running on :99. Playwright MCP connects to Electron via CDP on localhost:9222.

**Environment variables:**
- `ELECTRON_IS_PACKAGED=true` — Forces production mode (load built files instead of Vite dev server)
- `DISPLAY=:99` — Uses the CI virtual display
- `--no-sandbox` — Required for Electron in CI (security sandbox unavailable)

To restart Electron after code changes:
1. Kill the running instance: `pkill -f electron || true`
2. Rebuild: `npm run build`
3. Relaunch: `ELECTRON_IS_PACKAGED=true DISPLAY=:99 npx electron . --remote-debugging-port=9222 --no-sandbox &`
4. Wait: `sleep 5`


## Git

- Branch: `trunk` (default), PR to `main`
- Commit format: `type: message` (max 75 chars). Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build

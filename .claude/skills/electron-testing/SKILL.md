# Electron Testing Skill

Use this skill when interactively testing, inspecting, or debugging the Grimoire Electron app using the Playwright MCP tools. Activate when asked to test UI behavior, verify component rendering, inspect app state, take screenshots, or debug interaction issues.

## Prerequisites

The app must be running in dev mode with the remote debugging port:

```bash
npm run dev
```

This launches Electron with `--remote-debugging-port=9222`. The Playwright MCP server connects to this port automatically via the project's `.mcp.json` config.

**If tools return connection errors**, the app isn't running or the port isn't open. Tell the user to start the dev server first.

## How It Works

The Playwright MCP connects to Grimoire's renderer process via Chrome DevTools Protocol. This gives you full DOM access to the renderer — the same as Chrome DevTools. You do NOT have direct access to the main process (no `app`, `ipcMain`, or `BrowserWindow` objects). All main process interaction goes through the preload bridge.

## Available Tools

These tools are provided by `@playwright/mcp`. The key ones for Electron testing:

### Inspection
- `browser_snapshot` — Accessibility tree of the current page. **Use this first** to understand what's rendered. Token-efficient, structured output.
- `browser_take_screenshot` — PNG screenshot. Use for visual verification or when accessibility snapshot isn't enough.
- `browser_console_messages` — Read `console.log`/`console.error` from the renderer process.
- `browser_network_requests` — List network requests (useful for checking ACP WebSocket connections).

### Interaction
- `browser_click` — Click an element by accessible name or selector.
- `browser_fill_form` — Fill multiple form fields at once.
- `browser_type` — Type text into a focused/selected element.
- `browser_press_key` — Press keyboard keys (Enter, Escape, shortcuts).
- `browser_hover` — Hover to trigger tooltips or dropdowns.
- `browser_select_option` — Select from dropdowns.
- `browser_drag` — Drag and drop.

### Navigation & State
- `browser_navigate` — Navigate to a URL (rarely needed — the app loads from Vite dev server).
- `browser_wait_for` — Wait for text to appear, disappear, or a timeout.
- `browser_evaluate` — **Run arbitrary JavaScript in the renderer.** This is the most powerful tool for Electron testing.
- `browser_tabs` — List open windows (each BrowserWindow is a tab).
- `browser_resize` — Resize the window.

## Grimoire-Specific Patterns

### The Preload Bridge

Grimoire uses `contextIsolation: true`. The renderer cannot access Node.js or Electron APIs directly. Everything goes through `window.grimoire`:

```typescript
// Invoke (request/response) — returns a Promise
window.grimoire.invoke(channel, args)

// Listen (push events from main) — returns unsubscribe function
window.grimoire.on(channel, callback)
```

### Testing Through the Bridge with `browser_evaluate`

To test IPC round-trips, use `browser_evaluate` to call the preload API:

```javascript
// List available agents
await window.grimoire.invoke('agent:list', undefined)

// Get current working directory
await window.grimoire.invoke('app:get-cwd', undefined)

// Check agent status
await window.grimoire.invoke('agent:status', { agentId: 'claude-code' })
```

### Reading Zustand Store State

The renderer uses Zustand for state management. To inspect store state from the outside:

```javascript
// If the store is accessible on window (dev mode), read it directly.
// Otherwise, look for React DevTools or state reflected in the DOM.
```

Prefer `browser_snapshot` to verify UI state rather than reaching into the store directly. The accessibility tree shows what the user actually sees.

### IPC Channels Reference

Invoke channels (request/response):
- `agent:list` — List configured agents
- `agent:initialize` — Initialize an agent connection
- `agent:status` — Get agent connection status
- `session:create` — Create new agent session
- `session:load` — Load existing session
- `session:list` — List all sessions
- `session:set-config` — Update session config
- `prompt:send` — Send a prompt to an agent
- `prompt:cancel` — Cancel an in-flight prompt
- `permission:respond` — Respond to a permission request
- `app:get-cwd` — Get the app's working directory
- `window:minimize` / `window:maximize` / `window:close` — Window controls

Push channels (main → renderer, listen-only):
- `session:update` — Streaming session updates (agent responses)
- `session:load-done` — Session finished loading
- `prompt:done` — Prompt completed
- `agent:status-changed` — Agent connection status changed
- `permission:request` — Permission request from agent
- `terminal:output` — Terminal output data

### Testing Workflow

1. **Start with `browser_snapshot`** to see what's rendered and identify elements.
2. **Interact** using `browser_click`, `browser_type`, `browser_press_key`.
3. **Verify results** with another `browser_snapshot` or `browser_take_screenshot`.
4. **Check for errors** with `browser_console_messages`.
5. **Test IPC** with `browser_evaluate` calling `window.grimoire.invoke(...)`.
6. **Wait for async** with `browser_wait_for` when testing operations that take time (agent responses, session loading).

### Common Testing Scenarios

**Verify the sidebar renders correctly:**
1. `browser_snapshot` — check for sidebar nav items (Chat, Vault, Tasks, Calendar)
2. `browser_click` each nav item
3. `browser_snapshot` after each click to verify the view changed

**Test sending a prompt to an agent:**
1. `browser_evaluate` — `window.grimoire.invoke('agent:list', undefined)` to see available agents
2. `browser_click` the chat input
3. `browser_type` a message
4. `browser_press_key` Enter
5. `browser_wait_for` the response text to appear
6. `browser_snapshot` to verify the response rendered

**Take a screenshot for visual review:**
1. `browser_take_screenshot` with a descriptive path
2. If you need a specific region, use the clip option

**Debug a rendering issue:**
1. `browser_console_messages` — check for errors
2. `browser_snapshot` — inspect the accessibility tree for unexpected structure
3. `browser_evaluate` — run DOM queries to inspect specific elements
4. `browser_network_requests` — check if API/WebSocket calls are failing

## Limitations

- **No main process access.** You cannot evaluate code in the main process, access `BrowserWindow` objects, or call `ipcMain` handlers directly. All interaction goes through the preload bridge (`window.grimoire`).
- **No IPC interception.** You can't listen for push events directly. To verify push events, check their side effects in the DOM (e.g., a new message appearing after `session:update`).
- **DevTools window.** In dev mode, Grimoire opens DevTools in a detached window. This appears as a separate tab in `browser_tabs`. Ignore it — interact with the main app window.
- **Vite HMR.** The dev server uses hot module replacement. After code changes, the page may partially reload. Use `browser_wait_for` if you need to wait for the app to stabilize after a change.

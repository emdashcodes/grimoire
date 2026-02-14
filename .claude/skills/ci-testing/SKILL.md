# CI Testing Skill

## Overview

This skill provides guidance for testing the Grimoire Electron app in CI environments using Playwright MCP tools. It enables interactive testing without requiring a real agent connection.

## When to Use This Skill

Use this skill when you need to:
- Test UI features in GitHub Actions CI
- Verify message rendering (thinking blocks, tool calls, markdown)
- Test expand/collapse interactions
- Validate visual regressions
- Debug Electron app behavior in headless environments

## CI Testing Workflow

### 1. Build and Launch the App

```bash
# Install dependencies (if not already done)
npm ci

# Build all packages
npm run build

# Launch Electron with Chrome DevTools Protocol (CDP) enabled
ELECTRON_IS_PACKAGED=true DISPLAY=:99 npx electron . --remote-debugging-port=9222 --no-sandbox &

# Wait for app to start
sleep 5
```

**Environment Variables:**
- `ELECTRON_IS_PACKAGED=true` — Forces production mode (loads built files instead of Vite dev server)
- `DISPLAY=:99` — Uses the CI virtual display (Xvfb is pre-configured in CI)
- `--remote-debugging-port=9222` — Enables CDP for Playwright connection
- `--no-sandbox` — Required for Electron in CI (security sandbox unavailable in containerized environments)

### 2. Take Snapshots and Screenshots

Use Playwright MCP tools to interact with the app:

```typescript
// Take an accessibility snapshot (better for navigation)
mcp__playwright__browser_snapshot()

// Take a visual screenshot
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'screenshot.png'
})
```

### 3. Inject Test Messages

Grimoire exposes test helper functions on `window` for message injection:

```typescript
// Inject a user message
mcp__playwright__browser_evaluate({
  function: "() => { window.__injectUserMessage('Hello, how are you?'); }"
})

// Inject an agent message with thinking blocks
mcp__playwright__browser_evaluate({
  function: `() => {
    const msg = '<thinking>Let me analyze this...</thinking>\\n\\nHere is my response.';
    window.__injectAgentMessage(msg);
  }`
})

// Inject a raw SessionUpdate (advanced)
mcp__playwright__browser_evaluate({
  function: `() => {
    window.__injectMessage({
      sessionUpdate: 'tool_call',
      toolCallId: 'test-1',
      title: 'Read File',
      kind: 'read',
      status: 'running'
    });
  }`
})
```

**Available Test Helpers:**
- `window.__injectUserMessage(text: string)` — Inject user message
- `window.__injectAgentMessage(text: string)` — Inject agent message (supports `<thinking>` tags)
- `window.__injectMessage(update: SessionUpdate)` — Inject raw SessionUpdate for advanced testing

### 4. Interact with UI Elements

Use Playwright MCP tools to click, hover, and interact:

```typescript
// Take a snapshot to find element refs
mcp__playwright__browser_snapshot()

// Click an element by ref
mcp__playwright__browser_click({
  ref: 'e72',
  element: 'Thought process button'
})

// Take a screenshot after interaction
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'after-click.png'
})
```

### 5. Restart After Code Changes

If you make code changes and need to retest:

```bash
# Kill the running Electron instance
pkill -f electron || true

# Rebuild (full or partial)
npm run build                # Full rebuild
npm run build:renderer       # Renderer only

# Relaunch Electron
ELECTRON_IS_PACKAGED=true DISPLAY=:99 npx electron . --remote-debugging-port=9222 --no-sandbox &
sleep 5
```

## Example: Testing Thinking Blocks

Here's a complete example of testing thinking block rendering:

```typescript
// 1. Inject a user message
mcp__playwright__browser_evaluate({
  function: "() => window.__injectUserMessage('Can you help me?')"
})

// 2. Inject an agent message with multiple thinking blocks
mcp__playwright__browser_evaluate({
  function: `() => {
    const msg = '<thinking>First, I need to understand the question.</thinking>\\n\\nSure! Let me help you.\\n\\n<thinking>I should provide examples.</thinking>\\n\\nHere are some examples...';
    window.__injectAgentMessage(msg);
  }`
})

// 3. Take a screenshot of collapsed state
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'thinking-collapsed.png'
})

// 4. Take a snapshot to find the thinking block button
mcp__playwright__browser_snapshot()

// 5. Click the first thinking block to expand it
mcp__playwright__browser_click({
  ref: 'e72',  // From snapshot
  element: 'First Thought process button'
})

// 6. Take a screenshot of expanded state
mcp__playwright__browser_take_screenshot({
  type: 'png',
  filename: 'thinking-expanded.png'
})
```

## Architecture Notes

### How Test Helpers Work

The test helpers are defined in `packages/renderer/src/test-helpers.ts` and loaded during app initialization:

1. `App.tsx` calls `setupTestHelpers()` on mount
2. Test helpers are exposed on the `window` object (always enabled for CI)
3. Helpers call `useStore.getState().handleSessionUpdate()` to inject messages
4. The store updates, triggering React re-renders
5. UI components (MessageBubble, ThinkingBlock, etc.) render the new messages

**Key Files:**
- `packages/renderer/src/test-helpers.ts` — Test helper definitions
- `packages/renderer/src/App.tsx` — Calls `setupTestHelpers()`
- `packages/renderer/src/store/agent-slice.ts` — `handleSessionUpdate()` implementation
- `packages/renderer/src/components/chat/MessageBubble.tsx` — Renders messages
- `packages/renderer/src/components/chat/ThinkingBlock.tsx` — Renders thinking blocks

### Message Flow

```
Playwright CDP
    ↓
window.__injectAgentMessage(text)
    ↓
useStore.getState().handleSessionUpdate({
  sessionUpdate: 'agent_message_chunk',
  content: { type: 'text', text }
})
    ↓
Zustand store updates
    ↓
React re-renders MessageBubble
    ↓
extractThinkingBlocks(text) parses <thinking> tags
    ↓
ThinkingBlock components render
```

### Why This Approach?

**Previous approach (removed):** Exposed the entire Zustand store to `window`, which:
- Violated security best practices
- Exposed internal state unnecessarily
- Created a maintenance burden

**Current approach:** Exposes only three narrow test helper functions:
- ✅ Minimal API surface (only what's needed for testing)
- ✅ Type-safe (uses TypeScript types from `@grimoire/shared`)
- ✅ Mirrors the real IPC flow (uses `handleSessionUpdate` just like IPC listeners)
- ✅ Easy to disable in production (can be gated by env var if needed)

## Tips and Best Practices

### 1. Always Wait After Launch

Electron takes a few seconds to start in CI. Always wait at least 5 seconds after launching:

```bash
npx electron . --remote-debugging-port=9222 --no-sandbox &
sleep 5  # IMPORTANT: Don't skip this
```

### 2. Check for Electron Process

Before testing, verify Electron is running:

```bash
ps aux | grep electron | grep -v grep
```

### 3. Check Logs for Errors

If the app doesn't behave as expected, check the logs:

```bash
cat /tmp/electron.log
```

### 4. Use Snapshots Before Screenshots

Snapshots provide element refs and structure. Use them to find clickable elements before taking visual screenshots.

### 5. Kill Cleanly Between Restarts

Always kill previous instances before relaunching:

```bash
pkill -f electron || true  # || true prevents errors if no process found
sleep 2  # Give the process time to fully terminate
```

### 6. Test Incrementally

Don't inject all messages at once. Test one feature at a time:
1. Inject user message → verify
2. Inject agent message → verify
3. Test interactions → verify

## Troubleshooting

### Test Helpers Not Available

**Symptom:** `window.__injectAgentMessage is undefined`

**Cause:** Test helpers didn't load or app hasn't finished rendering

**Solution:**
1. Check console logs for "Test helpers loaded" message
2. Wait a few seconds after page load
3. Verify `setupTestHelpers()` is called in `App.tsx`

### Electron Won't Start

**Symptom:** `ps aux | grep electron` shows no process

**Cause:** Build failed, port conflict, or crash on startup

**Solution:**
1. Check build output: `npm run build`
2. Check logs: `cat /tmp/electron.log`
3. Kill conflicting processes: `pkill -f electron`
4. Verify display is available: `echo $DISPLAY` (should be `:99`)

### Messages Not Rendering

**Symptom:** Injected messages don't appear in UI

**Cause:** Store isn't updating or React isn't re-rendering

**Solution:**
1. Check browser console for errors
2. Verify message format matches SessionUpdate type
3. Check if messages array is updating: `mcp__playwright__browser_evaluate({ function: "() => window.useStore?.getState?.()?.messages || []" })`

## Future Improvements

- Add environment variable gating for test helpers (e.g., `GRIMOIRE_TEST_MODE`)
- Create reusable test message fixtures
- Add helper for injecting tool call updates
- Document testing tool calls, permissions, and plan updates
- Create screenshot comparison workflow for visual regression testing

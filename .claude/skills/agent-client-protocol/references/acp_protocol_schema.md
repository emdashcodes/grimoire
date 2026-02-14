---
title: Schema
source_url: https://agentclientprotocol.com/protocol/schema
---

# Schema

The Agent Client Protocol defines a standardized interface for communication between AI agents and client applications. The protocol establishes bidirectional method definitions for both agents and clients.

## Core Agent Interface

### Initialization Methods

**`initialize`** - Establishes connection and negotiates protocol capabilities
- Exchanges protocol version, capabilities, and authentication methods
- Client provides `protocolVersion` and `clientCapabilities`
- Agent responds with supported capabilities and available auth methods

**`authenticate`** - Handles client authentication
- Called when agent requires authentication before session creation
- Takes `methodId` parameter specifying which auth method to use
- Enables session creation after successful authentication

### Session Management

**`session/new`** - Creates a new conversation session
- Requires `cwd` (working directory) and `mcpServers` list
- Returns unique `sessionId` for subsequent requests
- May return `auth_required` error if authentication needed

**`session/load`** - Resumes an existing session
- Only available if agent advertises `loadSession` capability
- Restores session context and conversation history
- Streams entire conversation history back via notifications

**`session/prompt`** - Processes user messages within a session
- Accepts user message with optional context (files, images)
- Handles language model processing and tool execution lifecycle
- Returns with `stopReason` indicating completion status

**`session/cancel`** - Cancels ongoing operations
- Notification to stop language model requests and tool invocations
- Agent responds to original prompt with `StopReason::Cancelled`

### Configuration and Modes

**`session/set_config_option`** - Manages session configuration
- Sets values for session-specific options
- Returns full configuration state after update

**`session/set_mode`** - Switches between agent modes
- Changes modes like "ask," "architect," "code"
- Affects system prompts, tool availability, and permissions
- Can be called anytime during session

## Core Client Interface

### File System Operations

**`fs/read_text_file`** - Reads text file contents
- Requires `fs.readTextFile` capability
- Optional parameters: `line` (starting line), `limit` (max lines)
- Returns file content as string

**`fs/write_text_file`** - Writes text to file
- Requires `fs.writeTextFile` capability
- Parameters: `path` (absolute), `content` (text to write)
- Creates or modifies files in client environment

### Terminal Operations

**`terminal/create`** - Executes command in new terminal
- Requires `terminal` capability enabled
- Parameters: `command`, `args`, `cwd`, `env`, `outputByteLimit`
- Returns `terminalId` for subsequent operations

**`terminal/output`** - Gets terminal output and status
- Returns current output without waiting for command exit
- Includes exit status if command completed
- Indicates if output was truncated

**`terminal/wait_for_exit`** - Waits for command completion
- Blocks until terminal command exits
- Returns `exitCode` and optional `signal`

**`terminal/kill`** - Terminates command without releasing
- Keeps terminal valid for other operations
- Useful for implementing timeouts

**`terminal/release`** - Releases terminal resources
- Kills command if still running
- Invalidates `terminalId` for future operations

### Permission and Updates

**`session/request_permission`** - Requests user authorization
- Presents permission options to user for sensitive operations
- Returns user's decision via `RequestPermissionOutcome`
- Must respond with `Cancelled` if prompt turn cancelled

**`session/update`** - Receives real-time session updates
- Notification endpoint (no response required)
- Streams message chunks, tool calls, plans, and status updates
- Continues accepting updates even after cancellation

## Content Types

### Supported Content Blocks

**Text** - Plain or Markdown-formatted text (required baseline)

**Image** - Visual content with MIME type and base64 data (requires `image` capability)

**Audio** - Audio data for transcription/analysis (requires `audio` capability)

**ResourceLink** - References to accessible resources (required baseline)

**Resource** - Embedded resource contents (requires `embeddedContext` capability)

## Capabilities

### Agent Capabilities

- `loadSession` - Supports resuming previous conversations
- `mcpCapabilities` - HTTP, SSE transport support
- `promptCapabilities` - Audio, image, embedded context support
- `sessionCapabilities` - Additional session features

### Client Capabilities

- `fs` - File read/write operations
- `terminal` - Terminal command execution

## Tool Calls and Execution

Tool call updates include:

- Unique `toolCallId` identifier
- `title` describing operation
- `status` (initiated, executing, completed, failed)
- `kind` categorizing tool type
- `content` produced by execution
- `locations` for affected files
- `rawInput` and `rawOutput` parameters

## Plans and Execution Strategy

Plans consist of entries with:

- `content` - Task description
- `status` - pending, in_progress, completed
- `priority` - high, medium, low
- Complete plan sent on each update

## Error Handling

Standard JSON-RPC error codes:

| Code | Description |
|------|-------------|
| `-32700` | Parse error |
| `-32600` | Invalid request |
| `-32601` | Method not found |
| `-32602` | Invalid params |
| `-32603` | Internal error |
| `-32000` | Authentication required |
| `-32002` | Resource not found |

## Protocol Features

**Extensibility** - All objects support optional `_meta` property for custom metadata

**Notifications** - One-way messages without response requirement (e.g., `session/cancel`, `session/update`)

**Streaming** - Real-time updates via chunked content blocks

**Version Negotiation** - Agents support protocol version specified by clients or respond with latest supported version

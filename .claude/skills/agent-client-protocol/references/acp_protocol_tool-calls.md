---
title: Tool Calls
source_url: https://agentclientprotocol.com/protocol/tool-calls
---

# Tool Calls

Tool calls enable language models to request actions from Agents during prompt turns. When an LLM needs to interact with external systems -- such as file access or data retrieval -- it generates tool calls that the Agent executes and reports back through notifications.

## Creating Tool Calls

When the language model requests a tool invocation, the Agent should report it to the Client via `session/update`:

```json
{
  "jsonrpc": "2.0",
  "method": "session/update",
  "params": {
    "sessionId": "sess_abc123def456",
    "update": {
      "sessionUpdate": "tool_call",
      "toolCallId": "call_001",
      "title": "Reading configuration file",
      "kind": "read",
      "status": "pending"
    }
  }
}
```

### Required Parameters

**toolCallId** `ToolCallId` *required*

A unique identifier for this tool call within the session

**title** `string` *required*

A human-readable description of what the tool is doing

### Optional Parameters

**kind** `ToolKind`

The category of tool being invoked:

- `read` -- Reading files or data
- `edit` -- Modifying files or content
- `delete` -- Removing files or data
- `move` -- Moving or renaming files
- `search` -- Searching for information
- `execute` -- Running commands or code
- `think` -- Internal reasoning or planning
- `fetch` -- Retrieving external data
- `other` -- Other tool types (default)

**status** `ToolCallStatus`

The execution status (defaults to `pending`)

**content** `ToolCallContent[]`

Content produced by the tool call

**locations** `ToolCallLocation[]`

File locations affected by this tool call

**rawInput** `object`

The raw input parameters sent to the tool

**rawOutput** `object`

The raw output returned by the tool

## Updating Tool Calls

As tools execute, Agents send progress updates using `session/update` with `tool_call_update`:

```json
{
  "jsonrpc": "2.0",
  "method": "session/update",
  "params": {
    "sessionId": "sess_abc123def456",
    "update": {
      "sessionUpdate": "tool_call_update",
      "toolCallId": "call_001",
      "status": "in_progress",
      "content": [
        {
          "type": "content",
          "content": {
            "type": "text",
            "text": "Found 3 configuration files..."
          }
        }
      ]
    }
  }
}
```

All fields except `toolCallId` are optional in updates; only changed fields need inclusion.

## Requesting Permission

Agents may request user permission before executing sensitive tool calls via `session/request_permission`:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "session/request_permission",
  "params": {
    "sessionId": "sess_abc123def456",
    "toolCall": {
      "toolCallId": "call_001"
    },
    "options": [
      {
        "optionId": "allow-once",
        "name": "Allow once",
        "kind": "allow_once"
      },
      {
        "optionId": "reject-once",
        "name": "Reject",
        "kind": "reject_once"
      }
    ]
  }
}
```

### Request Parameters

**sessionId** `SessionId` *required*

The session ID for this request

**toolCall** `ToolCallUpdate` *required*

The tool call update with operation details

**options** `PermissionOption[]` *required*

Available permission options for the user

### Client Response

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "outcome": {
      "outcome": "selected",
      "optionId": "allow-once"
    }
  }
}
```

If the prompt turn is cancelled, the Client must respond with the `"cancelled"` outcome:

```json
{
  "jsonrpc": "2.0",
  "id": 5,
  "result": {
    "outcome": {
      "outcome": "cancelled"
    }
  }
}
```

### Permission Options

Each permission option contains:

**optionId** `string` *required*

Unique identifier for this option

**name** `string` *required*

Human-readable label for the user

**kind** `PermissionOptionKind` *required*

UI hint for Clients:

- `allow_once` -- Allow this operation only this time
- `allow_always` -- Allow and remember the choice
- `reject_once` -- Reject this operation only this time
- `reject_always` -- Reject and remember the choice

## Tool Call Status Lifecycle

- **pending** -- The tool call hasn't started because input is streaming or awaiting approval
- **in_progress** -- The tool call is currently running
- **completed** -- The tool call completed successfully
- **failed** -- The tool call failed with an error

## Tool Call Content Types

### Regular Content

Standard content blocks like text, images, or resources:

```json
{
  "type": "content",
  "content": {
    "type": "text",
    "text": "Analysis complete. Found 3 issues."
  }
}
```

### Diffs

File modifications shown as diffs:

```json
{
  "type": "diff",
  "path": "/home/user/project/src/config.json",
  "oldText": "{\n  \"debug\": false\n}",
  "newText": "{\n  \"debug\": true\n}"
}
```

**path** `string` *required*

The absolute file path being modified

**oldText** `string`

The original content (null for new files)

**newText** `string` *required*

The new content after modification

### Terminals

Live terminal output from command execution:

```json
{
  "type": "terminal",
  "terminalId": "term_xyz789"
}
```

**terminalId** `string` *required*

The ID of a terminal created with `terminal/create`

When embedded in a tool call, Clients display live output as generated and continue displaying it after terminal release.

## Following the Agent

Tool calls can report file locations for "follow-along" features tracking which files the Agent accesses or modifies:

```json
{
  "path": "/home/user/project/src/main.py",
  "line": 42
}
```

**path** `string` *required*

The absolute file path being accessed or modified

**line** `number`

Optional line number within the file

---
title: Extensibility
source_url: https://agentclientprotocol.com/protocol/extensibility
---

# Extensibility

The Agent Client Protocol enables custom functionality through built-in extension mechanisms while preserving core protocol compatibility.

## The `_meta` Field

All protocol types include a `_meta` field (`{ [key: string]: unknown }`) for attaching custom information to requests, responses, notifications, and nested types.

Example usage:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "session/prompt",
  "params": {
    "sessionId": "sess_abc123def456",
    "prompt": [
      {
        "type": "text",
        "text": "Hello, world!"
      }
    ],
    "_meta": {
      "traceparent": "00-80e1afed08e019fc1110464cfa66635c-7a085853722dc6d2-01",
      "zed.dev/debugMode": true
    }
  }
}
```

Reserved root-level keys in `_meta` for W3C trace context compliance:

- `traceparent`
- `tracestate`
- `baggage`

Implementations must not add custom fields at the root level of specification types -- all names are reserved for future protocol versions.

## Extension Methods

Method names beginning with underscore (`_`) are reserved for custom extensions, enabling innovation without conflicting with future protocol versions. These follow standard JSON-RPC 2.0 semantics.

### Custom Requests

Implementations may expose custom JSON-RPC requests prefixed with underscore:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "_zed.dev/workspace/buffers",
  "params": {
    "language": "rust"
  }
}
```

Response format:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "buffers": [
      { "id": 0, "path": "/home/user/project/src/main.rs" },
      { "id": 1, "path": "/home/user/project/src/editor.rs" }
    ]
  }
}
```

For unrecognized custom methods, respond with standard JSON-RPC error:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "error": {
    "code": -32601,
    "message": "Method not found"
  }
}
```

Extensions should advertise custom capabilities to help callers check availability first.

### Custom Notifications

Custom notifications are underscore-prefixed JSON-RPC notifications without an `id` field:

```json
{
  "jsonrpc": "2.0",
  "method": "_zed.dev/file_opened",
  "params": {
    "path": "/home/user/project/src/editor.rs"
  }
}
```

Implementations should ignore unrecognized notifications.

## Advertising Custom Capabilities

Use the `_meta` field in capability objects to advertise extension support:

```json
{
  "jsonrpc": "2.0",
  "id": 0,
  "result": {
    "protocolVersion": 1,
    "agentCapabilities": {
      "loadSession": true,
      "_meta": {
        "zed.dev": {
          "workspace": true,
          "fileNotifications": true
        }
      }
    }
  }
}
```

This enables negotiation of custom features during initialization while maintaining compatibility with standard implementations.

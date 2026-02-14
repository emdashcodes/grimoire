---
title: Slash Commands
source_url: https://agentclientprotocol.com/protocol/slash-commands
---

# Slash Commands

Agents can advertise specific slash commands that users can invoke to access particular capabilities and workflows. These commands are executed as part of standard prompt requests, where the Client includes the command text in the prompt message.

## Advertising Commands

Following session creation, an Agent may send available commands through the `available_commands_update` session notification:

```json
{
  "jsonrpc": "2.0",
  "method": "session/update",
  "params": {
    "sessionId": "sess_abc123def456",
    "update": {
      "sessionUpdate": "available_commands_update",
      "availableCommands": [
        {
          "name": "web",
          "description": "Search the web for information",
          "input": {
            "hint": "query to search for"
          }
        },
        {
          "name": "test",
          "description": "Run tests for the current project"
        },
        {
          "name": "plan",
          "description": "Create a detailed implementation plan",
          "input": {
            "hint": "description of what to plan"
          }
        }
      ]
    }
  }
}
```

### AvailableCommand Fields

- **name** (string, required): The command identifier (e.g., "web", "test", "plan")
- **description** (string, required): Human-readable description of what the command does
- **input** (AvailableCommandInput, optional): Input specification for the command

### AvailableCommandInput

The input field supports unstructured text:

- **hint** (string, required): A hint to display when the input hasn't been provided yet

## Dynamic Updates

Agents can modify the command list at any point during a session by sending additional `available_commands_update` notifications. This enables contextual command management -- adding, removing, or updating commands as needed.

## Executing Commands

Commands appear as standard user messages in prompt requests:

```json
{
  "jsonrpc": "2.0",
  "id": 3,
  "method": "session/prompt",
  "params": {
    "sessionId": "sess_abc123def456",
    "prompt": [
      {
        "type": "text",
        "text": "/web agent client protocol"
      }
    ]
  }
}
```

The Agent identifies the command prefix and handles execution accordingly. Commands can include additional message content types (images, audio, etc.) within the same prompt array.

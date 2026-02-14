---
title: Agent Plan
source_url: https://agentclientprotocol.com/protocol/agent-plan
---

# Agent Plan

Plans represent execution strategies for complex tasks requiring multiple steps. Agents communicate their plans to Clients through `session/update` notifications, enabling real-time visibility into progress.

## Creating Plans

When a language model develops an execution plan, the Agent **SHOULD** report it to the Client:

```json
{
  "jsonrpc": "2.0",
  "method": "session/update",
  "params": {
    "sessionId": "sess_abc123def456",
    "update": {
      "sessionUpdate": "plan",
      "entries": [
        {
          "content": "Analyze the existing codebase structure",
          "priority": "high",
          "status": "pending"
        },
        {
          "content": "Identify components that need refactoring",
          "priority": "high",
          "status": "pending"
        },
        {
          "content": "Create unit tests for critical functions",
          "priority": "medium",
          "status": "pending"
        }
      ]
    }
  }
}
```

**entries** `PlanEntry[]` *required*

An array of plan entries representing tasks to be accomplished.

## Plan Entries

Each plan entry represents a specific task or goal within the overall execution strategy:

**content** `string` *required*

A human-readable description of what this task aims to accomplish.

**priority** `PlanEntryPriority` *required*

The relative importance of this task: `high`, `medium`, or `low`.

**status** `PlanEntryStatus` *required*

The current execution status of this task: `pending`, `in_progress`, or `completed`.

## Updating Plans

As the Agent progresses, it **SHOULD** report updates through additional `session/update` notifications using the same structure. The Agent **MUST** send a complete list of all plan entries with current status in each update. The Client **MUST** replace the existing plan entirely.

### Dynamic Planning

Plans can evolve during execution. The Agent **MAY** add, remove, or modify entries as it discovers new requirements or completes tasks, enabling adaptation based on new information.

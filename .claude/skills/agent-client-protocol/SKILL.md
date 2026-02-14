---
name: agent-client-protocol
description: Use this skill when building ACP agents or clients, implementing the Agent Client Protocol, working with ACP SDKs (TypeScript, Python, Kotlin, Rust), or answering questions about ACP session lifecycle, transports, tool calls, file system access, terminals, or slash commands.
allowed-tools: Read
---

# Agent Client Protocol (ACP)

## Overview

The Agent Client Protocol standardizes communication between code editors/IDEs and AI coding agents. It defines a JSON-RPC based protocol for session management, prompt turns, tool calls, file system access, terminal execution, and more — similar to how LSP standardized language server integration.

## When to Use This Skill

Activate this skill when:

- Building an ACP-compatible agent or client
- Implementing ACP session lifecycle (initialization, setup, prompt turns)
- Working with ACP SDKs (TypeScript, Python, Kotlin, Rust)
- Handling ACP tool calls, file system methods, or terminal execution
- Implementing ACP transports (stdio or streamable HTTP)
- Working with ACP content blocks, slash commands, or agent plans
- Integrating with the ACP Registry for agent distribution

## Quick Reference

**TypeScript SDK install:**
```bash
npm install @agentclientprotocol/sdk
```

**Key classes:** `AgentSideConnection` (for agents), `ClientSideConnection` (for clients)

**Protocol flow:** Initialize connection → Create session → Send prompts → Receive updates → End session

**Transport:** JSON-RPC over stdio (primary) or streamable HTTP (draft). All messages UTF-8 encoded.

**Session updates** are sent via `session/update` notifications with typed `sessionUpdate` fields:
- `text_delta` — streaming text content
- `tool_call` — tool invocation lifecycle
- `plan` — execution plan updates
- `agent_end_turn` — agent finished responding

**Content blocks** reuse MCP's `ContentBlock` type: `TextContent`, `ImageContent`, `ResourceContent`.

## Getting Started

### Introduction

What ACP is, why it exists, and how it decouples agents from editors.

**Reference**: `references/acp_get-started_introduction.md`

**When to reference**: When explaining ACP's purpose or comparing it to alternatives like LSP.

### Architecture

Design philosophy, protocol layers, and the Client-Agent communication model.

**Reference**: `references/acp_get-started_architecture.md`

**When to reference**: When designing an integration or understanding how ACP components fit together.

### Agents

Directory of agents implementing ACP (Claude Code, Gemini CLI, Augment Code, etc.).

**Reference**: `references/acp_get-started_agents.md`

**When to reference**: When looking for existing ACP agent implementations or checking compatibility.

### Clients

Directory of clients implementing ACP (Zed, VS Code extensions, ACP UI, etc.).

**Reference**: `references/acp_get-started_clients.md`

**When to reference**: When looking for existing ACP client implementations or testing targets.

### Registry

The ACP Registry for distributing and discovering agents, including manifest format and authentication requirements.

**Reference**: `references/acp_get-started_registry.md`

**When to reference**: When publishing an agent to the registry or implementing agent discovery.

## Protocol Core

### Overview

Communication model, method/notification architecture, and the roles of Client and Agent.

**Reference**: `references/acp_protocol_overview.md`

**When to reference**: When understanding the overall protocol structure, method types, or notification patterns.

### Initialization

Connection setup — version negotiation, capability exchange, and authentication. Includes `initialize` method params and the capability objects.

**Reference**: `references/acp_protocol_initialization.md`

**When to reference**: When implementing the connection handshake or checking what capabilities to advertise.

### Session Setup

Creating and loading sessions — `session/create`, `session/load`, session state, and the full session lifecycle.

**Reference**: `references/acp_protocol_session-setup.md`

**When to reference**: When implementing session management, creating new sessions, or restoring previous ones.

### Session Config Options

Flexible configuration selectors (models, modes, reasoning levels). Replaces the older session modes system.

**Reference**: `references/acp_protocol_session-config-options.md`

**When to reference**: When exposing agent configuration to clients or implementing config UI.

### Session Modes (Deprecated)

Legacy agent operating modes. Being replaced by Session Config Options.

**Reference**: `references/acp_protocol_session-modes.md`

**When to reference**: Only for backwards compatibility with older clients.

### Prompt Turn

The complete interaction cycle — sending prompts, receiving streaming updates, handling tool calls, and turn completion.

**Reference**: `references/acp_protocol_prompt-turn.md`

**When to reference**: When implementing the core prompt/response flow or handling streaming updates.

### Content

Content block types (text, image, resource) and how they flow through prompts, responses, and tool results.

**Reference**: `references/acp_protocol_content.md`

**When to reference**: When working with rich content in prompts or responses, or forwarding MCP tool outputs.

## Protocol Features

### Tool Calls

Tool call lifecycle — creating, updating status (pending/running/complete/error), and streaming tool output.

**Reference**: `references/acp_protocol_tool-calls.md`

**When to reference**: When implementing tool execution reporting or building tool call UI.

### Agent Plan

Execution plans for multi-step tasks — creating plans, updating step status, and progress reporting.

**Reference**: `references/acp_protocol_agent-plan.md`

**When to reference**: When implementing plan display or reporting multi-step execution progress.

### File System

Client filesystem access — reading files (including unsaved editor state), writing files, and capability checking.

**Reference**: `references/acp_protocol_file-system.md`

**When to reference**: When implementing file read/write operations between agent and client environment.

### Terminals

Terminal command execution — running processes, streaming output, process lifecycle, and capability checking.

**Reference**: `references/acp_protocol_terminals.md`

**When to reference**: When implementing shell command execution or building terminal integration.

### Slash Commands

Agent-advertised commands that users invoke for specific workflows. Includes advertising, execution, and argument handling.

**Reference**: `references/acp_protocol_slash-commands.md`

**When to reference**: When implementing slash command support in an agent or client.

### Transports

stdio and streamable HTTP transport mechanisms. Includes message encoding and framing requirements.

**Reference**: `references/acp_protocol_transports.md`

**When to reference**: When implementing the transport layer or choosing between stdio and HTTP.

### Extensibility

Extension mechanisms — `_meta` field, custom methods with vendor prefixes, and forward compatibility.

**Reference**: `references/acp_protocol_extensibility.md`

**When to reference**: When adding custom functionality while maintaining protocol compatibility.

### Schema

Complete schema reference — all methods, notifications, and type definitions for both Agent and Client interfaces.

**Reference**: `references/acp_protocol_schema.md`

**When to reference**: When looking up specific method signatures, parameter types, or notification formats.

## Libraries

### TypeScript SDK

`@agentclientprotocol/sdk` — `AgentSideConnection` and `ClientSideConnection` classes for building agents and clients.

**Reference**: `references/acp_libraries_typescript.md`

**When to reference**: When building an ACP agent or client in TypeScript/Node.js.

### Python SDK

Python library for ACP implementation.

**Reference**: `references/acp_libraries_python.md`

**When to reference**: When building an ACP agent or client in Python.

### Kotlin SDK

Kotlin library for ACP implementation.

**Reference**: `references/acp_libraries_kotlin.md`

**When to reference**: When building an ACP agent or client in Kotlin/JVM.

### Rust SDK

Rust library for ACP implementation.

**Reference**: `references/acp_libraries_rust.md`

**When to reference**: When building an ACP agent or client in Rust.

### Community Libraries

Community-maintained ACP libraries and integrations.

**Reference**: `references/acp_libraries_community.md`

**When to reference**: When looking for ACP implementations in other languages or frameworks.

## Reference Documentation Index

**Getting Started**:
- `acp_get-started_introduction.md` - What ACP is, motivation, and overview
- `acp_get-started_architecture.md` - Design philosophy and architecture
- `acp_get-started_agents.md` - Directory of ACP-compatible agents
- `acp_get-started_clients.md` - Directory of ACP-compatible clients
- `acp_get-started_registry.md` - Agent registry and distribution

**Protocol Core**:
- `acp_protocol_overview.md` - Communication model and protocol structure
- `acp_protocol_initialization.md` - Connection handshake and capabilities
- `acp_protocol_session-setup.md` - Session creation, loading, and lifecycle
- `acp_protocol_session-config-options.md` - Flexible agent configuration
- `acp_protocol_session-modes.md` - Legacy operating modes (deprecated)
- `acp_protocol_prompt-turn.md` - Prompt/response interaction cycle
- `acp_protocol_content.md` - Content block types and usage

**Protocol Features**:
- `acp_protocol_tool-calls.md` - Tool call lifecycle and management
- `acp_protocol_agent-plan.md` - Multi-step execution plans
- `acp_protocol_file-system.md` - File read/write operations
- `acp_protocol_terminals.md` - Terminal command execution
- `acp_protocol_slash-commands.md` - Slash command support
- `acp_protocol_transports.md` - stdio and HTTP transports
- `acp_protocol_extensibility.md` - Extension mechanisms
- `acp_protocol_schema.md` - Complete method and type reference

**Libraries**:
- `acp_libraries_typescript.md` - TypeScript/Node.js SDK
- `acp_libraries_python.md` - Python SDK
- `acp_libraries_kotlin.md` - Kotlin/JVM SDK
- `acp_libraries_rust.md` - Rust SDK
- `acp_libraries_community.md` - Community-maintained libraries

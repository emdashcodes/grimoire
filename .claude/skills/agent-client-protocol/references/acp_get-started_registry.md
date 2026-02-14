---
title: ACP Registry
source_url: https://agentclientprotocol.com/get-started/registry
---

Get Started

# ACP Registry

The easiest way to find and install ACP-compatible agents.

## Overview

The ACP Registry is an easy way for developers to distribute their ACP-compatible agents to any client that speaks the protocol. At the moment, this is a curated set of agents, including only the ones that [support authentication](/rfds/auth-methods). Visit [the registry repository on GitHub](https://github.com/agentclientprotocol/registry) to learn more about it.

The registry is under active development, so expect its format and contents to change.

## Available Agents

- **Auggie CLI** - Augment Code's powerful software agent, backed by industry-leading context engine (`0.16.1`) - [GitHub](https://github.com/augmentcode/auggie-zed-extension)
- **Claude Code** - ACP wrapper for Anthropic's Claude (`0.16.1`) - [GitHub](https://github.com/zed-industries/claude-code-acp)
- **Codebuddy Code** - Tencent Cloud's official intelligent coding tool (`2.50.3`) - [Website](https://www.codebuddy.cn/cli/)
- **Codex CLI** - ACP adapter for OpenAI's coding assistant (`0.9.2`) - [GitHub](https://github.com/zed-industries/codex-acp)
- **Corust Agent** - Co-building with a seasoned Rust partner (`0.3.1`) - [GitHub](https://github.com/Corust-ai/corust-agent-release)
- **Factory Droid** - Factory Droid - AI coding agent powered by Factory AI (`0.57.14`)
- **Gemini CLI** - Google's official CLI for Gemini (`0.28.2`) - [GitHub](https://github.com/google-gemini/gemini-cli)
- **GitHub Copilot** - GitHub's AI pair programmer (`1.430.0`) - [GitHub](https://github.com/github/copilot-language-server-release)
- **Junie** - AI Coding Agent by JetBrains (`744.2.0`) - [GitHub](https://github.com/jetbrains-junie/junie)
- **Kimi CLI** - Moonshot AI's coding assistant (`1.12.0`) - [GitHub](https://github.com/MoonshotAI/kimi-cli)
- **Mistral Vibe** - Mistral's open-source coding assistant (`2.1.0`) - [GitHub](https://github.com/mistralai/mistral-vibe)
- **OpenCode** - The open source coding agent (`1.1.65`) - [GitHub](https://github.com/anomalyco/opencode)
- **Qoder CLI** - AI coding assistant with agentic capabilities (`0.1.28`)
- **Qwen Code** - Alibaba's Qwen coding assistant (`0.10.1`) - [GitHub](https://github.com/QwenLM/qwen-code)
- **Stakpak** - Open-source DevOps agent in Rust with enterprise-grade security (`0.3.41`) - [GitHub](https://github.com/stakpak/agent)

## Using the Registry

Clients can fetch the registry programmatically:

```
curl https://cdn.agentclientprotocol.com/registry/v1/latest/registry.json
```

The registry JSON contains all agent metadata including distribution information for automatic installation.

## Submit your Agent

To add your agent to the registry:

1.  Fork the [registry repository on GitHub](https://github.com/agentclientprotocol/registry)
2.  Create a folder with your agent's ID (lowercase, hyphens allowed)
3.  Add an `agent.json` file following [the schema](https://github.com/agentclientprotocol/registry/blob/main/agent.schema.json)
4.  Optionally add an `icon.svg` (16x16 recommended)
5.  Submit a pull request

See the [contributing guide](https://github.com/agentclientprotocol/registry/blob/main/CONTRIBUTING.md) for details.

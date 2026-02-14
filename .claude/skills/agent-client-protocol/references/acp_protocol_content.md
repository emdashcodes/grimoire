---
title: Content
source_url: https://agentclientprotocol.com/protocol/content
---

# Content

Content blocks in the Agent Client Protocol

Content blocks represent structured, displayable information flowing through the Agent Client Protocol. They appear in user prompts, language model output, and tool call results.

## Overview

The protocol uses the same `ContentBlock` structure as the Model Context Protocol (MCP), enabling agents to forward MCP tool outputs without transformation.

## Content Types

### Text Content

Plain text messages form the foundation of interactions.

```json
{
  "type": "text",
  "text": "What's the weather like today?"
}
```

**text** `string` *required*

The text content to display

**annotations** `Annotations`

Optional metadata about content usage or display

All agents must support text content blocks in prompts.

### Image Content

Images provide visual context or analysis.

```json
{
  "type": "image",
  "mimeType": "image/png",
  "data": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB..."
}
```

Requires the `image` prompt capability when included in prompts.

**data** `string` *required*

Base64-encoded image data

**mimeType** `string` *required*

Image MIME type (e.g., "image/png", "image/jpeg")

**uri** `string`

Optional URI reference for image source

**annotations** `Annotations`

Optional metadata about content usage or display

### Audio Content

Audio data for transcription or analysis.

```json
{
  "type": "audio",
  "mimeType": "audio/wav",
  "data": "UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAAB..."
}
```

Requires the `audio` prompt capability when included in prompts.

**data** `string` *required*

Base64-encoded audio data

**mimeType** `string` *required*

Audio MIME type (e.g., "audio/wav", "audio/mp3")

**annotations** `Annotations`

Optional metadata about content usage or display

### Embedded Resource

Complete resource contents embedded directly in messages.

```json
{
  "type": "resource",
  "resource": {
    "uri": "file:///home/user/script.py",
    "mimeType": "text/x-python",
    "text": "def hello():\n    print('Hello, world!')"
  }
}
```

This is the preferred approach for including context in prompts. By embedding content directly, clients can include context from sources agents may not access directly.

Requires the `embeddedContext` prompt capability when included in prompts.

**resource** `EmbeddedResourceResource` *required*

The embedded resource contents

Text Resource fields:

- **uri** `string` *required* -- The resource identifier
- **text** `string` *required* -- The text content
- **mimeType** `string` -- Optional MIME type

Blob Resource fields:

- **uri** `string` *required* -- The resource identifier
- **blob** `string` *required* -- Base64-encoded binary data
- **mimeType** `string` -- Optional MIME type

**annotations** `Annotations`

Optional metadata about content usage or display

### Resource Link

References to resources agents can access.

```json
{
  "type": "resource_link",
  "uri": "file:///home/user/document.pdf",
  "name": "document.pdf",
  "mimeType": "application/pdf",
  "size": 1024000
}
```

**uri** `string` *required*

The resource URI

**name** `string` *required*

Human-readable resource name

**mimeType** `string`

The resource MIME type

**title** `string`

Optional display title

**description** `string`

Optional contents description

**size** `integer`

Optional resource size in bytes

**annotations** `Annotations`

Optional metadata about content usage or display

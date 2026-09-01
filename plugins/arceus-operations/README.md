# Arceus Operations

Operate an already-running local Arceus company through the real stdio MCP entrypoint in `packages/arceus-mcp`.

## Prerequisites

- A local Arceus checkout with dependencies installed.
- Bun available on `PATH`.
- The Arceus API running and reachable from the MCP client.
- `ARCEUS_ROOT` set to the checkout root, or Arceus mounted at `/workspace/arceus`.
- `ARCEUS_API` and `ARCEUS_TOKEN` set in the local client environment. Keep the token out of this repository and plugin manifests.
- A host that supports local stdio MCP servers and expands environment placeholders in MCP configuration.

The MCP files target their host conventions. `.mcp.json` is the Grok config and defaults `ARCEUS_ROOT` to `/workspace/arceus`; `mcp.json` is the Cursor config and uses variables declared in `.cursor-plugin/plugin.json`.

If a Grok client does not expand `${ARCEUS_ROOT:-/workspace/arceus}`, copy the MCP configuration into that client's private local settings and replace only the executable path. Do not commit the resulting file or a token.

## Grok Bot cloud caveat

An xAI-hosted Grok Bot cannot directly spawn `bun`, read a laptop path, or connect to a local stdio process. The prompts and skill remain useful in Grok Bot, but live Arceus tools require a trusted local connector/runtime or a separately secured hosted bridge. Do not upload `ARCEUS_TOKEN` to a public Bot, skill, or repository.

## Safe operating policy

1. Start with read-only status tools.
2. Inspect the tool's MCP-advertised input schema before every call; use `tool_help` only as supplemental guidance.
3. Before any mutation, show the exact target, intended effect, and rollback or irreversibility, then obtain explicit approval.
4. Execute only the approved call and verify the result with a read-only tool.
5. Never infer IDs, roles, enum values, credentials, or missing arguments.

See [the operator agent](agents/arceus-operator.md), [the operations skill](skills/arceus-company-ops/SKILL.md), and [the current tool catalog](references/tool-catalog.md).

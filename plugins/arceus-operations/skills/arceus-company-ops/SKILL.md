---
name: arceus-company-ops
description: Inspect and safely operate a running Arceus company through its stdio MCP tools.
---

# Arceus Company Operations

Use this skill when the user asks to inspect or change company, execution, sprint, task, artifact, workspace, meeting, approval, memory, skill, strategy, chat, or beat state in Arceus.

Do not use it to modify the Arceus source repository, configure a new deployment, or imitate tool calls when the MCP server is unavailable.

## Required inputs

- The requested outcome.
- A connected `arceus` MCP server.
- Relevant IDs from the user or a verified read.
- Explicit approval before any mutation.

## Procedure

1. Check connectivity with the smallest relevant read, usually `company_get_summary` or `execution_get_status`.
2. Discover unknown tools with `arceus_tool_search`, but verify the result against the live MCP tool list because search metadata can lag registrations.
3. Inspect the live MCP-advertised JSON schema for the selected tool. Do this before every call; never reconstruct arguments from memory or examples. `tool_help` is supplemental and may not include the full schema.
4. Read current target state and copy identifiers exactly.
5. Consult `../../references/tool-catalog.md` to determine whether the tool mutates state.
6. For a mutation, state: tool name, target, exact intended effect, material side effects, and whether rollback is available. Wait for explicit approval for that bounded action.
7. Execute once. On timeout or unclear output, do not retry; read the target state first.
8. Verify with a read-only status/get/list/check tool and report the result.

## Output

Return:

- Current state or completed change.
- Tool evidence and target identifiers, excluding secrets.
- Verification result.
- Any blocker, ambiguity, or next approval needed.

## Safety

- Never expose `ARCEUS_TOKEN` or persist it in artifacts, tasks, logs, or workspace files.
- Never bypass role checks, board-only restrictions, or approval flows.
- Treat deploy, archive/stop, finalize, strategy, approval-decision, skill-change, checkpoint, and workspace-write operations as high impact.
- A denied mutation remains denied; offer a read-only diagnosis or the proper approval path.

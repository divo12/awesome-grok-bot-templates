# Arceus MCP Tool Catalog

Source of truth: the modules registered by `packages/arceus-mcp/src/server.ts` in the current Arceus checkout. It currently exposes 68 tools across 14 domains. The package README's older 19-tool count is stale.

The connected MCP server's advertised JSON schema is authoritative. Inspect it before every call. `tool_help` and `arceus_tool_search` are discovery aids and may lag the registered tool set.

## Access labels

- **Read**: state inspection only.
- **Verify**: runs a bounded check or probe without an intended state transition.
- **Mutate**: changes Arceus, task, memory, chat, meeting, skill, or workspace state; requires explicit approval.
- **High impact**: mutation with production, lifecycle, governance, git, or broad company effects; requires immediately preceding approval naming the action.

## Domains

### Approval

- Read: `approval_get`
- Mutate: `approval_request`, `approval_update`
- High impact: `approval_decide`

### Artifact

- Mutate: `artifact_create`
- High impact: `artifact_write_to_workspace`

### Beat

- Read: `beat_read_last_progress`

### Chat

- Mutate: `chat_emit_card`, `meeting_request`

### Company

- Read: `company_get_summary`, `agents_list_sessions`, `board_get_messages`
- High impact: `company_set_status`

### Execution

- Read: `execution_get_status`
- Mutate: `execution_complete_cycle`
- High impact: `execution_pause`, `execution_reconcile`, `execution_stop`

### Meeting

- Read: `meeting_get`
- Mutate: `meeting_record`, `meeting_request_decision`, `meeting_contribute`

### Memory

- Read: `memory_search`
- Mutate: `memory_add_learning`, `memory_handoff`

### Meta

- Read: `tool_help`, `arceus_tool_search`

### Skill

- Read: `skill_health_report`, `skill_audit_unused`, `skill_inspect_history`
- Verify: `skill_validate_definition`
- High impact: `skill_register`, `skill_update`, `skill_deprecate`

### Sprint

- Read: `sprint_get_active`, `sprint_check_completion`
- Verify: `sprint_run_qa_gate`, `sprint_run_final_gate`
- Mutate: `sprint_create`
- High impact: `sprint_finalize`

### Strategy

- High impact: `strategy_apply`

### Task

- Read: `task_get`, `task_get_preview_path`, `task_list_progress`
- Mutate: `task_complete`, `task_block`, `task_verify`, `task_append_result`, `task_set_preview_url`, `task_create`, `task_update`, `task_hydrate_from_spec`, `task_claim`, `task_update_progress`, `task_append_command`, `task_report_bug`, `task_clear_progress`

### Workspace

- Read: `workspace_get_preview_url`, `workspace_get_build_health`, `workspace_get_production_url`
- Verify: `workspace_probe_preview`, `workspace_check_exports`, `workspace_verify_baseline`, `workspace_run_flow_test`
- Mutate: `workspace_start_preview`, `todo_write`
- High impact: `workspace_checkpoint`, `workspace_deploy_production`

## Role and sequencing notes

- Arceus enforces role restrictions server-side. A denied tool call must not be bypassed.
- `strategy_apply` follows a board-approved hiring slate and is CEO-only.
- `sprint_finalize` is CEO-only and should follow completion and gate checks.
- `workspace_deploy_production` publishes externally.
- `workspace_start_preview` must precede `task_set_preview_url`.
- `task_complete` requires evidence artifact IDs for completion.
- `approval_decide` cannot decide board-only strategy, hire, or external-action approvals.
- A timeout after a mutation is an unknown outcome: read state before any retry.

# Product Studio

A portable product-delivery team for Grok and Cursor. It turns an idea into an evidence-backed decision, an implementation-ready scope, working code, and reproducible verification.

## Agents

| Agent | Owns |
| --- | --- |
| `product-manager` | Product decision, scope, acceptance criteria, and non-goals |
| `product-analyst` | Computed findings, source quality, metrics, and uncertainty |
| `ui-designer` | User flows, system-aligned interface specs, states, and accessibility |
| `frontend-engineer` | Tested, accessible, browser-proven user interfaces |
| `backend-engineer` | Validated contracts, domain logic, persistence, and API proof |
| `tester` | Independent acceptance, regression, accessibility, browser, and API evidence |

## Skills

- `product-decision`: gather bounded evidence, choose and scope an option, write acceptance criteria, and leave a decision record.
- `evidence-gated-delivery`: use TDD where behavior changes, verify accessibility, prove the real browser/API surface, and review the final diff.

Ask for a role by name or invoke either skill directly. Agents should inspect the repository and its local instructions before acting; existing project conventions override generic preferences.

## Local use

- Grok: load this directory as a plugin directory, then select an agent or invoke a skill.
- Cursor: symlink or copy this directory to `~/.cursor/plugins/local/product-studio`, reload the window, and open **Customize**.

No MCP server, credentials, hooks, or external runtime dependencies are included.

The operating guidance is a compact synthesis of the employee briefs and skills in Chorus and the role boundaries in Arceus. License: CC0-1.0.

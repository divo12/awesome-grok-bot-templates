# Engineering Mini-Org Operating System Prompts

Six copy-paste Grok Bot system prompts for running a small, durable engineering team. One Ops bot + N Area Engineers per surface, with optional specialist loops.

Built for speed, proof, and quiet nights. No per-ticket bots, no activity theater, no repetition.

## Files

- **[engineering-mini-org.md](engineering-mini-org.md)** — Org OS fundamentals: hierarchy, task board schema, PR fleet loop, nightly audits, P0 process, delegation contracts, proof bar, authority, and startup behavior.
- **[engineering-ops.md](engineering-ops.md)** — Head of Engineering Ops: daily 1:1s, living playbook, postmortems, onboarding. NO CODE, no merges. Coordinates but does not execute.
- **[area-engineer.md](area-engineer.md)** — Owns one durable surface (one client, one infra domain, one harness). Launches Cursor cloud agents with thorough prompts + expected proof. Invokes human design/quality/architecture/product skills. Monitors transcripts and pushes back if proof does not match.
- **[pr-fleet.md](pr-fleet.md)** — 30-minute babysitter: verifies review comments/security findings legitimacy, failing CI, merge conflicts, proof attachment, follows up working cloud agent, quality-review runs, auto-merge gate, else Needs Human decision packet. Stays quiet if nothing changed.
- **[nightly-auditor.md](nightly-auditor.md)** — Runs at YOUR_NIGHTLY_WINDOW. Default jobs: dead code, quality slop, load time, bundle size. Optional packs: security, CI duration, i18n, client parity, 24h catch-up summary, fun slot. No-op nights: one board line, no human ping.
- **[p0-steerer.md](p0-steerer.md)** — Temporary. Only when human marks a task P0. Checks transcript every 5 minutes. Warns ONCE about token burn. Steers off rabbit holes, keeps on proof. Self-deletes when done or cancelled. P0 does not skip the auto-merge gate.

## How to use

1. Create a Grok Bot for each file you need. Start with **Engineering Ops** + one **Area Engineer**.
2. Replace all `YOUR_*` fill-ins with your actual values:
   - `YOUR_REPO` — repository URL
   - `YOUR_TASK_BOARD` — Notion database or GitHub Projects URL
   - `YOUR_PLAYBOOK` — Notion page or wiki URL
   - `YOUR_SURFACE` — the client or infra domain this Area Engineer owns
   - `YOUR_NIGHTLY_WINDOW` — cron expression or time string
   - `YOUR_DESIGN_SKILL`, `YOUR_QUALITY_SKILL`, `YOUR_ARCHITECTURE_SKILL`, `YOUR_PRODUCT_SKILL` — human skill URLs or names
3. Attach suggested skills, routines, and plugins listed in each prompt.
4. Connect GitHub and Notion or GitHub Projects.
5. Spawn additional Area Engineers only for a new durable surface, never per ticket.
6. Optional: spawn PR Fleet, Nightly Auditor, or P0 Steerer as separate bots when the loop needs its own schedule. Otherwise, run the loops as routines on the Area Engineer.

## Catalog listing requirement

These are copy-paste prompts, not installable share links. A catalog listing still requires a live `https://x.ai/bot/<id>` share URL. Do not invent share URLs.

## Source credit

Public-safe generalization of:

**Lingxi Li, Grok Bot for Engineering, 2026-08-31**  
https://x.com/lingxi/status/2094493172516966781

Not affiliated with Lingxi, SpaceXAI, xAI, or Cursor. Use at your own risk. No secrets, no fake plugin ids.

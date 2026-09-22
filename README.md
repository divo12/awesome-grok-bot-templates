# Awesome Grok Bot Templates

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) ![Templates](https://img.shields.io/badge/templates-19-blueviolet) ![License](https://img.shields.io/badge/license-CC0-lightgrey)

A curated list of public **Grok Bot templates**. Every listing is a live [`https://x.ai/bot/...`](https://x.ai/bot) share page you can open and **Add to Grok Bot**. This is not a prompt dump.

> Community templates are untrusted third-party configurations. Inspect the profile, start with read-only access, connect one tool at a time, and keep sends, purchases, deletes, and other irreversible actions behind approval.

Unofficial community list; not affiliated with xAI, SpaceXAI, or Cursor.

## What is a Grok Bot template?

A Grok Bot template is a shareable Bot: identity, description, skills, routines, and requested tools, packed as a public `x.ai/bot` link. Adding it creates a copy on your account. It does not copy the creator's computer, logins, files, or conversation history.

A prompt is text you paste into a Bot description. A template is the installable Bot. This list only catalogs live share URLs. Copy-paste OS prompts live in [`prompts/`](prompts/) and are labeled as prompts, not templates.

Official docs: [Create and manage Bots](https://docs.x.ai/grok-bot/bots).

## How to add a Grok Bot template

1. Open a template's official share link on this page.
2. Review its identity, description, skills, routines, and requested tools.
3. Choose **Add to Grok Bot**, then connect only the tools it needs.
4. Run one safe, reversible task before enabling routines or anything that sends, buys, or deletes.

You need the [Grok Bot app](https://x.ai/bot) to finish adding a template.

## Grok Bot templates by category

- [Plugin Packs](#plugin-packs) (3)
- [Assistants](#assistants) (3)
- [Engineering](#engineering) (4)
- [Research](#research) (3)
- [Money](#money) (2)
- [Sales](#sales) (3)
- [Creative](#creative) (2)
- [Life](#life) (2)
- [FAQ](#faq)
- [Contributing](#contributing)

## Plugin Packs

This repository also acts as a Grok plugin marketplace. Each pack bundles agents and skills; Arceus Operations additionally declares the existing Arceus stdio MCP server.

- [Leadership Team](plugins/leadership-team/README.md) — CEO, CTO, Marketing Head, and Researcher with shared delegation and board-reporting rules.
- [Product Studio](plugins/product-studio/README.md) — Product, analysis, design, frontend, backend, and testing roles with evidence-gated delivery.
- [Arceus Operations](plugins/arceus-operations/README.md) — Safe task, sprint, artifact, meeting, approval, workspace, and company operations through Arceus MCP.

### Grok Build marketplace

```bash
grok plugin marketplace add divo12/awesome-grok-bot-templates
grok plugin install leadership-team
grok plugin install product-studio
# Local-only: review plugins/arceus-operations/mcp.json before granting trust.
grok plugin install arceus-operations --trust
```

### Grok Bot and Cursor

Use Cursor's plugin marketplace/import flow for the `.cursor-plugin` manifests, or save the included role skills as private Grok Bot skills. Local Grok Build plugin folders are not documented as a direct Grok Bot install path. Arceus MCP additionally requires a running Arceus checkout and variables configured through the plugin settings.

## Assistants

- [CEO](https://x.ai/bot/UUcFa8QmAvI3ZyWsEMOt8) — Sets company direction, delegates to functional leaders, and reports progress across the board.
- [Dewey](https://x.ai/bot/rfAHsaFrz6xHBMtUpxDi5) — Watches Gmail and flags messages that look time-sensitive or need a reply. [@Vixlio](https://x.com/Vixlio)
- [Grok Bot Coach](https://x.ai/bot/BrjELcmSwatjRc8DYjtrT) — Designs, audits, and tunes Grok Bots so they stay useful and focused. [@GuleidAmina](https://x.com/GuleidAmina)

## Engineering

- [Bouncer](https://x.ai/bot/cGcG0msqfz7o7J3QMLhbE) — Reviews a public Grok Bot share before you add it and returns a risk verdict. [@bradshannon](https://x.com/bradshannon)
- [CTO](https://x.ai/bot/N_ziMli8oxzdFJgTKV3DV) — Turns product direction into reliable software work across repositories and specialist engineering agents.
- [loops](https://x.ai/bot/Ub3T7usX-c6yRQibQq83P) — Generalized engineering outer loop that sits above coding agents, writes testable goal-style prompts, and runs gather, prompt, launch, review, merge.
- [PR Reviewer](https://x.ai/bot/rt629UEZFtE4Wz0A_0c37) — Reviews pull requests for risk, missing tests, and thin context before nits. [@mustafaergisi](https://x.com/mustafaergisi)

## Research

- [Product Idea Stress Test](https://x.ai/bot/JeFTvcDX-7QT2evKGIb52) — Tests a product idea against evidence and identifies its most fragile assumption. [@hnshah](https://x.com/hnshah)
- [Research Bot](https://x.ai/bot/Nn0ykGa3vJ6YS7ib7F6yH) — Produces cited research and flags claims that remain unverified or biased. [@ArthurMacwaters](https://x.com/ArthurMacwaters)
- [Researcher](https://x.ai/bot/iri8Z5mxwAWTHJgZUr6nb) — A research lead for a small personal bot org that spawns topic heads for big ongoing questions, kills junk, and returns a position with evidence and holes—never a dump of links.

## Money

- [Invoice Hunter](https://x.ai/bot/-kO6HrXokJZANVwUOMZO9) — Finds invoice PDFs in Gmail and prepares a monthly CSV for approval. [@scheemunai](https://x.com/scheemunai)
- [Watchdog](https://x.ai/bot/PuAEE57P58Df5zskFY3pg) — Scans email for receipts, renewals, and trials and reports upcoming charges. [@jxckvibe](https://x.com/jxckvibe)

## Sales

- [Marketing Head](https://x.ai/bot/GUz8QMB4I9RQzIDiIwSOB) — Owns channel strategy, marketing experiments, and evidence-based growth across X, LinkedIn, and other channels.
- [Pitch Deck Coach](https://x.ai/bot/mqVPHm0oB3WPsnxbU1qB9) — Reviews a pitch deck for what an investor will understand, question, and remember. [@hnshah](https://x.com/hnshah)
- [Post Call Assistant](https://x.ai/bot/xF12c5y4LVe7nf7IFguWI) — Drafts follow-ups and action items after meetings without sending them. [@itspriyaptl](https://x.com/itspriyaptl)

## Creative

- [figma bro](https://x.ai/bot/VHMdjIGjGpgDSJR7dW6Gz) — Designs in Figma using real components, precise layouts, and considered motion. [@johnbai](https://x.com/johnbai)
- [Podcast Summary Bot](https://x.ai/bot/CsyAhw5YQaVLeMSnMYwgA) — Turns podcast links into five reusable insights and deeper notes. [@theadvisorbtc](https://x.com/theadvisorbtc)

## Life

- [Flora](https://x.ai/bot/HC7kphHSxDzb639YlmI6O) — Keeps a private houseplant log and schedules seasonal care reminders. [@RichSilver](https://x.com/RichSilver)
- [Grocery Cart Planner](https://x.ai/bot/Y7LbP6p5EBFjfdTp69cKr) — Plans an Instacart grocery cart when asked and leaves checkout to you. [@mvanhorn](https://x.com/mvanhorn)

## Copy-paste operating system prompts

These are copy-paste Grok Bot system prompts, not installable share links. A catalog listing still requires a live `https://x.ai/bot/` share URL.

- [Personal Team OS](prompts/personal_team.md) — CEO, CTO, Research Lead, and Marketing Head for running a personal bot organization.
- [Engineering Mini-Org](prompts/engineering-org/) — Six specialist prompts for running a small, durable engineering team: Ops, Area Engineers, PR Fleet, Nightly Auditor, and P0 Steerer.

## How to share your own Grok Bot template

1. In Grok Bot, open the Bot and choose Share as template (update the app if you do not see it).
2. Inspect the draft. Strip API keys, internal URLs, and anything you would not put in a public document.
3. Publish and copy the `https://x.ai/bot/...` share URL.
4. Open a PR here: add the live URL in [`data/templates.json`](data/templates.json), then run `npm test && npm run generate`.

See [CONTRIBUTING.md](CONTRIBUTING.md).

## FAQ

### Where can I find Grok Bot templates?

Here. This repository is a curated list of public Grok Bot templates with live `x.ai/bot` share links, grouped by job (assistants, engineering, research, money, sales, creative, life).

### How do I install a Grok Bot template?

Open the share link, review the Bot, choose Add to Grok Bot, and connect only the tools it needs. You need the Grok Bot app to finish.

### Are Grok Bot templates safe?

They are third-party. SpaceXAI does not verify them. Read the preview, connect the smallest useful permissions, and keep sends, purchases, and deletes behind approval.

### What is the difference between a Grok Bot template and a prompt?

A prompt is text. A template is a published Bot you add from an `x.ai/bot` link. Prompt-only lists are not this catalog.

## Contributing

Add or update entries in [`data/templates.json`](data/templates.json), then run `npm test && npm run generate`. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

Initial entries were cross-checked against [awesome-grok-bot](https://github.com/RongleCat/awesome-grok-bot) and [awesome-grokbot-templates](https://github.com/cs68614-hash/awesome-grokbot-templates).

Last catalog update: 2026-09-01.

---

List data is dedicated to the public domain under [CC0 1.0](LICENSE).

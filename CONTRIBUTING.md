# Contributing

This list should stay a curated directory of reusable Grok Bot templates, starter packs, and playbooks.

## Acceptance

An entry must:

1. Be copy-pasteable as a template, profile pack, roster, or operating playbook.
2. Have a reachable URL you opened yourself.
3. Use the form `- [Name](URL) - one sentence.` ending with a period.
4. Land in the closest section.
5. Add the same blurb to `data/catalog.json` in `en`, `zh`, and `ja`, then run `python3 scripts/generate_readme.py`.

## Do not send

- Dead links or affiliate funnels
- Wholesale reprints of third-party full text
- Duplicate URLs
- Claims about pricing, quotas, or access that you cannot point at a primary source

## Flow

1. Fork, branch, edit `data/catalog.json`.
2. Regenerate the README files.
3. Open a PR with the checklist in `.github/PULL_REQUEST_TEMPLATE.md`.


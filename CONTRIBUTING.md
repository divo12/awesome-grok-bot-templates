# Contributing

Add one public Grok Bot template per pull request when practical.

## Requirements

- Use a live official `https://x.ai/bot/<id>` share link.
- Copy the name shown on the share page.
- Write one factual sentence describing the job.
- Add the public creator X handle only when you can verify it; otherwise use `null`.
- Do not submit prompt dumps, private links, secrets, customer data, or affiliate redirects.

## Add a template

1. Open the share link and review the public configuration.
2. Add an object to `data/templates.json`:

   ```json
   {
     "name": "Example Bot",
     "description": "One sentence describing its job.",
     "category": "Engineering",
     "author": null,
     "share_url": "https://x.ai/bot/example-id"
   }
   ```

3. Run:

   ```bash
   npm test
   npm run generate
   npm run check
   ```

## Categories

Assistants - Engineering - Research - Money - Sales - Creative - Life

Templates are community-created and untrusted. A listing means the link and description were reviewed; it is not a security endorsement.

## Add or update a plugin

1. Keep the plugin under `plugins/<name>/` with matching `.grok-plugin/plugin.json` and `.cursor-plugin/plugin.json` manifests.
2. Put reusable instructions in `skills/<name>/SKILL.md` and role definitions in `agents/*.md`.
3. Add MCP only when a real server exists. Reference credentials through environment variables; never commit values.
4. Add the same local source to `.grok-plugin/marketplace.json` and `.cursor-plugin/marketplace.json`.
5. Run `npm test && npm run generate && npm run check`.

Plugins can execute code or access connected systems. Keep external publication, spending, destructive actions, production changes, and permission expansion behind explicit approval.

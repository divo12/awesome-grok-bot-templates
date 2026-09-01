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

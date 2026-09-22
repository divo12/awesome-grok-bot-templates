#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_PATH = resolve(ROOT, "data/templates.json");
const README_PATH = resolve(ROOT, "README.md");
const SHARE_URL = /^https:\/\/x\.ai\/bot\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_-]+)?$/;

export const CATEGORIES = [
  "Assistants",
  "Engineering",
  "Research",
  "Money",
  "Sales",
  "Creative",
  "Life",
];

export function normalizeNewlines(text) {
  return text.replace(/\r\n?/g, "\n");
}

export function validateCatalog(catalog) {
  const errors = [];
  const seenIds = new Set();

  if (!/^\d{4}-\d{2}-\d{2}$/.test(catalog.updated ?? "")) {
    errors.push("updated must use YYYY-MM-DD");
  }
  if (!Array.isArray(catalog.templates) || catalog.templates.length === 0) {
    errors.push("templates must be a non-empty array");
  }

  for (const [index, template] of (catalog.templates ?? []).entries()) {
    const at = `templates[${index}]`;
    for (const field of ["name", "description", "category", "share_url"]) {
      if (typeof template[field] !== "string" || !template[field].trim()) {
        errors.push(`${at}.${field} must be a non-empty string`);
      }
    }
    if (!CATEGORIES.includes(template.category)) {
      errors.push(`${at}.category must be one of: ${CATEGORIES.join(", ")}`);
    }
    if (!SHARE_URL.test(template.share_url ?? "")) {
      errors.push(`${at}.share_url must be an official https://x.ai/bot/... URL`);
    } else {
      const id = new URL(template.share_url).pathname.split("/")[2];
      if (seenIds.has(id)) errors.push(`${at}.share_url duplicates bot id ${id}`);
      seenIds.add(id);
    }
    if (!template.description?.endsWith(".")) {
      errors.push(`${at}.description must end with a period`);
    }
    if (
      template.author !== null &&
      (typeof template.author !== "string" || !/^[A-Za-z0-9_]{1,15}$/.test(template.author))
    ) {
      errors.push(`${at}.author must be a bare X handle or null`);
    }
  }

  if (errors.length) throw new Error(errors.join("\n"));
}

function anchor(category) {
  return category.toLowerCase().replaceAll(" ", "-");
}

export function renderReadme(catalog) {
  validateCatalog(catalog);
  const groups = new Map(CATEGORIES.map((category) => [category, []]));

  for (const template of catalog.templates) groups.get(template.category).push(template);
  for (const templates of groups.values()) {
    templates.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
  }

  const lines = [
    "# Awesome Grok Bot Templates",
    "",
    "[![Awesome](https://awesome.re/badge.svg)](https://awesome.re) " +
      `![Templates](https://img.shields.io/badge/templates-${catalog.templates.length}-blueviolet) ` +
      "![License](https://img.shields.io/badge/license-CC0-lightgrey)",
    "",
    "A curated list of public **Grok Bot templates**. Every listing is a live [`https://x.ai/bot/...`](https://x.ai/bot) share page you can open and **Add to Grok Bot**. This is not a prompt dump.",
    "",
    "> Community templates are untrusted third-party configurations. Inspect the profile, start with read-only access, connect one tool at a time, and keep sends, purchases, deletes, and other irreversible actions behind approval.",
    "",
    "Unofficial community list; not affiliated with xAI, SpaceXAI, or Cursor.",
    "",
    "## What is a Grok Bot template?",
    "",
    "A Grok Bot template is a shareable Bot: identity, description, skills, routines, and requested tools, packed as a public `x.ai/bot` link. Adding it creates a copy on your account. It does not copy the creator's computer, logins, files, or conversation history.",
    "",
    "A prompt is text you paste into a Bot description. A template is the installable Bot. This list only catalogs live share URLs. Copy-paste OS prompts live in [`prompts/`](prompts/) and are labeled as prompts, not templates.",
    "",
    "Official docs: [Create and manage Bots](https://docs.x.ai/grok-bot/bots).",
    "",
    "## How to add a Grok Bot template",
    "",
    "1. Open a template's official share link on this page.",
    "2. Review its identity, description, skills, routines, and requested tools.",
    "3. Choose **Add to Grok Bot**, then connect only the tools it needs.",
    "4. Run one safe, reversible task before enabling routines or anything that sends, buys, or deletes.",
    "",
    "You need the [Grok Bot app](https://x.ai/bot) to finish adding a template.",
    "",
    "## Grok Bot templates by category",
    "",
    "- [Plugin Packs](#plugin-packs) (3)",
  ];

  for (const category of CATEGORIES) {
    lines.push(`- [${category}](#${anchor(category)}) (${groups.get(category).length})`);
  }
  lines.push("- [FAQ](#faq)", "- [Contributing](#contributing)", "");

  lines.push(
    "## Plugin Packs",
    "",
    "This repository also acts as a Grok plugin marketplace. Each pack bundles agents and skills; Arceus Operations additionally declares the existing Arceus stdio MCP server.",
    "",
    "- [Leadership Team](plugins/leadership-team/README.md) — CEO, CTO, Marketing Head, and Researcher with shared delegation and board-reporting rules.",
    "- [Product Studio](plugins/product-studio/README.md) — Product, analysis, design, frontend, backend, and testing roles with evidence-gated delivery.",
    "- [Arceus Operations](plugins/arceus-operations/README.md) — Safe task, sprint, artifact, meeting, approval, workspace, and company operations through Arceus MCP.",
    "",
    "### Grok Build marketplace",
    "",
    "```bash",
    "grok plugin marketplace add divo12/awesome-grok-bot-templates",
    "grok plugin install leadership-team",
    "grok plugin install product-studio",
    "# Local-only: review plugins/arceus-operations/mcp.json before granting trust.",
    "grok plugin install arceus-operations --trust",
    "```",
    "",
    "### Grok Bot and Cursor",
    "",
    "Use Cursor's plugin marketplace/import flow for the `.cursor-plugin` manifests, or save the included role skills as private Grok Bot skills. Local Grok Build plugin folders are not documented as a direct Grok Bot install path. Arceus MCP additionally requires a running Arceus checkout and variables configured through the plugin settings.",
    "",
  );

  for (const category of CATEGORIES) {
    lines.push(`## ${category}`, "");
    for (const template of groups.get(category)) {
      const author = template.author
        ? ` [@${template.author}](https://x.com/${template.author})`
        : "";
      lines.push(`- [${template.name}](${template.share_url}) — ${template.description}${author}`);
    }
    lines.push("");
  }

  lines.push(
    "## Copy-paste operating system prompts",
    "",
    "These are copy-paste Grok Bot system prompts, not installable share links. A catalog listing still requires a live `https://x.ai/bot/` share URL.",
    "",
    "- [Personal Team OS](prompts/personal_team.md) — CEO, CTO, Research Lead, and Marketing Head for running a personal bot organization.",
    "- [Engineering Mini-Org](prompts/engineering-org/) — Six specialist prompts for running a small, durable engineering team: Ops, Area Engineers, PR Fleet, Nightly Auditor, and P0 Steerer.",
    "",
    "## How to share your own Grok Bot template",
    "",
    "1. In Grok Bot, open the Bot and choose Share as template (update the app if you do not see it).",
    "2. Inspect the draft. Strip API keys, internal URLs, and anything you would not put in a public document.",
    "3. Publish and copy the `https://x.ai/bot/...` share URL.",
    "4. Open a PR here: add the live URL in [`data/templates.json`](data/templates.json), then run `npm test && npm run generate`.",
    "",
    "See [CONTRIBUTING.md](CONTRIBUTING.md).",
    "",
    "## FAQ",
    "",
    "### Where can I find Grok Bot templates?",
    "",
    "Here. This repository is a curated list of public Grok Bot templates with live `x.ai/bot` share links, grouped by job (assistants, engineering, research, money, sales, creative, life).",
    "",
    "### How do I install a Grok Bot template?",
    "",
    "Open the share link, review the Bot, choose Add to Grok Bot, and connect only the tools it needs. You need the Grok Bot app to finish.",
    "",
    "### Are Grok Bot templates safe?",
    "",
    "They are third-party. SpaceXAI does not verify them. Read the preview, connect the smallest useful permissions, and keep sends, purchases, and deletes behind approval.",
    "",
    "### What is the difference between a Grok Bot template and a prompt?",
    "",
    "A prompt is text. A template is a published Bot you add from an `x.ai/bot` link. Prompt-only lists are not this catalog.",
    "",
    "## Contributing",
    "",
    "Add or update entries in [`data/templates.json`](data/templates.json), then run `npm test && npm run generate`. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.",
    "",
    "Initial entries were cross-checked against [awesome-grok-bot](https://github.com/RongleCat/awesome-grok-bot) and [awesome-grokbot-templates](https://github.com/cs68614-hash/awesome-grokbot-templates).",
    "",
    `Last catalog update: ${catalog.updated}.`,
    "",
    "---",
    "",
    "List data is dedicated to the public domain under [CC0 1.0](LICENSE).",
    "",
  );

  return lines.join("\n");
}

export async function loadCatalog() {
  return JSON.parse(await readFile(DATA_PATH, "utf8"));
}

async function main() {
  const catalog = await loadCatalog();
  const rendered = renderReadme(catalog);

  if (process.argv.includes("--check")) {
    const current = await readFile(README_PATH, "utf8").catch(() => "");
    if (normalizeNewlines(current) !== normalizeNewlines(rendered)) {
      throw new Error("README.md is stale; run npm run generate");
    }
    console.log(`ok: ${catalog.templates.length} templates; README.md is current`);
    return;
  }

  await writeFile(README_PATH, rendered, "utf8");
  console.log(`generated README.md from ${catalog.templates.length} templates`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

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
    "A curated list of public Grok Bot templates. Every listing points directly to an official `https://x.ai/bot/...` share page.",
    "",
    "> Community templates are untrusted third-party configurations. Inspect the profile, start with read-only access, connect one tool at a time, and keep sends, purchases, deletes, and other irreversible actions behind approval.",
    "",
    "Unofficial community list; not affiliated with xAI, SpaceXAI, or Cursor.",
    "",
    "## How to use a template",
    "",
    "1. Open a template's official share link.",
    "2. Review its identity, description, skills, routines, and requested tools.",
    "3. Choose **Add to Grok Bot**, then connect only the tools it needs.",
    "",
    "Sharing copies the public Bot configuration, not the creator's computer, logins, files, or conversation history. See the official [Create and manage Bots](https://docs.x.ai/grok-bot/bots) guide.",
    "",
    "## Contents",
    "",
  ];

  for (const category of CATEGORIES) {
    lines.push(`- [${category}](#${anchor(category)}) (${groups.get(category).length})`);
  }
  lines.push("- [Contributing](#contributing)", "");

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
    if (current !== rendered) throw new Error("README.md is stale; run npm run generate");
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

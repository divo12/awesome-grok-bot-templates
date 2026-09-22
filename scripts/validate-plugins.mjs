#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EXPECTED = ["leadership-team", "product-studio", "arceus-operations"];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function walk(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = resolve(path, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(child)));
    else files.push(child);
  }
  return files;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function pluginSource(entry) {
  return typeof entry.source === "string" ? entry.source : entry.source?.path;
}

export async function validatePlugins(root = ROOT) {
  const grok = await readJson(resolve(root, ".grok-plugin/marketplace.json"));
  const cursor = await readJson(resolve(root, ".cursor-plugin/marketplace.json"));
  const grokNames = grok.plugins.map(({ name }) => name);
  const cursorNames = cursor.plugins.map(({ name }) => name);
  const cursorByName = new Map(cursor.plugins.map((entry) => [entry.name, entry]));

  assert(JSON.stringify(grokNames) === JSON.stringify(EXPECTED), "Grok marketplace plugin list is stale");
  assert(JSON.stringify(cursorNames) === JSON.stringify(EXPECTED), "Cursor marketplace plugin list is stale");

  let skillCount = 0;
  let agentCount = 0;
  for (const entry of grok.plugins) {
    const source = pluginSource(entry);
    assert(source?.startsWith("./plugins/"), `${entry.name} must use a local plugins/ source`);
    assert(pluginSource(cursorByName.get(entry.name)) === source, `${entry.name} marketplace sources differ`);
    const pluginRoot = resolve(root, source);
    const portableManifest = await readJson(resolve(pluginRoot, "plugin.json"));
    const manifest = await readJson(resolve(pluginRoot, ".grok-plugin/plugin.json"));
    const cursorManifest = await readJson(resolve(pluginRoot, ".cursor-plugin/plugin.json"));

    for (const value of [portableManifest, manifest, cursorManifest]) {
      assert(value.name === entry.name, `${entry.name} manifest name mismatch`);
      assert(/^\d+\.\d+\.\d+$/.test(value.version), `${entry.name} requires a semantic version`);
      assert(value.license === "CC0-1.0", `${entry.name} must declare CC0-1.0`);
      assert(typeof value.skills === "string", `${entry.name} must declare its skills path`);
      assert(typeof value.agents === "string", `${entry.name} must declare its agents path`);
    }

    const files = await walk(pluginRoot);
    const skills = files.filter((file) => file.endsWith("/SKILL.md"));
    const agents = files.filter((file) => file.includes("/agents/") && file.endsWith(".md"));
    assert(skills.length > 0, `${entry.name} has no SKILL.md`);
    for (const file of [...skills, ...agents]) {
      const text = await readFile(file, "utf8");
      assert(text.startsWith("---\n"), `${file} is missing YAML frontmatter`);
      assert(/\nname:\s*[^\n]+/.test(text), `${file} is missing a frontmatter name`);
      assert(/\ndescription:\s*[^\n]+/.test(text), `${file} is missing a frontmatter description`);
      assert(text.split("\n").length <= 500, `${file} exceeds 500 lines`);
    }
    skillCount += skills.length;
    agentCount += agents.length;

    if (entry.name === "arceus-operations") {
      const mcp = await readFile(resolve(pluginRoot, ".mcp.json"), "utf8");
      const cursorMcp = await readFile(resolve(pluginRoot, "mcp.json"), "utf8");
      assert(mcp.includes("ARCEUS_API") && mcp.includes("ARCEUS_TOKEN"), "Grok MCP must use env-backed credentials");
      assert(cursorMcp.includes("${ARCEUS_ROOT}"), "Cursor MCP must use its declared root variable");
      assert(!cursorMcp.includes("${ARCEUS_ROOT:-"), "Cursor MCP cannot use shell-style variable defaults");
      for (const variable of ["ARCEUS_ROOT", "ARCEUS_API", "ARCEUS_TOKEN"]) {
        assert(cursorManifest.variables?.properties?.[variable], `Cursor manifest does not declare ${variable}`);
      }
      assert(!/Bearer\s+[A-Za-z0-9_-]{12,}/.test(mcp), "Arceus MCP contains a literal bearer token");
    }
  }

  return { plugins: EXPECTED.length, skills: skillCount, agents: agentCount };
}

async function main() {
  const result = await validatePlugins();
  console.log(`ok: ${result.plugins} plugins, ${result.skills} skills, ${result.agents} agents`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

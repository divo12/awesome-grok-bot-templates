import assert from "node:assert/strict";
import test from "node:test";

import { loadCatalog, normalizeNewlines, renderReadme, validateCatalog } from "../scripts/catalog.mjs";

test("the catalog validates and every template renders once", async () => {
  const catalog = await loadCatalog();
  assert.doesNotThrow(() => validateCatalog(catalog));

  const readme = renderReadme(catalog);
  for (const template of catalog.templates) {
    assert.equal(readme.split(template.share_url).length - 1, 1);
  }

  const invalid = structuredClone(catalog);
  invalid.templates[1].share_url = invalid.templates[0].share_url;
  assert.throws(() => validateCatalog(invalid), /duplicates bot id/);
});

test("README checks treat Windows and Unix line endings equally", () => {
  assert.equal(normalizeNewlines("first\r\nsecond\rthird\nfourth"), "first\nsecond\nthird\nfourth");
});

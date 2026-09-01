import assert from "node:assert/strict";
import test from "node:test";

import { validatePlugins } from "../scripts/validate-plugins.mjs";

test("plugin marketplaces and bundled components validate", async () => {
  const result = await validatePlugins();
  assert.deepEqual(result, { plugins: 3, skills: 4, agents: 11 });
});

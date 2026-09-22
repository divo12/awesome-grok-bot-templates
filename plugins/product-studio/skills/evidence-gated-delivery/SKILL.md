---
name: evidence-gated-delivery
description: Deliver a code change through targeted TDD, accessibility checks, real browser or API proof, and final review. Use for feature implementation, behavior-changing fixes, and release verification.
license: CC0-1.0
metadata:
  author: Divyansh
  short-description: TDD, accessibility, runtime proof, review.
---

# Evidence-Gated Delivery

## Workflow

1. **Bind to reality.** Read repository instructions, manifests, the affected flow and callers, existing tests, and acceptance criteria. Reuse the current stack and patterns.
2. **Create the smallest failing check.** For non-trivial behavior, add or update one test that fails for the right reason. Prefer a public outcome over an implementation detail. A trivial metadata-only change does not need a ceremonial test.
3. **Implement minimally.** Write only enough production code to pass. Keep input validation, authorization, data-loss prevention, accessibility, and explicit requirements intact.
4. **Refactor while green.** Remove duplication introduced by the change; do not add speculative abstractions or dependencies.
5. **Run project gates.** Execute the targeted test plus the repository's required lint, typecheck, build, and broader test commands. Preserve real output; never hand-write evidence.
6. **Prove the shipped boundary.** Use the proof path matching the change:
   - UI: drive the primary path and a material failure path in a real browser; check console errors and a narrow viewport.
   - API/service: call the real public boundary; capture status, response shape, validation/error behavior, and authorization where relevant.
   - Data/schema: run the supported migration path on the real engine and verify preserved data; test rollback when supported.
7. **Check accessibility for UI.** Verify semantics, accessible names, keyboard operation, visible focus, WCAG AA contrast, reflow, reduced motion, and reachable loading/empty/error states.
8. **Review the final diff.** Map each acceptance criterion to evidence. Check scope creep, regressions, security boundaries, generated files, secrets, and test weakening. Seek independent review for risky or broad changes.

## Completion evidence

Report:

- changed behavior and files;
- test/build/lint/type commands and outcomes;
- browser paths or API requests exercised;
- accessibility checks performed;
- acceptance-criterion mapping;
- remaining gaps or risks.

Red, skipped, missing, or unavailable evidence is not PASS. Fix it, or report the work as BLOCKED with the exact missing proof.

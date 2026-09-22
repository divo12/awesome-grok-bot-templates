---
name: product-decision
description: Make an evidence-backed product decision with explicit scope, testable acceptance criteria, and a durable decision record. Use for feature bets, product plans, prioritization, or material scope changes.
license: CC0-1.0
metadata:
  author: Divyansh
  short-description: Evidence, scope, acceptance, decision.
---

# Product Decision

## Workflow

1. **Frame the call.** Write one sentence each for the user/problem, current behavior, desired outcome, constraints, decision owner, and decision deadline. Separate confirmed facts from assumptions.
2. **Gather bounded evidence.** Read product state first: existing behavior, repository constraints, prior decisions, and relevant metrics. Add external evidence only if it can change the choice. Cite paths, queries, URLs, and dates. Stop after one focused sweep.
3. **Compare options.** Consider at most three feasible options. Include doing nothing when credible. Evaluate user value, effort, risk, reversibility, and evidence quality.
4. **Choose and scope.** State the selected option and confidence. Define the smallest coherent release, dependencies, risks, explicit non-goals, and deferred work.
5. **Write acceptance.** Use observable outcomes or Given/When/Then. Cover the main path and material failure paths. Add accessibility, security, performance, or data-integrity criteria only where the surface requires them.
6. **Record the decision.** Update the repository's existing planning or decision artifact. Do not invent a new hierarchy of documents.

## Decision record

```markdown
## Decision: <short title>

- Status/date/owner:
- User and problem:
- Evidence: <claim — source>
- Options considered:
- Decision and rationale:
- Confidence and uncertainty:
- Scope:
- Non-goals:
- Acceptance criteria:
- Outcome metric:
- Rejected alternatives:
- Revisit trigger:
```

## Quality gate

- Every material claim has a source or is labeled an assumption.
- Acceptance criteria can be checked without interpreting intent.
- Scope and non-goals prevent silent expansion.
- Confidence matches evidence quality.
- The outcome metric and revisit trigger make the decision falsifiable.

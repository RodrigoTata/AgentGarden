---
name: to-qa
description: Post-TDD quality assurance skill. Run automated code-level QA checks (typos, dead references, DTO mismatches, import errors) then generate a human QA plan for browser/UI testing. Use after completing a /tdd cycle, when the user says "QA", or when verifying a feature before release.
---

# Post-TDD Quality Assurance

Run this skill **after** a `/tdd` cycle completes (all tests GREEN). It has two phases: an automated agent sweep (no browser), then a human QA plan artifact.

## Philosophy

TDD proves the code does what the tests say. QA proves the **system** does what the **user** expects. They are complementary, not redundant.

- **Agent QA** catches what tests miss: typos in user-facing strings, orphaned imports, DTO↔entity field drift, hardcoded values, missing error messages, inconsistent naming.
- **Human QA** catches what agents can't: visual regressions, UX friction, real-browser flows, cross-device behavior, data-dependent edge cases.

**Rule**: The agent MUST NOT open a browser or interact with a running application. All agent checks are static analysis and code inspection. Browser testing is exclusively the human's responsibility.

## Process

### Phase 1: Agent Automated Sweep

Execute these checks sequentially. Report each finding with file, line, and severity (`🔴 CRITICAL`, `🟡 WARNING`, `🔵 INFO`).

#### 1.1 Collect TDD Context

Before checking anything, gather what was built:
- Read the `task.md` artifact to understand which issues were implemented
- Read the PRD (if referenced) to understand the intended behavior
- Identify all files modified or created during the TDD cycle (use `git diff --name-only` against the base branch or recent commits)
- List the test files and the behaviors they cover

#### 1.2 TypeScript & Build Verification

```
// turbo
npm run build          # Backend (NestJS)
```

If a frontend was modified:

```
// turbo
npm run build          # Frontend (Vite/Angular)
```

Record any compiler errors or warnings. These are `🔴 CRITICAL`.

#### 1.3 Full Test Suite Regression

```
// turbo
npm run test
```

Run the **entire** backend test suite, not just the files touched. Any failure is `🔴 CRITICAL` — it means the TDD cycle left a regression.

#### 1.4 User-Facing String Audit

Scan all modified files for:
- **Typos in Spanish strings**: labels, error messages, notifications, PDF text, email templates
- **Inconsistent capitalization**: e.g. `"cuota de incorporación"` vs `"Cuota de Incorporación"`
- **Hardcoded strings** that should be constants or i18n keys
- **Truncated or placeholder text**: `TODO`, `FIXME`, `HACK`, `XXX`, leftover `console.log`

Use `grep_search` with patterns like `TODO|FIXME|HACK|XXX|console\.log` across modified files.

#### 1.5 DTO ↔ Entity ↔ Frontend Model Drift

For each new or modified field in an entity:
- [ ] Verify the corresponding DTO includes the field with correct type and validators
- [ ] Verify the service maps the field correctly (create, update, and response)
- [ ] Verify the frontend model/interface includes the field
- [ ] Verify the frontend form sends the field on submit
- [ ] Verify the frontend form loads the field on edit

Report mismatches as `🟡 WARNING` (silent data loss in production).

#### 1.6 Import & Reference Integrity

For each new file or moved export:
- [ ] No orphaned imports (importing from deleted or renamed files)
- [ ] No circular dependencies introduced
- [ ] Module declarations (`*.module.ts`) register new providers/controllers
- [ ] No duplicate provider registrations

#### 1.7 API Contract Consistency

For each new or modified endpoint:
- [ ] Swagger decorators (`@ApiTags`, `@ApiOperation`, `@ApiQuery`, etc.) are present
- [ ] Guard decorators match intended access (`@UseGuards`, `@Roles`)
- [ ] Response shape matches what the frontend service expects
- [ ] Error responses use consistent format (`NotFoundException`, `ConflictException`, etc.)

#### 1.8 Edge Cases in Business Logic

Review the implemented logic for:
- [ ] Division by zero guards (especially in price/quantity calculations)
- [ ] Null/undefined access on optional relations (`?.` operator used correctly)
- [ ] Numeric precision issues (`Number()` conversions, floating point comparisons)
- [ ] Empty array handling (`.reduce()` on empty arrays, `.find()` returning undefined)
- [ ] Date timezone assumptions (UTC vs local)

#### 1.9 Generate Agent QA Report

Create an artifact `qa_agent_report.md` with:

```markdown
# 🔍 Agent QA Report — [Feature Name]

**Date**: YYYY-MM-DD
**TDD Cycle**: [reference to task.md or issue numbers]
**Files Scanned**: N files

## Summary

| Severity | Count |
|----------|-------|
| 🔴 CRITICAL | X |
| 🟡 WARNING  | Y |
| 🔵 INFO     | Z |

## Findings

### 🔴 Critical

1. **[Finding title]** — `file.ts:L42`
   Description of the issue and suggested fix.

### 🟡 Warning

1. ...

### 🔵 Info

1. ...

## Automated Checks Passed

- [x] Backend compiles without errors
- [x] Frontend compiles without errors
- [x] All N tests pass
- [x] No orphaned imports
- ...
```

If there are `🔴 CRITICAL` findings, **stop and fix them** before proceeding to Phase 2. Return to the user with the report and proposed fixes.

---

### Phase 2: Human QA Plan

Generate an artifact `qa_human_plan.md` for the user to execute manually in the browser. This plan must be derived from:

1. The **PRD user stories** (what the user expects)
2. The **TDD test coverage** (what the agent already verified — no need to re-test)
3. The **agent QA findings** (anything that couldn't be verified statically)

#### 2.1 Structure of the Human QA Plan

```markdown
# 🧪 Human QA Plan — [Feature Name]

**Generated**: YYYY-MM-DD
**Prerequisites**: Backend running (`npm run start:local`), Frontend running (`npm run start`)
**Test User**: [specific user account or role needed]

## Context

Brief summary of what was built, linking to the PRD and TDD task.

## What the Agent Already Verified

Bullet list of behaviors confirmed by automated tests and code inspection.
The human does NOT need to re-test these.

## Test Scenarios

### Scenario 1: [Descriptive Name]

**Goal**: What this scenario validates from the user's perspective.
**Role**: ADMIN / USER
**Preconditions**: Any setup needed (e.g., "at least one product of type ADMINISTRATIVO must exist in the catalog")

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1    | Navigate to `/catalog` | Catalog list loads with all products |
| 2    | Click "Nuevo Item" | Product creation form opens |
| 3    | Select "Administrativo (Virtual)" in Tipo de Producto | Botanical fields (Cepa, Cantidad Resultante, Stock Vitrina, Ingredientes) hide |
| ...  | ... | ... |

**Edge cases to try**:
- [ ] Edge case description

### Scenario 2: ...

...

## Regression Checks

Quick smoke tests on **existing** functionality that could have been affected:

| Area | What to verify | Priority |
|------|---------------|----------|
| Dispensaciones | Creating a new reservation with botanical products still works | HIGH |
| PDF Receipts | Download a receipt for an old transaction — format unchanged | MEDIUM |
| ... | ... | ... |

## Sign-Off

- [ ] All scenarios passed
- [ ] All regression checks passed
- [ ] No visual regressions observed
- [ ] Overall UX is acceptable

**Tested by**: _______________
**Date**: _______________
```

#### 2.2 Writing Good Scenarios

- Each scenario must have a **clear goal** tied to a PRD user story or acceptance criterion
- Steps should be **concrete actions** ("Click the dropdown labeled 'Tipo de Producto'"), not vague ("verify the form works")
- Expected results should be **observable** ("The fields Cepa, Stock Vitrina disappear from the form"), not internal ("the state updates correctly")
- Include **edge cases** as checkboxes under each scenario: empty inputs, boundary values, rapid clicks, back-button behavior
- Prioritize scenarios: `🔴 MUST TEST` for critical paths, `🟡 SHOULD TEST` for important flows, `🔵 NICE TO TEST` for polish

#### 2.3 Delivery

Present the `qa_human_plan.md` artifact to the user. Highlight:

1. How many scenarios there are and estimated time
2. Which scenarios are highest priority
3. Any findings from Phase 1 that were fixed or need attention
4. Any areas where the agent couldn't verify and the human should pay extra attention

## Checklist

```
[ ] Phase 1: All modified files scanned
[ ] Phase 1: Build passes (backend + frontend)
[ ] Phase 1: Full test suite passes
[ ] Phase 1: No critical findings remain unfixed
[ ] Phase 1: Agent QA report artifact created
[ ] Phase 2: Human QA plan covers all PRD user stories
[ ] Phase 2: Human QA plan does NOT duplicate agent-verified items
[ ] Phase 2: Each scenario has concrete steps and expected results
[ ] Phase 2: Regression checks included for adjacent features
[ ] Phase 2: Human QA plan artifact created and presented to user
```

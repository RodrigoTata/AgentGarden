---
name: cyber-audit
description: Full-stack cybersecurity audit specializing in NestJS, Angular, and AI components. Identifies SQLi, XSS, Prompt Injection, and Broken Access Control. Use after /to-qa and before /improve-codebase-architecture.
---

# Cyber-Audit (Security Auditor)

Run **after** `/to-qa` and **before** `/improve-codebase-architecture`. Security flaws found here inform architectural deepening downstream.

```
/tdd → /to-qa → /cyber-audit → /improve-codebase-architecture
```

> **Analyze and report only.** Do not modify code unless requested. Assume all client-side validation can be bypassed.

Two phases: **Phase 1 (Agent)** — static analysis, no browser. **Phase 2 (Human)** — browser security testing plan.

---

## Phase 1: Agent Security Sweep

Report findings with file, line, and severity: `🔴 CRITICAL` (exploitable), `🟡 WARNING` (potential weakness), `🔵 INFO` (defense-in-depth).

### 1.1 Collect Context

- Read `qa_agent_report.md` and `task.md` from `/to-qa`
- Run `git diff --name-only` to identify changed files
- Audit **changed files first**, then widen to adjacent modules

### 1.2 Broken Access Control (Backend)

For each controller/endpoint:
- [ ] `@UseGuards(AuthGuard('jwt'), RolesGuard)` present — missing = `🔴`
- [ ] `@Roles()` matches intended audience — wrong role = `🔴`
- [ ] `@Public()` only on truly public endpoints (login, register, health)
- [ ] Resource ownership verified — user A cannot access user B's data via UUID guessing
- [ ] Bulk endpoints validate ownership for **every** item

```
// turbo
grep -rn "@Public()" src/ --include="*.ts"
```

```
// turbo
grep -rn "@Controller" src/ --include="*.ts" | head -30
```

### 1.3 Broken Access Control (Frontend)

```
// turbo
grep -rn "path:" src/ --include="*.ts" -A2
```

- [ ] `canActivate` guard present for admin-only routes
- [ ] Direct URL navigation to admin routes blocked for standard users
- Unguarded admin routes = `🟡 WARNING`

### 1.4 Injection Vulnerabilities

**SQL Injection**:
```
// turbo
grep -rn "queryRunner.query\|\.query(" src/ --include="*.ts"
```
- [ ] Parameters use `$1, $2` placeholders, NOT string concatenation — concatenation = `🔴`
- [ ] `createQueryBuilder` uses `.setParameter()` or `:param` syntax

**XSS (Frontend)**:
```
// turbo
grep -rn "bypassSecurityTrust\|innerHTML\|\[innerHTML\]" src/ --include="*.ts"
```
- `bypassSecurityTrustHtml` or unguarded `innerHTML` = `🟡`

**NoSQL/ORM Injection**:
- [ ] TypeORM `find()` doesn't accept user-controlled `where` objects directly
- [ ] No `JSON.parse()` of user input passed to query conditions

### 1.5 DTO Validation

```
// turbo
grep -rn "@Body()" src/ --include="*.ts"
```

- [ ] Parameter uses a DTO class (not `any`) — `@Body() body: any` = `🔴`
- [ ] DTO uses `class-validator` decorators — missing = `🟡`
- [ ] `ValidationPipe` applied globally or per-endpoint
- [ ] Numeric inputs have `@Min`/`@Max`, strings have `@MaxLength`

### 1.6 AI Security

If AI/LLM modules exist:
- [ ] User input not concatenated into prompts — missing delimiters = `🔴`
- [ ] System instructions include anti-injection directives
- [ ] PII anonymized before sending to LLM — PII leak = `🟡`
- [ ] LLM responses sanitized before frontend rendering

### 1.7 Secrets & Infrastructure

```
// turbo
grep -rn "password\|secret\|apiKey\|token\|credential" src/ --include="*.ts" -i | grep -v "node_modules\|\.spec\." | head -20
```

- [ ] No hardcoded secrets in source — hardcoded production secret = `🔴`
- [ ] `.env` in `.gitignore`
- [ ] `environment.ts` contains no secrets
- [ ] `localStorage`/`sessionStorage` not storing tokens in plain text
- [ ] GCP service accounts use least-privilege roles — `Owner`/`Editor` = `🟡`

### 1.8 Dependencies

```
// turbo
npm audit --production
```

Run in both repos. Critical/High CVEs = `🔴`, Moderate = `🟡`, Low = `🔵`.

### 1.9 Auth & Sessions

- [ ] JWT has reasonable `expiresIn`
- [ ] Password hashing uses `bcrypt`/`argon2` with adequate rounds
- [ ] Password reset tokens are single-use and time-limited
- [ ] Login doesn't leak whether email exists

### 1.10 Generate Security Report

Create `security_audit_report.md` with: summary table (severity counts), findings (grouped by severity, each with file:line, OWASP category, description, exploitation steps, remediation), checks passed list, and an **Architectural Security Notes** section.

The **Architectural Security Notes** translate security findings into architectural language (seams, depth, locality) as the explicit handoff to `/improve-codebase-architecture`. Example: _"Authorization scattered across 12 controllers → centralized policy module would reduce attack surface."_

If `🔴 CRITICAL` findings exist, **stop and fix them** before Phase 2.

---

## Phase 2: Human Security Testing Plan

Generate `security_human_plan.md` for browser-based testing. Include:

**Scenario 1 — Access Control Bypass**: Log in as USER, type admin URLs directly, verify redirect/403. Then use curl with USER's JWT against admin API endpoints, verify 403.

**Scenario 2 — Injection Attempts**: Enter `<script>alert(1)</script>` in text fields (verify escaped), `' OR 1=1 --` in search (verify no leak), overflow values in numeric fields (verify bounded).

**Scenario 3 — Session Security**: Verify expired JWT returns 401, logout invalidates token, no sensitive data in Network tab or localStorage.

Each scenario uses a step/action/expected-result table. End with a sign-off checklist.

Present the artifact highlighting: scenario count, highest-risk items, and how Architectural Security Notes feed into `/improve-codebase-architecture`.

---

## Guardrails

- **Zero Trust**: If Backend doesn't check the role, it's a vulnerability.
- **Scope**: Changed files first, then adjacent modules. Stay within workspace.
- **Traceability**: Every finding points to a specific file and line.
- **No Browser**: Agent checks are static only. Browser testing is the human's job.
- **Pipeline**: Consume `/to-qa` artifacts. Produce artifacts for `/improve-codebase-architecture`.

## Checklist

```
[ ] Phase 1: Context collected from /to-qa artifacts
[ ] Phase 1: Access control checks done (backend + frontend)
[ ] Phase 1: Injection checks done (SQL, XSS, NoSQL)
[ ] Phase 1: DTO validation verified
[ ] Phase 1: AI security reviewed (if applicable)
[ ] Phase 1: Secrets and infrastructure scanned
[ ] Phase 1: npm audit run
[ ] Phase 1: Auth & session reviewed
[ ] Phase 1: Security report artifact created with Architectural Notes
[ ] Phase 1: No CRITICAL findings remain
[ ] Phase 2: Human plan covers access control, injection, and session tests
[ ] Phase 2: Human security plan artifact created and presented
```

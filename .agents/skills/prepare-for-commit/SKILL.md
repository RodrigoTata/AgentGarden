---
name: prepare-for-commit
description: Synthesize codebase changes into README.md and docs.md, check git status, and propose a conventional commit message.
---

# Empacar (Pack & Document)

**Empacar** is the process of synthesizing the development **delta** since the last commit into clean, developer-facing documentation, leaving the workspace ready for commit.

> [!IMPORTANT]
> **Do NOT interview the user.** Derive all changes from git status/diff, codebase files, and session history.

---

## Process

### Step 1 — Analyze Delta
Inspect the workspace to determine all additions, modifications, and removals.
- Run `git status` to locate modified, staged, or untracked files.
- Run `git diff HEAD` to extract exact code changes.
- Identify new features, bug fixes, database schema updates, or configuration shifts.
- Keep the project's domain vocabulary (e.g., use "Dispensación" instead of "order").

**Completion criterion**: A bulleted summary of all code changes using the project's exact domain terminology.

---

### Step 2 — Update README.md
Ensure `README.md` matches the updated codebase layout and feature set by following [README-FORMAT.md](README-FORMAT.md):
- **Features**: Update/add bullets for newly complete features.
- **Tech Stack**: Update dependencies if changed.
- **Project Structure**: Update directory mappings in `src/` if changed.
- **Endpoints**: Document new API routes.
- **Workflows**: List any new `.agent/workflows/` skills.

**Completion criterion**: A saved `README.md` containing only accurate, non-marketing technical updates.

---

### Step 3 — Update docs.md
Ensure `docs.md` guides future maintainers through the technical architecture by following [DOCS-FORMAT.md](DOCS-FORMAT.md):
- **Architecture & Design**: Document new layers, patterns (e.g., guards, strategies), or module boundaries.
- **Data Flows & Models**: Detail schema updates (columns, relations, enums) and end-to-end flows.
- **External Integrations**: Document new SDKs or third-party service connections.

**Completion criterion**: A saved `docs.md` with dense, technical documentation of all design and model changes.

---

### Step 4 — Stage for Commit
Prepare the commit command for manual execution.
1. Run `git status` to output a clean overview of modified files.
2. Formulate a conventional commit message:
   ```
   <type>(<scope>): <short summary>

   <optional body describing technical changes and architecture delta>
   ```
   *Types*: `feat`, `fix`, `refactor`, `docs`, `chore`, `test`.  
   *Scope*: The specific module/domain (e.g., `dispensacion`, `planta`).

> [!CAUTION]
> **Do NOT run `git add` or `git commit` automatically.** Only output the proposed command in a code block.
> **Do NOT include any AI attribution, model names, or co-authorship trailers.** The message must remain 100% human-facing and professional.

**Completion criterion**: `git status` output displayed and the proposed conventional commit command printed in a copyable code block, strictly free of any AI signatures or co-authorship trailers.

---

## Guardrails
- **No draft features**: Do not document experimental or incomplete changes.
- **No speculation**: Only document verifiable code and designs present in the workspace.
- **ABSOLUTE PROHIBITION of AI Co-Authorship & Model Trailers**:
  Under NO circumstances may the commit message include trailers, tags, signatures, or mentions of AI assistants, models, or vendor providers:
  - ❌ **STRICTLY FORBIDDEN**:
    - `Co-authored-by: Claude <noreply@anthropic.com>` or any other `Co-authored-by:` line.
    - Mentions of models: *"hecho con Gemini 3.8 Flash"*, *"hecho con Claude Opus 5.5 (medium)"*, *"GPT-4"*, etc.
    - Mentions of vendors or platforms: *"Anthropic"*, *"Google"*, *"OpenAI"*, *"Antigravity"*, etc.
    - Phrases such as *"Generated with..."*, *"Assisted by..."*, *"AI-generated"*, etc.
  - ✅ **MANDATORY**:
    - Commit messages must follow standard Conventional Commits (`type(scope): summary`).
    - The commit body must describe strictly technical business/code rationale.

# Claude Code — reglas del proyecto

La fuente de verdad de las reglas es `.agents/rules/` (compartida con Gemini y otros agentes).
Edita las reglas allí; este archivo solo las importa. No dupliques reglas aquí.

Notas para Claude Code:
- Menciones a herramientas de otros agentes (`list_dir`, `view_file`, `grep_search`, `ask_question`) equivalen a Glob/Read/Grep/AskUserQuestion.
- El conteo de tokens en contexto lo muestra la status line; no lo reportes al final de cada respuesta.

@.agents/AGENTS.md
@.agents/rules/coding-auth.md

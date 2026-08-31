# AgentGarden

Colección de habilidades (skills) y recursos estandarizados para extender las capacidades de los agentes de IA en Antigravity.

## Características Clave

- **Estandarización de Skills**: Estructura homogénea basada en `SKILL.md` con metadatos en YAML frontmatter e instrucciones técnicas.
- **Flujos de Trabajo Especializados**: Habilidades enfocadas en arquitectura, revisión de código, TDD, depuración, formateo de repositorios, seguridad y documentación.
- **Portabilidad de Reglas**: Estructura compatible con el directorio `.agents/skills/` en la raíz de cualquier repositorio.

## Estructura del Proyecto

```
.agents/
└── skills/
    ├── agile-prototype/
    ├── bpmn-diagram/
    ├── business-implementation-plan/
    ├── code-review/
    ├── codebase-design/
    ├── context-compactor/
    ├── context-extractor/
    ├── cyber-audit/
    ├── debug/
    ├── devsecops-review/
    ├── diagnosing-bugs/
    ├── domain-modeling/
    ├── entity-diagram-analysis/
    ├── execute/
    ├── frontend-analysis/
    ├── generate-html-doc/
    ├── grill-me-rg/
    ├── grill-with-docs/
    ├── handoff/
    ├── improve-codebase-architecture/
    ├── prepare-for-commit/
    ├── quotation-for/
    ├── repo-format/
    ├── research/
    ├── reverse-engineering/
    ├── tdd/
    ├── teach/
    ├── to-qa/
    ├── to-spec/
    ├── to-tickets/
    ├── wayfinder/
    ├── web-audit/
    └── writing-great-skills/
skills-to-review/
├── ask-matt/
├── cotizador-casas/
├── cotizador-departamentos/
└── teach/
docs/
└── guia-metodologia-kanban-planner-agentes.md # Marco ágil de trabajo y gobernanza
scripts/
└── planner_client.js                          # Cliente CLI para Microsoft Graph / Planner
```

## Habilidades en Revisión (Skills to Review)

| Skill | Descripción |
|---|---|
| **cotizador-departamentos** | Búsqueda, auditoría y cotización de departamentos residenciales con enlaces 100% verificados (HTTP 200), isócronas urbanas (10/20m pie, 5/15/30m auto, metro), amortización cuota a cuota en UF y CLP, Scorecard 0-10 y reporte HTML. |
| **cotizador-casas** | Valuación y cotización inmobiliaria residencial — análisis de entorno e isócronas (10/20m pie, 5/15/30m auto, metro), amortización hipotecaria cuota a cuota, Scorecard 0-10 y reporte HTML. |
| **ask-matt** | Entrevista y asesoría especializada basada en perfiles y criterios expertos. |



## Habilidades Disponibles (Skills)

| Skill | Descripción |
|---|---|
| **agile-prototype** | Planificación y ejecución ágil de iteraciones de prototipos (MKI, MKII) para hardware o software. |
| **bpmn-diagram** | Generación de diagramas de procesos de negocio BPMN 2.0 en HTML interactivo con bpmn-js (Camunda ref). |
| **business-implementation-plan** | Transformación de ideas de negocio en planes de implementación estructurados con costeo (Landed Cost), unit economics y hoja de ruta. |
| **code-review** | Revisión de código basada en estándares del repositorio y especificaciones del PR. |
| **codebase-design** | Vocabulario y patrones para el diseño de módulos profundos e interfaces limpias. |
| **context-compactor** | Compactación del historial de conversación en puntos de control minimalistas. |
| **context-extractor** | Extracción y digestión estructurada de documentos binarios (PDF, Excel, Word, PPT, CSV) a un almacén RAG local optimizado en tokens. |
| **cyber-audit** | Auditorías de seguridad y listas de verificación de vulnerabilidades. |
| **debug** | Triaje y diagnóstico de errores reportados en lenguaje natural. |
| **devsecops-review** | Verificaciones de seguridad DevSecOps y reporte en formato HTML + Markdown. |
| **diagnosing-bugs** | Ciclo sistemático de diagnóstico para fallas complejas y degradación de rendimiento. |
| **domain-modeling** | Definición del modelo de dominio, lenguaje ubicuo y decisiones de arquitectura (ADRs). |
| **entity-diagram-analysis** | Análisis de diagramas de entidades y relaciones. |
| **execute** | Ejecución autónoma de PRDs/planes encadenando `to-tickets`, `tdd` y `to-qa` sin intervención humana (con registro de ejecución). |
| **frontend-analysis** | Análisis y mapeo de interfaces complejas (Cockpit / Digital Twin) generando guías visuales en HTML. |
| **generate-html-doc** | Generación de documentos HTML estructurados e interactivos (instructivos, guías, manuales, reportes). |
| **grill-me-rg** | Entrevista interactiva para afinar planes y resolver decisiones de diseño. |
| **grill-with-docs** | Entrevista intensiva de diseño generando ADRs y glosario en el proceso. |
| **handoff** | Compactación de la sesión en un documento de traspaso para continuidad entre agentes. |
| **improve-codebase-architecture** | Evaluación y propuestas de mejora para la arquitectura del sistema. |
| **prepare-for-commit** | Sintetiza deltas en la documentación y prepara la propuesta de commit convencional. |
| **quotation-for** | Búsqueda y comparación de cotizaciones de productos/servicios en el mercado (por defecto Chile). |
| **repo-format** | Formatea o estructura repositorios según estándares de ingeniería de software (scaffold/tidy). |
| **research** | Investigación técnica en segundo plano consultando fuentes primarias oficiales. |
| **reverse-engineering** | Análisis e ingeniería inversa sistemática de productos físicos o servicios de software para guiar nuevos desarrollos. |
| **tdd** | Desarrollo guiado por pruebas (red-green-refactor) y estrategias de mocking/testing. |
| **teach** | Flujos educativos, rutas de aprendizaje, misiones y registros de avance. |
| **to-qa** | Verificaciones de QA automatizado y planificación de pruebas manuales. |
| **to-spec** | Transformación de requerimientos o ideas en especificaciones técnicas detalladas (PRD/Spec). |
| **to-tickets** | Desglose de especificaciones en tareas, tickets e issues accionables. |
| **wayfinder** | Mapeo y gestión de iniciativas complejas divididas en mapas de tickets de decisión. |
| **web-audit** | Auditoría y análisis completo de sitios web. |
| **writing-great-skills** | Guía de buenas prácticas para redactar y empaquetar nuevas habilidades. |

---

Developed by Tata Deli Labs.

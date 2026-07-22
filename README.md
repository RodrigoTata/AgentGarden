# AgentGarden

Colección de habilidades (skills) y recursos estandarizados para extender las capacidades de los agentes de IA en Antigravity.

## Características Clave

- **Estandarización de Skills**: Estructura homogénea basada en `SKILL.md` con metadatos en YAML frontmatter e instrucciones técnicas.
- **Flujos de Trabajo Especializados**: Habilidades enfocadas en arquitectura, revisión de código, TDD, depuración, seguridad y documentación.
- **Portabilidad de Reglas**: Estructura compatible con el directorio `.agents/skills/` en la raíz de cualquier repositorio.

## Estructura del Proyecto

```
.agents/
└── skills/
    ├── bpmn-diagram/
    ├── code-review/
    ├── codebase-design/
    ├── context-compactor/
    ├── cyber-audit/
    ├── debug/
    ├── devsecops-review/
    ├── diagnosing-bugs/
    ├── domain-modeling/
    ├── entity-diagram-analysis/
    ├── grill-me-rg/
    ├── grill-with-docs/
    ├── improve-codebase-architecture/
    ├── prepare-for-commit/
    ├── tdd/
    ├── teach/
    ├── to-qa/
    ├── to-spec/
    ├── to-tickets/
    ├── wayfinder/
    └── writing-great-skills/
```

## Habilidades Disponibles (Skills)

| Skill | Descripción |
|---|---|
| **bpmn-diagram** | Generación de diagramas de procesos de negocio BPMN 2.0 en HTML interactivo con bpmn-js (Camunda ref). |
| **code-review** | Revisión de código basada en estándares del repositorio y especificaciones del PR. |
| **codebase-design** | Vocabulario y patrones para el diseño de módulos profundos e interfaces limpias. |
| **context-compactor** | Compactación del historial de conversación en puntos de control minimalistas. |
| **cyber-audit** | Auditorías de seguridad y listas de verificación de vulnerabilidades. |
| **debug** | Triaje y diagnóstico de errores reportados en lenguaje natural. |
| **devsecops-review** | Verificaciones de seguridad DevSecOps y reporte en formato HTML. |
| **diagnosing-bugs** | Ciclo sistemático de diagnóstico para fallas complejas y degradación de rendimiento. |
| **domain-modeling** | Definición del modelo de dominio, lenguaje ubicuo y decisiones de arquitectura (ADRs). |
| **entity-diagram-analysis** | Análisis de diagramas de entidades y relaciones. |
| **grill-me-rg** | Entrevista interactiva para afinar planes y resolver decisiones de diseño. |
| **grill-with-docs** | Entrevista intensiva de diseño generando ADRs y glosario en el proceso. |
| **improve-codebase-architecture** | Evaluación y propuestas de mejora para la arquitectura del sistema. |
| **prepare-for-commit** | Sintetiza deltas en la documentación y prepara la propuesta de commit convencional. |
| **tdd** | Desarrollo guiado por pruebas (red-green-refactor) y estrategias de mocking/testing. |
| **teach** | Flujos educativos, rutas de aprendizaje, misiones y registros de avance. |
| **to-qa** | Verificaciones de QA automatizado y planificación de pruebas manuales. |
| **to-spec** | Transformación de requerimientos o ideas en especificaciones técnicas detalladas (PRD/Spec). |
| **to-tickets** | Desglose de especificaciones en tareas, tickets e issues accionables. |
| **wayfinder** | Mapeo y gestión de iniciativas complejas divididas en mapas de tickets de decisión. |
| **writing-great-skills** | Guía de buenas prácticas para redactar y empaquetar nuevas habilidades. |

---

Developed by Tata Deli Labs.

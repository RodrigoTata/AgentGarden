# Guía de Arquitectura

## Arquitectura General

AgentGarden es un repositorio de habilidades (*skills*) modulares diseñado para agentes de IA. La estructura del repositorio sigue el estándar de la plataforma Antigravity, organizando cada habilidad en un directorio independiente dentro de `.agents/skills/`.

Cada directorio de habilidad contiene de forma obligatoria un archivo principal `SKILL.md` que combina metadatos YAML frontmatter con instrucciones paso a paso en formato Markdown.

## Patrones de Diseño

### 1. Skill Encapsulado
- **Definición**: Cada habilidad se encuentra en su propia carpeta en `.agents/skills/<skill-name>/`.
- **Contrato**: El archivo `SKILL.md` especifica obligatoriamente los campos `name` y `description` en el encabezado YAML.
- **Recursos Adicionales**: Las habilidades complejas pueden incluir carpetas especializadas como `scripts/` (utilitarios), `references/` (documentación complementaria) o `resources/` (plantillas).

### 2. Flujo de Ejecución por Pasos
- Las habilidades estructuran su proceso mediante pasos numerados claros, definiendo un **Criterio de finalización** (*Completion criterion*) para cada etapa.
- Se implementan barreras de protección (*Guardrails*) para prevenir acciones destructivas o cambios no autorizados.

### 3. Dualidad de Ejecución (Orquestación vs. Standalone)
- Las habilidades de evaluación compleja (`cotizador-departamentos`, `cotizador-casas`) admiten dos modalidades operacionales:
  - **Modo Orquestación**: Delegan la prospección en `/research` y la maquetación visual en `/generate-html-doc`.
  - **Modo Standalone**: Ejecutan consultas web directas, validaciones financieras y ensamblado HTML inline de forma 100% autónoma.

### 4. Integridad y Verificación Activa de Enlaces
- Protocolo de validación técnica en tiempo real mediante consultas HTTP (`200 OK`) previo a la consolidación de reportes, previniendo redirecciones canónicas a buscadores o pantallas de error 404.

## Estructura de Directorios

- `.agents/skills/`: Directorio raíz de almacenamiento de todas las habilidades disponibles y activas en el repositorio.
- `.agents/skills/<skill-name>/SKILL.md`: Punto de entrada interpretado por el agente para ejecutar el flujo de trabajo.
- `skills-to-review/`: Directorio de incubación y revisión preliminar para nuevas habilidades antes de su incorporación a `.agents/skills/`.


---

Developed by Tata Deli Labs.

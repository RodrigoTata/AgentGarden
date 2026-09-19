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

### 5. Motor de Asesoría Secuencial e Interrogación Interactiva (Grill-Me Integrado)
- Implementado en habilidades de formulación estratégica (`business-implementation-plan`, `grill-with-docs`).
- **Protocolo de Interacción**: Formula una sola pregunta a la vez estructurada con dos alternativas explícitas (Opción recomendada con justificación técnica/financiera vs. Opción alternativa con sus implicancias y trade-offs), consolidando hitos acordados antes de avanzar de fase.

### 6. Modelado Financiero y Cascada de Costos (Landed Cost & Unit Economics)
- Estandarización de cálculos para costeo de importación, distribución y retail:
  - Cascada de costeo internacional: Valor FOB $\rightarrow$ Valor CIF $\rightarrow$ Derechos Aduaneros Ad-Valorem ($6\%$) $\rightarrow$ Landed Cost Unitario.
### 7. Manipulación Segura de Binarios y Control de Bloqueos (Win32 Shared Access & Safe-Write)
- Implementado en `excel-assist` (`scripts/safe_excel.py`).
- **Problema que resuelve**: Los agentes de IA suelen fallar con errores de permisos (`Errno 13` / `Error 32: The process cannot access the file because it is being used by another process`) cuando el usuario mantiene abierto un archivo en Microsoft Excel o cliente de sincronización OneDrive.
- **Implementación**:
  - **Shared-Read en Memoria**: Bypassea bloqueos exclusivos utilizando llamadas Win32 API (`CreateFileW`) con flags de compartición `FILE_SHARE_READ | FILE_SHARE_WRITE | FILE_SHARE_DELETE`, leyendo el binario a un buffer `io.BytesIO` sin forzar el cierre del aplicativo cliente.
  - **Detección Atómica de Escritura (`check_write_lock`)**: Verifica la disponibilidad del descriptor antes de persistir, conmutando a archivos temporales de transición (`_temp.xlsx`) si el archivo está en edición activa por el usuario.

### 8. Living-Report Pattern (Reporte Evolutivo Sincronizado)
- Documento Markdown persistente (`docs/diagnostico-y-mejora-<nombre>.md`) que actúa como fuente única de verdad en auditorías de datos.
- A diferencia de reportes estáticos, se actualiza en tiempo real en cada ciclo de toma de decisiones del usuario y tras cada mutación confirmada en disco, manteniendo trazabilidad completa de normalizaciones taxonómicas, conversiones de tipo y semáforos ejecutivos.

### 7. Orquestación de la Tríada de Prototipado Físico (`start-a-proyect`)
- **Definición**: Orquestador integral para ingeniería de hardware, carpintería, cerramientos bioclimáticos y dispositivos IoT.
- **Tríada de Entregables**:
  1. *Gemelo Digital 3D Interactivo* (`interactive-3d-structure`): Modelo espacial autónomo con referencias direccionales y cotas métricas.
  2. *Cubicación, Sourcing y BOM Veteado* (`quotation-for`): Análisis de merma, optimización de cortes comerciales (piezas de 3.2m / rollos) y comparación de 3 opciones locales (Chile: Mercado Libre, Sodimac, Easy).
  3. *Manual de Montaje e Instructivo de Campo* (`generate-html-doc` + `agile-prototype`): Protocolo procedural paso a paso, seguridad EPP, checklist de QA y versionado por Marks (MKI, MKII).

### 8. Módulo Profundo y Costura Paramétrica en Gemelos Digitales 3D (`interactive-3d-structure`)
- **Costura Declarativa (`STRUCTURE_SPEC`)**: La física, piezas, escuadrías de madera, mallas técnicas, herrajes y vanos residen en un objeto de configuración desacoplado del motor gráfico.
- **Motor Gráfico Autónomo (`Structure3DEngine`)**: Three.js autónomo vía CDN en HTML único (cero compiladores locales). Incluye gizmo de brújula corner cube sincronizado, rosa de los vientos en el suelo, cotas interactivas en los 3 ejes y escala humana (1.75m).

### 9. Motor Dual-Theme y Aislamiento Estricto de Impresión (`generate-html-doc` & `writing-great-skills`)
- **Estándar Visual**: Todo documento HTML interactivo se renderiza en pantalla por defecto en **Modo Noche (Dark Glassmorphic)** con paleta grafito `#070b14`, tarjetas translúcidas y acentos de alto contraste.
- **Alternador Persistente**: Botón `☀️ Modo Claro / 🌙 Modo Noche` sincronizado en `localStorage`.
- **Aislamiento para Impresión (`@media print`)**: Anula forzosamente los fondos oscuros a blanco puro (`#ffffff`) y tipografía a negro (`#000000`), ocultando barras de herramientas (`.no-print`) para evitar consumo innecesario de tinta en papel o PDF.

### 10. Cabecera Estándar de Suite Interconectada (`.top-bar`)
- **Contrato de Navegación**: Todo documento entregable de un proyecto incorpora una barra superior sticky con identidad gráfica (`.brand`) y botones de acción rápida (`.top-actions`) enlazando directamente al visor 3D, cotización y manual instructivo, garantizando navegación bidireccional inmediata.

## Estructura de Directorios

- `.agents/skills/`: Directorio raíz de almacenamiento de todas las habilidades disponibles y activas en el repositorio.
- `.agents/skills/<skill-name>/SKILL.md`: Punto de entrada interpretado por el agente para ejecutar el flujo de trabajo.
- `.agents/skills/<skill-name>/references/`: Documentos de referencia técnica, guías normativas y fórmulas de soporte para la ejecución de la habilidad.
- `prototypes/`: Directorio de almacenamiento de prototipos interactivos, gemelos digitales 3D, dossiers técnicos y manuales de montaje HTML.
- `skills-to-review/`: Directorio de incubación y revisión preliminar para nuevas habilidades antes de su incorporación a `.agents/skills/`.

---

Developed by Tata Deli Labs.

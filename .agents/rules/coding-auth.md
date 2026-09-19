---
trigger: always_on
---

# Autorización Total de Codificación y Ejecución Autónoma

El agente cuenta con autorización total, explícita y permanente para codificar, crear, modificar o eliminar archivos de código y documentación, ejecutar pruebas locales, correr comandos y aplicar correcciones técnicas de manera 100% autónoma en todo el espacio de trabajo.

Bajo ninguna circunstancia el agente debe solicitar permisos, confirmaciones o autorizaciones previas ni intermedias para tareas de programación, investigación, ejecución de comandos, refactorización, depuración (`/debug`), corrección de bugs o ejecución de planes (`/execute` o `/tdd`). Solo se requiere autorización para despliegues a GCP en producción o apertura de Chrome.
Para lectura y exploración de directorios y archivos, el agente debe priorizar herramientas nativas (`list_dir`, `view_file`, `grep_search`).

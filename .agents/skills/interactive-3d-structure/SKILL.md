---
name: interactive-3d-structure
description: Genera representaciones 3D interactivas en HTML autónomo (Three.js) para estructuras, cubicaciones de madera, perfiles, chasis o prototipos físicos. Usar cuando el usuario pida visualizar una estructura en 3D, modelar una cubicación de carpintería, construir un visor 3D en el navegador o generar un gemelo digital interactivo con cotas y orientación cardinal.
---

# Interactive 3D Structure Generator

Genera modelos tridimensionales interactivos en un archivo HTML autónomo (cero dependencias locales, ejecutado directamente en el navegador vía Three.js desde CDN). Aplica los principios de [codebase-design](file:///c:/dev/AgentGarden/.agents/skills/codebase-design/SKILL.md) (**deep modules**, **seams** desacoplados y configuración declarativa) para garantizar que la estructura sea manipulable, contenga referencias direccionales claras (brújula/gizmo y orientación cardinal) y pueda ser iterada o modificada con facilidad.

---

## 1. Architectural Seams & Deep Module (`codebase-design`)

El archivo HTML generado debe estructurarse como un **módulo profundo**:
- **Seam Declarativo (`STRUCTURE_SPEC`)**: Toda la física de la estructura (dimensiones globales, lista de piezas/maderos con sus escuadrías, postes, vigas, pendientes, mallas, herrajes y puerta) reside en un objeto JSON/JS plano en la cabecera del script. Cambiar una dimensión o agregar una pieza se realiza exclusivamente en este seam, sin tocar el código WebGL.
- **Implementación Profunda (`Structure3DEngine`)**: El motor de renderizado, materiales PBR de madera/metal/malla, luces de estudio, sombras suaves, controles orbitales, gizmo de orientación, cotas de dimensión y filtro de capas quedan ocultos tras una interfaz mínima (`init()`, `update()`, `toggleLayer()`, `resetCamera()`).

---

## 2. Process

### Step 1 — Structural Decomposition & Seam Specification
Traduce la cubicación o descripción del usuario a un esquema paramétrico estructurado:
1. **Dimensiones Globales**: Ancho ($X$), Fondo ($Z$), Altura Frontal ($Y_{\text{front}}$), Altura Trasera ($Y_{\text{back}}$) para calcular la pendiente de caída de aguas.
2. **Taxonomía de Piezas (BOM)**:
   - *Soleras / Chasis de Base*: Elementos perimetrales e interiores de apoyo y lastre.
   - *Pilares y Postes*: Ubicación 3D $(x, y, z)$, sección comercial (ej. 2×4", 3×3") y altura de corte.
   - *Vigas y Costaneras de Techo*: Inclinación angular y espaciado de soporte.
   - *Arriostramientos*: Tornapuntas a 45° en las esquinas de mayor solicitación eólica.
   - *Listones Tapajuntas y Herrajes*: Escuadras metálicas en encuentros críticos y fijaciones.
   - *Cerramientos Flexibles*: Mallas perimetrales (anti-insectos), malla de techumbre (sombra/Aluminet) y vano de acceso (puerta enrollable).
3. **Calzos y Aislamiento**: Separadores de apoyo (ej. neopreno) que elevan el chasis sobre el suelo o losa.

*Completion criterion*: Objeto `STRUCTURE_SPEC` completo con todas las piezas mapeadas a coordenadas paramétricas relativas al origen $(0,0,0)$.

---

### Step 2 — Procedural Assembly & PBR Materials
Construye la geometría procedural en Three.js con identidad visual distintiva para cada subsistema:
1. **Maderas**: `MeshStandardMaterial` con tonos cálidos de madera tratada con Lasur exterior (tono roble/teca mate con rugosidad `roughness: 0.75`), biselado sutil y bordes delineados (`LineSegments` tipo wireframe tenue) para distinguir cada escuadría individual.
2. **Mallas Translúcidas**: `MeshStandardMaterial` con `transparent: true`, `opacity: 0.35` a `0.55`, doble cara (`side: THREE.DoubleSide`) y textura procedural o micro-rejilla para apreciar la estructura interior a través de la cobertura.
3. **Herrajes y Escuadras**: Acabado metálico galvanizado (`metalness: 0.85`, `roughness: 0.25`) ubicados en las uniones de vigas y postes.
4. **Kit de Puerta Enrollable**: Paño frontal diferenciado con marco de velcro/reata y tubo contrapeso inferior de PVC.

*Completion criterion*: Grupo raíz `THREE.Group` con todos los elementos instanciados, agrupados en subsistemas con tags de capa (`layer: 'wood' | 'mesh' | 'hardware' | 'door' | 'dimensions'`).

---

### Step 3 — Spatial Orientation & Directional References
Garantiza que el observador nunca pierda la orientación espacial:
1. **Orientation Gizmo (Corner Compass Cube)**:
   - Un sub-visor secundario o canvas superpuesto en la esquina superior derecha que sincroniza la rotación de la cámara principal.
   - Etiquetas claras: **Norte (N)**, **Sur (S)**, **Este (E)**, **Oeste (O)**, **Cenit (+Y)** y vistas ortogonales clickeables.
2. **Rosa de los Vientos en Suelo**:
   - Sobre la losa o plano de tierra, traza el norte cardinal referencial y una cuadrícula tenue (grid) con gradación métrica (cada 0.5m / 1.0m).
3. **Cotas de Dimensión 3D (Measurement Lines)**:
   - Líneas de cota con flechas y texto flotante HTML/Canvas que indican las dimensiones principales (ej. `3.00 m`, `2.00 m`, `2.25 m`, `2.00 m`).
4. **Figura de Escala Humana**:
   - Silueta esquemática estilizada de 1.75 m de altura próxima al vano de acceso para transmitir escala y proporción ergonómica inmediata.

*Completion criterion*: Brújula/gizmo funcional en pantalla, rosa de los vientos en el plano de suelo y cotas visibles en los 3 ejes cartesianos.

---

### Step 4 — Interactive Controls & Exploration Suite
Equipa el HTML con herramientas de inspección fluida:
1. **OrbitControls**: Rotación con botón izquierdo, paneo con botón derecho, zoom con rueda del mouse, rotación restringida sobre el horizonte (`maxPolarAngle: Math.PI / 2 + 0.05`).
2. **Cámaras Predefinidas (Quick Views)**:
   - Botones rápidos: *Isométrica*, *Fachada (Frontal)*, *Trasera*, *Lateral Izquierdo*, *Lateral Derecho*, *Planta (Techo)*.
3. **Filtro de Capas (Layer Toggles)**:
   - Checkboxes interactivos para encender/apagar:
     - `[✓] Estructura Madera`
     - `[✓] Cobertura Mallas (Paredes y Techo)`
     - `[✓] Herrajes y Escuadras`
     - `[✓] Puerta y Accesos`
     - `[✓] Cotas de Medida`
4. **Modos de Render**:
   - Botón de alternancia: *Sólido Natural*, *Modo Rayos X (Mallas Transparentes)* y *Wireframe Estructural*.
5. **Inspección de Piezas (Hover/Click Tooltip)**:
   - Al pasar el cursor sobre cualquier elemento de madera o herraje, se resalta y despliega una ficha técnica con su denominación en la cubicación (ej. *"Solera Base Pino 2×4” × 3.0 m"* o *"Pilar Trasero Pino 2×4” × 2.25 m"*).

*Completion criterion*: Barra de herramientas superior/lateral totalmente operativa sin errores en consola JS.

---

### Step 5 — Standalone Packaging & Verification
Empaqueta todo el visor en un único archivo `.html`:
1. Utiliza Three.js moderno mediante `<script type="importmap">` apuntando a CDNs confiables (ej. `unpkg.com` o `cdnjs.cloudflare.com` con `three` y `three/addons/controls/OrbitControls.js`).
2. Sin dependencias de compilación ni bundlers: doble clic y abre directamente en Google Chrome, Edge o Firefox.
3. Diseño visual premium: tipografía Inter, tema oscuro grafito moderno (`#0f172a`), iluminación de tres puntos (luz solar simulada, luz de relleno ambiental y reflejos tenues).

*Completion criterion*: Archivo `.html` escrito mediante `write_to_file`. Apertura verificada con renderizado 3D fluido a 60 FPS.

---

## 3. Progressive Disclosure

Para consultar la plantilla base completa de Three.js, el shader de rejilla, el algoritmo de corte procedural de maderas y el visor de orientación secundario, consulta:
- [REFERENCE.md](REFERENCE.md) — Plantilla maestra, matemáticas del gizmo y catálogo de materiales.

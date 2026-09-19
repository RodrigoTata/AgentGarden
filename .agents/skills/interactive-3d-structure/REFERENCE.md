# Technical Reference: Interactive 3D Structure Viewer

Guía de referencia técnica para implementar visores 3D autónomos en HTML basados en Three.js con arquitectura de módulo profundo ([codebase-design](file:///c:/dev/AgentGarden/.agents/skills/codebase-design/SKILL.md)).

---

## 1. Importmap & Zero-Install Modern Three.js Stack

Para garantizar que el archivo HTML se ejecute de forma inmediata sin bundlers ni servidores Node.js, utiliza el estándar nativo de importmaps:

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.160.0/build/three.module.js",
    "three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/"
  }
}
</script>
```

Módulos requeridos:
- `three`: Motor principal de escena, geometrías, materiales y renderizador WebGL.
- `three/addons/controls/OrbitControls.js`: Manipulación con mouse/touch (rotación, zoom, paneo con inercia).
- `three/addons/renderers/CSS2DRenderer.js`: Etiquetas HTML en el espacio 3D para cotas métricas y nombres de piezas (opcional o reemplazable por sprites 2D de alta nitidez).

---

## 2. Declarative Seam Schema (`STRUCTURE_SPEC`)

La regla cardinal de diseño es desacoplar los datos de la estructura del motor 3D:

```javascript
const STRUCTURE_SPEC = {
  metadata: {
    nombre: "Sombreadero y Chasis Lastrado para Azotea",
    dimensiones: { ancho: 3.0, fondo: 2.0, altoFrente: 2.0, altoAtras: 2.25 },
    orientacionFrente: "SUR", // Hacia dónde mira la fachada/puerta
    unidad: "metros"
  },
  piezasMadera: [
    // Soleras base
    { id: "solera-trasera", nombre: "Solera Base Trasera", seccion: [0.09, 0.041], largo: 3.0, pos: [0, 0.02, -1.0], rot: [0, 0, 0], tag: "base" },
    { id: "solera-frontal", nombre: "Solera Base Frontal", seccion: [0.09, 0.041], largo: 3.0, pos: [0, 0.02, 1.0], rot: [0, 0, 0], tag: "base" },
    // Postes verticales
    { id: "poste-trasero-izq", nombre: "Pilar Trasero Izquierdo", seccion: [0.09, 0.041], largo: 2.25, pos: [-1.5, 1.125, -1.0], rot: [0, 0, 0], tag: "pilar" },
    // ...
  ],
  mallas: [
    { id: "malla-techo", nombre: "Malla Sombra 50% Techumbre", tipo: "sombra", vertices: [...], opacidad: 0.45, color: "#22c55e" },
    { id: "malla-perimetro", nombre: "Malla Anti-Trips 50 Mesh", tipo: "insectos", opacidad: 0.30, color: "#e2e8f0" }
  ],
  herrajes: [
    { id: "escuadra-e1", tipo: "escuadra-reforzada", pos: [-1.45, 0.05, -0.95], escala: 0.08 }
  ]
};
```

---

## 3. Directional Reference Systems (Brújula y Gizmo 3D)

### A. Gizmo de Orientación Secundario (Corner Viewport)
Un viewport pequeño o escena sincronizada en la esquina superior derecha (`width: 120px, height: 120px`) que renderiza una cajita o ejes con las letras **N**, **S**, **E**, **O**, **Cenit (+Y)**.

```javascript
function updateGizmo(mainCamera, gizmoCamera, gizmoRenderer, gizmoScene) {
  // Copiar la rotación de la cámara principal manteniendo distancia fija
  gizmoCamera.position.copy(mainCamera.position);
  gizmoCamera.position.sub(controls.target);
  gizmoCamera.position.setLength(3.5);
  gizmoCamera.lookAt(0, 0, 0);
  gizmoRenderer.render(gizmoScene, gizmoCamera);
}
```

### B. Rosa de los Vientos en Suelo
Un disco con marcas cardinales y aguja norte (`N` en color esmeralda/rojo) proyectada en el plano $Y=0$, orientada con el frente del proyecto:
- Eje $-Z$: **Norte (N)**
- Eje $+Z$: **Sur (S)** (Fachada de acceso)
- Eje $+X$: **Este (E)**
- Eje $-X$: **Oeste (O)**

---

## 4. Materials & Aesthetics Tuning

1. **Madera Estructural Tratada (Lasur)**:
   - Base Color: `#c29b68` a `#a67c52` con variación sutil por pieza para evitar monotonía.
   - `roughness: 0.72`, `metalness: 0.05`.
   - Wireframe overlay tenue (`color: #5c4033`, `opacity: 0.25`) para destacar las aristas de corte y ensamble.

2. **Malla Sombra / Anti-insectos**:
   - `transparent: true`, `opacity: 0.38`.
   - `depthWrite: false` (o orden de renderizado controlado) para evitar artefactos de oclusión con las vigas interiores.
   - Patrón de micro-trama en canvas procedural inyectado en `map` para dar textura de red.

3. **Losa de Azotea / Entorno**:
   - Cuadrícula modular gris oscura (`gridHelper` de $4.0 \times 4.0$ m subdividida cada 0.5 m) con calzos de neopreno negros bajo la solera de madera.

---

## 5. Camera Presets Geometry

Ángulos matemáticos para las vistas rápidas:
- **Isométrica**: `camera.position.set(4.5, 3.8, 4.5); controls.target.set(0, 1.1, 0);`
- **Fachada (Sur)**: `camera.position.set(0, 1.3, 5.2); controls.target.set(0, 1.1, 0);`
- **Planta (Cenit)**: `camera.position.set(0, 6.0, 0.001); controls.target.set(0, 0, 0);`
- **Lateral Este**: `camera.position.set(5.2, 1.3, 0); controls.target.set(0, 1.1, 0);`
- **Trasera (Norte)**: `camera.position.set(0, 1.5, -5.2); controls.target.set(0, 1.1, 0);`

---
name: interactive-3d-structure
description: Construye gemelos digitales 3D en un solo HTML (Three.js) que abren en cualquier navegador, escritorio o móvil. Usar cuando el usuario pida ver en 3D una estructura o cubicación de madera, un gabinete o prototipo de hardware, la disposición física de un montaje (estanques, macetas, mangueras), o cuando un visor 3D existente carga en blanco o le faltan cotas, capas u orientación.
---

# Gemelo digital 3D

Un **gemelo digital** es un `.html` único construido sobre [template.html](template.html): el motor ya viene probado (Three.js fijado, cámaras, capas, cotas, gizmo, ficha por pieza, rayos X, vista explosionada, tema claro/oscuro, PNG, impresión, aviso si falta WebGL o red). Tú escribes solo el **SPEC**, los datos del objeto. Nunca escribes un visor desde cero ni tocas el motor.

El SPEC es la **fuente única**: toda medida visible (cota, ficha, leyenda, aviso) sale de una constante del SPEC. Un número escrito dos veces termina contradiciéndose. Caso real: un visor decía 30 L en la leyenda y 60 L en un comentario, y su geometría medía 78 L.

## Pasos

### 1. Inventario de medidas
Lista cada pieza con sus medidas en **mm** y la **fuente** de cada número: mensaje del usuario, BOM, datasheet, documento del repo o visor anterior. Un número sin fuente se marca `supuesto`, con el criterio usado. Si dos fuentes discrepan, anota ambas y elige una.

Si partes de un visor existente, lee antes [MIGRAR.md](MIGRAR.md): sus unidades, leyendas y rutas de carga no son confiables.

*Completo cuando*: cada pieza tiene todas sus medidas con fuente o `supuesto` y cada contradicción está listada.

### 2. SPEC
Copia `template.html` al destino y reemplaza el bloque entre `SPEC:INICIO` y `SPEC:FIN`. Lee [SPEC.md](SPEC.md) antes de escribirlo: tipos de pieza, convenciones (mm, `pos` = centro de la base), materiales y ejemplos por dominio.

- Cada medida del inventario va en una constante con nombre. Piezas, cotas y textos la usan (`${}` en los textos) y nunca repiten el número.
- Cada pieza que debe caber dentro de otra (componente en gabinete, bomba en estanque) lleva `dentroDe`, y el motor comprueba el calce.
- Si una forma no se arma con los tipos, se resuelve con `constructores` (SPEC.md § Constructores), no editando el motor.

*Completo cuando*: cada pieza del inventario tiene entrada, cada número visible viene de una constante y el diff contra la plantilla solo toca el bloque SPEC.

### 3. Verde
```
node <carpeta de esta skill>/scripts/verify.mjs <visor.html>
```
El script abre el visor en Chrome o Edge headless, en escritorio (1280×800, recorriendo toda la interfaz) y en móvil (390×844). Queda **verde** solo si hay cero errores de consola o de red, todas las piezas construidas, el SPEC sin errores (incluidos los calces `dentroDe`), el modelo visible en el encuadre y sin scroll horizontal. Si queda rojo, corrige el SPEC y repite.

Después abre las capturas cuyas rutas imprime el script (escritorio, móvil y tras la interacción) y contrástalas con el inventario: cada pieza donde corresponde, nada flotando ni atravesado, lo importante a la vista en la vista inicial y cotas legibles sin encimarse.

*Completo cuando*: verify imprime `VERDE` y revisaste las tres capturas. Si falta Chrome/Edge o red, el visor **no está verificado**, y así se informa.

### 4. Entrega
Informa la ruta del archivo, qué se verificó (navegador y tamaños), los supuestos y las contradicciones del paso 1.

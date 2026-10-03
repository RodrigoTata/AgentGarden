---
name: 3d-scanner
description: Escanea objetos o espacios físicos desde fotos y los convierte en un gemelo digital 3D, leyendo forma y proporciones con visión y pidiendo al humano solo las medidas que la foto no entrega. Usar cuando el usuario comparta fotos de algo físico (mueble, carro, máquina, estructura, montaje, recinto) y quiera verlo o modelarlo en 3D, o mencione "3d-scanner", "escanear" o "de foto a 3D".
---

# Escáner 3D

Un **escaneo** convierte fotos en el inventario de medidas que exige [interactive-3d-structure](../interactive-3d-structure/SKILL.md) y construye el gemelo con esa skill. La visión aporta la forma. El humano aporta la escala y lo que la cámara no ve.

## Fuentes de una medida

Cada número del inventario lleva exactamente una fuente, que se copia a la `nota` de la pieza:

| Fuente | Significa | Ejemplo de `nota` |
|---|---|---|
| `medido` | Lo dio el humano con huincha. Siempre gana. | `medido: 1150 mm` |
| `foto ✓` | Valor `foto` que el humano confirmó sin medirlo. | `foto ✓ ≈ 55 × 22 mm` |
| `foto` | Leído en la foto y convertido con el ancla. | `foto ≈ 420 mm ±10 % (vs. ancho 1150)` |
| `catálogo` | Pieza comercial reconocida, con su medida estándar. | `catálogo: rueda 100 mm` |
| `supuesto` | Criterio del agente sin evidencia. | `supuesto: tablero 18 mm` |

El **ancla** es una longitud real conocida, visible en la foto, que convierte proporciones en mm. Puede ser una medida que dio el humano o un objeto de tamaño conocido (ver [FOTOS.md](FOTOS.md)). Cada foto necesita su propia ancla, porque cada foto tiene su propia escala. Sin ancla no existe la fuente `foto` y todo pasa a `supuesto`. La mejor ancla es una cara plana con ancho y alto conocidos: sus 4 esquinas corrigen la perspectiva de todo lo que está en ese plano.

## Qué entrega la foto y qué no

- **Confiable:** cuántas piezas hay, cómo se unen, simetrías, material y color, y largos que están en el plano de un ancla.
- **Hueco** (no confiable, se pregunta): profundidad en el eje de la cámara, largos en planos sin ancla, espesores y diámetros pequeños, caras ocultas, el interior, y toda medida de la que dependa un calce (`dentroDe`), un corte o una compra.

## Pasos

### 1. Recibir
Lee cada foto. Por foto anota la vista (frente, lado, planta u oblicua desde dónde), qué caras del objeto muestra y si trae ancla visible.

Si una cara que define la forma no aparece en ninguna foto, o ninguna foto puede anclarse, pide las fotos que faltan según [FOTOS.md](FOTOS.md). Si el humano no puede sacarlas, sigue: esas caras quedan como `supuesto`.

*Completo cuando*: cada cara del objeto (frente, atrás, izquierda, derecha, arriba) está marcada como vista en una foto concreta, o como oculta.

### 2. Leer
Descompón el objeto en piezas con los tipos de [SPEC.md](../interactive-3d-structure/SPEC.md) (`caja`, `caja-abierta`, `cilindro`, `viga`, `barra`, `panel`, `extrusion`, `grupo`). Por pieza anota nombre, tipo, cantidad, a qué se une y material. Dale a cada largo una letra con su recorrido ("B: del suelo a la cara superior de la repisa").

Luego mide. Lee los píxeles en una lupa, nunca sobre la foto completa a ojo:
```
node <carpeta de esta skill>/scripts/lupa.mjs <foto> [--zona x,y,ancho,alto]
```
Sin `--zona` muestra la foto entera con grilla, para ubicar zonas; con `--zona`, la amplía rotulada en píxeles de la foto original. Convierte esos píxeles a mm con la cara del ancla:
```
node <carpeta de esta skill>/scripts/rectificar.mjs --esquinas "x,y x,y x,y x,y" --mm 190x53 ventana=x1,y1~x2,y2 boton=x,y
```
- Su línea de **control** compara la cara en píxeles con la real. Si marca ⚠ (más de 5 %), las esquinas están mal leídas, por ejemplo tomaste el borde de otra cara. Vuelve a la lupa antes de medir nada más.
- Un punto fuera del plano del ancla (el fondo de una caja, otra cara) no se rectifica con esa cara. Usa otra cara de medida conocida, la simetría o la proporción, y márcalo `foto` de baja confianza.

*Completo cuando*: la línea de control de cada ancla usada está en ✓, y cada campo que el SPEC exige en cada pieza (`dims`, `diam`, `alto`, `seccion`, `desde/hasta`, `pos`) tiene valor con fuente o está marcado como hueco.

### 3. Preguntar
Pregunta los huecos al humano en un solo mensaje, en este orden:
1. El ancla, si falta. Pide la medida total más fácil de tomar.
2. Los huecos que cambian forma o escala: profundidad, alturas de niveles, separaciones.
3. Los huecos que deciden un calce, un corte o una compra.

Cada pregunta lleva su letra, de dónde a dónde medir y tu estimación actual, para que confirmar sea rápido: "B: del suelo a la cara superior de la repisa, ¿≈ 450 mm?". Si la estimación tiene dos números, nombra el eje de cada uno ("≈ 20 alto × 8 fondo mm"); un "1,3 × 2" de vuelta no dice cuál es cuál. Haz como máximo 7 preguntas por ronda. Lo que quede fuera conserva su fuente actual y se nombra en la entrega.

Al recibir las respuestas:
- Un "sí" a tu estimación la pasa a `foto ✓`. Un número nuevo pasa a `medido`.
- "No sé" o "estímalo" pasa a `supuesto` y entra a los avisos del visor.
- Si cambió un ancla, recalcula todos los valores `foto` de esa foto.
- Si un `medido` contradice su estimación `foto` en más de 15 %, revisa la lectura de esa foto (plano o pieza equivocada) antes de confiar en sus demás valores `foto`.

*Completo cuando*: el humano respondió o declinó cada pregunta y cada medida tiene fuente.

### 4. Construir
Ejecuta [interactive-3d-structure](../interactive-3d-structure/SKILL.md). Su inventario del paso 1 es la tabla de este escaneo (pieza, medida, fuente). Además de la fuente en cada `nota`, agrega a `avisos` un `info` ("Escaneado desde N fotos; medidas `foto` ±10 %") y, si hay supuestos, una `alerta` que los liste.

Las cotas generales deben mostrar las medidas `medido` del objeto. `cotasGlobales` mide la envolvente, que incluye salientes como cabezas de tornillo. Si no coincide, apágalas y escribe esas cotas a mano.

*Completo cuando*: `verify.mjs` imprime `VERDE` y las cotas generales muestran las medidas `medido`.

### 5. Contrastar
Por cada foto, deduce desde dónde mira su cámara con evidencia: qué caras muestra, qué lado se ve más grande y qué se ve a través de las aberturas (una cara interior visible por una ventana indica de qué lado está la cámara). Luego arma la variante de esa foto:
```
node <carpeta de esta skill>/scripts/contraste.mjs <visor.html> --camara x,y,z --nombre f2 [--sin-capa tapa]
```
`--camara` es el vector desde el objeto hacia la cámara (p. ej. `-1,0.9,1.25` = frente-izquierda-arriba). `--sin-capa` quita lo que la foto no muestra, como la tapa en una foto del interior. El script deja una copia temporal sin cotas, la verifica e imprime la captura. El visor entregado no se toca.

Compara captura y foto: silueta, proporciones, cantidad y posición de las piezas.
- Si no calzan, sospecha primero de la cámara y repite con otro vector. Corrige el SPEC solo cuando la cámara calza.
- El visor no reproduce la distancia de una foto tomada de cerca: compara posiciones relativas, no el paralaje.
- Lo que no puedas resolver mirando vuelve al paso 3 como pregunta.

*Completo cuando*: cada foto tiene una captura con su cámara calzada y comparada, cada diferencia está corregida o anotada para la entrega, y si el SPEC cambió, `verify.mjs` del visor volvió a quedar `VERDE`.

### 6. Entregar
Informa:
- La ruta del visor.
- La tabla de medidas con el conteo por fuente.
- Las diferencias entre foto y modelo que quedaron sin resolver.
- Las 3 medidas que más subirían la precisión si el humano las toma.

# ADR-0002 — Agitador overhead brushless con la electrónica fuera de la zona de vapores

**Estado:** Propuesta (se confirma con el vendedor: versión 220 V e inclusión de soporte)
**Fecha:** 25-09-2026

## Contexto
Hay que agitar 10–12 L de etanol con flor. Las opciones son un agitador eléctrico de laboratorio (~$104.000), uno eléctrico de pedestal local (~$490.000) o uno neumático (~$490.000 + compresor).

## Decisión
Fristaden Lab OSC-20L, motor DC brushless de 210 W. El controlador, la fuente, el ESP32 y los enchufes van a ≥1,5 m del estanque, por encima de su borde; la tapa se mantiene puesta.

## Razones
- Un motor brushless no produce las chispas de conmutación de un motor con escobillas.
- Cuesta ~1/5 de las opciones locales y cubre el rango de rpm bajo que conviene para macerar.

## Consecuencias / Riesgos
- **No está certificado ATEX:** la placa y el interruptor pueden generar chispa. El riesgo se mitiga con ventilación y distancia, pero no desaparece.
- Probablemente sea un modelo de 110 V: habrá que conseguir la versión de 220 V o un transformador fuera de la zona de vapores.
- Si el MKI muestra que los vapores alcanzan el motor, en el MKII se pasa al agitador neumático.

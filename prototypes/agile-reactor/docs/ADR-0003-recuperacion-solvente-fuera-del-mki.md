# ADR-0003 — La recuperación de solvente queda fuera del MKI

**Estado:** Aceptada (usuario, grilling pregunta 1)
**Fecha:** 25-09-2026

## Contexto
Para concentrar el extracto hay que evaporar el etanol y, de preferencia, condensarlo para reutilizarlo. Es la etapa con más riesgo de incendio y la de equipo más caro (destilador o rotavapor).

## Decisión
El MKI termina en un **extracto filtrado en etanol**. La evaporación y la recuperación de solvente pasan al MKII.

## Razones
- La pregunta central del MKI (maceración, agitación y registro de temperatura) se responde sin evaporar.
- Así se evita el mayor riesgo y el mayor gasto antes de validar el proceso base.

## Consecuencias
- El MKI no entrega un producto concentrado. El extracto en etanol se guarda en envases cerrados, rotulados con el número de lote.
- El MKII parte con esta decisión como tarea principal: fuente de calor sin llama, condensador y ventilación.

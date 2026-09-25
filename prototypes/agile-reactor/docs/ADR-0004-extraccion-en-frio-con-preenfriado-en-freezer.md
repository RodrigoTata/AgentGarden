# ADR-0004 — Extracción en frío, con preenfriado en freezer y reactor fuera del freezer

**Estado:** Aceptada (usuario, grilling pregunta 2)
**Fecha:** 25-09-2026

## Contexto
La extracción puede hacerse a temperatura ambiente o en frío. En frío se arrastra menos clorofila y ceras, y el etanol queda bajo su punto de inflamación (≈13–17 °C).

## Decisión
- El etanol (en botellas cerradas) y la flor (en bolsas selladas) se enfrían a ≈ −18 °C en un **freezer doméstico**.
- El **reactor no entra al freezer**: los insumos fríos se vierten en la olla, que se aísla con una chaqueta térmica durante la maceración.
- El MKI no tiene enfriamiento activo: el DS18B20 registra cuánto sube la temperatura durante el lote.

## Razones
- Es el menor costo posible (usa un freezer existente) y mejora la seguridad con los vapores.
- La curva de temperatura del MKI sirve para decidir si el MKII necesita enfriamiento activo (chiller o camisa).

## Consecuencias
- Nunca se guarda etanol abierto en el freezer, porque su termostato puede hacer chispa.
- Se agrega al BOM una chaqueta aislante para la olla.
- Se define un **límite de temperatura del lote** (propuesta: terminar la maceración si el etanol supera los 0 °C). Se confirma en el grilling.
- La chaqueta no debe tapar la válvula inferior ni la vaina del sensor.

# ADR-0005 — El MKI es de escala laboratorio (recipiente de 2–4 L)

**Estado:** Aceptada (usuario, grilling pregunta 3)
**Fecha:** 25-09-2026
**Reemplaza:** la escala de 20 L de la cotización AR-MKI-COT-01 (ítems 1, 2 y 3) y la selección del agitador en ADR-0002.

## Contexto
La primera cotización suponía una olla de cervecería de 20 L, con cesta hop spider y un agitador para 20 L. Para validar el proceso, esa escala es excesiva.

## Decisión
El MKI es un equipo de **laboratorio para lotes pequeños**, con un recipiente de **2–4 L**.

Dimensionamiento de referencia (vaso de 3 L forma baja, Ø≈15 cm, ≈5,7 cm de altura por litro):

| Parámetro | Valor propuesto |
| :--- | :--- |
| Etanol por lote | 1,0–1,5 L (≈6–9 cm de profundidad) |
| Flor por lote | 50–75 g (≈1:20 g/mL) |
| Espacio libre sobre el líquido | ≥ 50 % del recipiente (salpicaduras, vórtice, tapa) |

## Consecuencias
- La olla de 20 L, el hop spider de 15 × 35 cm y el agitador de 20 L **quedan descartados** para el MKI; hay que recotizarlos.
- El sensor DS18B20 con vaina inox **se mantiene**.
- Lo que sigue vigente: ADR-0001 (etanol), ADR-0003 (sin recuperación de solvente) y ADR-0004 (preenfriado en freezer). Con 1–1,5 L, el preenfriado es mucho más fácil.
- El método de agitación (magnético u overhead) vuelve a quedar abierto: con 2–4 L, el agitador magnético pasa a ser una opción.
- Con tan poco volumen, 1 L de etanol a −18 °C se calienta más rápido que 10 L; la curva de temperatura del MKI lo va a mostrar.

# Agile Reactor — Version Log

## Version: MKI — Reactor batch de maceración con agitación
*Central Question:* ¿Puede un equipo armado con componentes comerciales de cervecería y de laboratorio macerar un lote de flor en etanol con agitación controlada y temperatura registrada, y entregar un extracto filtrado de forma repetible y segura?
*Target Date:* ❓ por definir
*Estimated Cost:* $176.666 CLP (4 ítems cotizados) + ítems pendientes + despachos

### Decisions
- Solvente: etanol 96° grado alimentario/farmacéutico — ver ADR-0001.
- Agitación: overhead brushless, con la electrónica fuera de la zona de vapores — ver ADR-0002.
- Contención de la flor: hop spider inox (retiro en una pieza).
- Sensado: DS18B20 1-Wire en vaina inox + ESP32.

### BOM / Tech Stack
| Component | Description | Cost |
| :--- | :--- | :--- |
| Estanque | El Cervecero, olla 20 L inox 2 mm, válvula 1/2" + espiga | $49.900 |
| Cesta | La Tienda del Cervecero, hop spider Ø15 × 35 cm (verificar calce) | $18.900 |
| Agitador | Fristaden Lab OSC-20L, 210 W, DC brushless (verificar 220 V) | $103.886 |
| Sensor ×2 | Hubot DS18B20, vaina inox Ø6 × 30 mm | $3.980 |
| ESP32 + fuente + caja | Pendiente | — |
| Etanol 96° (~12 L) | Pendiente | — |
| Filtrado fino | Pendiente | — |
| Enfriamiento | Pendiente (depende de la decisión de temperatura) | — |
| Extintor clase B | Pendiente | — |

### Out of Scope (MKI)
- Recuperación o evaporación del solvente (❓ pendiente de confirmar).
- Descarboxilación.
- Análisis de potencia (HPLC) y dosificación.
- Control automático de temperatura (el MKI solo registra).
- Cualquier certificación ATEX o GMP.

### Lessons Learned
- (se completa al cerrar el MKI)

---

## Version: MKII — Operación en condiciones reales
*Central Question:* ¿El proceso rinde de forma consistente lote a lote, con temperatura controlada (no solo registrada) y recuperación de solvente segura?
*Estimated Cost:* por estimar

## Version: MKIII — Producción / cumplimiento
*Central Question:* ¿Se puede operar con trazabilidad, materiales certificados y el marco regulatorio que aplique al uso final?
*Estimated Cost:* por estimar

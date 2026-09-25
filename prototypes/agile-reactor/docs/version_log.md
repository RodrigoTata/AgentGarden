# Agile Reactor — Version Log

## Version: MKI — Reactor batch de maceración con agitación
*Central Question:* ¿Puede un equipo armado con componentes comerciales de cervecería y de laboratorio macerar un lote de flor en etanol con agitación controlada y temperatura registrada, y entregar un extracto filtrado de forma repetible y segura?
*Target Date:* ❓ por definir
*Estimated Cost:* por recotizar a escala laboratorio (ADR-0005)

### Decisions
- Solvente: etanol 96° grado alimentario/farmacéutico — ver ADR-0001.
- Agitación: la electrónica va fuera de la zona de vapores — ver ADR-0002. El método (magnético u overhead) está abierto tras ADR-0005.
- Alcance: el MKI termina en extracto filtrado en etanol — ver ADR-0003.
- Temperatura: extracción en frío; insumos preenfriados a −18 °C en freezer, reactor aislado fuera del freezer — ver ADR-0004.
- Escala: laboratorio, recipiente de 2–4 L, lotes de 50–75 g de flor en 1–1,5 L de etanol — ver ADR-0005.
- Contención de la flor: dentro de una malla que se retira en una pieza (formato por definir).
- Sensado: DS18B20 1-Wire en vaina inox + ESP32.

### BOM / Tech Stack
> Escala laboratorio 2–4 L (ADR-0005). Los ítems de 20 L de la cotización rev. 0 quedaron descartados.

| Component | Description | Cost |
| :--- | :--- | :--- |
| Recipiente 2–4 L | Por recotizar (vaso borosilicato o recipiente inox) | — |
| Contención de la flor | Por recotizar (bolsa o canasto de malla para 50–75 g) | — |
| Agitación | Por recotizar (magnético u overhead; decisión abierta) | — |
| Sensor ×2 | Hubot DS18B20, vaina inox Ø6 × 30 mm | $3.980 |
| ESP32 + fuente + caja | Pendiente | — |
| Etanol 96° (~2–3 L para 2 lotes) | Pendiente | — |
| Filtrado fino | Pendiente | — |
| Enfriamiento | Freezer doméstico existente (ADR-0004) | $0 |
| Aislación del recipiente | Pendiente | — |
| Extintor clase B | Pendiente | — |

### Out of Scope (MKI)
- Recuperación o evaporación del solvente — ver ADR-0003 (pasa al MKII).
- Descarboxilación.
- Análisis de potencia (HPLC) y dosificación.
- Control automático de temperatura (el MKI solo registra).
- Cualquier certificación ATEX o GMP.

### Lessons Learned
- (se completa al cerrar el MKI)

---

## Version: MKII — Operación en condiciones reales
*Central Question:* ¿Se puede recuperar el etanol de forma segura (ADR-0003) y lograr un rendimiento consistente lote a lote, con temperatura controlada y no solo registrada?
*Estimated Cost:* por estimar

## Version: MKIII — Producción / cumplimiento
*Central Question:* ¿Se puede operar con trazabilidad, materiales certificados y el marco regulatorio que aplique al uso final?
*Estimated Cost:* por estimar

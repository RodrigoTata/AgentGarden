# Agile Reactor — Visión (borrador)

> Estado: **borrador previo al grilling**. Los puntos marcados con ❓ se cierran en `/grill-with-docs`.

## 1. Visión
Contar con un reactor batch pequeño, reproducible y seguro para extraer con etanol los compuestos de flores de cannabis medicinal, con cada lote registrado (temperatura, tiempo, rpm) para que el resultado sea comparable entre lotes.

## 2. Misión (MKI)
- **Problema:** hoy no hay un proceso controlado ni registrado para macerar la flor en solvente.
- **Para quién:** ❓ uso personal o terapéutico propio, o preparación para terceros (cambia los requisitos regulatorios).
- **Restricciones:** escala laboratorio (recipiente de 2–4 L, lotes de 50–75 g de flor; ADR-0005); componentes comerciales; mercado Chile; sin fabricación a medida.

## 3. Dominio
**Híbrido:** hardware (estanque, agitador, cesta) + firmware (ESP32 + DS18B20) + ❓ registro de datos local o en la nube.

## 4. Señal de éxito del MKI
Tres lotes consecutivos en los que:
1. la flor se retira completa en su malla, sin interferir con la agitación;
2. la temperatura del etanol queda registrada cada ≤30 s durante todo el lote;
3. el extracto filtrado sale sin partículas visibles;
4. no hay fugas por la válvula y ningún equipo eléctrico queda dentro de la zona de vapores.

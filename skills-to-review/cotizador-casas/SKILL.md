---
name: cotizador-casas
description: Valúa y cotiza propiedades residenciales para compra o inversión — investiga el mercado inmobiliario, modela financiamiento con amortización cuota a cuota, audita riesgos y emite una recomendación formal en HTML listo para impresión. Use when the user asks to cotizar una propiedad, evaluar una casa o departamento, analizar un aviso inmobiliario, o simular rentabilidad y dividendos de un inmueble.
---

# cotizador-casas

**Valúa** una propiedad residencial a partir de un enlace (Portal Inmobiliario, TOCTOC, Mercado Libre, etc.) o dirección física, contrasta sus métricas contra el mercado real y genera un **informe de evaluación interactivo en HTML** con dictamen de compra/visita y tabla de amortización hipotecaria.

La palabra guía es **valuar**: cada ejecución sigue un proceso riguroso y determinista que contrasta la oferta publicada contra fuentes primarias de mercado, dimensiona el flujo de caja neto y entrega una recomendación justificada.

---

## Modos de Ejecución

Este skill puede orquestar sub-skills o ejecutarse de forma **100% autónoma (standalone)**:

- **Con sub-skills activas:** Delega la recolección de datos primarios en `/research` y la maquetación estética en `/generate-html-doc`.
- **Modo Standalone (sin otras skills):** Ejecuta directamente la búsqueda en la web contra fuentes primarias, realiza las proyecciones financieras y construye el archivo HTML autocontenido con el sistema de diseño embebido, sin requerir dependencias externas.

---

## Proceso de Evaluación

```
Entrada (URL o Dirección)
   │
   ▼
[Paso 1: Extracción de Ficha Técnica]
   │
   ▼
[Paso 2: Benchmarking de Mercado & Cap Rate] ◄── (/research o búsqueda directa)
   │
   ▼
[Paso 3: Estructura Financiera & Amortización]
   │
   ▼
[Paso 4: Auditoría Técnica & Recomendación]
   │
   ▼
[Paso 5: Generación del Reporte HTML] ◄──────── (/generate-html-doc o shell inline)
```

---

### Paso 1 — Extracción y Validación de la Ficha Técnica

Extraer o solicitar los parámetros esenciales del inmueble objetivo:

1. **Datos de Publicación:** URL del portal, corredor/propietario y fecha de cotización.
2. **Precio y Superficie:** Precio publicado en UF (y equivalente en moneda local), m² útiles y m² totales. Calcular el ratio base **UF/m²**.
3. **Distribución y Tipología:** Dormitorios, baños, piso/nivel, orientación solar, estacionamientos y bodegas.
4. **Costos Operacionales Fijos:** Gasto común mensual base y contribuciones / impuesto territorial trimestral (verificando cantidad de roles: departamento, bodega, estacionamiento).
5. **Antigüedad y Comunidad:** Año estimado de construcción y características del condominio o edificio.

**Criterio de completitud:** Todos los parámetros anteriores identificados; si falta algún dato crítico (ej. número de estacionamientos o monto de contribuciones), estimarlo conservadoramente e indicarlo como supuesto explícito.

---

### Paso 2 — Investigación de Mercado (Benchmarking & Renta)

Investigar el entorno de la propiedad contra **fuentes primarias** (portales inmobiliarios, estadísticas sectoriales de tasación, datos municipales/SII):

1. **Benchmarking de Venta por m²:**
   * Promedio general de la comuna para tipologías similares.
   * Promedio de la microzona o barrio específico (edificios de similar antigüedad).
   * Rango transaccional histórico del condominio o calle.
   * Porcentaje de descuento o sobreprecio de la unidad evaluada vs. la media de mercado.
2. **Mercado de Arriendo y Cap Rate:**
   * Canon de arriendo mensual estimado para la tipología y metraje.
   * **Cap Rate Bruto:** $\frac{\text{Arriendo Anual}}{\text{Precio de Compra}} \times 100$.
   * **Cap Rate Neto (NOI):** Descontando 4 cuotas de contribuciones y 1 mes de vacancia/mantención anual.
3. **Antecedentes del Complejo / Sector:**
   * Constructora, arquitecto, escala (número de torres/unidades) y amenidades relevantes (piscina, áreas verdes, seguridad).

*Mecánica:* Si `/research` está disponible, ejecutar el sub-agente de investigación. En modo standalone, realizar búsquedas dirigidas en la web consultando avisos comparables activos y reportes inmobiliarios recientes.

**Criterio de completitud:** Rango de UF/m² de la microzona definido con al menos 2 comparables reales y cálculo de Cap Rate Bruto y Neto documentados con fuentes.

---

### Paso 3 — Estructura Financiera y Tabla de Amortización

Calcular el esquema de adquisición y financiamiento solicitado por el usuario (o aplicar el estándar por defecto: **60% Pie / 40% Crédito a 5 años** con tasa de mercado):

1. **Parámetros del Crédito:**
   * Monto de Pie inicial ($UF$ y moneda local).
   * Monto del crédito hipotecario ($UF$ y moneda local).
   * Plazo en meses ($n$) y tasa de interés anual nominal ($i_{anual}$).
   * CAE (Carga Anual Equivalente) anual ($CAE_{anual}$), incorporando seguros obligatorios (desgravamen, sismo e incendio) y gastos operacionales.
2. **Cálculo de Dividendos (Sistema Francés):**
   * Tasa mensual nominal: $r = \frac{i_{anual}}{12}$.
   * Tasa mensual CAE: $r_{cae} = \frac{CAE_{anual}}{12}$.
   * Cuota base: $C = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$.
   * Cuota total con seguros: $C_{cae} = P \cdot \frac{r_{cae}(1+r_{cae})^n}{(1+r_{cae})^n - 1}$.
   * Seguros mensuales: $Seg = C_{cae} - C$.
3. **Tabla de Amortización Detallada (Mes a Mes):**
   * Generar la proyección cuota a cuota (mes 1 a $n$) detallando: **N° Cuota**, **Pago Mensual (con CAE)**, **Amortización de Capital**, **Interés Mensual**, **Seguros/CAE** y **Saldo Pendiente**, expresando cada valor en **UF y moneda local**.
   * Incluir subtotales anuales y la fila de totales generales acumulados.
4. **Análisis de Flujo de Caja (Cash Flow):**
   * *Fase con Crédito (Meses 1 a $n$):* Arriendo percibido vs. Dividendo con CAE vs. Contribuciones = Aporte neto mensual de bolsillo (desglosando cuánto corresponde a amortización de capital líquido / *Equity*).
   * *Fase Libre de Deuda (Mes $n+1$ en adelante):* Ingreso neto mensual 100% a favor y retorno *Cash-on-Cash* sobre el pie inicial.

**Criterio de completitud:** Tabla de amortización con fórmulas cuadradas al centavo y análisis de flujo de caja contrastado contra la renta estimada.

---

### Paso 4 — Auditoría Técnica y Matriz de Decisión

1. **Puntos Críticos de Inspección Física (Checklist de Visita):**
   * Estanqueidad de cubiertas, sellos de ventanas (ej. Velux / termopaneles) y manchas de humedad.
   * Presión hidráulica simultánea y estado de cañerías.
   * Tablero eléctrico, automáticos y diferenciales.
   * Factibilidad de climatización activa (equipos Split Inverter) y confort térmico según orientación.
   * Estado de gastos comunes, certificaciones de ascensores/gas (SEC) y fondo de reserva.
2. **Presupuesto Estimado de Acondicionamiento (Capex):**
   * Tabla con costos estimados de renovación estética (pisos, pintura, cocina/baño) y climatización.
3. **Estrategia de Negociación Escalonada:**
   * Precio Lista $\rightarrow$ Oferta Inicial Agresiva $\rightarrow$ Rango de Contraoferta $\rightarrow$ Precio Objetivo de Cierre (*Target*).
4. **Recomendación Ejecutiva (Dictamen):**
   * **Proceder con Visita a Terreno:** La propiedad cumple filtros de precio/m², rentabilidad y habitabilidad.
   * **Negociar con Oferta Condicionada:** Viable solo si se descuenta el Capex de remodelación detectado.
   * **Descartar / Seguir Buscando:** Precio sobre mercado, riesgo estructural severo o rentabilidad insuficiente.

**Criterio de completitud:** Checklist de visita formulado con al menos 5 puntos de control, presupuesto Capex desglosado y dictamen de recomendación explícito.

---

### Paso 5 — Generación del Reporte HTML Autocontenido

Generar un documento HTML único, profesional y listo para impresión/PDF (`docs/reporte_evaluacion_[nombre_propiedad].html`).

#### Requisitos de Diseño y Estilo:
- **Tipografía:** `Inter` (Google Fonts) para textos y `JetBrains Mono` para tablas numéricas.
- **Paleta de Color:** Primario `#1a4369` (Azul Ejecutivo), Oscuro `#112c46`, Acento `#0369a1`, Éxito `#15803d`, Alerta `#b45309`.
- **Componentes Obligatorios:**
  1. *Botón Flotante de Impresión:* Clase `no-print` con `onclick="window.print()"`.
  2. *Encabezado con Metadatos 2x2:* Resumen de propiedad, identificador, valores y fecha.
  3. *Tarjetas KPI (Grid de 4):* Precio total, UF/m², Cap Rate / Dividendo y Comparativa vs. Media.
  4. *Tablas Estructuradas:* Ficha técnica, comparativa de mercado, modelo de rentabilidad, presupuesto Capex y la **tabla de amortización completa mes a mes** en contenedor con scroll vertical (`max-height: 520px`) y encabezado fijo (`sticky`).
  5. *Callout Boxes:* Alertas visuales con bordes de color (`.warning`, `.success`, `.info`).
  6. *Flujograma de Negociación:* Bloques numerados `.flow-step` con montos y justificaciones.
  7. *Estilos de Impresión:* Regla `@media print` que oculte controles no imprimibles, expanda tablas y mantenga márgenes A4 sin recortes.

*Mecánica:* Si `/generate-html-doc` está disponible, utilizar sus patrones de diseño. En modo standalone, generar directamente el archivo `.html` autocontenido incluyendo todo el bloque CSS inline.

**Criterio de completitud:** Archivo HTML generado y verificado, que abra correctamente en cualquier navegador sin errores de script y responda al comando de impresión de forma limpia.

---

## Estructura de Documento de Referencia

Tomar como estándar de calidad y formato el documento generado en:
* [`c:\dev\Posca\reporte_evaluacion_imago_mundi.md`](file:///c:/dev/Posca/reporte_evaluacion_imago_mundi.md) (Informe Markdown base)
* [`c:\dev\Posca\docs\reporte_evaluacion_imago_mundi.html`](file:///c:/dev/Posca/docs/reporte_evaluacion_imago_mundi.html) (Reporte HTML interactivo y completo)

---

## Checklist de Calidad antes de Entregar

- [ ] ¿Se contrastó el valor por m² contra al menos dos fuentes o comparables del sector?
- [ ] ¿La tabla de amortización incluye cuotas mensuales en UF y CLP con la tasa nominal y CAE exactas?
- [ ] ¿El flujo de caja neto mensual contempla dividendos, contribuciones y reserva de vacancia?
- [ ] ¿Se incluye un presupuesto Capex estimado para acondicionar o modernizar la propiedad?
- [ ] ¿El dictamen final es inequívoco (proceder a visita, ofertar con descuento, o descartar)?
- [ ] ¿El archivo HTML es autocontenido y cuenta con botón de impresión y diseño responsivo?

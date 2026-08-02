# Design System — generate-html-doc

This file contains the **complete CSS design system** for the `generate-html-doc` skill.  
Copy the entire CSS block below into the `<style>` tag of the target HTML file.  
Replace `VAR_PRIMARY` and `VAR_PRIMARY_DARK` with the chosen colors before writing the file.

---

## CSS Block

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

@page {
    size: A4 portrait;
    margin: 1.5cm;
}

@media print {
    body { background: white !important; }
    .page-break { page-break-before: always; }
    .no-print { display: none !important; }
    .document {
        box-shadow: none !important;
        padding: 0 !important;
        margin: 0 !important;
        max-width: 100% !important;
    }
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: #f5f5f5;
    color: #1a1a2e;
    line-height: 1.6;
    font-size: 13.5px;
}

/* --- Print Button --- */
.print-btn {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, VAR_PRIMARY, VAR_PRIMARY_DARK);
    color: white;
    border: none;
    padding: 12px 28px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 14px;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.25);
    transition: transform 0.2s, background 0.2s;
}
.print-btn:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, VAR_PRIMARY_DARK, VAR_PRIMARY_DARK);
}

/* --- Document Shell --- */
.document {
    max-width: 210mm;
    margin: 30px auto;
    background: white;
    padding: 50px 45px;
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    border-radius: 6px;
}

/* --- Header --- */
.doc-header {
    border-bottom: 3px solid VAR_PRIMARY;
    padding-bottom: 20px;
    margin-bottom: 25px;
}
.doc-header h1 {
    font-size: 24px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 4px;
}
.doc-header .subtitle {
    font-size: 14px;
    color: VAR_PRIMARY;
    font-weight: 600;
    margin-bottom: 14px;
}
.doc-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px;
    font-size: 12px;
    color: #555;
    background: #f8f9fa;
    padding: 12px 16px;
    border-radius: 6px;
    border: 1px solid #e9ecef;
}
.doc-meta span { display: block; }
.doc-meta strong { color: #1a1a2e; }

/* --- Headings --- */
h2 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-top: 30px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #e8e8ee;
    display: flex;
    align-items: center;
    gap: 8px;
}
h3 {
    font-size: 15px;
    font-weight: 600;
    color: VAR_PRIMARY;
    margin-top: 20px;
    margin-bottom: 8px;
}

p { margin-bottom: 10px; }
ul, ol { padding-left: 20px; margin-bottom: 10px; }
li { margin-bottom: 4px; }

/* --- Tables --- */
.table-container {
    overflow-x: auto;
    margin: 16px 0;
}
table {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    text-align: center;
}
th {
    background: VAR_PRIMARY_DARK;
    color: white;
    padding: 8px 5px;
    font-weight: 600;
    font-size: 10.5px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    border: 1px solid VAR_PRIMARY_DARK;
}
td {
    padding: 7px 4px;
    border: 1px solid #e0e0e0;
    text-align: left;
}
td:first-child { font-weight: 600; }
tr:nth-child(even) td { background: #f8f9fb; }
tr:hover td { background: #f0f4ff; }

.highlight-col {
    background: #e8f0ff !important;
    font-weight: bold;
    color: VAR_PRIMARY_DARK;
}
.peak-row td {
    border-top: 2px solid #fb8c00;
    border-bottom: 2px solid #fb8c00;
    background: #fff8f0 !important;
}

/* --- Callout Boxes --- */
.callout {
    background: #f0f4ff;
    border-left: 4px solid VAR_PRIMARY;
    padding: 12px 16px;
    margin: 14px 0;
    border-radius: 0 6px 6px 0;
    font-size: 12.5px;
}
.callout.warning {
    background: #fff8f0;
    border-left-color: #f0a030;
}
.callout.success {
    background: #f0fff4;
    border-left-color: #38a169;
}
.callout.danger {
    background: #fff0f0;
    border-left-color: #c62828;
}
.callout strong {
    display: block;
    margin-bottom: 4px;
    color: #1a1a2e;
}

/* --- Flowchart Steps --- */
.flowchart-container {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.flow-step {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    background: #f8f9fa;
    border: 1px solid #e2e8f0;
    border-left: 5px solid VAR_PRIMARY;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    transition: transform 0.15s ease-in-out;
}
.flow-step:hover { transform: translateX(3px); }
.flow-step.warning {
    border-left-color: #e65100;
    background: #fff8f5;
}
.flow-step.danger {
    border-left-color: #c62828;
    background: #ffebee;
}
.flow-step-number {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: VAR_PRIMARY;
    color: white;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
}
.flow-step.warning .flow-step-number { background: #e65100; }
.flow-step.danger .flow-step-number { background: #c62828; }
.flow-step-body { flex: 1; }
.flow-step-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}
.flow-step-title {
    font-weight: 700;
    font-size: 13.5px;
    color: #1a1a2e;
}
.flow-step-desc {
    font-size: 12px;
    color: #555;
    line-height: 1.45;
}
.flow-arrow {
    text-align: center;
    color: VAR_PRIMARY;
    font-size: 16px;
    font-weight: 800;
    margin: -4px 0;
}

/* --- Grid Cards --- */
.grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 14px 0;
}
.grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 12px;
    margin: 14px 0;
}
.card {
    border: 1px solid #e0e0ee;
    border-radius: 8px;
    padding: 14px;
    background: #fafafa;
}
.card h4 {
    font-size: 13px;
    font-weight: 700;
    color: VAR_PRIMARY;
    margin-bottom: 6px;
}
.card p { font-size: 12px; }

/* --- Badges --- */
.badge {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
}
.badge-primary { background: #dbeafe; color: VAR_PRIMARY_DARK; }
.badge-green  { background: #c8e6c9; color: #1b5e20; }
.badge-orange { background: #ffe0b2; color: #e65100; }
.badge-red    { background: #ffcdd2; color: #b71c1c; }
.badge-blue   { background: #bbdefb; color: #0d47a1; }
.badge-gray   { background: #e0e0e0; color: #424242; }

/* --- Footer --- */
.doc-footer {
    margin-top: 40px;
    padding-top: 16px;
    border-top: 2px solid #e8e8ee;
    font-size: 11px;
    color: #777;
    text-align: center;
}
```

---

## Usage notes

- **VAR_PRIMARY**: the main accent color. Controls header underline, h3 color, flow-step border, callout border, flowchart arrows, card headings, and print button.
- **VAR_PRIMARY_DARK**: ~15% darker than VAR_PRIMARY. Used for table headers, highlight-col, and button hover.
- **Omit unused blocks**: if the document uses no flowchart steps, omit the flowchart CSS. Keep the file lean.
- **grid-3** is available for three-column card layouts. Use sparingly — it gets narrow on A4.

## Color reference

| Domain | VAR_PRIMARY | VAR_PRIMARY_DARK |
|---|---|---|
| Technical / IoT | `#1e6ba8` | `#155082` |
| Agriculture / Nature | `#2e7d32` | `#1b5e20` |
| Medical / Health | `#00796b` | `#00574f` |
| Operations / Logistics | `#b34700` | `#8c3700` |
| Creative / Design | `#6d3b8c` | `#512e68` |
| Legal / Finance | `#263570` | `#1a2456` |
| Default | `#1e6ba8` | `#155082` |

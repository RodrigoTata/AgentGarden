# ADR 0004: Dinámica Aerodinámica del Techo a un Agua con Caída Sur → Norte (~8.3%)

- **Estado:** Aceptado
- **Fecha:** 2026-09-19
- **Contexto del Proyecto:** Geometría de Techumbre y Control de Ráfagas Costeras SW
- **Autor:** Equipo de Diseño Agro-Estructural Antigravity

---

## 1. Contexto y Problemática
En estructuras livianas de jardín y azotea, los techos planos horizontales o con pendiente invertida hacia el viento sufren dos patologías críticas:
1. **Sustentación aerodinámica ("Efecto Vela"):** El aire a alta velocidad genera una depresión en la cara superior (principio de Bernoulli) y sobrepresión interna, arrancando techumbres o deformando tirantes.
2. **Embolsamiento y guateo de mallas:** Si la caída del techo enfrenta directamente la dirección del viento dominante, el flujo queda atrapado bajo el alero, multiplicando la fuerza de arrastre sobre los postes.

---

## 2. Decisión Arquitectónica
Se define una geometría de techumbre a un agua con **pendiente descendente desde el Sur ($2.25\text{ m}$) hacia el Norte ($2.00\text{ m}$)** sobre los $2.00\text{ m}$ de fondo:

1. **Cálculo de Pendiente:**
   $$\Delta h = 2.25\text{ m} - 2.00\text{ m} = 0.25\text{ m}$$
   $$\text{Pendiente} = \frac{0.25}{2.00} = 12.5\% \quad (\approx 7.125^\circ \text{ a } 8.3^\circ \text{ según tirante})$$

2. **Comportamiento Fluidodinámico frente a Ráfagas del Suroeste (SW):**
   - El viento proveniente del SW impacta primero contra el muro de bloques de $1.0\text{ m}$ de altura en el lateral oeste y contra el muro alto de $9.0\text{ m}$ al sur.
   - El flujo sobrepasa el pretil y se encuentra con la cota máxima en la cumbrera sur ($2.25\text{ m}$).
   - Al descender hacia el frente norte ($2.00\text{ m}$), el flujo eólico **resbala de forma tangencial sobre la pendiente de malla sombra**.
   - No existe embolsamiento porque no hay alero contrapuesto al viento; el perfil actúa como una cuña aerodinámica que comprime levemente el flujo hacia abajo sin generar coeficientes de sustentación ($C_L \le 0$).

3. **Costaneras Intermedias Anti-Guateo:**
   - Se instalan dos costaneras transversales de pino 2×2” a los tercios de la luz del tirante, impidiendo que la malla sombra vibre o se empanse ante rachas intermitentes.

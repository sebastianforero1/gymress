import { html } from "../../util/dom.js";
import { AppState } from "../../state.js";

export default () => html`
<section class="screen">
  <h2 class="screen-title">Mis Reservas</h2>
  <div class="list">
    ${AppState.reservas.map(r => {
      const diaNum = (r.diaNum ?? parseInt(String(r.dia || "").match(/\d+/)?.[0] || "NaN", 10));
      const diaTxt = Number.isFinite(diaNum) ? `Día ${diaNum}` : (r.dia || "");
      const horaTxt = r.hora || r.hour || "";
      return `
        <div class="card">
          <div style="font-weight:800;">RESERVA ${diaTxt} - ${horaTxt}</div>
          <div style="display:flex; gap:.5rem; margin-top:.5rem;">
            <button class="chip" data-edit="${r.id}">EDITAR</button>
            <button class="chip" data-del="${r.id}">CANCELAR</button>
          </div>
        </div>
      `;
    }).join("")}
  </div>
  <button class="fab" data-go="reservas">+</button>
</section>`;

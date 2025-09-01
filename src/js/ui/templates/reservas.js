import { html } from "../../util/dom.js";

export default () => html`
<section class="screen">
  <h2 class="screen-title">Reservas</h2>
  <p><strong>SELECCIONAR FECHA:</strong></p>
  <div class="grid-days" id="gridDays">
    ${Array.from({ length: 30 }, (_, i) => i + 1).map(d => {
      const selected = d === 18 ? "selected" : "";
      return `<button class="day ${selected}" data-day="${d}">${d}</button>`;
    }).join("")}
  </div>
  <div class="section">
    <p><strong>HORARIOS DISPONIBLES:</strong></p>
    <div class="chips" id="chipsHours"></div>
  </div>
  <button class="btn-primary" id="btnAddReserva">Añadir Reserva</button>
</section>`;

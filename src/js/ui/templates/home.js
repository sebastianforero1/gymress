import { html } from "../../util/dom.js";
import { AppState } from "../../state.js";

export default () => html`
<section class="screen">
  <h2 class="screen-title">Bienvenida</h2>

  <div class="card">
    <p><strong>Estado actual:</strong><br>
       Ocupación: ${AppState.ocupacion.ocupados}/${AppState.ocupacion.capacidad}</p>
    <div class="progress" aria-label="Ocupación">
      <div class="progress__bar"
           style="width:${(AppState.ocupacion.ocupados / AppState.ocupacion.capacidad) * 100}%"></div>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi">
      <div>Reservas activas:</div>
      <div style="font-size:1.6rem; font-weight:800;">${AppState.reservas.length}</div>
    </div>
    <div class="kpi">
      <div>Próxima Reserva:</div>
      <div style="font-size:1.6rem; font-weight:800;">
        ${AppState.nextReservationText || "-"}
      </div>
    </div>
  </div>

  
  <button class="btn-primary" data-go="reservas">Nueva Reserva</button>
</section>`;

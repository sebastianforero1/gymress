import { html } from "../../util/dom.js";
import { AppState } from "../../state.js";

export default () => html`
<section class="screen">
  <h2 class="screen-title">Perfil</h2>
  <div class="avatar"></div>
  <p style="text-align:center; font-weight:700;">
    ${AppState.user ? `${AppState.user.nombre || "Residente"}<br>Apto ${AppState.user.apto} torre ${AppState.user.torre}` : "Invitado"}
  </p>
  
  <button class="btn-primary" data-go="config">Configuración</button>
</section>`;

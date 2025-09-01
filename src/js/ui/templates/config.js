import { html } from "../../util/dom.js";
import { AppState } from "../../state.js";

export default () => {
  const T = AppState.settings.toggles;
  const rows = [
    ["Notificaciones", T[0]],
    ["Mantener sesión", T[1]],
    ["Añadir a calendario", T[2]],
    ["Recordarme 1 h antes", T[3]],
  ];
  return html`
  <section class="screen">
    <h2 class="screen-title">Configuración</h2>
    ${rows.map((row, i) => `
      <div class="toggle">
        <span>${row[0]}</span>
        <div class="switch${row[1] ? " on" : ""}" data-toggle="${i}"></div>
      </div>
    `).join("")}
    <button class="btn-primary" id="btnLogout" style="margin-top:1rem;">Cerrar Sesión</button>
    <button class="back" data-go="perfil">←</button>
  </section>`;
};

import { html } from "../../util/dom.js";

export default () => html`
<section class="screen">
  <img src="./assets/img/logo.png" alt="GymRes" class="login-logo"/>
  <h2 style="text-align:center; letter-spacing:.06em;">REGISTRARSE</h2>
  <input id="nombreReg" class="input" placeholder="Nombre" autocomplete="off">
  <input id="aptoReg"  class="input" placeholder="Apartamento" autocomplete="off">
  <input id="torreReg" class="input" placeholder="Torre" autocomplete="off">
  <input id="ccReg"    class="input" placeholder="Cedula" inputmode="numeric" autocomplete="off">
  <button class="btn-primary" id="btnRegister">Crear Cuenta</button>
  <p id="registerMsg" style="text-align:center; margin-top:.5rem; color:#666;">&nbsp;</p>
  <p style="text-align:center; margin-top:1rem;">
    <a data-go="login">Volver</a>
  </p>
</section>`;

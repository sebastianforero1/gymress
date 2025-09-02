import { html } from "../../util/dom.js";
import logoUrl from "../../../assets/img/logo.png";

export default () => html`
<section class="screen">
  <img src="${logoUrl}" alt="GymRes" class="login-logo"/>
  <h2 style="text-align:center; letter-spacing:.06em;">BIENVENIDO</h2>
  <input id="apto"  class="input" placeholder="Apartamento" autocomplete="off">
  <input id="torre" class="input" placeholder="Torre" autocomplete="off">
  <input id="cc"    class="input" placeholder="Cedula" inputmode="numeric" autocomplete="off">
  <button class="btn-primary" id="btnLogin">Iniciar Sesion</button>
  <p id="loginMsg" style="text-align:center; margin-top:.5rem; color:#666;">&nbsp;</p>
  <p style="text-align:center; margin-top:1rem;">
    <a data-go="register"><u>Registrarse</u></a>
  </p>
</section>`;

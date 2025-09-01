import login from "./login.js";
import register from "./register.js";
import home from "./home.js";
import reservas from "./reservas.js";
import misReservas from "./misReservas.js";
import perfil from "./perfil.js";
import config from "./config.js";
import estado from "./estado.js";

export const Screens = { login, register, home, reservas, misReservas, perfil, config, estado };

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.error);
  });
}

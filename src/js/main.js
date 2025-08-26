// src/js/main.js
// Importa la función `load` para cargar el estado desde localStorage y el objeto `AppState` que contiene el estado global.
import { load, AppState } from "./state.js";
// Importa las funciones para configurar los eventos de clic de la navegación.
import { wireBottomBar, wireGo } from "./ui/components.js";
// Importa la función `render` que se encarga de dibujar la pantalla correcta.
import { render } from "./router.js";

// Carga el estado guardado de la aplicación (usuario, reservas, etc.) al iniciar.
load();

/**
 * Función de navegación que cambia la ruta en el hash de la URL.
 * Esto desencadena el evento 'hashchange'.
 * @param {string} route - La ruta a la que se quiere navegar (ej. 'home', 'profile').
 */
function navigate(route) {
    location.hash = `#/${route}`;
}

// Configura los listeners de eventos para la navegación.
// `wireBottomBar` maneja los clics en la barra de navegación inferior.
wireBottomBar(navigate);
// `wireGo` maneja los clics en cualquier elemento con el atributo `data-go`.
wireGo(navigate);

// Escucha los cambios en el hash de la URL para manejar la navegación de la SPA.
window.addEventListener("hashchange", () => {
    // Obtiene la ruta actual del hash, quitando el '#/'. Si está vacío, usa 'login' como ruta por defecto.
    const route = location.hash.replace("#/", "") || "login";
    // Llama a la función `render` para mostrar la pantalla correspondiente a la nueva ruta.
    render(route);
});


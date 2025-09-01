// Importa la clase base `StorageService` que contiene el método _commit para guardar el estado.
import StorageService from "./StorageService.base.js";
// Importa el objeto `AppState`, que es el estado global de la aplicación.
import { AppState } from "../state.js";

/**
 * Métodos para manejar la información del perfil y la sesión.
 */
StorageService.prototype.setUser = function (user) {
  AppState.user = user;
  this._commit();
};

StorageService.prototype.getUser = function () {
  return AppState.user;
};

StorageService.prototype.login = function () {
  AppState.loggedIn = true;
  this._commit();
};

StorageService.prototype.logout = function () {
  AppState.loggedIn = false;
  this._commit();
};

export default StorageService;

// Importa la clase base `StorageService` para poder extenderla.
import StorageService from "./StorageService.base.js";
// Importa el estado global de la aplicación para poder leer y modificar la lista de reservas.
import { AppState } from "../state.js";

/**
 * Métodos relacionados con la gestión de reservas.
 * Se añaden directamente al prototipo de `StorageService`.
 */
StorageService.prototype.addReserva = function (reserva) {
  const gen = () =>
    (crypto && crypto.randomUUID ? crypto.randomUUID() : "id-" + Math.random().toString(36).slice(2));
  reserva.id = gen();
  AppState.reservas.push(reserva);
  this._commit();
  return reserva;
};

StorageService.prototype.updateReserva = function (id, updates) {
  const i = AppState.reservas.findIndex(r => r.id === id);
  if (i >= 0) {
    AppState.reservas[i] = { ...AppState.reservas[i], ...updates };
    this._commit();
    return AppState.reservas[i];
  }
  return null;
};

StorageService.prototype.removeReserva = function (id) {
  AppState.reservas = AppState.reservas.filter(r => r.id !== id);
  this._commit();
};

StorageService.prototype.listReservas = function () {
  return AppState.reservas;
};

// Exporta la clase `StorageService` modificada para que otros módulos puedan usarla.
export default StorageService;

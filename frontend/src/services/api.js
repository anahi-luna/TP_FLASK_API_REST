// Servicio centralizado para todas las llamadas a la API del backend
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Función base para realizar fetch a la API.
 * Lanza un error con el mensaje del backend si la respuesta no es ok.
 */
async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  const json = await response.json();

  if (!json.ok) {
    // Propagar el mensaje de error del servidor
    throw new Error(json.message || 'Error desconocido del servidor.');
  }
  return json;
}

// ─── Estadísticas (Home) ──────────────────────────────────────────────────────
export const getStats = () => apiFetch('/stats');

// ─── Localidades ──────────────────────────────────────────────────────────────
export const getLocalidades = (params = '') =>
  apiFetch(`/localidades/${params}`);

export const getLocalidad = (id) => apiFetch(`/localidades/${id}`);

export const createLocalidad = (data) =>
  apiFetch('/localidades/', { method: 'POST', body: JSON.stringify(data) });

export const updateLocalidad = (id, data) =>
  apiFetch(`/localidades/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteLocalidad = (id) =>
  apiFetch(`/localidades/${id}`, { method: 'DELETE' });

// ─── Contactos ────────────────────────────────────────────────────────────────
export const getContactos = (params = '') =>
  apiFetch(`/contactos/${params}`);

export const getContacto = (id) => apiFetch(`/contactos/${id}`);

export const createContacto = (data) =>
  apiFetch('/contactos/', { method: 'POST', body: JSON.stringify(data) });

export const updateContacto = (id, data) =>
  apiFetch(`/contactos/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const deleteContacto = (id) =>
  apiFetch(`/contactos/${id}`, { method: 'DELETE' });

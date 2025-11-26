// Configuración base de la API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

/**
 * Helper para hacer peticiones HTTP con autenticación automática
 * @param {string} endpoint - Endpoint de la API (ej: '/api/products')
 * @param {object} options - Opciones de fetch (method, body, headers, etc.)
 * @returns {Promise} Datos de la respuesta
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error en la petición');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export { API_URL };

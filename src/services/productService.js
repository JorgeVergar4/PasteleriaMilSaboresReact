import { apiRequest } from './api';

export const productService = {
  /**
   * Obtener todos los productos
   * @param {object} filters - Filtros opcionales (categoria, enOferta, buscar)
   * @returns {Promise} Array de productos
   */
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    if (filters.categoria) queryParams.append('categoria', filters.categoria);
    if (filters.enOferta) queryParams.append('enOferta', 'true');
    if (filters.buscar) queryParams.append('buscar', filters.buscar);

    const query = queryParams.toString();
    const endpoint = `/api/products${query ? `?${query}` : ''}`;

    return await apiRequest(endpoint);
  },

  /**
   * Obtener producto por ID
   * @param {string} id - ID del producto
   * @returns {Promise} Producto
   */
  getById: async (id) => {
    return await apiRequest(`/api/products/${id}`);
  },

  /**
   * Crear producto (solo admin)
   * @param {object} productData - Datos del producto
   * @returns {Promise} Producto creado
   */
  create: async (productData) => {
    return await apiRequest('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Actualizar producto (solo admin)
   * @param {string} id - ID del producto
   * @param {object} productData - Datos a actualizar
   * @returns {Promise} Producto actualizado
   */
  update: async (id, productData) => {
    return await apiRequest(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  /**
   * Eliminar producto (solo admin)
   * @param {string} id - ID del producto
   * @returns {Promise} Confirmación
   */
  delete: async (id) => {
    return await apiRequest(`/api/products/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Obtener productos en oferta
   * @returns {Promise} Array de productos en oferta
   */
  getOffers: async () => {
    return await apiRequest('/api/products?enOferta=true');
  },

  /**
   * Buscar productos por texto
   * @param {string} query - Texto de búsqueda
   * @returns {Promise} Array de productos
   */
  search: async (query) => {
    return await apiRequest(`/api/products?buscar=${encodeURIComponent(query)}`);
  },
};

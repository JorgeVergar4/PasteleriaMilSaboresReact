import { apiRequest } from './api';

export const orderService = {
  /**
   * Crear pedido
   * @param {object} orderData - Datos del pedido
   * @returns {Promise} Pedido creado
   */
  create: async (orderData) => {
    return await apiRequest('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  /**
   * Obtener mis pedidos
   * @returns {Promise} Array de pedidos del usuario actual
   */
  getMyOrders: async () => {
    return await apiRequest('/api/orders');
  },

  /**
   * Obtener pedido por ID
   * @param {string} id - ID del pedido
   * @returns {Promise} Pedido
   */
  getById: async (id) => {
    return await apiRequest(`/api/orders/${id}`);
  },

  /**
   * Actualizar estado del pedido (solo admin)
   * @param {string} id - ID del pedido
   * @param {string} estado - Nuevo estado
   * @returns {Promise} Pedido actualizado
   */
  updateStatus: async (id, estado) => {
    return await apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ estado }),
    });
  },
};

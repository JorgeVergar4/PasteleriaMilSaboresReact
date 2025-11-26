import { apiRequest } from './api';

export const categoryService = {
  /**
   * Obtener todas las categorías
   * @returns {Promise} Array de categorías
   */
  getAll: async () => {
    return await apiRequest('/api/categories');
  },

  /**
   * Obtener productos por categoría
   * @param {string} categoryName - Nombre de la categoría
   * @returns {Promise} Objeto con categoría y productos
   */
  getProductsByCategory: async (categoryName) => {
    return await apiRequest(`/api/categories/${categoryName}/products`);
  },
};

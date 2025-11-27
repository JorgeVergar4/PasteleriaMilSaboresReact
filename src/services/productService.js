// src/services/productService.js
import apiClient from './apiClient';

export async function getProducts() {
  const response = await apiClient.get('/products');
  return response.data;
}

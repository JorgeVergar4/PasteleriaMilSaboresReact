// src/services/apiClient.js
import axios from 'axios';
import config from '../config/environment';

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// (Opcional) log para confirmar la URL base
console.log('API client baseURL:', config.API_BASE_URL);

export default apiClient;

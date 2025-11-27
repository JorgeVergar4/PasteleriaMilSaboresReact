// src/services/authService.js
import apiClient from './apiClient';

export async function login(email, password) {
  const response = await apiClient.post('/auth/login', {
    email,
    password,
  });
  // El backend responde: { user: {…}, token: '...' }
  return response.data;
}

// Más adelante puedes agregar:
// export async function register(data) { ... }
// export async function getProfile() { ... }
import { apiRequest } from './api';

export const authService = {
  /**
   * Registrar nuevo usuario
   * @param {object} userData - Datos del usuario (nombre, apellidos, email, password, etc.)
   * @returns {Promise} Usuario creado y token
   */
  register: async (userData) => {
    const data = await apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    // Guardar token y usuario en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  /**
   * Iniciar sesión
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña
   * @returns {Promise} Usuario y token
   */
  login: async (email, password) => {
    const data = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Guardar token y usuario en localStorage
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    return data;
  },

  /**
   * Cerrar sesión
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Obtener usuario actual desde localStorage
   * @returns {object|null} Usuario actual o null
   */
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Verificar si el usuario está autenticado
   * @returns {boolean} true si está autenticado
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Verificar si el usuario es admin
   * @returns {boolean} true si es admin
   */
  isAdmin: () => {
    const user = authService.getCurrentUser();
    return user?.rol === 'admin';
  },
};

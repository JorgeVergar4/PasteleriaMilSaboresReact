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

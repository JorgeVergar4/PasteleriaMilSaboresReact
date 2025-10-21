import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Wrapper para componentes que necesitan React Router
export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  
  // Crear un wrapper con configuración de React Router para suprimir warnings
  const RouterWrapper = ({ children }) => (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {children}
    </BrowserRouter>
  );
  
  return render(ui, { wrapper: RouterWrapper });
};

// Wrapper genérico para tests
export const AllTheProviders = ({ children }) => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      {children}
    </BrowserRouter>
  );
};

// Función de renderizado personalizada
export const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-exportar todo desde testing-library
export * from '@testing-library/react';

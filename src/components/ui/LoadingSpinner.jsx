import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * LoadingSpinner - Componente de carga con spinner animado
 * 
 * @param {Object} props - Propiedades del componente
 * @param {string} props.size - Tamaño del spinner ('sm', 'md', 'lg')
 * @param {string} props.message - Mensaje a mostrar debajo del spinner
 * @param {string} props.className - Clases CSS adicionales
 * @param {boolean} props.fullScreen - Si debe ocupar toda la pantalla
 * @returns {JSX.Element} Componente de loading spinner
 */
const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Cargando...', 
  className = '',
  fullScreen = false 
}) => {
  const containerClasses = fullScreen 
    ? `d-flex flex-column justify-content-center align-items-center vh-100 ${className}`
    : `text-center py-5 ${className}`;

  return (
    <div className={containerClasses}>
      <Spinner 
        animation="border" 
        role="status" 
        size={size}
        style={{ color: 'var(--accent-pink)' }}
        aria-label={message}
      >
        <span className="visually-hidden">{message}</span>
      </Spinner>
      {message && (
        <p className="mt-3 mb-0" style={{ color: 'var(--text-secondary)' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;

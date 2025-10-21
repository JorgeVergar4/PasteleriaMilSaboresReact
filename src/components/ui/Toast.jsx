import React, { useState, useEffect, useCallback } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

/**
 * ToastNotification - Componente de notificación toast
 * 
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.show - Si mostrar el toast
 * @param {Function} props.onClose - Función a ejecutar al cerrar
 * @param {string} props.title - Título del toast
 * @param {string} props.message - Mensaje del toast
 * @param {string} props.variant - Variante del toast ('success', 'error', 'info', 'warning')
 * @param {number} props.delay - Delay en milisegundos antes de cerrar automáticamente
 * @param {string} props.position - Posición del toast ('top-start', 'top-center', 'top-end', etc.)
 * @returns {JSX.Element} Componente de toast notification
 */
const ToastNotification = ({ 
  show, 
  onClose, 
  title, 
  message, 
  variant = 'success', 
  delay = 3000,
  position = 'top-end'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Delay para la animación de salida
  }, [onClose]);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [show, delay, handleClose]);

  const getIconClass = () => {
    switch (variant) {
      case 'success':
        return 'bi-check-circle';
      case 'error':
        return 'bi-exclamation-triangle';
      case 'warning':
        return 'bi-exclamation-circle';
      case 'info':
      default:
        return 'bi-info-circle';
    }
  };

  const getToastVariant = () => {
    switch (variant) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <ToastContainer position={position} className="p-3">
      <Toast 
        show={isVisible} 
        onClose={handleClose} 
        delay={delay} 
        autohide
        bg={getToastVariant()}
      >
        <Toast.Header closeButton={false}>
          <i className={`bi ${getIconClass()} me-2`}></i>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;

import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar notificaciones toast
 * 
 * Proporciona funciones para mostrar diferentes tipos de notificaciones
 * (éxito, error, información, advertencia) con un estado centralizado.
 * 
 * @returns {Object} Objeto con estado del toast y funciones para controlarlo
 */
export const useToast = () => {
  const [toast, setToast] = useState({
    show: false,
    title: '',
    message: '',
    variant: 'success',
    delay: 3000,
    position: 'top-end'
  });

  /**
   * Muestra un toast con los parámetros especificados
   * @param {string} title - Título del toast
   * @param {string} message - Mensaje del toast
   * @param {string} variant - Tipo de toast ('success', 'error', 'info', 'warning')
   * @param {number} delay - Delay en milisegundos antes de cerrar automáticamente
   * @param {string} position - Posición del toast
   */
  const showToast = useCallback((title, message, variant = 'success', delay = 3000, position = 'top-end') => {
    setToast({
      show: true,
      title,
      message,
      variant,
      delay,
      position
    });
  }, []);

  /**
   * Oculta el toast actual
   */
  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, show: false }));
  }, []);

  /**
   * Muestra un toast de éxito
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del toast (por defecto: 'Éxito')
   */
  const showSuccess = useCallback((message, title = 'Éxito') => {
    showToast(title, message, 'success');
  }, [showToast]);

  /**
   * Muestra un toast de error
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del toast (por defecto: 'Error')
   */
  const showError = useCallback((message, title = 'Error') => {
    showToast(title, message, 'error');
  }, [showToast]);

  /**
   * Muestra un toast de información
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del toast (por defecto: 'Información')
   */
  const showInfo = useCallback((message, title = 'Información') => {
    showToast(title, message, 'info');
  }, [showToast]);

  /**
   * Muestra un toast de advertencia
   * @param {string} message - Mensaje a mostrar
   * @param {string} title - Título del toast (por defecto: 'Advertencia')
   */
  const showWarning = useCallback((message, title = 'Advertencia') => {
    showToast(title, message, 'warning');
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
};

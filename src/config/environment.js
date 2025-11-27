// Configuración de variables de entorno
export const config = {
  // URLs base
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'https://back-end-pasteleria-mil-sabores.vercel.app/api',
  
  // Configuración de la aplicación
  APP_NAME: 'Pastelería Mil Sabores',
  APP_VERSION: '1.0.0',
  
  // Configuración de paginación
  PRODUCTS_PER_PAGE: 12,
  BLOG_POSTS_PER_PAGE: 6,
  
  // Configuración de notificaciones
  TOAST_DURATION: 3000,
  
  // Configuración de validación
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  
  // Configuración de imágenes
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Configuración de carrito
  MAX_CART_ITEMS: 50,
  
  // Configuración de descuentos
  CUPON_DISCOUNT: 0.1, // 10%
  SENIOR_DISCOUNT: 0.5, // 50%
  
  // Configuración de impuestos
  IVA_RATE: 0.19, // 19%
  
  // Configuración de envío
  FREE_SHIPPING_THRESHOLD: 50000, // $50,000 CLP
  SHIPPING_DAYS: '2-3 días hábiles',
  
  // Configuración de desarrollo
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Configuración de logging
  ENABLE_CONSOLE_LOGS: process.env.NODE_ENV === 'development',
  
  // Configuración de analytics (si se implementa)
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  GA_TRACKING_ID: process.env.REACT_APP_GA_TRACKING_ID,
};

console.log('API_BASE_URL en runtime:', process.env.REACT_APP_API_BASE_URL);

export default config;

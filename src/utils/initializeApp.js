// Utilidad para inicializar la aplicación con datos desde localStorage
import { ordenesService } from '../data/dataService';

export const initializeApp = () => {
  try {
    // Cargar órdenes desde localStorage al inicializar la aplicación
    ordenesService.loadFromStorage();
    
    console.log('Aplicación inicializada correctamente');
    return true;
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
    return false;
  }
};

// Función para limpiar datos de prueba (opcional)
export const clearTestData = () => {
  try {
    localStorage.removeItem('ordenes');
    localStorage.removeItem('carrito');
    localStorage.removeItem('cuponAplicado');
    localStorage.removeItem('datosUsuarioTemporal');
    console.log('Datos de prueba limpiados');
  } catch (error) {
    console.error('Error al limpiar datos de prueba:', error);
  }
};

// Función para exportar datos (para respaldo)
export const exportData = () => {
  try {
    const data = {
      ordenes: JSON.parse(localStorage.getItem('ordenes') || '[]'),
      carrito: JSON.parse(localStorage.getItem('carrito') || '[]'),
      timestamp: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `backup-pasteleria-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    console.log('Datos exportados correctamente');
  } catch (error) {
    console.error('Error al exportar datos:', error);
  }
};

// Función para importar datos (para restaurar respaldo)
export const importData = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.ordenes) {
          localStorage.setItem('ordenes', JSON.stringify(data.ordenes));
        }
        
        if (data.carrito) {
          localStorage.setItem('carrito', JSON.stringify(data.carrito));
        }
        
        // Recargar datos en el servicio
        ordenesService.loadFromStorage();
        
        console.log('Datos importados correctamente');
        resolve(true);
      } catch (error) {
        console.error('Error al importar datos:', error);
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    
    reader.readAsText(file);
  });
};

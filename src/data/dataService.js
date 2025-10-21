// ========================================
// DATOS INICIALES
// ========================================

const productos = [
    // TORTAS CUADRADAS
    {
      id: 'TC001',
      codigo: 'TC001',
      nombre: 'Torta Cuadrada de Chocolate',
      precio: 45000,
      descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.',
      categoria: 'Tortas Cuadradas',
      stock: 8,
      imagen: '/assets/images/productos/TC001.jpg',
      enOferta: false,
      ingredientes: ['Chocolate', 'Ganache', 'Avellanas', 'Harina', 'Huevos'],
      personalizable: true
    },
    {
      id: 'TC002',
      codigo: 'TC002',
      nombre: 'Torta Cuadrada de Frutas',
      precio: 50000,
      descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.',
      categoria: 'Tortas Cuadradas',
      stock: 6,
      imagen: '/assets/images/productos/TC002.jpg',
      enOferta: false,
      ingredientes: ['Frutas frescas', 'Crema chantilly', 'Bizcocho de vainilla'],
      personalizable: true
    },
  
    // TORTAS CIRCULARES
    {
      id: 'TT001',
      codigo: 'TT001',
      nombre: 'Torta Circular de Vainilla',
      precio: 40000,
      descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.',
      categoria: 'Tortas Circulares',
      stock: 10,
      imagen: '/assets/images/productos/TT001.jpg',
      enOferta: false,
      ingredientes: ['Vainilla', 'Crema pastelera', 'Glaseado'],
      personalizable: true
    },
    {
      id: 'TT002',
      codigo: 'TT002',
      nombre: 'Torta Circular de Manjar',
      precio: 42000,
      descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.',
      categoria: 'Tortas Circulares',
      stock: 9,
      imagen: '/assets/images/productos/TT002.jpg',
      enOferta: false,
      ingredientes: ['Manjar', 'Nueces', 'Bizcocho'],
      personalizable: true
    },
  
    // POSTRES INDIVIDUALES
    {
      id: 'PI001',
      codigo: 'PI001',
      nombre: 'Mousse de Chocolate',
      precio: 5000,
      descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.',
      categoria: 'Postres Individuales',
      stock: 25,
      imagen: '/assets/images/productos/PI001.jpg',
      enOferta: true,
      precioOriginal: 6000,
      ingredientes: ['Chocolate premium', 'Crema', 'Azúcar'],
      personalizable: false
    },
    {
      id: 'PI002',
      codigo: 'PI002',
      nombre: 'Tiramisú Clásico',
      precio: 5500,
      descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.',
      categoria: 'Postres Individuales',
      stock: 20,
      imagen: '/assets/images/productos/PI002.jpg',
      enOferta: false,
      ingredientes: ['Café', 'Mascarpone', 'Cacao', 'Bizcochos'],
      personalizable: false
    },
  
    // PRODUCTOS SIN AZÚCAR
    {
      id: 'PSA001',
      codigo: 'PSA001',
      nombre: 'Torta Sin Azúcar de Naranja',
      precio: 48000,
      descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.',
      categoria: 'Productos Sin Azúcar',
      stock: 5,
      imagen: '/assets/images/productos/PSA001.jpg',
      enOferta: false,
      ingredientes: ['Naranja', 'Edulcorante natural', 'Harina integral'],
      personalizable: true,
      especial: 'Sin azúcar'
    },
    {
      id: 'PSA002',
      codigo: 'PSA002',
      nombre: 'Cheesecake Sin Azúcar',
      precio: 47000,
      descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.',
      categoria: 'Productos Sin Azúcar',
      stock: 4,
      imagen: '/assets/images/productos/PSA002.jpg',
      enOferta: true,
      precioOriginal: 52000,
      ingredientes: ['Queso crema', 'Edulcorante natural', 'Base de galleta'],
      personalizable: false,
      especial: 'Sin azúcar'
    },
  
    // PASTELERÍA TRADICIONAL
    {
      id: 'PT001',
      codigo: 'PT001',
      nombre: 'Empanada de Manzana',
      precio: 3000,
      descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.',
      categoria: 'Pastelería Tradicional',
      stock: 40,
      imagen: '/assets/images/productos/PT001.jpg',
      enOferta: false,
      ingredientes: ['Manzana', 'Canela', 'Masa hojaldrada'],
      personalizable: false
    },
    {
      id: 'PT002',
      codigo: 'PT002',
      nombre: 'Tarta de Santiago',
      precio: 6000,
      descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.',
      categoria: 'Pastelería Tradicional',
      stock: 15,
      imagen: '/assets/images/productos/PT002.jpg',
      enOferta: false,
      ingredientes: ['Almendras', 'Azúcar', 'Huevos', 'Limón'],
      personalizable: false
    },
  
    // PRODUCTOS SIN GLUTEN
    {
      id: 'PG001',
      codigo: 'PG001',
      nombre: 'Brownie Sin Gluten',
      precio: 4000,
      descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.',
      categoria: 'Productos Sin Gluten',
      stock: 18,
      imagen: '/assets/images/productos/PG001.jpg',
      enOferta: false,
      ingredientes: ['Chocolate', 'Harina sin gluten', 'Nueces'],
      personalizable: false,
      especial: 'Sin gluten'
    },
    {
      id: 'PG002',
      codigo: 'PG002',
      nombre: 'Pan Sin Gluten',
      precio: 3500,
      descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.',
      categoria: 'Productos Sin Gluten',
      stock: 22,
      imagen: '/assets/images/productos/PG002.jpg',
      enOferta: false,
      ingredientes: ['Harina sin gluten', 'Levadura', 'Semillas'],
      personalizable: false,
      especial: 'Sin gluten'
    },
  
    // PRODUCTOS VEGANOS
    {
      id: 'PV001',
      codigo: 'PV001',
      nombre: 'Torta Vegana de Chocolate',
      precio: 50000,
      descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.',
      categoria: 'Productos Veganos',
      stock: 7,
      imagen: '/assets/images/productos/PV001.jpg',
      enOferta: false,
      ingredientes: ['Chocolate vegano', 'Leche de almendras', 'Harina', 'Aceite de coco'],
      personalizable: true,
      especial: 'Vegano'
    },
    {
      id: 'PV002',
      codigo: 'PV002',
      nombre: 'Galletas Veganas de Avena',
      precio: 4500,
      descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.',
      categoria: 'Productos Veganos',
      stock: 30,
      imagen: '/assets/images/productos/PV002.jpg',
      enOferta: true,
      precioOriginal: 5500,
      ingredientes: ['Avena', 'Aceite de coco', 'Jarabe de maple', 'Chispas de chocolate vegano'],
      personalizable: false,
      especial: 'Vegano'
    },
  
    // TORTAS ESPECIALES
    {
      id: 'TE001',
      codigo: 'TE001',
      nombre: 'Torta Especial de Cumpleaños',
      precio: 55000,
      descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.',
      categoria: 'Tortas Especiales',
      stock: 5,
      imagen: '/assets/images/productos/TE001.jpg',
      enOferta: false,
      ingredientes: ['A elección', 'Decoraciones premium', 'Mensaje personalizado'],
      personalizable: true,
      especial: 'Personalizable 100%'
    },
    {
      id: 'TE002',
      codigo: 'TE002',
      nombre: 'Torta Especial de Boda',
      precio: 60000,
      descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.',
      categoria: 'Tortas Especiales',
      stock: 3,
      imagen: '/assets/images/productos/TE002.jpg',
      enOferta: false,
      ingredientes: ['Múltiples capas', 'Decoración elegante', 'Sabores a elección'],
      personalizable: true,
      especial: 'Premium - Bodas'
    }
  ];
  
  let usuarios = [
    {
      id: 1,
      nombre: 'Admin',
      apellidos: 'Admintest',
      email: 'Test@pasteleria.cl',
      password: '123456',
      rol: 'admin',
      telefono: '+56912345678'
    },
    {
      id: 2,
      nombre: 'María',
      apellidos: 'González',
      email: 'maria@example.cl',
      password: '123456',
      rol: 'cliente',
      telefono: '+56987654321'
    }
  ];
  
  let ordenes = [];
  
  let categorias = [
    { 
      id: 1, 
      nombre: 'Tortas Cuadradas', 
      descripcion: 'Tortas cuadradas personalizables para todas tus celebraciones',
      icono: 'bi-box2-heart-fill'  // ⭐ MEJOR opción
    },
    { 
      id: 2, 
      nombre: 'Tortas Circulares', 
      descripcion: 'Clásicas tortas redondas tradicionales y elegantes',
      icono: 'bi-emoji-smile-fill'  // ⭐ Cara feliz circular
    },
    { 
      id: 3, 
      nombre: 'Postres Individuales', 
      descripcion: 'Delicias individuales perfectas para compartir',
      icono: 'bi-gift-fill'  // ⭐ Regalo/sorpresa
    },
    { 
      id: 4, 
      nombre: 'Productos Sin Azúcar', 
      descripcion: 'Opciones saludables sin sacrificar el sabor',
      icono: 'bi-heart-pulse-fill'
    },
    { 
      id: 5, 
      nombre: 'Pastelería Tradicional', 
      descripcion: 'Recetas tradicionales de generación en generación',
      icono: 'bi-house-heart-fill'  // ⭐ Hogar con corazón
    },
    { 
      id: 6, 
      nombre: 'Productos Sin Gluten', 
      descripcion: 'Aptos para celíacos sin comprometer el sabor',
      icono: 'bi-shield-fill-check'
    },
    { 
      id: 7, 
      nombre: 'Productos Veganos', 
      descripcion: '100% plant-based y delicioso',
      icono: 'bi-flower2'
    },
    { 
      id: 8, 
      nombre: 'Tortas Especiales', 
      descripcion: 'Diseños únicos para eventos inolvidables',
      icono: 'bi-stars'  // ⭐ Estrellas brillantes
    }
  ];
  
  
  
  
  let blogs = [
    {
      id: 1,
      titulo: '50 Años de Dulzura: Nuestra Historia',
      contenido: 'Desde 1975, Pastelería Mil Sabores ha sido sinónimo de calidad y tradición en Chile. Conoce nuestra increíble historia que incluye un récord Guinness.',
      autor: 'Chef Patricia González',
      fecha: '2025-10-10',
      imagen: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?w=600',
      categoria: 'Historia'
    },
    {
      id: 2,
      titulo: 'Récord Guinness 1995: La Torta Más Grande del Mundo',
      contenido: 'En 1995 fuimos parte de la creación de la torta más grande del mundo. Descubre los detalles de esta hazaña histórica.',
      autor: 'Equipo Editorial',
      fecha: '2025-10-05',
      imagen: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600',
      categoria: 'Historia'
    }
  ];
  
  // ========================================
  // SERVICIOS CRUD
  // ========================================
  
  export const productosService = {
    getAll: () => [...productos],
    getById: (id) => productos.find(p => p.id === id || p.codigo === id),
    getByCategoria: (categoria) => productos.filter(p => p.categoria === categoria),
    getOfertas: () => productos.filter(p => p.enOferta === true),
    buscar: (termino) => {
      const terminoLower = termino.toLowerCase();
      return productos.filter(p => 
        p.nombre.toLowerCase().includes(terminoLower) ||
        p.descripcion.toLowerCase().includes(terminoLower) ||
        p.categoria.toLowerCase().includes(terminoLower) ||
        p.codigo.toLowerCase().includes(terminoLower)
      );
    },
    create: (producto) => {
      const nuevoProducto = {
        ...producto,
        id: `PROD${Date.now()}`,
        codigo: `PROD${Date.now()}`
      };
      productos.push(nuevoProducto);
      return nuevoProducto;
    },
    update: (id, productoActualizado) => {
      const index = productos.findIndex(p => p.id === id || p.codigo === id);
      if (index !== -1) {
        productos[index] = { ...productos[index], ...productoActualizado };
        return productos[index];
      }
      return null;
    },
    delete: (id) => {
      const index = productos.findIndex(p => p.id === id || p.codigo === id);
      if (index !== -1) {
        productos.splice(index, 1);
        return true;
      }
      return false;
    }
  };
  
  export const usuariosService = {
    getAll: () => [...usuarios],
    getById: (id) => usuarios.find(u => u.id === parseInt(id)),
    getByEmail: (email) => usuarios.find(u => u.email === email),
    create: (usuario) => {
      const nuevoUsuario = {
        ...usuario,
        id: Math.max(...usuarios.map(u => u.id), 0) + 1,
        rol: 'cliente'
      };
      usuarios.push(nuevoUsuario);
      return nuevoUsuario;
    },
    update: (id, usuarioActualizado) => {
      const index = usuarios.findIndex(u => u.id === parseInt(id));
      if (index !== -1) {
        usuarios[index] = { ...usuarios[index], ...usuarioActualizado };
        return usuarios[index];
      }
      return null;
    },
    delete: (id) => {
      const index = usuarios.findIndex(u => u.id === parseInt(id));
      if (index !== -1) {
        usuarios.splice(index, 1);
        return true;
      }
      return false;
    },
    login: (email, password) => {
      const usuario = usuarios.find(u => u.email === email && u.password === password);
      if (usuario) {
        const { password, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
      }
      return null;
    }
  };
  
export const ordenesService = {
  getAll: () => [...ordenes],
  getById: (id) => ordenes.find(o => o.id === parseInt(id)),
  getByUsuario: (usuarioId) => ordenes.filter(o => o.usuarioId === parseInt(usuarioId)),
  create: (orden) => {
    const nuevaOrden = {
      ...orden,
      id: Math.max(0, ...ordenes.map(o => o.id)) + 1,
      fecha: new Date().toISOString(),
      estado: 'pendiente',
      numeroOrden: `ORD${Date.now()}`,
      // Agregar campos adicionales para la boleta
      subtotal: orden.subtotal || 0,
      descuentos: orden.descuentos || 0,
      iva: orden.iva || 0,
      total: orden.total || 0,
      metodoPago: orden.metodoPago || 'tarjeta',
      datosEnvio: orden.datosEnvio || {},
      // Guardar en localStorage para persistencia
      timestamp: Date.now()
    };
    ordenes.push(nuevaOrden);
    
    // Guardar en localStorage para persistencia
    try {
      const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
      ordenesGuardadas.push(nuevaOrden);
      localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));
    } catch (error) {
      console.error('Error al guardar orden en localStorage:', error);
    }
    
    return nuevaOrden;
  },
  update: (id, ordenActualizada) => {
    const index = ordenes.findIndex(o => o.id === parseInt(id));
    if (index !== -1) {
      ordenes[index] = { ...ordenes[index], ...ordenActualizada };
      
      // Actualizar en localStorage
      try {
        const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
        const indexGuardado = ordenesGuardadas.findIndex(o => o.id === parseInt(id));
        if (indexGuardado !== -1) {
          ordenesGuardadas[indexGuardado] = ordenes[index];
          localStorage.setItem('ordenes', JSON.stringify(ordenesGuardadas));
        }
      } catch (error) {
        console.error('Error al actualizar orden en localStorage:', error);
      }
      
      return ordenes[index];
    }
    return null;
  },
  // Cargar órdenes desde localStorage al inicializar
  loadFromStorage: () => {
    try {
      const ordenesGuardadas = JSON.parse(localStorage.getItem('ordenes') || '[]');
      ordenes.push(...ordenesGuardadas);
    } catch (error) {
      console.error('Error al cargar órdenes desde localStorage:', error);
    }
  },
  // Obtener estadísticas para el admin
  getEstadisticas: () => {
    const totalOrdenes = ordenes.length;
    const ordenesCompletadas = ordenes.filter(o => o.estado === 'entregado').length;
    const totalVentas = ordenes.reduce((sum, o) => sum + (o.total || 0), 0);
    const ventasHoy = ordenes.filter(o => {
      const hoy = new Date().toDateString();
      const fechaOrden = new Date(o.fecha).toDateString();
      return hoy === fechaOrden;
    }).reduce((sum, o) => sum + (o.total || 0), 0);
    
    return {
      totalOrdenes,
      ordenesCompletadas,
      totalVentas,
      ventasHoy,
      ordenesPendientes: ordenes.filter(o => o.estado === 'pendiente').length,
      ordenesEnProceso: ordenes.filter(o => ['confirmado', 'preparando', 'listo', 'enviado'].includes(o.estado)).length
    };
  }
};
  
  export const categoriasService = {
    getAll: () => [...categorias],
    getById: (id) => categorias.find(c => c.id === parseInt(id)),
    create: (categoria) => {
      const nuevaCategoria = {
        ...categoria,
        id: Math.max(...categorias.map(c => c.id), 0) + 1
      };
      categorias.push(nuevaCategoria);
      return nuevaCategoria;
    },
    update: (id, categoriaActualizada) => {
      const index = categorias.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        categorias[index] = { ...categorias[index], ...categoriaActualizada };
        return categorias[index];
      }
      return null;
    },
    delete: (id) => {
      const index = categorias.findIndex(c => c.id === parseInt(id));
      if (index !== -1) {
        categorias.splice(index, 1);
        return true;
      }
      return false;
    }
  };
  
  export const blogsService = {
    getAll: () => [...blogs],
    getById: (id) => blogs.find(b => b.id === parseInt(id))
  };
  
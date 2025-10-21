# 🍰 Pastelería Mil Sabores

Una aplicación web moderna para una pastelería tradicional con 50 años de historia, desarrollada con React y Bootstrap.

## 🌟 Características Principales

### 🛒 **Sistema de E-commerce Completo**
- **Catálogo de productos** con categorías organizadas
- **Carrito de compras** interactivo con gestión de cantidades
- **Proceso de checkout** completo con validación
- **Sistema de pagos** simulado
- **Boletas PDF** generadas automáticamente
- **Gestión de stock** en tiempo real

### 👤 **Gestión de Usuarios**
- **Registro de usuarios** con validación completa
- **Sistema de autenticación** seguro
- **Perfil de usuario** con información personal
- **Recuperación de contraseñas**
- **Datos temporales** para compras sin registro
- **Roles diferenciados** (cliente/admin)

### 🏪 **Panel de Administración**
- **Dashboard principal** con estadísticas en tiempo real
- **Gestión de productos** (CRUD completo)
- **Gestión de usuarios** (CRUD completo)
- **Gestión de órdenes** con cambio de estados
- **Gestión de categorías** (CRUD completo)
- **Reportes y estadísticas** detalladas

### 🎁 **Sistema de Descuentos Avanzado**
- **Cupón 'FELICES50'**: 10% de descuento permanente
- **Descuento Senior**: 50% de descuento para usuarios mayores de 50 años
- **Beneficios DUOC**: Tortas gratis en cumpleaños para estudiantes @duocuc.cl
- **Cálculos automáticos** de IVA y totales

### 📱 **Notificaciones en Tiempo Real**
- **Seguimiento de pedidos** desde confirmación hasta entrega
- **Estados del pedido**: Confirmado → Preparando → Listo → Enviado → Entregado
- **Notificaciones push-like** en la barra de navegación
- **Historial completo** de notificaciones

### 📄 **Generación de Boletas PDF**
- **Boletas descargables** en formato PDF profesional
- **Información completa** del pedido y cliente
- **Cálculos detallados** de descuentos e IVA
- **Diseño corporativo** con branding de la pastelería

## 🚀 Tecnologías Utilizadas

### **Frontend**
- **React 18** con Hooks modernos
- **React Router DOM** para navegación
- **Bootstrap 5** para UI responsive
- **Bootstrap Icons** para iconografía
- **React Bootstrap** para componentes UI

### **Funcionalidades Especiales**
- **React DatePicker** para selección de fechas
- **jsPDF** para generación de documentos PDF
- **jspdf-autotable** para tablas en PDF
- **html2canvas** para captura de elementos HTML
- **LocalStorage** para persistencia de datos
- **Google Maps** integrado para ubicación

### **Testing**
- **Jest** para testing unitario
- **React Testing Library** para testing de componentes
- **Karma** para test runner adicional

### **Herramientas de Desarrollo**
- **Create React App** como base del proyecto
- **ESLint** para calidad de código
- **date-fns** para manipulación de fechas
- **axios** para cliente HTTP (preparado para APIs)

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── admin/           # Panel de administración
│   │   ├── Dashboard.jsx
│   │   ├── ProductoAdmin.jsx
│   │   ├── UsuarioAdmin.jsx
│   │   ├── OrdenesAdmin.jsx
│   │   ├── CategoriaAdmin.jsx
│   │   └── Reportes.jsx
│   ├── auth/            # Autenticación y registro
│   ├── carrito/         # Carrito de compras y checkout
│   ├── layout/          # Componentes de layout (Header, Navbar, Footer)
│   ├── productos/       # Gestión de productos
│   └── ui/              # Componentes UI reutilizables
├── data/                # Servicios de datos y regiones
├── services/            # Servicios (PDF, notificaciones)
├── theme/               # Configuración de colores
├── tests/               # Pruebas unitarias
├── utils/               # Utilidades y helpers
└── hooks/               # Custom hooks
```

## 🎯 Funcionalidades Detalladas

### **🏠 Página Principal**
- Hero banner con información de la pastelería
- Productos destacados
- Información sobre beneficios especiales
- Enlaces a secciones principales

### **🛍️ Catálogo de Productos**
- **Categorías**: Tortas, Pasteles, Postres, etc.
- **Filtros** por categoría y precio
- **Búsqueda** de productos
- **Detalles** completos de cada producto
- **Gestión de stock** y disponibilidad

### **🛒 Carrito de Compras**
- **Gestión de cantidades** con botones +/-
- **Eliminación** de productos individuales
- **Vaciar carrito** completo
- **Cálculo automático** de totales
- **Aplicación de cupones** de descuento
- **Descuentos automáticos** según perfil de usuario

### **👤 Sistema de Usuarios**

#### **Registro Avanzado**
- **Información personal**: Nombre, apellidos, email, teléfono
- **Fecha de nacimiento** con calendario interactivo
- **Región de Chile** con selector y búsqueda
- **Validación** de email único
- **Cálculo automático** de edad y beneficios

#### **Perfil de Usuario**
- **Información personal** editable
- **Historial de pedidos** completo
- **Beneficios especiales** según perfil
- **Configuración de seguridad**

### **🎁 Beneficios Especiales**

#### **Descuento Senior (50%)**
- Aplicado automáticamente a usuarios ≥50 años
- Descuento permanente en todas las compras
- Visible en el carrito y perfil de usuario

#### **Beneficios DUOC**
- **Tortas gratis** en cumpleaños para estudiantes @duocuc.cl
- **Cálculo automático** del próximo beneficio
- **Notificaciones** especiales para estudiantes

#### **Cupón FELICES50**
- **10% de descuento** permanente
- **Validación** en tiempo real
- **Aplicación** automática en el carrito

### **📱 Sistema de Notificaciones**
- **Estados del pedido** en tiempo real
- **Notificaciones push** en la barra de navegación
- **Contador** de notificaciones no leídas
- **Historial completo** con timestamps
- **Marcado** como leído individual o masivo

### **📄 Generación de Boletas**
- **PDF profesional** con diseño corporativo
- **Información completa** del pedido
- **Detalles del cliente** y productos
- **Cálculos detallados** de descuentos e IVA
- **Descarga automática** al completar compra

### **🗺️ Información de Ubicación**
- **Mapa de Google Maps** integrado
- **Ubicación**: Santiago Centro, Chile
- **Información de contacto** completa
- **Horarios de atención**

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js (versión 16 o superior)
- npm o yarn

### **Instalación**
```bash
# Clonar el repositorio
git clone [url-del-repositorio]

# Navegar al directorio
cd pasteleria-mil-sabores

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

### **Scripts Disponibles**
```bash
# Desarrollo
npm start          # Inicia servidor en http://localhost:3000

# Testing
npm test           # Ejecuta pruebas unitarias
npm run test:karma # Ejecuta tests con Karma
npm run test:coverage # Tests con reporte de cobertura

# Producción
npm run build      # Construye la aplicación para producción

# Análisis
npm run eject      # Expone configuración (irreversible)
```

## 📋 Datos de Prueba

### **Usuarios de Prueba**
- **Admin**: admin@pasteleria.cl / 123456
- **Cliente**: maria@example.cl / 123456

### **Cupones de Descuento**
- **FELICES50**: 10% de descuento

### **Productos de Prueba**
- 14 productos en 8 categorías diferentes
- Productos con ofertas y precios especiales
- Productos personalizables y especiales (sin gluten, veganos, etc.)

## 🎨 Diseño y UX

### **Paleta de Colores**
- **Chocolate**: Color principal (#8B4513)
- **Rosa**: Color de acento (#FFC0CB)
- **Blanco**: Fondo principal (#FFFFFF)
- **Gris**: Texto secundario (#6C757D)

### **Tipografía**
- **Títulos**: Fuente personalizada para headings
- **Cuerpo**: Fuente del sistema para legibilidad
- **Iconos**: Bootstrap Icons para consistencia

### **Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Adaptación a tablets y desktop
- **Navegación**: Menú hamburguesa en móviles

## 🔧 Configuración Avanzada

### **Variables de Entorno**
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_APP_NAME=Pastelería Mil Sabores
REACT_APP_GOOGLE_MAPS_API_KEY=tu_api_key
```

### **Personalización**
- **Colores**: Modificar `src/theme/colors.js`
- **Configuración**: Editar `src/config/siteConfig.js`
- **Datos**: Actualizar `src/data/dataService.js`
- **Estilos**: Editar `src/App.css` y `src/index.css`

## 📊 Características Técnicas

### **Estado de la Aplicación**
- **React Hooks** para gestión de estado
- **LocalStorage** para persistencia
- **Context API** para estado global

### **Rendimiento**
- **Lazy Loading** de componentes
- **Memoización** de cálculos pesados
- **Optimización** de re-renders

### **Accesibilidad**
- **ARIA labels** en elementos interactivos
- **Navegación por teclado** completa
- **Contraste** de colores optimizado

## 🧪 Testing

### **Cobertura de Pruebas**
- **Componentes**: Pruebas unitarias con Jest y React Testing Library
- **Servicios**: Pruebas de lógica de negocio
- **Integración**: Pruebas de flujos completos
- **Mocks completos** para todas las dependencias

### **Ejecutar Pruebas**
```bash
npm test                    # Modo interactivo
npm test -- --coverage     # Con reporte de cobertura
npm run test:karma         # Con Karma
```

### **Estructura de Tests**
- **Componentes**: Tests de renderizado, eventos y props
- **Servicios**: Tests de funciones de datos
- **Utilidades**: Tests de funciones helper

## 🚀 Despliegue

### **Build de Producción**
```bash
npm run build
```

### **Servir Localmente**
```bash
npx serve -s build
```

### **Despliegue en Netlify/Vercel**
- Conectar repositorio
- Configurar build command: `npm run build`
- Configurar publish directory: `build`

### **Configuración de Servidor**
El proyecto está configurado para funcionar con:
- Servidores Apache/Nginx
- CDNs
- Plataformas como Netlify, Vercel, etc.

## 🔄 Funcionalidades Futuras

### **Próximas Implementaciones**
- [ ] Integración con APIs reales
- [ ] Sistema de pagos online
- [ ] Notificaciones push
- [ ] App móvil
- [ ] Sistema de reviews
- [ ] Chat de soporte
- [ ] Analytics avanzados

## 🤝 Contribución

### **Estructura de Commits**
```
feat: nueva funcionalidad
fix: corrección de bug
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: añadir o modificar pruebas
```

### **Flujo de Trabajo**
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: añadir nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### **Estándares de Código**
- Usar ESLint configurado
- Seguir convenciones de React
- Escribir tests para nuevas funcionalidades
- Documentar código complejo

## 📞 Contacto y Soporte

### **Información de Contacto**
- **Email**: contacto@mil-sabores.cl
- **Soporte técnico**: soporte@mil-sabores.cl
- **Teléfono**: +56 2 2345 6789
- **Dirección**: Av. Libertador Bernardo O'Higgins 1234, Santiago Centro, Chile
- **Horarios**: Lunes a Viernes 8:00-20:00, Sábados 9:00-18:00, Domingos 10:00-16:00

### **Recursos**
- Documentación: [Enlace a documentación]
- Issues: [Enlace a GitHub Issues]

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Diseño UX/UI**: [Nombre del Diseñador]
- **Pastelería Mil Sabores**: 50 años de tradición

---

*Desarrollado con ❤️ para Pastelería Mil Sabores - Endulzando vidas desde 1975*

**Sistema completo de e-commerce para pastelería con panel de administración funcional**
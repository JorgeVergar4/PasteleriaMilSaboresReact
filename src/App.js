// Este archivo es el corazón de la aplicación React: aquí se define toda la estructura principal,
// las rutas y la lógica central como el manejo del carrito y del usuario.

import React, { useState, useEffect } from 'react';
// useState permite guardar valores (como el carrito o el usuario) que pueden cambiar.
// useEffect ejecuta código automáticamente cuando el componente se carga o cuando cambian ciertos datos.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Estas importaciones permiten crear una navegación sin recargar la página.
// Router agrupa las rutas, Routes contiene todas las páginas y Route define cada una.

import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos estilos de Bootstrap para ofrecer un diseño profesional.
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importamos íconos de Bootstrap.


// --- COMPONENTES DE ESTRUCTURA ---
import Header from './layout/Header'; // Encabezado superior (logo o nombre del negocio)
import Navbar from './layout/Navbar'; // Menú de navegación principal
import Footer from './layout/Footer'; // Pie de página de la web


// --- PÁGINAS PÚBLICAS ---
import Home from './pages/Home';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contacto from './pages/Contacto';
import Ofertas from './pages/Ofertas';


// --- PRODUCTOS ---
import ProductList from './components/productos/ProductList';
import ProductDetail from './components/productos/ProductDetail';
import Categorias from './components/productos/Categorias';


// --- CARRITO DE COMPRAS ---
import CarritoCompra from './components/carrito/CarritoCompra';
import Checkout from './components/carrito/Checkout';
import PagoExitoso from './components/carrito/PagoExitoso';
import PagoError from './components/carrito/PagoError';


// --- AUTENTICACIÓN ---
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import Perfil from './components/auth/Perfil';
import RecuperarPassword from './components/auth/RecuperarPassword';


// --- ADMINISTRADOR ---
import Dashboard from './components/admin/Dashboard';


// --- CONTROL DE ERRORES ---
import ErrorBoundary from './components/ui/ErrorBoundary'; 
// Previene que toda la app se rompa si ocurre un error en un componente.


// --- CONFIGURACIONES INICIALES ---
import { initializeApp } from './utils/initializeApp';


import './App.css'; // Estilos generales.


function App() {
  // --- ESTADOS PRINCIPALES ---
  const [carrito, setCarrito] = useState([]);  // Guarda los productos añadidos al carrito.
  const [usuario, setUsuario] = useState(null); // Información del usuario logueado.

  // --- CARGA DE DATOS INICIALES ---
  useEffect(() => {
    initializeApp(); // Inicializa configuraciones de la app.

    // Cargar carrito guardado en localStorage
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        setCarrito(JSON.parse(carritoGuardado));
      } catch (error) {
        console.error('Error al cargar carrito:', error);
      }
    }

    // Cargar usuario guardado
    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      try {
        setUsuario(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    }
  }, []);

  // Cada vez que el carrito cambie, se guarda automáticamente en el almacenamiento local.
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);


  // --- FUNCIONES DEL CARRITO ---

  // Agrega productos al carrito
  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find(item => item.id === producto.id);
    
    if (productoExistente) {
      // Si el producto ya existe, solo aumenta la cantidad
      setCarrito(carrito.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      // Si es nuevo, lo agrega con cantidad 1
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId) => {
    setCarrito(carrito.filter(item => item.id !== productoId));
  };

  // Actualizar cantidad manualmente
  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(productoId);
    } else {
      setCarrito(carrito.map(item =>
        item.id === productoId
          ? { ...item, cantidad: cantidad }
          : item
      ));
    }
  };

  // Vaciar carrito por completo
  const limpiarCarrito = () => {
    setCarrito([]);
  };

  // Calcular el total de la compra
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  };


  // --- ESTRUCTURA VISUAL PRINCIPAL ---
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Header />
          <Navbar 
            carritoCount={carrito.length} 
            carritoTotal={calcularTotal()} 
            usuario={usuario} 
          />

          {/* Contenido principal, cambia dinámicamente según la ruta */}
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
            <Routes>

              {/* Rutas principales */}
              <Route path="/" element={<Home agregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />

              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />

              {/* Productos */}
              <Route path="/productos" element={<ProductList agregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/producto/:id" element={<ProductDetail agregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categoria/:nombre" element={<ProductList agregarAlCarrito={agregarAlCarrito} />} />
              <Route path="/ofertas" element={<Ofertas agregarAlCarrito={agregarAlCarrito} />} />

              {/* Carrito */}
              <Route 
                path="/carrito" 
                element={
                  <CarritoCompra 
                    carrito={carrito}
                    eliminarDelCarrito={eliminarDelCarrito}
                    actualizarCantidad={actualizarCantidad}
                    limpiarCarrito={limpiarCarrito}
                    calcularTotal={calcularTotal}
                    usuario={usuario}
                  />
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <Checkout 
                    carrito={carrito}
                    calcularTotal={calcularTotal}
                    limpiarCarrito={limpiarCarrito}
                    usuario={usuario}
                  />
                } 
              />
              <Route path="/pago-exitoso" element={<PagoExitoso usuario={usuario} />} />
              <Route path="/pago-error" element={<PagoError />} />

              {/* Autenticación */}
              <Route path="/login" element={<Login setUsuario={setUsuario} />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperar-password" element={<RecuperarPassword />} />
              <Route path="/perfil" element={<Perfil usuario={usuario} setUsuario={setUsuario} />} />

              {/* Administración */}
              <Route path="/admin/*" element={<Dashboard usuario={usuario} />} />

            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App; // Exporta el componente principal para que sea usado en index.jsx

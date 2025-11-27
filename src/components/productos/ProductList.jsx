import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '../../services/productService';

const ProductList = ({ agregarAlCarrito }) => {
  const { nombre } = useParams();

  const [productos, setProductos] = useState([]);              // productos desde la API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // 1) Cargar productos desde el backend al montar
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        console.log('Productos desde API en ProductList:', data);
        setProductos(data);
      } catch (err) {
        console.error('Error cargando productos desde API:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 2) Ajustar categoría seleccionada según la URL (/categoria/:nombre)
  useEffect(() => {
    if (nombre) {
      setCategoriaSeleccionada(nombre);
    } else {
      setCategoriaSeleccionada('');
    }
  }, [nombre]);

  // 3) Obtener lista de categorías desde los productos (en vez de categoriasService)
  const categorias = useMemo(() => {
    const nombres = new Set();
    productos.forEach(p => {
      if (p.category || p.categoria || p.categoryName) {
        nombres.add(p.category || p.categoria || p.categoryName);
      }
    });
    return Array.from(nombres).map((nombre, index) => ({
      id: index + 1,
      nombre,
    }));
  }, [productos]);

  // 4) Aplicar filtros (categoría, tamaño, búsqueda) sobre los productos
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const nombreProd = (p.name || p.nombre || '').toLowerCase();
      const categoriaProd = (p.category || p.categoria || '').toLowerCase();
      const tamañoProd = (p.size || p.tamaño || '').toLowerCase();

      // filtro por categoría (si hay)
      if (categoriaSeleccionada && categoriaProd !== categoriaSeleccionada.toLowerCase()) {
        return false;
      }

      // filtro por tamaño (si decides usarlo)
      if (tamañoSeleccionado && tamañoProd !== tamañoSeleccionado.toLowerCase()) {
        return false;
      }

      // filtro por búsqueda
      if (busqueda && !nombreProd.includes(busqueda.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [productos, categoriaSeleccionada, tamañoSeleccionado, busqueda]);

  // 5) Handlers
  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handleTamañoClick = (tamaño) => {
    setTamañoSeleccionado(tamaño);
  };

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  // 6) Estados de carga/error
  if (loading) {
    return (
      <div className="text-center py-5">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p>{error}</p>
      </div>
    );
  }

  // 7) Render
  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      <Container className="py-section">
        <div className="section-title text-center mb-5">
          <h2>{nombre || 'Todos los Productos'}</h2>
          <p>Encuentra tu dulce favorito</p>
        </div>

        <Row>
          {/* Sidebar de Filtros */}
          <Col lg={3} className="mb-4">
            <div
              style={{
                background: 'white',
                borderRadius: '15px',
                padding: '25px',
                boxShadow: '0 8px 25px rgba(139, 69, 19, 0.1)',
                border: '1px solid rgba(255, 192, 203, 0.2)',
                position: 'sticky',
                top: '20px',
              }}
            >
              {/* Filtro por Categoría */}
              <div className="mb-4">
                <h5
                  style={{
                    fontFamily: 'var(--font-headings)',
                    color: 'var(--accent-chocolate)',
                    fontSize: '1.3rem',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Filtrar por Categoría
                </h5>

                <div className="d-grid gap-2">
                  <Button
                    variant={categoriaSeleccionada === '' ? 'primary' : 'outline-primary'}
                    onClick={() => handleCategoriaClick('')}
                    style={{
                      background:
                        categoriaSeleccionada === '' ? 'var(--accent-chocolate)' : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color: categoriaSeleccionada === '' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Todas
                  </Button>

                  {categorias.map((categoria) => (
                    <Button
                      key={categoria.id}
                      variant={
                        categoriaSeleccionada === categoria.nombre ? 'primary' : 'outline-primary'
                      }
                      onClick={() => handleCategoriaClick(categoria.nombre)}
                      style={{
                        background:
                          categoriaSeleccionada === categoria.nombre
                            ? 'var(--accent-chocolate)'
                            : 'transparent',
                        borderColor: 'var(--accent-chocolate)',
                        color:
                          categoriaSeleccionada === categoria.nombre
                            ? 'white'
                            : 'var(--accent-chocolate)',
                        fontWeight: '600',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        border: '2px solid var(--accent-chocolate)',
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                      }}
                    >
                      {categoria.nombre}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtro por Tamaño */}
              <div className="mb-4">
                <h5
                  style={{
                    fontFamily: 'var(--font-headings)',
                    color: 'var(--accent-chocolate)',
                    fontSize: '1.3rem',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                  }}
                >
                  Filtrar por Tamaño
                </h5>

                <div className="d-grid gap-2">
                  <Button
                    variant={tamañoSeleccionado === '' ? 'primary' : 'outline-primary'}
                    onClick={() => handleTamañoClick('')}
                    style={{
                      background:
                        tamañoSeleccionado === '' ? 'var(--accent-chocolate)' : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color: tamañoSeleccionado === '' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Todos
                  </Button>

                  <Button
                    variant={tamañoSeleccionado === 'Familiar' ? 'primary' : 'outline-primary'}
                    onClick={() => handleTamañoClick('Familiar')}
                    style={{
                      background:
                        tamañoSeleccionado === 'Familiar'
                          ? 'var(--accent-chocolate)'
                          : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color:
                        tamañoSeleccionado === 'Familiar' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Familiar
                  </Button>
                </div>
              </div>

              {/* Barra de Búsqueda */}
              <div>
                <h5
                  style={{
                    fontFamily: 'var(--font-headings)',
                    color: 'var(--accent-chocolate)',
                    fontSize: '1.3rem',
                    marginBottom: '15px',
                    fontWeight: 'bold',
                  }}
                >
                  Buscar Productos
                </h5>
                <Form.Control
                  type="text"
                  placeholder="Buscar por nombre..."
                  value={busqueda}
                  onChange={handleBusqueda}
                  style={{
                    borderColor: 'var(--accent-pink)',
                    borderRadius: '10px',
                    padding: '12px 15px',
                    border: '2px solid #f0f0f0',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent-pink)')}
                  onBlur={(e) => (e.target.style.borderColor = '#f0f0f0')}
                />
              </div>
            </div>
          </Col>

          {/* Área de Productos */}
          <Col lg={9}>
            {productosFiltrados.length === 0 ? (
              <div className="text-center py-5">
                <i
                  className="bi bi-search"
                  style={{ fontSize: '4rem', color: 'var(--text-secondary)' }}
                ></i>
                <h4 className="mt-3" style={{ color: 'var(--text-main)' }}>
                  No se encontraron productos
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
              </div>
            ) : (
              <div className="product-grid">
                {productosFiltrados.map((producto) => (
                  <ProductCard
                    key={producto.id}
                    producto={producto}
                    agregarAlCarrito={agregarAlCarrito}
                  />
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;

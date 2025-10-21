import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { productosService, categoriasService } from '../../data/dataService';

const ProductList = ({ agregarAlCarrito }) => {
  const { nombre } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [tamañoSeleccionado, setTamañoSeleccionado] = useState('');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    if (nombre) {
      setProductos(productosService.getByCategoria(nombre));
      setCategoriaSeleccionada(nombre);
    } else {
      setProductos(productosService.getAll());
    }
  }, [nombre]);

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);
    
    if (categoria === '') {
      setProductos(productosService.getAll());
    } else {
      setProductos(productosService.getByCategoria(categoria));
    }
  };

  const handleTamañoClick = (tamaño) => {
    setTamañoSeleccionado(tamaño);
    // Aquí podrías implementar lógica de filtrado por tamaño si es necesario
  };

  const handleBusqueda = (e) => {
    const termino = e.target.value;
    setBusqueda(termino);
    
    if (termino === '') {
      if (categoriaSeleccionada) {
        setProductos(productosService.getByCategoria(categoriaSeleccionada));
      } else {
        setProductos(productosService.getAll());
      }
    } else {
      setProductos(productosService.buscar(termino));
    }
  };

  const categorias = categoriasService.getAll();

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
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '25px',
              boxShadow: '0 8px 25px rgba(139, 69, 19, 0.1)',
              border: '1px solid rgba(255, 192, 203, 0.2)',
              position: 'sticky',
              top: '20px'
            }}>
              {/* Filtro por Categoría */}
              <div className="mb-4">
                <h5 style={{
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  fontSize: '1.3rem',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>
                  Filtrar por Categoría
                </h5>
                
                <div className="d-grid gap-2">
                  <Button
                    variant={categoriaSeleccionada === '' ? 'primary' : 'outline-primary'}
                    onClick={() => handleCategoriaClick('')}
                    style={{
                      background: categoriaSeleccionada === '' ? 'var(--accent-chocolate)' : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color: categoriaSeleccionada === '' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (categoriaSeleccionada !== '') {
                        e.target.style.background = 'var(--accent-chocolate)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (categoriaSeleccionada !== '') {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--accent-chocolate)';
                      }
                    }}
                  >
                    Todas
                  </Button>
                  
                  {categorias.map(categoria => (
                    <Button
                      key={categoria.id}
                      variant={categoriaSeleccionada === categoria.nombre ? 'primary' : 'outline-primary'}
                      onClick={() => handleCategoriaClick(categoria.nombre)}
                      style={{
                        background: categoriaSeleccionada === categoria.nombre ? 'var(--accent-chocolate)' : 'transparent',
                        borderColor: 'var(--accent-chocolate)',
                        color: categoriaSeleccionada === categoria.nombre ? 'white' : 'var(--accent-chocolate)',
                        fontWeight: '600',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        border: '2px solid var(--accent-chocolate)',
                        transition: 'all 0.3s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (categoriaSeleccionada !== categoria.nombre) {
                          e.target.style.background = 'var(--accent-chocolate)';
                          e.target.style.color = 'white';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (categoriaSeleccionada !== categoria.nombre) {
                          e.target.style.background = 'transparent';
                          e.target.style.color = 'var(--accent-chocolate)';
                        }
                      }}
                    >
                      {categoria.nombre}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtro por Tamaño */}
              <div className="mb-4">
                <h5 style={{
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  fontSize: '1.3rem',
                  marginBottom: '20px',
                  fontWeight: 'bold'
                }}>
                  Filtrar por Tamaño
                </h5>
                
                <div className="d-grid gap-2">
                  <Button
                    variant={tamañoSeleccionado === '' ? 'primary' : 'outline-primary'}
                    onClick={() => handleTamañoClick('')}
                    style={{
                      background: tamañoSeleccionado === '' ? 'var(--accent-chocolate)' : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color: tamañoSeleccionado === '' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (tamañoSeleccionado !== '') {
                        e.target.style.background = 'var(--accent-chocolate)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tamañoSeleccionado !== '') {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--accent-chocolate)';
                      }
                    }}
                  >
                    Todos
                  </Button>
                  
                  <Button
                    variant={tamañoSeleccionado === 'Familiar' ? 'primary' : 'outline-primary'}
                    onClick={() => handleTamañoClick('Familiar')}
                    style={{
                      background: tamañoSeleccionado === 'Familiar' ? 'var(--accent-chocolate)' : 'transparent',
                      borderColor: 'var(--accent-chocolate)',
                      color: tamañoSeleccionado === 'Familiar' ? 'white' : 'var(--accent-chocolate)',
                      fontWeight: '600',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '2px solid var(--accent-chocolate)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (tamañoSeleccionado !== 'Familiar') {
                        e.target.style.background = 'var(--accent-chocolate)';
                        e.target.style.color = 'white';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tamañoSeleccionado !== 'Familiar') {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--accent-chocolate)';
                      }
                    }}
                  >
                    Familiar
                  </Button>
                </div>
              </div>

              {/* Barra de Búsqueda */}
              <div>
                <h5 style={{
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  fontSize: '1.3rem',
                  marginBottom: '15px',
                  fontWeight: 'bold'
                }}>
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
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-pink)'}
                  onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                />
              </div>
            </div>
          </Col>

          {/* Área de Productos */}
          <Col lg={9}>
            {productos.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '4rem', color: 'var(--text-secondary)' }}></i>
                <h4 className="mt-3" style={{ color: 'var(--text-main)' }}>
                  No se encontraron productos
                </h4>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
              </div>
            ) : (
              <div className="product-grid">
                {productos.map(producto => (
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

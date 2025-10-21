import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { categoriasService, productosService } from '../../data/dataService';

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [productosDestacados, setProductosDestacados] = useState([]);

  // Mapeo de imágenes por categoría desde Unsplash
  const imagenesCategoria = {
    'Tortas Cuadradas': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    'Tortas Circulares': 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
    'Postres Individuales': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop',
    'Productos Sin Azúcar': 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=600&h=400&fit=crop',
    'Pastelería Tradicional': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    'Productos Sin Gluten': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&h=400&fit=crop',
    'Productos Veganos': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop',
    'Tortas Especiales': 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=600&h=400&fit=crop'
  };

  useEffect(() => {
    setCategorias(categoriasService.getAll());
    setProductosDestacados(productosService.getOfertas().slice(0, 3));
  }, []);

  const contarProductosPorCategoria = (nombreCategoria) => {
    return productosService.getByCategoria(nombreCategoria).length;
  };

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: '100vh' }}>
      {/* Hero Section Dulce */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,192,203,0.95) 0%, rgba(255,228,236,0.95) 100%)',
        padding: '100px 0 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decoración de fondo */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(139,69,19,0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <Container style={{ position: 'relative', zIndex: 1 }}>
          <div className="text-center">
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.3)',
              padding: '10px 25px',
              borderRadius: '30px',
              marginBottom: '20px'
            }}>
              <span style={{ 
                color: 'var(--accent-chocolate)',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
                <i className="bi bi-stars me-2"></i>
                8 Categorías Deliciosas
              </span>
            </div>

            <h1 style={{ 
              fontFamily: 'var(--font-headings)', 
              fontSize: '4rem',
              marginBottom: '20px',
              color: 'var(--accent-chocolate)',
              textShadow: '2px 2px 4px rgba(255,255,255,0.5)'
            }}>
              Explora Nuestros Sabores
            </h1>
            <p style={{ 
              fontSize: '1.3rem',
              maxWidth: '700px',
              margin: '0 auto',
              color: 'var(--text-main)',
              lineHeight: '1.8'
            }}>
              Cada categoría es una aventura dulce. Encuentra tu favorita y déjate llevar 
              por el sabor de 50 años de tradición
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* Título de sección con decoración */}
        <div className="text-center mb-5">
          <div style={{
            display: 'inline-block',
            position: 'relative',
            paddingBottom: '15px'
          }}>
            <h2 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              fontSize: '2.8rem',
              marginBottom: 0
            }}>
              Categorías
            </h2>
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '4px',
              background: 'linear-gradient(90deg, transparent, var(--accent-pink), transparent)',
              borderRadius: '2px'
            }}></div>
          </div>
        </div>

        {/* Grid de Categorías con IMÁGENES */}
        <Row xs={1} md={2} lg={4} className="g-4 mb-5">
          {categorias.map(categoria => {
            const cantidadProductos = contarProductosPorCategoria(categoria.nombre);
            const imagenCategoria = imagenesCategoria[categoria.nombre] || 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&h=400&fit=crop';
            
            return (
              <Col key={categoria.id}>
                <Link 
                  to={`/categoria/${categoria.nombre}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Card 
                    className="h-100" 
                    style={{
                      border: 'none',
                      borderRadius: '20px',
                      boxShadow: '0 8px 25px rgba(255, 192, 203, 0.15)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 192, 203, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 192, 203, 0.15)';
                    }}
                  >
                    {/* Imagen de fondo con overlay */}
                    <div style={{
                      position: 'relative',
                      height: '200px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${imagenCategoria})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      ></div>
                      
                      {/* Overlay gradiente */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'linear-gradient(to top, rgba(255,192,203,0.9) 0%, rgba(255,192,203,0.3) 50%, transparent 100%)'
                      }}></div>

                      {/* Badge de cantidad */}
                      <Badge 
                        bg="light"
                        style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          background: 'rgba(255,255,255,0.95)',
                          color: 'var(--accent-chocolate)',
                          fontSize: '0.85rem',
                          padding: '8px 15px',
                          fontWeight: 'bold',
                          borderRadius: '20px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      >
                        {cantidadProductos} productos
                      </Badge>

                      {/* Ícono flotante */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '70px',
                        height: '70px',
                        background: 'linear-gradient(135deg, var(--accent-pink), #FFE4EC)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 20px rgba(255, 192, 203, 0.4)',
                        border: '4px solid white',
                        zIndex: 2
                      }}>
                        <i 
                          className={`bi ${categoria.icono}`}
                          style={{ 
                            fontSize: '2rem',
                            color: 'var(--accent-chocolate)'
                          }}
                        ></i>
                      </div>
                    </div>

                    <Card.Body className="text-center pt-5 pb-4" style={{
                      background: 'white'
                    }}>
                      <h4 style={{
                        fontFamily: 'var(--font-headings)',
                        color: 'var(--accent-chocolate)',
                        fontSize: '1.4rem',
                        marginBottom: '12px',
                        marginTop: '10px'
                      }}>
                        {categoria.nombre}
                      </h4>

                      <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        marginBottom: '0',
                        lineHeight: '1.6'
                      }}>
                        {categoria.descripcion}
                      </p>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>

        {/* Banner Promocional */}
        <Row className="mb-5">
          <Col>
            <div style={{
              background: 'linear-gradient(135deg, #FFE4EC 0%, #FFF5E1 100%)',
              padding: '50px',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              border: '3px solid var(--accent-pink)'
            }}>
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                fontSize: '200px',
                opacity: 0.1,
                color: 'var(--accent-chocolate)'
              }}>
                <i className="bi bi-cake2-fill"></i>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontFamily: 'var(--font-headings)',
                  fontSize: '2.5rem',
                  color: 'var(--accent-chocolate)',
                  marginBottom: '15px'
                }}>
                  ¿No sabes por dónde empezar?
                </h3>
                <p style={{ 
                  fontSize: '1.2rem', 
                  color: 'var(--text-main)',
                  marginBottom: '25px',
                  maxWidth: '600px',
                  margin: '0 auto 25px'
                }}>
                  Descubre nuestras <strong>ofertas especiales</strong> y productos más populares
                </p>
                <Link 
                  to="/ofertas"
                  className="btn"
                  style={{
                    background: 'var(--accent-pink)',
                    border: 'none',
                    color: 'var(--accent-chocolate)',
                    fontWeight: 'bold',
                    padding: '15px 40px',
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    boxShadow: '0 8px 20px rgba(255, 192, 203, 0.3)'
                  }}
                >
                  <i className="bi bi-tag-fill me-2"></i>
                  Ver Ofertas Especiales
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Productos Destacados */}
        {productosDestacados.length > 0 && (
          <>
            <div className="text-center mb-4">
              <div style={{
                display: 'inline-block',
                position: 'relative',
                paddingBottom: '15px'
              }}>
                <h2 style={{ 
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  fontSize: '2.5rem',
                  marginBottom: 0
                }}>
                  <i className="bi bi-fire me-3" style={{ color: 'var(--accent-pink)' }}></i>
                  Lo Más Popular
                </h2>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: '4px',
                  background: 'linear-gradient(90deg, transparent, var(--accent-pink), transparent)',
                  borderRadius: '2px'
                }}></div>
              </div>
            </div>

            <Row xs={1} md={3} className="g-4 mb-4">
              {productosDestacados.map(producto => (
                <Col key={producto.id}>
                  <Card className="h-100" style={{
                    border: 'none',
                    borderRadius: '20px',
                    boxShadow: '0 8px 25px rgba(255, 192, 203, 0.15)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 192, 203, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 192, 203, 0.15)';
                  }}
                  >
                    <div style={{ position: 'relative' }}>
                      <Badge 
                        bg="danger"
                        style={{
                          position: 'absolute',
                          top: '15px',
                          left: '15px',
                          zIndex: 1,
                          fontSize: '0.9rem',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          boxShadow: '0 4px 12px rgba(220,53,69,0.3)'
                        }}
                      >
                        <i className="bi bi-star-fill me-1"></i>
                        OFERTA
                      </Badge>
                      <Card.Img 
                        variant="top" 
                        src={producto.imagen || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600'} 
                        alt={producto.nombre}
                        style={{
                          height: '250px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    <Card.Body>
                      <div style={{
                        color: 'var(--accent-pink)',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        marginBottom: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {producto.categoria}
                      </div>

                      <Card.Title style={{
                        fontFamily: 'var(--font-headings)',
                        color: 'var(--accent-chocolate)',
                        fontSize: '1.5rem',
                        marginBottom: '15px'
                      }}>
                        {producto.nombre}
                      </Card.Title>

                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <span style={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            color: 'var(--accent-chocolate)'
                          }}>
                            ${producto.precio.toLocaleString('es-CL')}
                          </span>
                          {producto.precioOriginal && (
                            <div style={{
                              fontSize: '1rem',
                              textDecoration: 'line-through',
                              color: 'var(--text-secondary)'
                            }}>
                              ${producto.precioOriginal.toLocaleString('es-CL')}
                            </div>
                          )}
                        </div>
                        <div style={{
                          background: '#E8F5E9',
                          color: '#2E7D32',
                          padding: '5px 12px',
                          borderRadius: '15px',
                          fontSize: '0.85rem',
                          fontWeight: 'bold'
                        }}>
                          <i className="bi bi-arrow-down-short"></i>
                          {Math.round(((producto.precioOriginal - producto.precio) / producto.precioOriginal) * 100)}% OFF
                        </div>
                      </div>

                      <Link 
                        to={`/producto/${producto.id}`}
                        className="btn w-100"
                        style={{
                          background: 'var(--accent-pink)',
                          border: 'none',
                          color: 'var(--accent-chocolate)',
                          fontWeight: 'bold',
                          borderRadius: '12px',
                          padding: '12px'
                        }}
                      >
                        <i className="bi bi-eye me-2"></i>
                        Ver Detalles
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="text-center">
              <Link 
                to="/ofertas"
                style={{
                  color: 'var(--accent-chocolate)',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  fontSize: '1.2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Ver todas las ofertas
                <i className="bi bi-arrow-right-circle-fill"></i>
              </Link>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Categorias;

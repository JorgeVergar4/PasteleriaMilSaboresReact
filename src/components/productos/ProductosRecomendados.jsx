import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { productosService } from '../../data/dataService';

const ProductosRecomendados = ({ productoActual, agregarAlCarrito }) => {
  // Obtener productos de la misma categoría, excluyendo el actual
  const productosRelacionados = productosService.getAll()
    .filter(p => p.categoria === productoActual.categoria && p.id !== productoActual.id)
    .slice(0, 3);

  // Si no hay suficientes productos de la misma categoría, completar con otros productos
  if (productosRelacionados.length < 3) {
    const otrosProductos = productosService.getAll()
      .filter(p => p.id !== productoActual.id && !productosRelacionados.some(pr => pr.id === p.id))
      .slice(0, 3 - productosRelacionados.length);
    
    productosRelacionados.push(...otrosProductos);
  }

  if (productosRelacionados.length === 0) {
    return null;
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h3 style={{ 
          fontFamily: 'var(--font-headings)', 
          color: 'var(--accent-chocolate)',
          marginBottom: '10px'
        }}>
          Productos que podrían interesarte
        </h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Descubre más delicias de nuestra pastelería
        </p>
      </div>

      <Row className="g-4">
        {productosRelacionados.map((producto) => (
          <Col md={4} key={producto.id}>
            <Card 
              className="h-100 shadow-sm border-0"
              style={{ 
                borderRadius: 'var(--border-radius)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
              }}
            >
              <Link 
                to={`/producto/${producto.id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{ 
                  height: '200px', 
                  overflow: 'hidden',
                  borderRadius: 'var(--border-radius) var(--border-radius) 0 0'
                }}>
                  <img
                    src={producto.imagen || '/assets/images/logo.png'}
                    alt={producto.nombre}
                    className="w-100 h-100"
                    style={{ 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.target.src = '/assets/images/logo.png';
                    }}
                  />
                </div>
              </Link>

              <Card.Body className="d-flex flex-column">
                <div className="mb-2">
                  <span style={{ 
                    fontSize: '0.8rem', 
                    color: 'var(--text-secondary)',
                    fontWeight: 'bold'
                  }}>
                    {producto.categoria}
                  </span>
                </div>

                <Link 
                  to={`/producto/${producto.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Card.Title style={{ 
                    fontFamily: 'var(--font-headings)', 
                    color: 'var(--accent-chocolate)',
                    fontSize: '1.1rem',
                    marginBottom: '10px',
                    lineHeight: '1.3'
                  }}>
                    {producto.nombre}
                  </Card.Title>
                </Link>

                <Card.Text style={{ 
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  flexGrow: 1,
                  marginBottom: '15px'
                }}>
                  {producto.descripcion.length > 80 
                    ? `${producto.descripcion.substring(0, 80)}...` 
                    : producto.descripcion
                  }
                </Card.Text>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span style={{
                      fontSize: '1.2rem',
                      fontWeight: 'bold',
                      color: 'var(--accent-chocolate)'
                    }}>
                      ${producto.precio.toLocaleString('es-CL')}
                    </span>
                    {producto.precioOriginal && (
                      <span style={{
                        fontSize: '0.9rem',
                        textDecoration: 'line-through',
                        color: 'var(--text-secondary)',
                        marginLeft: '8px'
                      }}>
                        ${producto.precioOriginal.toLocaleString('es-CL')}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      agregarAlCarrito(producto);
                    }}
                    style={{
                      borderColor: 'var(--accent-pink)',
                      color: 'var(--accent-pink)',
                      borderRadius: '20px',
                      padding: '5px 15px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'var(--accent-pink)';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'var(--accent-pink)';
                    }}
                  >
                    <i className="bi bi-cart-plus"></i>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductosRecomendados;

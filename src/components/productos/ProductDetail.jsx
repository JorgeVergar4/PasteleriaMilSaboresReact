import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Form } from 'react-bootstrap';
import { LoadingSpinner } from '../ui';
import { productosService } from '../../data/dataService';
import ProductosRecomendados from './ProductosRecomendados';

const ProductDetail = ({ agregarAlCarrito }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const prod = productosService.getById(id);
    if (prod) {
      setProducto(prod);
    } else {
      navigate('/productos');
    }
  }, [id, navigate]);

  if (!producto) {
    return (
      <LoadingSpinner 
        message="Cargando producto..." 
        size="lg"
      />
    );
  }

  const handleAgregar = () => {
    for (let i = 0; i < cantidad; i++) {
      agregarAlCarrito(producto);
    }
  };

  return (
    <Container className="py-section">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <i className="bi bi-arrow-left me-2"></i>
        Volver
      </Button>

      <Row className="g-5">
        <Col lg={6}>
          <div style={{
            background: 'var(--white)',
            padding: '20px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)'
          }}>
            <img 
              src={producto.imagen || 'assets/images/logo.png'}
              alt={producto.nombre}
              className="img-fluid rounded"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </Col>

        <Col lg={6}>
          <div style={{
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)'
          }}>
            {producto.enOferta && (
              <Badge bg="danger" className="mb-3">¡OFERTA ESPECIAL!</Badge>
            )}
            
            {producto.especial && (
              <Badge bg="warning" text="dark" className="mb-3 ms-2">
                {producto.especial}
              </Badge>
            )}

            <h1 style={{ 
              fontFamily: 'var(--font-headings)', 
              color: 'var(--accent-chocolate)',
              marginBottom: '15px'
            }}>
              {producto.nombre}
            </h1>

            <div style={{ 
              color: 'var(--text-secondary)', 
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              {producto.categoria}
            </div>

            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              color: 'var(--text-main)',
              marginBottom: '25px'
            }}>
              {producto.descripcion}
            </p>

            {producto.ingredientes && (
              <div className="mb-4">
                <strong style={{ color: 'var(--accent-chocolate)' }}>
                  Ingredientes:
                </strong>
                <ul className="mt-2">
                  {producto.ingredientes.map((ing, idx) => (
                    <li key={idx} style={{ color: 'var(--text-main)' }}>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="d-flex align-items-center gap-3 mb-4">
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--accent-chocolate)'
              }}>
                ${producto.precio.toLocaleString('es-CL')}
              </div>
              
              {producto.precioOriginal && (
                <div style={{
                  fontSize: '1.3rem',
                  textDecoration: 'line-through',
                  color: 'var(--text-secondary)'
                }}>
                  ${producto.precioOriginal.toLocaleString('es-CL')}
                </div>
              )}
            </div>

            <div className="mb-4">
              <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                Cantidad:
              </Form.Label>
              <Form.Control
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                style={{ 
                  width: '100px',
                  borderColor: 'var(--accent-pink)'
                }}
              />
              <small style={{ color: 'var(--text-secondary)' }}>
                Stock disponible: {producto.stock} unidades
              </small>
            </div>

            <Button
              onClick={handleAgregar}
              disabled={producto.stock < 1}
              size="lg"
              className="w-100"
              style={{
                background: 'var(--accent-pink)',
                border: 'none',
                color: 'var(--accent-chocolate)',
                fontWeight: 'bold',
                borderRadius: '8px',
                padding: '15px'
              }}
            >
              <i className="bi bi-cart-plus me-2"></i>
              {producto.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
            </Button>
          </div>
        </Col>
      </Row>

      {/* Productos Recomendados */}
      <ProductosRecomendados 
        productoActual={producto} 
        agregarAlCarrito={agregarAlCarrito}
      />
    </Container>
  );
};

export default ProductDetail;

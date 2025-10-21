import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { ToastNotification } from '../ui';

const CarritoCompra = ({ 
  carrito, 
  eliminarDelCarrito, 
  actualizarCantidad, 
  limpiarCarrito, 
  calcularTotal,
  usuario 
}) => {
  const navigate = useNavigate();
  const [cupon, setCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [mensajeCupon, setMensajeCupon] = useState('');
  const { toast, showSuccess, showError, hideToast } = useToast();

  // Cargar estado del cupón desde localStorage
  useEffect(() => {
    const cuponGuardado = localStorage.getItem('cuponAplicado');
    if (cuponGuardado === 'true') {
      setCuponAplicado(true);
      setMensajeCupon('¡Cupón aplicado! Obtienes 10% de descuento');
    }
  }, []);

  const aplicarCupon = () => {
    if (cupon.trim().toUpperCase() === 'FELICES50') {
      setCuponAplicado(true);
      setMensajeCupon('¡Cupón aplicado! Obtienes 10% de descuento');
      localStorage.setItem('cuponAplicado', 'true');
      showSuccess('¡Cupón aplicado! Obtienes 10% de descuento', 'Cupón Válido');
    } else {
      setCuponAplicado(false);
      setMensajeCupon('Cupón inválido');
      localStorage.setItem('cuponAplicado', 'false');
      showError('El cupón ingresado no es válido', 'Cupón Inválido');
    }
  };

  const calcularDescuento = () => {
    let descuento = 0;
    
    // Descuento por cupón (10%)
    if (cuponAplicado) {
      descuento += calcularTotal() * 0.1;
    }
    
    // Descuento senior (50%) para usuarios mayores de 50 años
    if (usuario && usuario.descuentoSenior) {
      descuento += calcularTotal() * 0.5;
    }
    
    return descuento;
  };

  const calcularTotalConDescuento = () => {
    const subtotal = calcularTotal();
    const descuento = calcularDescuento();
    const subtotalConDescuento = subtotal - descuento;
    const iva = Math.round(subtotalConDescuento * 0.19);
    return subtotalConDescuento + iva;
  };

  if (carrito.length === 0) {
    return (
      <Container className="py-section text-center">
        <div style={{
          background: 'var(--white)',
          padding: '60px 40px',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--box-shadow)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <i 
            className="bi bi-cart-x" 
            style={{ fontSize: '5rem', color: 'var(--text-secondary)' }}
          ></i>
          <h2 className="mt-4" style={{ color: 'var(--accent-chocolate)' }}>
            Tu carrito está vacío
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            ¡Agrega productos deliciosos para comenzar!
          </p>
          <Button 
            as={Link} 
            to="/productos" 
            size="lg"
            className="mt-3"
            style={{
              background: 'var(--accent-pink)',
              border: 'none',
              color: 'var(--accent-chocolate)',
              fontWeight: 'bold',
              borderRadius: '8px'
            }}
          >
            <i className="bi bi-shop me-2"></i>
            Ver Productos
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-section">
      <h1 style={{ 
        fontFamily: 'var(--font-headings)', 
        color: 'var(--accent-chocolate)',
        marginBottom: '30px'
      }}>
        <i className="bi bi-cart3 me-3"></i>
        Tu Carrito
      </h1>

      <Row className="g-4">
        <Col lg={8}>
          <Card style={{ 
            border: 'none', 
            boxShadow: 'var(--box-shadow)',
            borderRadius: 'var(--border-radius)'
          }}>
            <Card.Body className="p-4">
              {carrito.map(item => (
                <div key={item.id} className="cart-item mb-3">
                  <img 
                    src={item.imagen || '/assets/images/logo.png'} 
                    alt={item.nombre}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = '/assets/images/logo.png';
                    }}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                  />
                  
                  <div>
                    <h5 style={{ 
                      color: 'var(--accent-chocolate)',
                      marginBottom: '5px'
                    }}>
                      {item.nombre}
                    </h5>
                    <small style={{ color: 'var(--text-secondary)' }}>
                      {item.categoria}
                    </small>
                  </div>

                  <div style={{ 
                    fontWeight: 'bold',
                    color: 'var(--text-main)',
                    fontSize: '1.1rem'
                  }}>
                    ${item.precio.toLocaleString('es-CL')}
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                      disabled={item.cantidad <= 1}
                    >
                      <i className="bi bi-dash"></i>
                    </Button>
                    <span style={{ 
                      fontWeight: 'bold',
                      fontSize: '1.1rem',
                      minWidth: '40px',
                      textAlign: 'center'
                    }}>
                      {item.cantidad}
                    </span>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                      disabled={item.cantidad >= item.stock}
                    >
                      <i className="bi bi-plus"></i>
                    </Button>
                  </div>

                  <div style={{ 
                    fontWeight: 'bold',
                    color: 'var(--accent-chocolate)',
                    fontSize: '1.2rem'
                  }}>
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </div>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarDelCarrito(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              ))}

              <div className="mt-4">
                <Button
                  variant="outline-danger"
                  onClick={limpiarCarrito}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Vaciar Carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="cart-summary">
            <h4 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '25px'
            }}>
              Resumen de Compra
            </h4>

            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
              <strong style={{ color: 'var(--text-main)' }}>
                ${calcularTotal().toLocaleString('es-CL')}
              </strong>
            </div>

            {/* Sección de Cupón de Descuento */}
            <div className="mb-3">
              <Form.Group>
                <Form.Label style={{ 
                  fontSize: '0.9rem', 
                  fontWeight: 'bold',
                  color: 'var(--accent-chocolate)'
                }}>
                  <i className="bi bi-ticket-perforated me-1"></i>
                  Cupón de Descuento
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Ingresa tu cupón"
                    value={cupon}
                    onChange={(e) => setCupon(e.target.value)}
                    style={{
                      fontSize: '0.9rem',
                      borderRadius: '6px'
                    }}
                  />
                  <Button
                    variant="outline-primary"
                    onClick={aplicarCupon}
                    disabled={!cupon.trim()}
                    style={{
                      borderRadius: '6px',
                      fontSize: '0.9rem'
                    }}
                  >
                    Aplicar
                  </Button>
                </div>
                {mensajeCupon && (
                  <Alert 
                    variant={cuponAplicado ? "success" : "danger"}
                    className="mt-2 py-2"
                    style={{ fontSize: '0.85rem' }}
                  >
                    {mensajeCupon}
                  </Alert>
                )}
              </Form.Group>
            </div>

            {/* Mostrar descuentos aplicados */}
            {(cuponAplicado || (usuario && usuario.descuentoSenior)) && (
              <div className="mb-3">
                <h6 style={{ 
                  color: '#28a745', 
                  marginBottom: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  <i className="bi bi-percent me-1"></i>
                  Descuentos Aplicados:
                </h6>
                
                {cuponAplicado && (
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: '#28a745', fontSize: '0.85rem' }}>
                      <i className="bi bi-ticket-perforated me-1"></i>
                      Cupón FELICES50 (10%):
                    </span>
                    <strong style={{ color: '#28a745', fontSize: '0.85rem' }}>
                      -${(calcularTotal() * 0.1).toLocaleString('es-CL')}
                    </strong>
                  </div>
                )}
                
                {usuario && usuario.descuentoSenior && (
                  <div className="d-flex justify-content-between mb-2">
                    <span style={{ color: '#28a745', fontSize: '0.85rem' }}>
                      <i className="bi bi-gift me-1"></i>
                      Descuento Senior (50%):
                    </span>
                    <strong style={{ color: '#28a745', fontSize: '0.85rem' }}>
                      -${(calcularTotal() * 0.5).toLocaleString('es-CL')}
                    </strong>
                  </div>
                )}
                
                <div className="d-flex justify-content-between" style={{ 
                  borderTop: '1px solid #e0e0e0', 
                  paddingTop: '8px',
                  marginTop: '8px'
                }}>
                  <strong style={{ color: '#28a745', fontSize: '0.9rem' }}>
                    Total Descuentos:
                  </strong>
                  <strong style={{ color: '#28a745', fontSize: '0.9rem' }}>
                    -${calcularDescuento().toLocaleString('es-CL')}
                  </strong>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: 'var(--text-secondary)' }}>IVA (19%):</span>
              <strong style={{ color: 'var(--text-main)' }}>
                ${Math.round((calcularTotal() - calcularDescuento()) * 0.19).toLocaleString('es-CL')}
              </strong>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <span style={{ color: 'var(--text-secondary)' }}>Envío:</span>
              <strong style={{ color: '#28a745' }}>Gratis</strong>
            </div>

            <hr />

            <div className="d-flex justify-content-between mb-4">
              <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>
                Total:
              </strong>
              <strong style={{ 
                fontSize: '1.5rem', 
                color: 'var(--accent-chocolate)' 
              }}>
                ${calcularTotalConDescuento().toLocaleString('es-CL')}
              </strong>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
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
              <i className="bi bi-credit-card me-2"></i>
              Proceder al Pago
            </Button>

            <div className="text-center mt-3">
              <small style={{ color: 'var(--text-secondary)' }}>
                <i className="bi bi-shield-check me-1"></i>
                Compra 100% segura
              </small>
            </div>
          </div>
        </Col>
      </Row>
      
      <ToastNotification
        show={toast.show}
        onClose={hideToast}
        title={toast.title}
        message={toast.message}
        variant={toast.variant}
      />
    </Container>
  );
};

export default CarritoCompra;

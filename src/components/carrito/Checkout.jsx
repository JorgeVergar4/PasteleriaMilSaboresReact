import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ordenesService } from '../../data/dataService';
import { regionesChile } from '../../data/regionesChile';

const Checkout = ({ carrito, calcularTotal, limpiarCarrito, usuario }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    email: usuario?.email || '',
    telefono: usuario?.telefono || '',
    direccion: '',
    comuna: '',
    region: 'RM',
    metodoPago: 'tarjeta'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cuponAplicado, setCuponAplicado] = useState(false);

  // Cargar estado del cupón desde localStorage
  useEffect(() => {
    const cuponGuardado = localStorage.getItem('cuponAplicado');
    if (cuponGuardado === 'true') {
      setCuponAplicado(true);
    }
  }, []);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar apellidos
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = 'Los apellidos son requeridos';
    } else if (formData.apellidos.trim().length < 2) {
      newErrors.apellidos = 'Los apellidos deben tener al menos 2 caracteres';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'El email no tiene un formato válido';
    }

    // Validar teléfono
    const phoneRegex = /^(\+56|56)?[2-9]\d{8}$/;
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'El teléfono debe ser un número chileno válido';
    }

    // Validar dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = 'La dirección es requerida';
    } else if (formData.direccion.trim().length < 10) {
      newErrors.direccion = 'La dirección debe tener al menos 10 caracteres';
    }

    // Validar comuna
    if (!formData.comuna.trim()) {
      newErrors.comuna = 'La comuna es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calcular totales correctamente
      const subtotal = calcularTotal();
      const descuentos = calcularDescuento();
      const subtotalConDescuento = subtotal - descuentos;
      const iva = Math.round(subtotalConDescuento * 0.19);
      const total = subtotalConDescuento + iva;

      const nuevaOrden = {
        usuarioId: usuario?.id || null,
        productos: carrito,
        subtotal: subtotal,
        descuentos: descuentos,
        iva: iva,
        total: total,
        datosEnvio: {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono,
          direccion: formData.direccion,
          comuna: formData.comuna,
          region: formData.region
        },
        metodoPago: formData.metodoPago,
        estado: 'pendiente'
      };

      // Crear la orden
      const ordenCreada = ordenesService.create(nuevaOrden);
      
      // Guardar datos del usuario si no está logueado (para futuras compras)
      if (!usuario) {
        const datosUsuario = {
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          email: formData.email,
          telefono: formData.telefono
        };
        localStorage.setItem('datosUsuarioTemporal', JSON.stringify(datosUsuario));
      }

      // Limpiar carrito y navegar
      limpiarCarrito();
      
      // Pasar el ID de la orden a la página de éxito
      navigate('/pago-exitoso', { 
        state: { 
          ordenId: ordenCreada.id,
          numeroOrden: ordenCreada.numeroOrden 
        } 
      });
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      setErrors({ general: 'Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (carrito.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <Container className="py-section">
      <h1 style={{ 
        fontFamily: 'var(--font-headings)', 
        color: 'var(--accent-chocolate)',
        marginBottom: '30px'
      }}>
        Finalizar Compra
      </h1>

      <Form onSubmit={handleSubmit}>
        {errors.general && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {errors.general}
          </Alert>
        )}
        
        <Row className="g-4">
          <Col lg={8}>
            <Card style={{ 
              border: 'none', 
              boxShadow: 'var(--box-shadow)',
              borderRadius: 'var(--border-radius)',
              marginBottom: '20px'
            }}>
              <Card.Body className="p-4">
                <h4 style={{ 
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  marginBottom: '25px'
                }}>
                  Datos de Contacto
                </h4>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Nombre *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.nombre}
                        style={{ borderColor: errors.nombre ? '#dc3545' : 'var(--accent-pink)' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Apellidos *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.apellidos}
                        style={{ borderColor: errors.apellidos ? '#dc3545' : 'var(--accent-pink)' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.apellidos}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Email *
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.email}
                        style={{ borderColor: errors.email ? '#dc3545' : 'var(--accent-pink)' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Teléfono *
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+56 9 1234 5678"
                        required
                        isInvalid={!!errors.telefono}
                        style={{ borderColor: errors.telefono ? '#dc3545' : 'var(--accent-pink)' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.telefono}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card style={{ 
              border: 'none', 
              boxShadow: 'var(--box-shadow)',
              borderRadius: 'var(--border-radius)',
              marginBottom: '20px'
            }}>
              <Card.Body className="p-4">
                <h4 style={{ 
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  marginBottom: '25px'
                }}>
                  Dirección de Envío
                </h4>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                    Dirección *
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    placeholder="Calle, número, depto."
                    required
                    isInvalid={!!errors.direccion}
                    style={{ borderColor: errors.direccion ? '#dc3545' : 'var(--accent-pink)' }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.direccion}
                  </Form.Control.Feedback>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Comuna *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="comuna"
                        value={formData.comuna}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.comuna}
                        style={{ borderColor: errors.comuna ? '#dc3545' : 'var(--accent-pink)' }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.comuna}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                        Región *
                      </Form.Label>
                      <Form.Select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                        style={{ borderColor: 'var(--accent-pink)' }}
                      >
                        {regionesChile.map(region => (
                          <option key={region.codigo} value={region.codigo}>
                            {region.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card style={{ 
              border: 'none', 
              boxShadow: 'var(--box-shadow)',
              borderRadius: 'var(--border-radius)'
            }}>
              <Card.Body className="p-4">
                <h4 style={{ 
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  marginBottom: '25px'
                }}>
                  Método de Pago
                </h4>

                <Form.Check
                  type="radio"
                  id="tarjeta"
                  name="metodoPago"
                  value="tarjeta"
                  checked={formData.metodoPago === 'tarjeta'}
                  onChange={handleChange}
                  label="Tarjeta de Crédito/Débito"
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="transferencia"
                  name="metodoPago"
                  value="transferencia"
                  checked={formData.metodoPago === 'transferencia'}
                  onChange={handleChange}
                  label="Transferencia Bancaria"
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="efectivo"
                  name="metodoPago"
                  value="efectivo"
                  checked={formData.metodoPago === 'efectivo'}
                  onChange={handleChange}
                  label="Efectivo contra entrega"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <div style={{
              background: 'var(--white)',
              padding: '30px',
              borderRadius: 'var(--border-radius)',
              boxShadow: 'var(--box-shadow)',
              position: 'sticky',
              top: '120px'
            }}>
              <h4 style={{ 
                fontFamily: 'var(--font-headings)',
                color: 'var(--accent-chocolate)',
                marginBottom: '25px'
              }}>
                Resumen del Pedido
              </h4>

              {carrito.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span style={{ color: 'var(--text-main)' }}>
                    {item.nombre} x{item.cantidad}
                  </span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                    ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal:</span>
                <strong>${calcularTotal().toLocaleString('es-CL')}</strong>
              </div>

              {/* Mostrar descuentos si existen */}
              {calcularDescuento() > 0 && (
                <>
                  {cuponAplicado && (
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#28a745', fontSize: '0.9rem' }}>
                        <i className="bi bi-ticket-perforated me-1"></i>
                        Cupón FELICES50 (10%):
                      </span>
                      <strong style={{ color: '#28a745', fontSize: '0.9rem' }}>
                        -${(calcularTotal() * 0.1).toLocaleString('es-CL')}
                      </strong>
                    </div>
                  )}
                  
                  {usuario && usuario.descuentoSenior && (
                    <div className="d-flex justify-content-between mb-2">
                      <span style={{ color: '#28a745', fontSize: '0.9rem' }}>
                        <i className="bi bi-gift me-1"></i>
                        Descuento Senior (50%):
                      </span>
                      <strong style={{ color: '#28a745', fontSize: '0.9rem' }}>
                        -${(calcularTotal() * 0.5).toLocaleString('es-CL')}
                      </strong>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mb-2" style={{ 
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
                </>
              )}

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: 'var(--text-secondary)' }}>IVA (19%):</span>
                <strong>${Math.round((calcularTotal() - calcularDescuento()) * 0.19).toLocaleString('es-CL')}</strong>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span style={{ color: 'var(--text-secondary)' }}>Envío:</span>
                <strong style={{ color: '#28a745' }}>Gratis</strong>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong style={{ fontSize: '1.2rem' }}>Total:</strong>
                <strong style={{ 
                  fontSize: '1.5rem', 
                  color: 'var(--accent-chocolate)' 
                }}>
                  ${Math.round((calcularTotal() - calcularDescuento()) * 1.19).toLocaleString('es-CL')}
                </strong>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-100"
                disabled={isSubmitting}
                style={{
                  background: 'var(--accent-pink)',
                  border: 'none',
                  color: 'var(--accent-chocolate)',
                  fontWeight: 'bold',
                  borderRadius: 'var(--border-radius)',
                  padding: '15px'
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Confirmar Pedido
                  </>
                )}
              </Button>

              <div className="text-center mt-3">
                <small style={{ color: 'var(--text-secondary)' }}>
                  <i className="bi bi-shield-check me-1"></i>
                  Pago 100% seguro
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;

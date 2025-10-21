import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    }, 3000);
  };

  return (
    <Container className="py-section">
      <div className="section-title">
        <h2>Contáctanos</h2>
        <p>Estamos aquí para ayudarte</p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <div style={{
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)'
          }}>
            <h4 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '25px'
            }}>
              Envíanos un Mensaje
            </h4>

            {enviado && (
              <Alert variant="success">
                <i className="bi bi-check-circle me-2"></i>
                ¡Mensaje enviado exitosamente! Te responderemos pronto.
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
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
                      style={{ borderColor: 'var(--accent-pink)' }}
                    />
                  </Form.Group>
                </Col>
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
                      style={{ borderColor: 'var(--accent-pink)' }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                  Asunto *
                </Form.Label>
                <Form.Select
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleChange}
                  required
                  style={{ borderColor: 'var(--accent-pink)' }}
                >
                  <option value="">Seleccionar...</option>
                  <option value="consulta">Consulta General</option>
                  <option value="pedido">Pedido Especial</option>
                  <option value="cotizacion">Cotización</option>
                  <option value="reclamo">Reclamo</option>
                  <option value="sugerencia">Sugerencia</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                  Mensaje *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                  style={{ borderColor: 'var(--accent-pink)' }}
                />
              </Form.Group>

              <Button 
                type="submit"
                style={{
                  background: 'var(--accent-pink)',
                  border: 'none',
                  color: 'var(--accent-chocolate)',
                  fontWeight: 'bold',
                  padding: '12px 30px',
                  borderRadius: 'var(--border-radius)'
                }}
              >
                <i className="bi bi-send me-2"></i>
                Enviar Mensaje
              </Button>
            </Form>
          </div>
        </Col>

        <Col lg={4}>
          <div style={{
            background: 'var(--white)',
            padding: '30px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)'
          }}>
            <h5 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '20px'
            }}>
              Información de Contacto
            </h5>

            <div className="mb-3">
              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-geo-alt-fill me-3" style={{ 
                  color: 'var(--accent-pink)', 
                  fontSize: '1.5rem' 
                }}></i>
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Dirección:</strong>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                    Av. Libertador Bernardo O'Higgins 1234,<br />
                    Santiago Centro, Chile
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-telephone-fill me-3" style={{ 
                  color: 'var(--accent-pink)', 
                  fontSize: '1.5rem' 
                }}></i>
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Teléfono:</strong>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                    +56 9 1234 5678
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <i className="bi bi-envelope-fill me-3" style={{ 
                  color: 'var(--accent-pink)', 
                  fontSize: '1.5rem' 
                }}></i>
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Email:</strong>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                    contacto@pasteleriamilsabores.cl
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start">
                <i className="bi bi-clock-fill me-3" style={{ 
                  color: 'var(--accent-pink)', 
                  fontSize: '1.5rem' 
                }}></i>
                <div>
                  <strong style={{ color: 'var(--text-main)' }}>Horario:</strong>
                  <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>
                    Lun-Vie: 9:00 - 20:00<br />
                    Sábado: 9:00 - 18:00<br />
                    Domingo: Cerrado
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 text-center" style={{
            background: 'var(--white)',
            padding: '20px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)'
          }}>
            <h6 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '15px'
            }}>
              Síguenos
            </h6>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com" style={{ 
                color: 'var(--accent-chocolate)', 
                fontSize: '1.8rem' 
              }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" style={{ 
                color: 'var(--accent-chocolate)', 
                fontSize: '1.8rem' 
              }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" style={{ 
                color: 'var(--accent-chocolate)', 
                fontSize: '1.8rem' 
              }}>
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contacto;

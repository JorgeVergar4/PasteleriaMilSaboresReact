import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col, Tab, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { usuariosService, ordenesService } from '../../data/dataService';

const Perfil = ({ usuario, setUsuario }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('perfil');
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const [ordenes, setOrdenes] = useState([]);
  
  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    email: usuario?.email || '',
    telefono: usuario?.telefono || ''
  });

  useEffect(() => {
    if (!usuario) {
      navigate('/login');
    } else {
      setOrdenes(ordenesService.getByUsuario(usuario.id));
    }
  }, [usuario, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const actualizado = usuariosService.update(usuario.id, formData);
    
    if (actualizado) {
      setUsuario(actualizado);
      localStorage.setItem('usuario', JSON.stringify(actualizado));
      setMensaje({ tipo: 'success', texto: '¡Perfil actualizado exitosamente!' });
      setEditando(false);
      setTimeout(() => setMensaje({ tipo: '', texto: '' }), 3000);
    }
  };

  const handleCerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!usuario) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--bg-main) 0%, #FFE4EC 100%)',
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '60px'
    }}>
      <Container>
        <Card style={{
          border: 'none',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(139, 69, 19, 0.12)',
          overflow: 'hidden'
        }}>
          {/* Header del perfil */}
          <div style={{
            background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-chocolate) 100%)',
            padding: '40px',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              border: '4px solid white',
              fontSize: '3rem'
            }}>
              <i className="bi bi-person-circle"></i>
            </div>
            <h2 style={{ fontFamily: 'var(--font-headings)', marginBottom: '10px' }}>
              {usuario.nombre} {usuario.apellidos}
            </h2>
            <p style={{ opacity: 0.9, fontSize: '1.1rem' }}>
              <i className="bi bi-envelope me-2"></i>
              {usuario.email}
            </p>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 20px',
              borderRadius: '20px',
              fontSize: '0.9rem',
              marginTop: '10px'
            }}>
              <i className="bi bi-star-fill me-2"></i>
              {usuario.rol === 'admin' ? 'Administrador' : 'Cliente'}
            </div>
          </div>

          <Card.Body className="p-0">
            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
              <Nav variant="tabs" className="px-4" style={{ borderBottom: '2px solid var(--accent-pink)' }}>
                <Nav.Item>
                  <Nav.Link eventKey="perfil" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-person-fill me-2"></i>
                    Mi Perfil
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="pedidos" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-bag-fill me-2"></i>
                    Mis Pedidos
                    {ordenes.length > 0 && (
                      <span className="badge bg-danger ms-2">{ordenes.length}</span>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="beneficios" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-gift-fill me-2"></i>
                    Beneficios
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="seguridad" style={{ fontWeight: 'bold' }}>
                    <i className="bi bi-shield-lock-fill me-2"></i>
                    Seguridad
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content className="p-4">
                {/* TAB: Perfil */}
                <Tab.Pane eventKey="perfil">
                  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h4 style={{ 
                      fontFamily: 'var(--font-headings)', 
                      color: 'var(--accent-chocolate)',
                      marginBottom: '25px'
                    }}>
                      Información Personal
                    </h4>

                    {mensaje.texto && (
                      <Alert variant={mensaje.tipo} style={{ borderRadius: '12px' }}>
                        {mensaje.texto}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                              Nombre
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              disabled={!editando}
                              style={{
                                padding: '12px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px',
                                background: editando ? 'white' : '#f8f8f8'
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                              Apellidos
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="apellidos"
                              value={formData.apellidos}
                              onChange={handleChange}
                              disabled={!editando}
                              style={{
                                padding: '12px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px',
                                background: editando ? 'white' : '#f8f8f8'
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                          Email
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!editando}
                          style={{
                            padding: '12px',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px',
                            background: editando ? 'white' : '#f8f8f8'
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                          Teléfono
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          disabled={!editando}
                          style={{
                            padding: '12px',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px',
                            background: editando ? 'white' : '#f8f8f8'
                          }}
                        />
                      </Form.Group>

                      {editando ? (
                        <div className="d-flex gap-2">
                          <Button 
                            type="submit"
                            style={{
                              background: 'var(--accent-pink)',
                              border: 'none',
                              color: 'var(--accent-chocolate)',
                              fontWeight: 'bold',
                              borderRadius: '12px',
                              padding: '12px 30px'
                            }}
                          >
                            <i className="bi bi-check-circle me-2"></i>
                            Guardar Cambios
                          </Button>
                          <Button 
                            variant="secondary"
                            onClick={() => setEditando(false)}
                            style={{ borderRadius: '12px', padding: '12px 30px' }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => setEditando(true)}
                          style={{
                            background: 'var(--accent-chocolate)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 30px',
                            fontWeight: 'bold'
                          }}
                        >
                          <i className="bi bi-pencil-square me-2"></i>
                          Editar Perfil
                        </Button>
                      )}
                    </Form>
                  </div>
                </Tab.Pane>

                {/* TAB: Pedidos */}
                <Tab.Pane eventKey="pedidos">
                  <h4 style={{ 
                    fontFamily: 'var(--font-headings)', 
                    color: 'var(--accent-chocolate)',
                    marginBottom: '25px'
                  }}>
                    Mis Pedidos
                  </h4>

                  {ordenes.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="bi bi-basket2" style={{ fontSize: '4rem', color: 'var(--text-secondary)' }}></i>
                      <h5 className="mt-3" style={{ color: 'var(--text-main)' }}>
                        Aún no tienes pedidos
                      </h5>
                      <Button 
                        onClick={() => navigate('/productos')}
                        style={{
                          background: 'var(--accent-pink)',
                          border: 'none',
                          borderRadius: '12px',
                          marginTop: '20px'
                        }}
                      >
                        Ir a Comprar
                      </Button>
                    </div>
                  ) : (
                    ordenes.map(orden => (
                      <Card key={orden.id} className="mb-3" style={{ borderRadius: '12px' }}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h5>Pedido #{orden.numeroOrden}</h5>
                              <p className="mb-0 text-muted">
                                {new Date(orden.fecha).toLocaleDateString('es-CL')}
                              </p>
                            </div>
                            <div className="text-end">
                              <h5 style={{ color: 'var(--accent-chocolate)' }}>
                                ${orden.total.toLocaleString('es-CL')}
                              </h5>
                              <span className="badge bg-warning">{orden.estado}</span>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))
                  )}
                </Tab.Pane>

                {/* TAB: Beneficios */}
                <Tab.Pane eventKey="beneficios">
                  <h4 style={{ 
                    fontFamily: 'var(--font-headings)', 
                    color: 'var(--accent-chocolate)',
                    marginBottom: '25px'
                  }}>
                    <i className="bi bi-gift-fill me-2"></i>
                    Mis Beneficios Especiales
                  </h4>

                  <Row className="g-4">
                    {/* Descuento Senior */}
                    {usuario.descuentoSenior && (
                      <Col md={6}>
                        <Card style={{ 
                          borderRadius: '15px', 
                          border: '3px solid #28a745',
                          background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
                          height: '100%'
                        }}>
                          <Card.Body className="text-center p-4">
                            <div style={{
                              width: '80px',
                              height: '80px',
                              background: '#28a745',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 20px',
                              fontSize: '2rem',
                              color: 'white'
                            }}>
                              <i className="bi bi-percent"></i>
                            </div>
                            <h5 style={{ color: '#2E7D32', marginBottom: '15px' }}>
                              Descuento Senior
                            </h5>
                            <p style={{ color: '#2E7D32', fontSize: '1.1rem', fontWeight: 'bold' }}>
                              50% de descuento permanente
                            </p>
                            <p style={{ color: '#2E7D32', fontSize: '0.9rem' }}>
                              Por ser mayor de 50 años, disfrutas de descuentos especiales en todos nuestros productos.
                            </p>
                            <div style={{
                              background: 'rgba(40, 167, 69, 0.1)',
                              padding: '10px',
                              borderRadius: '8px',
                              marginTop: '15px'
                            }}>
                              <small style={{ color: '#2E7D32', fontWeight: 'bold' }}>
                                <i className="bi bi-check-circle me-1"></i>
                                Beneficio activo
                              </small>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}

                    {/* Beneficio DUOC */}
                    {usuario.esEstudianteDuoc && (
                      <Col md={6}>
                        <Card style={{ 
                          borderRadius: '15px', 
                          border: '3px solid #007bff',
                          background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%)',
                          height: '100%'
                        }}>
                          <Card.Body className="text-center p-4">
                            <div style={{
                              width: '80px',
                              height: '80px',
                              background: '#007bff',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 auto 20px',
                              fontSize: '2rem',
                              color: 'white'
                            }}>
                              <i className="bi bi-mortarboard"></i>
                            </div>
                            <h5 style={{ color: '#0056b3', marginBottom: '15px' }}>
                              Estudiante DUOC UC
                            </h5>
                            <p style={{ color: '#0056b3', fontSize: '1.1rem', fontWeight: 'bold' }}>
                              Tortas gratis en tu cumpleaños
                            </p>
                            <p style={{ color: '#0056b3', fontSize: '0.9rem' }}>
                              Como estudiante de DUOC UC, recibirás una torta gratis cada año en tu cumpleaños.
                            </p>
                            <div style={{
                              background: 'rgba(0, 123, 255, 0.1)',
                              padding: '10px',
                              borderRadius: '8px',
                              marginTop: '15px'
                            }}>
                              <small style={{ color: '#0056b3', fontWeight: 'bold' }}>
                                <i className="bi bi-calendar-gift me-1"></i>
                                Próximo beneficio: {usuario.fechaNacimiento ? 
                                  (() => {
                                    const fechaNac = new Date(usuario.fechaNacimiento);
                                    return new Date(new Date().getFullYear() + 1, fechaNac.getMonth(), fechaNac.getDate()).toLocaleDateString('es-CL');
                                  })()
                                  : 'Fecha no disponible'
                                }
                              </small>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    )}

                    {/* Información general */}
                    <Col md={12}>
                      <Card style={{ 
                        borderRadius: '15px', 
                        border: '2px solid var(--accent-pink)',
                        background: 'linear-gradient(135deg, #fff5f5 0%, #ffe4ec 100%)'
                      }}>
                        <Card.Body className="p-4">
                          <h5 style={{ color: 'var(--accent-chocolate)', marginBottom: '20px' }}>
                            <i className="bi bi-info-circle me-2"></i>
                            Información sobre tus beneficios
                          </h5>
                          <Row>
                            <Col md={6}>
                              <div style={{ marginBottom: '15px' }}>
                                <h6 style={{ color: 'var(--accent-chocolate)', fontSize: '1rem' }}>
                                  <i className="bi bi-calendar-event me-2"></i>
                                  Fecha de Nacimiento
                                </h6>
                                <p style={{ color: 'var(--text-main)', margin: 0 }}>
                                  {usuario.fechaNacimiento ? 
                                    new Date(usuario.fechaNacimiento).toLocaleDateString('es-CL')
                                    : 'No registrada'
                                  }
                                </p>
                              </div>
                            </Col>
                            <Col md={6}>
                              <div style={{ marginBottom: '15px' }}>
                                <h6 style={{ color: 'var(--accent-chocolate)', fontSize: '1rem' }}>
                                  <i className="bi bi-geo-alt me-2"></i>
                                  Región
                                </h6>
                                <p style={{ color: 'var(--text-main)', margin: 0 }}>
                                  {usuario.region || 'No registrada'}
                                </p>
                              </div>
                            </Col>
                          </Row>
                          <div style={{
                            background: 'rgba(255, 192, 203, 0.2)',
                            padding: '15px',
                            borderRadius: '10px',
                            marginTop: '15px'
                          }}>
                            <p style={{ color: 'var(--text-main)', margin: 0, fontSize: '0.9rem' }}>
                              <i className="bi bi-lightbulb me-2"></i>
                              <strong>Tip:</strong> Los beneficios se aplican automáticamente en tus compras. 
                              No necesitas hacer nada especial para disfrutarlos.
                            </p>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Tab.Pane>

                {/* TAB: Seguridad */}
                <Tab.Pane eventKey="seguridad">
                  <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <h4 style={{ 
                      fontFamily: 'var(--font-headings)', 
                      color: 'var(--accent-chocolate)',
                      marginBottom: '25px'
                    }}>
                      Seguridad
                    </h4>

                    <Card style={{ borderRadius: '12px', marginBottom: '20px', border: '2px solid var(--accent-pink)' }}>
                      <Card.Body>
                        <h5><i className="bi bi-key-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>Cambiar Contraseña</h5>
                        <p className="text-muted">Actualiza tu contraseña regularmente para mayor seguridad</p>
                        <Button variant="outline-secondary" style={{ borderRadius: '12px' }}>
                          Cambiar Contraseña
                        </Button>
                      </Card.Body>
                    </Card>

                    <Card style={{ borderRadius: '12px', border: '2px solid #dc3545' }}>
                      <Card.Body>
                        <h5><i className="bi bi-box-arrow-right me-2" style={{ color: '#dc3545' }}></i>Cerrar Sesión</h5>
                        <p className="text-muted">Cierra tu sesión en este dispositivo</p>
                        <Button 
                          variant="danger"
                          onClick={handleCerrarSesion}
                          style={{ borderRadius: '12px' }}
                        >
                          Cerrar Sesión
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Perfil;

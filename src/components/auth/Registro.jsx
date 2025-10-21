import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { usuariosService } from '../../data/dataService';
import { buscarRegiones } from '../../data/regionesChile';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    fechaNacimiento: null,
    region: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busquedaRegion, setBusquedaRegion] = useState('');
  const [mostrarRegiones, setMostrarRegiones] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFechaNacimientoChange = (fecha) => {
    setFormData({ ...formData, fechaNacimiento: fecha });
  };

  const handleRegionChange = (region) => {
    setFormData({ ...formData, region: region.nombre });
    setBusquedaRegion(region.nombre);
    setMostrarRegiones(false);
  };

  const handleBusquedaRegionChange = (e) => {
    const valor = e.target.value;
    setBusquedaRegion(valor);
    setMostrarRegiones(valor.length > 0);
  };

  const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      return edad - 1;
    }
    return edad;
  };

  const esEstudianteDuoc = (email) => {
    return email.toLowerCase().endsWith('@duocuc.cl');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.fechaNacimiento) {
      setError('Debes seleccionar tu fecha de nacimiento');
      return;
    }

    if (!formData.region) {
      setError('Debes seleccionar tu región');
      return;
    }

    if (usuariosService.getByEmail(formData.email)) {
      setError('Este email ya está registrado');
      return;
    }

    const edad = calcularEdad(formData.fechaNacimiento);
    const esDuoc = esEstudianteDuoc(formData.email);

    const nuevoUsuario = {
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      email: formData.email,
      password: formData.password,
      telefono: formData.telefono,
      fechaNacimiento: formData.fechaNacimiento,
      region: formData.region,
      edad: edad,
      esEstudianteDuoc: esDuoc,
      descuentoSenior: edad >= 50,
      rol: 'cliente'
    };

    usuariosService.create(nuevoUsuario);
    navigate('/login');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-main) 0%, #FFE4EC 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '100px',
      paddingBottom: '80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decoración de fondo */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'rgba(255,192,203,0.2)',
        borderRadius: '50%',
        filter: 'blur(80px)'
      }}></div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-11 col-lg-10">
            <Card style={{
              border: 'none',
              borderRadius: '25px',
              boxShadow: '0 20px 60px rgba(139, 69, 19, 0.12)',
              overflow: 'hidden'
            }}>
              <div className="row g-0">
                {/* Columna Izquierda - Ilustración */}
                <div className="col-md-5" style={{
                  background: 'linear-gradient(135deg, var(--accent-chocolate) 0%, var(--accent-pink) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '50px 40px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }}></div>

                  <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <div style={{
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 30px',
                      backdropFilter: 'blur(10px)',
                      border: '4px solid rgba(255,255,255,0.3)'
                    }}>
                      <img 
                        src="assets/images/logo.png" 
                        alt="Logo" 
                        style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      />
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-headings)',
                      color: 'white',
                      fontSize: '2.5rem',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      ¡Únete a Nuestra Familia Dulce!
                    </h3>

                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      marginBottom: '30px'
                    }}>
                      Crea tu cuenta y disfruta de beneficios exclusivos, ofertas especiales y un mundo de sabores
                    </p>

                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '20px',
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ marginBottom: '15px' }}>
                        <i className="bi bi-check-circle-fill me-2" style={{ color: '#4CAF50' }}></i>
                        <span style={{ color: 'white' }}>Ofertas exclusivas</span>
                      </div>
                      <div style={{ marginBottom: '15px' }}>
                        <i className="bi bi-check-circle-fill me-2" style={{ color: '#4CAF50' }}></i>
                        <span style={{ color: 'white' }}>Historial de pedidos</span>
                      </div>
                      <div>
                        <i className="bi bi-check-circle-fill me-2" style={{ color: '#4CAF50' }}></i>
                        <span style={{ color: 'white' }}>Envío gratis RM</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha - Formulario */}
                <div className="col-md-7">
                  <div style={{ padding: '50px 40px' }}>
                    <div className="text-center mb-4">
                      <h2 style={{
                        fontFamily: 'var(--font-headings)',
                        color: 'var(--accent-chocolate)',
                        fontSize: '2.2rem',
                        marginBottom: '10px'
                      }}>
                        Crear Cuenta
                      </h2>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Completa tus datos para registrarte
                      </p>
                    </div>

                    {error && (
                      <Alert 
                        variant="danger" 
                        style={{ 
                          borderRadius: '12px',
                          border: 'none',
                          background: '#FFE4E4'
                        }}
                      >
                        <i className="bi bi-exclamation-triangle-fill me-2"></i>
                        {error}
                      </Alert>
                    )}

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              <i className="bi bi-person-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                              Nombre *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                              required
                              placeholder="Ingresa tu nombre"
                              style={{
                                padding: '12px 16px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px'
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              Apellidos *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              name="apellidos"
                              value={formData.apellidos}
                              onChange={handleChange}
                              required
                              placeholder="Ingresa tus apellidos"
                              style={{
                                padding: '12px 16px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px'
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                          <i className="bi bi-envelope-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                          Email *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="tu@email.com"
                          style={{
                            padding: '12px 16px',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px'
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                          <i className="bi bi-telephone-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                          Teléfono
                        </Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="+56 9 1234 5678"
                          style={{
                            padding: '12px 16px',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px'
                          }}
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              <i className="bi bi-calendar-event me-2" style={{ color: 'var(--accent-pink)' }}></i>
                              Fecha de Nacimiento *
                            </Form.Label>
                            <DatePicker
                              selected={formData.fechaNacimiento}
                              onChange={handleFechaNacimientoChange}
                              dateFormat="dd/MM/yyyy"
                              showYearDropdown
                              showMonthDropdown
                              dropdownMode="select"
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown
                              maxDate={new Date()}
                              placeholderText="Selecciona tu fecha de nacimiento"
                              className="form-control"
                              style={{
                                padding: '12px 16px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px',
                                width: '100%'
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              <i className="bi bi-geo-alt me-2" style={{ color: 'var(--accent-pink)' }}></i>
                              Región *
                            </Form.Label>
                            <div style={{ position: 'relative' }}>
                              <Form.Control
                                type="text"
                                value={busquedaRegion}
                                onChange={handleBusquedaRegionChange}
                                onFocus={() => setMostrarRegiones(true)}
                                placeholder="Busca tu región..."
                                style={{
                                  padding: '12px 16px',
                                  border: '2px solid #f0f0f0',
                                  borderRadius: '12px'
                                }}
                              />
                              {mostrarRegiones && (
                                <div style={{
                                  position: 'absolute',
                                  top: '100%',
                                  left: 0,
                                  right: 0,
                                  background: 'white',
                                  border: '2px solid #f0f0f0',
                                  borderRadius: '0 0 12px 12px',
                                  maxHeight: '200px',
                                  overflowY: 'auto',
                                  zIndex: 1000,
                                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}>
                                  {buscarRegiones(busquedaRegion).map((region, index) => (
                                    <div
                                      key={index}
                                      onClick={() => handleRegionChange(region)}
                                      style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid #f0f0f0',
                                        fontSize: '0.9rem'
                                      }}
                                      onMouseEnter={(e) => e.target.style.background = '#f8f9fa'}
                                      onMouseLeave={(e) => e.target.style.background = 'white'}
                                    >
                                      {region.nombre}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>

                      {/* Mostrar beneficios especiales */}
                      {formData.fechaNacimiento && (
                        <div style={{
                          background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
                          padding: '15px',
                          borderRadius: '10px',
                          marginBottom: '20px',
                          border: '2px solid #4CAF50'
                        }}>
                          <h6 style={{ color: '#2E7D32', marginBottom: '10px' }}>
                            <i className="bi bi-gift me-2"></i>
                            Beneficios Especiales
                          </h6>
                          {calcularEdad(formData.fechaNacimiento) >= 50 && (
                            <div style={{ color: '#2E7D32', fontSize: '0.9rem', marginBottom: '5px' }}>
                              <i className="bi bi-check-circle me-2"></i>
                              ¡Obtienes 50% de descuento permanente por ser mayor de 50 años!
                            </div>
                          )}
                          {esEstudianteDuoc(formData.email) && (
                            <div style={{ color: '#2E7D32', fontSize: '0.9rem' }}>
                              <i className="bi bi-check-circle me-2"></i>
                              ¡Como estudiante DUOC, recibirás tortas gratis en tu cumpleaños!
                            </div>
                          )}
                        </div>
                      )}

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              <i className="bi bi-lock-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                              Contraseña *
                            </Form.Label>
                            <div style={{ position: 'relative' }}>
                              <Form.Control
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                style={{
                                  padding: '12px 45px 12px 16px',
                                  border: '2px solid #f0f0f0',
                                  borderRadius: '12px'
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                  position: 'absolute',
                                  right: '12px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: 'var(--text-secondary)'
                                }}
                              >
                                <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                              </button>
                            </div>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-4">
                            <Form.Label style={{ fontWeight: '700', color: 'var(--text-main)' }}>
                              Confirmar Contraseña *
                            </Form.Label>
                            <Form.Control
                              type={showPassword ? 'text' : 'password'}
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                              placeholder="••••••••"
                              style={{
                                padding: '12px 16px',
                                border: '2px solid #f0f0f0',
                                borderRadius: '12px'
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button 
                        type="submit" 
                        className="w-100 mb-3"
                        style={{
                          background: 'var(--accent-pink)',
                          border: 'none',
                          color: 'var(--accent-chocolate)',
                          fontWeight: 'bold',
                          padding: '15px',
                          borderRadius: '12px',
                          fontSize: '1.1rem',
                          boxShadow: '0 8px 20px rgba(255, 192, 203, 0.3)'
                        }}
                      >
                        <i className="bi bi-person-plus-fill me-2"></i>
                        Crear Mi Cuenta
                      </Button>

                      <div className="text-center">
                        <small style={{ color: 'var(--text-secondary)' }}>
                          ¿Ya tienes cuenta?{' '}
                          <Link 
                            to="/login" 
                            style={{
                              color: 'var(--accent-chocolate)',
                              fontWeight: 'bold',
                              textDecoration: 'none'
                            }}
                          >
                            Inicia sesión aquí
                          </Link>
                        </small>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Registro;

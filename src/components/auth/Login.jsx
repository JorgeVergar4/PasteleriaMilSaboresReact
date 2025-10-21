import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { usuariosService } from '../../data/dataService';

const Login = ({ setUsuario }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usuario = usuariosService.login(formData.email, formData.password);
    
    if (usuario) {
      setUsuario(usuario);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      navigate('/');
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--bg-main) 0%, #FFE4EC 100%)',
      display: 'flex',
      alignItems: 'center',
      paddingTop: '80px',
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
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'rgba(139,69,19,0.1)',
        borderRadius: '50%',
        filter: 'blur(100px)'
      }}></div>

      <Container style={{ position: 'relative', zIndex: 1 }}>
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <Card style={{
              border: 'none',
              borderRadius: '25px',
              boxShadow: '0 20px 60px rgba(139, 69, 19, 0.12)',
              overflow: 'hidden'
            }}>
              <div className="row g-0">
                {/* Columna Izquierda - Ilustración */}
                <div className="col-md-6" style={{
                  background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-chocolate) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '50px 40px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Decoración */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '50%'
                  }}></div>
                  <div style={{
                    position: 'absolute',
                    bottom: '-80px',
                    left: '-80px',
                    width: '250px',
                    height: '250px',
                    background: 'rgba(255,255,255,0.08)',
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
                        style={{ 
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-headings)',
                      color: 'white',
                      fontSize: '2.5rem',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      ¡Bienvenido de Vuelta!
                    </h3>

                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      marginBottom: '30px'
                    }}>
                      Ingresa a tu cuenta y disfruta de nuestros deliciosos productos
                    </p>

                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '20px',
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <p style={{ 
                        color: 'white', 
                        marginBottom: '10px',
                        fontSize: '0.95rem'
                      }}>
                        <i className="bi bi-info-circle me-2"></i>
                        ¿Primera vez aquí?
                      </p>
                      <Link 
                        to="/registro"
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          fontSize: '1.1rem'
                        }}
                      >
                        Crea tu cuenta gratis
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Columna Derecha - Formulario */}
                <div className="col-md-6">
                  <div style={{ padding: '50px 40px' }}>
                    <div className="text-center mb-4">
                      <h2 style={{
                        fontFamily: 'var(--font-headings)',
                        color: 'var(--accent-chocolate)',
                        fontSize: '2.2rem',
                        marginBottom: '10px'
                      }}>
                        Iniciar Sesión
                      </h2>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Accede a tu cuenta de Pastelería Mil Sabores
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
                      <Form.Group className="mb-3">
                        <Form.Label style={{ 
                          fontWeight: '700', 
                          color: 'var(--text-main)',
                          marginBottom: '10px'
                        }}>
                          <i className="bi bi-envelope-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                          Correo Electrónico
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="tu@email.com"
                          required
                          style={{
                            padding: '14px 18px',
                            border: '2px solid #f0f0f0',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            transition: 'all 0.3s ease'
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'var(--accent-pink)'}
                          onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label style={{ 
                          fontWeight: '700', 
                          color: 'var(--text-main)',
                          marginBottom: '10px'
                        }}>
                          <i className="bi bi-lock-fill me-2" style={{ color: 'var(--accent-pink)' }}></i>
                          Contraseña
                        </Form.Label>
                        <div style={{ position: 'relative' }}>
                          <Form.Control
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                            style={{
                              padding: '14px 50px 14px 18px',
                              border: '2px solid #f0f0f0',
                              borderRadius: '12px',
                              fontSize: '1rem',
                              transition: 'all 0.3s ease'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--accent-pink)'}
                            onBlur={(e) => e.target.style.borderColor = '#f0f0f0'}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                              position: 'absolute',
                              right: '15px',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: 'var(--text-secondary)',
                              fontSize: '1.2rem'
                            }}
                          >
                            <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                          </button>
                        </div>
                      </Form.Group>

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Form.Check 
                          type="checkbox"
                          id="remember"
                          label="Recordarme"
                          style={{ color: 'var(--text-secondary)' }}
                        />
                        <Link 
                          to="/recuperar-password" 
                          style={{
                            color: 'var(--accent-chocolate)',
                            fontWeight: '600',
                            textDecoration: 'none',
                            fontSize: '0.95rem'
                          }}
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>

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
                          boxShadow: '0 8px 20px rgba(255, 192, 203, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 12px 25px rgba(255, 192, 203, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(255, 192, 203, 0.3)';
                        }}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>
                        Iniciar Sesión
                      </Button>

                      <div className="text-center">
                        <small style={{ color: 'var(--text-secondary)' }}>
                          ¿No tienes cuenta?{' '}
                          <Link 
                            to="/registro" 
                            style={{
                              color: 'var(--accent-chocolate)',
                              fontWeight: 'bold',
                              textDecoration: 'none'
                            }}
                          >
                            Regístrate aquí
                          </Link>
                        </small>
                      </div>
                    </Form>

                    {/* Cuentas de prueba */}
                    <div className="mt-4 p-3" style={{
                      background: 'linear-gradient(135deg, #FFF5E1 0%, #FFE4EC 100%)',
                      borderRadius: '12px',
                      border: '2px dashed var(--accent-pink)'
                    }}>
                      <div className="text-center mb-2">
                        <strong style={{ color: 'var(--accent-chocolate)' }}>
                          <i className="bi bi-key-fill me-2"></i>
                          Cuentas de Prueba
                        </strong>
                      </div>
                      <small style={{ color: 'var(--text-main)', display: 'block', lineHeight: '1.8' }}>
                        <strong>Admin:</strong> Test@pasteleria.cl / 123456<br />
                        <strong>Cliente:</strong> maria@example.cl / 123456
                      </small>
                    </div>
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

export default Login;

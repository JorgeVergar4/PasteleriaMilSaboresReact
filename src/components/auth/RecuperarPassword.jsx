import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usuariosService } from '../../data/dataService';

const RecuperarPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simular verificación de email
    setTimeout(() => {
      const usuario = usuariosService.getByEmail(email);
      
      if (usuario) {
        setSuccess(true);
        setError('');
      } else {
        setError('No se encontró una cuenta con este email');
      }
      setLoading(false);
    }, 1500);
  };

  if (success) {
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
            <div className="col-md-8 col-lg-6">
              <Card style={{
                border: 'none',
                borderRadius: '25px',
                boxShadow: '0 20px 60px rgba(139, 69, 19, 0.12)',
                overflow: 'hidden'
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, var(--accent-pink) 0%, var(--accent-chocolate) 100%)',
                  padding: '50px 40px',
                  textAlign: 'center',
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

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: 'rgba(255,255,255,0.2)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 30px',
                      backdropFilter: 'blur(10px)',
                      border: '4px solid rgba(255,255,255,0.3)'
                    }}>
                      <i className="bi bi-check-circle-fill" style={{
                        fontSize: '3rem',
                        color: 'white'
                      }}></i>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-headings)',
                      color: 'white',
                      fontSize: '2.2rem',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      ¡Email Enviado!
                    </h3>

                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      marginBottom: '30px'
                    }}>
                      Hemos enviado las instrucciones para restablecer tu contraseña a <strong>{email}</strong>
                    </p>

                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '20px',
                      borderRadius: '15px',
                      backdropFilter: 'blur(10px)',
                      marginBottom: '20px'
                    }}>
                      <p style={{ 
                        color: 'white', 
                        marginBottom: '10px',
                        fontSize: '0.95rem'
                      }}>
                        <i className="bi bi-info-circle me-2"></i>
                        Revisa tu bandeja de entrada y la carpeta de spam
                      </p>
                    </div>

                    <Link 
                      to="/login"
                      style={{
                        color: 'white',
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        fontSize: '1.1rem'
                      }}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Volver al Login
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    );
  }

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
          <div className="col-md-8 col-lg-6">
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
                      <i className="bi bi-key-fill" style={{
                        fontSize: '3rem',
                        color: 'white'
                      }}></i>
                    </div>

                    <h3 style={{
                      fontFamily: 'var(--font-headings)',
                      color: 'white',
                      fontSize: '2.2rem',
                      marginBottom: '20px',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      ¿Olvidaste tu Contraseña?
                    </h3>

                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: '1.1rem',
                      lineHeight: '1.7',
                      marginBottom: '30px'
                    }}>
                      No te preocupes, te ayudamos a recuperarla. Ingresa tu email y te enviaremos las instrucciones.
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
                        ¿Recordaste tu contraseña?
                      </p>
                      <Link 
                        to="/login"
                        style={{
                          color: 'white',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                          fontSize: '1.1rem'
                        }}
                      >
                        Inicia sesión aquí
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
                        fontSize: '2rem',
                        marginBottom: '10px'
                      }}>
                        Recuperar Contraseña
                      </h2>
                      <p style={{ color: 'var(--text-secondary)' }}>
                        Ingresa tu email para recibir las instrucciones
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
                      <Form.Group className="mb-4">
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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

                      <Button 
                        type="submit" 
                        className="w-100 mb-3"
                        disabled={loading}
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
                          if (!loading) {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 25px rgba(255, 192, 203, 0.4)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 8px 20px rgba(255, 192, 203, 0.3)';
                        }}
                      >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-send me-2"></i>
                            Enviar Instrucciones
                          </>
                        )}
                      </Button>

                      <div className="text-center">
                        <small style={{ color: 'var(--text-secondary)' }}>
                          ¿Recordaste tu contraseña?{' '}
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

export default RecuperarPassword;

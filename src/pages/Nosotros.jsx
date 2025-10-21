import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Nosotros = () => {
  return (
    <Container className="py-section">
      <div className="section-title">
        <h2>Sobre Nosotros</h2>
        <p>50 años de tradición y pasión por la repostería</p>
      </div>

      <Row className="mb-5">
        <Col lg={6} className="mb-4 mb-lg-0">
          <div style={{
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            height: '100%'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '20px'
            }}>
              Nuestra Historia
            </h3>
            <p style={{ 
              color: 'var(--text-main)', 
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              Desde 1975, <strong>Pastelería Mil Sabores</strong> ha sido sinónimo de 
              calidad y tradición en la repostería chilena. Comenzamos como un pequeño 
              negocio familiar con el sueño de endulzar la vida de las personas.
            </p>
            <p style={{ 
              color: 'var(--text-main)', 
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              En 1995, logramos un hito histórico al participar en la creación de 
              <strong> la torta más grande del mundo</strong>, obteniendo un récord 
              Guinness que nos posicionó internacionalmente.
            </p>
            <p style={{ 
              color: 'var(--text-main)', 
              lineHeight: '1.8',
              fontSize: '1.05rem'
            }}>
              Hoy, 50 años después, seguimos honrando esa tradición con productos 
              artesanales de primera calidad, combinando técnicas tradicionales con 
              innovación constante.
            </p>
          </div>
        </Col>

        <Col lg={6}>
          <div style={{
            background: 'var(--white)',
            padding: '40px',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            height: '100%'
          }}>
            <h3 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginBottom: '20px'
            }}>
              Nuestra Misión
            </h3>
            <p style={{ 
              color: 'var(--text-main)', 
              lineHeight: '1.8',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              borderLeft: '4px solid var(--accent-pink)',
              paddingLeft: '20px'
            }}>
              "Ofrecer una experiencia dulce y memorable a nuestros clientes, 
              proporcionando tortas y productos de repostería de alta calidad para 
              todas las ocasiones, mientras celebramos nuestras raíces históricas y 
              fomentamos la creatividad en la repostería."
            </p>

            <h3 style={{ 
              fontFamily: 'var(--font-headings)',
              color: 'var(--accent-chocolate)',
              marginTop: '30px',
              marginBottom: '20px'
            }}>
              Nuestra Visión
            </h3>
            <p style={{ 
              color: 'var(--text-main)', 
              lineHeight: '1.8',
              fontSize: '1.05rem',
              fontStyle: 'italic',
              borderLeft: '4px solid var(--accent-pink)',
              paddingLeft: '20px'
            }}>
              "Convertirnos en la tienda online líder de productos de repostería en 
              Chile, conocida por nuestra innovación, calidad y el impacto positivo 
              en la comunidad, especialmente en la formación de nuevos talentos en 
              gastronomía."
            </p>
          </div>
        </Col>
      </Row>

      <div style={{
        background: 'var(--white)',
        padding: '50px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)',
        marginBottom: '40px'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-headings)',
          color: 'var(--accent-chocolate)',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          Nuestros Valores
        </h3>

        <Row className="g-4">
          {[
            {
              icon: 'heart-fill',
              titulo: 'Pasión',
              descripcion: 'Amor y dedicación en cada producto que elaboramos'
            },
            {
              icon: 'award-fill',
              titulo: 'Calidad Premium',
              descripcion: 'Solo ingredientes de primera selección y recetas perfeccionadas'
            },
            {
              icon: 'people-fill',
              titulo: 'Compromiso Social',
              descripcion: 'Apoyamos la formación de nuevos talentos gastronómicos'
            },
            {
              icon: 'lightbulb-fill',
              titulo: 'Innovación',
              descripcion: 'Combinamos tradición con nuevas tendencias y técnicas modernas'
            }
          ].map((valor, idx) => (
            <Col md={6} lg={3} key={idx}>
              <Card className="text-center h-100" style={{
                border: '2px solid var(--accent-pink)',
                borderRadius: 'var(--border-radius)',
                padding: '20px'
              }}>
                <Card.Body>
                  <i 
                    className={`bi bi-${valor.icon}`}
                    style={{ 
                      fontSize: '3rem', 
                      color: 'var(--accent-pink)',
                      marginBottom: '15px'
                    }}
                  ></i>
                  <h5 style={{ 
                    fontFamily: 'var(--font-headings)',
                    color: 'var(--accent-chocolate)',
                    marginBottom: '15px'
                  }}>
                    {valor.titulo}
                  </h5>
                  <p style={{ 
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    margin: 0
                  }}>
                    {valor.descripcion}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Sección de Ubicación con Mapa */}
      <div style={{
        background: 'var(--white)',
        padding: '50px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)',
        marginBottom: '40px'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-headings)',
          color: 'var(--accent-chocolate)',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <i className="bi bi-geo-alt-fill me-2"></i>
          Donde puedes encontrarnos
        </h3>
        
        <Row className="g-4">
          <Col lg={6}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent-pink) 0%, #FFE4EC 100%)',
              padding: '30px',
              borderRadius: '15px',
              height: '100%'
            }}>
              <h4 style={{ 
                color: 'var(--accent-chocolate)',
                marginBottom: '20px',
                fontFamily: 'var(--font-headings)'
              }}>
                <i className="bi bi-shop me-2"></i>
                Pastelería Mil Sabores
              </h4>
              <div style={{ marginBottom: '15px' }}>
                <i className="bi bi-geo-alt me-2" style={{ color: 'var(--accent-chocolate)' }}></i>
                <strong>Dirección:</strong> Av. Libertador Bernardo O'Higgins 1234, Santiago Centro, Chile
              </div>
              <div style={{ marginBottom: '15px' }}>
                <i className="bi bi-telephone me-2" style={{ color: 'var(--accent-chocolate)' }}></i>
                <strong>Teléfono:</strong> +56 2 2345 6789
              </div>
              <div style={{ marginBottom: '15px' }}>
                <i className="bi bi-envelope me-2" style={{ color: 'var(--accent-chocolate)' }}></i>
                <strong>Email:</strong> contacto@mil-sabores.cl
              </div>
              <div style={{ marginBottom: '15px' }}>
                <i className="bi bi-clock me-2" style={{ color: 'var(--accent-chocolate)' }}></i>
                <strong>Horarios:</strong><br />
                Lunes a Viernes: 8:00 - 20:00<br />
                Sábados: 9:00 - 18:00<br />
                Domingos: 10:00 - 16:00
              </div>
            </div>
          </Col>
          
          <Col lg={6}>
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              height: '300px'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1234567890123!2d-70.64827!3d-33.44889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5a251000001%3A0x1234567890abcdef!2sAv.%20Libertador%20Bernardo%20O%27Higgins%2C%20Santiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1234567890123!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Pastelería Mil Sabores"
              ></iframe>
            </div>
          </Col>
        </Row>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, var(--accent-chocolate) 0%, var(--text-main) 100%)',
        color: 'var(--white)',
        padding: '50px',
        borderRadius: 'var(--border-radius)',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontFamily: 'var(--font-headings)',
          color: 'var(--white)',
          marginBottom: '20px'
        }}>
          Apoyamos a Duoc UC
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '800px', margin: '0 auto' }}>
          Con cada compra en nuestra pastelería, contribuyes directamente a la formación 
          de estudiantes de gastronomía en Duoc UC. Creemos en el poder de la educación 
          y en construir el futuro de la repostería chilena apoyando a las nuevas generaciones.
        </p>
      </div>
    </Container>
  );
};

export default Nosotros;

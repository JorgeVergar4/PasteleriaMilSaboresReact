import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <div className="d-flex align-items-center gap-2 mb-3">
              <img src="assets/images/logo.png" alt="Logo" width="40" />
              <h5 className="mb-0" style={{ fontFamily: 'Pacifico', color: 'var(--accent-white)' }}>
                Pastelería Mil Sabores
              </h5>
            </div>
            <p>
              50 años de tradición en repostería chilena. Los mejores pasteles 
              y dulces artesanales desde 1975.
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </Col>

          <Col md={4}>
            <h5 style={{ fontFamily: 'Pacifico', color: 'var(--accent-white)', marginBottom: '20px' }}>
              Enlaces
            </h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/productos">Productos</Link>
              </li>
              <li className="mb-2">
                <Link to="/ofertas">Ofertas</Link>
              </li>
              <li className="mb-2">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="mb-2">
                <Link to="/contacto">Contacto</Link>
              </li>
              <li className="mb-2">
                <Link to="/nosotros">Nosotros</Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5 style={{ fontFamily: 'Pacifico', color: 'var(--accent-white)', marginBottom: '20px' }}>
              Contacto
            </h5>
            <p>
              <i className="bi bi-geo-alt-fill me-2"></i>
              Av. Libertador Bernardo O'Higgins 1234, Santiago Centro, Chile
            </p>
            <p>
              <i className="bi bi-telephone-fill me-2"></i>
              +56 9 1234 5678
            </p>
            <p>
              <i className="bi bi-envelope-fill me-2"></i>
              contacto@pasteleriamilsabores.cl
            </p>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '30px 0 20px' }} />

        <Row>
          <Col className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Pastelería Mil Sabores. 
              Todos los derechos reservados. | Desarrollado Por FossilByte
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

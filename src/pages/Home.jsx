import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/productos/ProductCard';
import { productosService } from '../data/dataService';
// Imagen movida a public/assets/images/

const Home = ({ agregarAlCarrito }) => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    const productos = productosService.getAll();
    setDestacados(productos.slice(0, 8));
  }, []);

  return (
    <>
{/* Hero Section */}
<section 
  className="hero-section"
  style={{
    backgroundImage: `url('/assets/images/home-image.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
  <Container>
    <Row>
      <Col lg={12}>
        <div className="hero-content">
          <h1>50 Años Horneando Felicidad</h1>
          <p>
            Famosos desde nuestro récord Guinness en 1995, renovamos nuestra 
            tradición para traerte la mejor experiencia dulce a tu hogar.
          </p>
          <Button as={Link} to="/productos" size="lg" className="btn-primary">
            <i className="bi bi-grid-3x3-gap me-2"></i>
            Descubre Nuestros Sabores
          </Button>
        </div>
      </Col>
    </Row>
  </Container>
</section>


      {/* Productos Destacados */}
      <Container className="py-section">
        <div className="section-title">
          <h2>Nuestras Creaciones Destacadas</h2>
          <p>Recetas amadas y perfeccionadas durante 50 años</p>
        </div>

        <div className="product-grid">
          {destacados.map(producto => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              agregarAlCarrito={agregarAlCarrito}
            />
          ))}
        </div>

        <div className="text-center mt-4">
          <Button as={Link} to="/productos" size="lg" className="btn-secondary">
            Ver Todos los Productos
            <i className="bi bi-arrow-right ms-2"></i>
          </Button>
        </div>
      </Container>

      {/* Sección Duoc UC */}
      <section className="duoc-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} className="text-center">
              <h3>Apoyando a Futuros Talentos</h3>
              <p className="lead mb-4">
                Con cada compra, apoyas la formación de nuevos estudiantes de 
                gastronomía de Duoc UC, ayudándonos a construir el futuro de la 
                repostería en Chile.
              </p>
              <Button 
                as={Link} 
                to="/nosotros" 
                variant="light" 
                size="lg"
                style={{
                  background: 'var(--white)',
                  color: 'var(--accent-chocolate)',
                  fontWeight: 'bold',
                  borderRadius: '50px',
                  padding: '12px 30px'
                }}
              >
                Conoce Nuestra Misión
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;

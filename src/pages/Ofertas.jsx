import React, { useEffect, useState } from 'react';
import { Container, Badge } from 'react-bootstrap';
import ProductCard from '../components/productos/ProductCard';
import { productosService } from '../data/dataService';

const Ofertas = ({ agregarAlCarrito }) => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    setOfertas(productosService.getOfertas());
  }, []);

  return (
    <Container className="py-section">
      <div className="section-title">
        <h2>
          <i className="bi bi-tag-fill me-3" style={{ color: 'var(--accent-pink)' }}></i>
          Ofertas Especiales
        </h2>
        <p>Aprovecha nuestros precios especiales</p>
      </div>

      {ofertas.length === 0 ? (
        <div className="text-center py-5" style={{
          background: 'var(--white)',
          padding: '60px',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--box-shadow)'
        }}>
          <i 
            className="bi bi-emoji-frown" 
            style={{ fontSize: '4rem', color: 'var(--text-secondary)' }}
          ></i>
          <h4 className="mt-4" style={{ color: 'var(--accent-chocolate)' }}>
            No hay ofertas disponibles en este momento
          </h4>
          <p style={{ color: 'var(--text-secondary)' }}>
            ¡Vuelve pronto para encontrar deliciosas promociones!
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 text-center">
            <Badge 
              bg="danger" 
              style={{ 
                fontSize: '1rem', 
                padding: '10px 20px',
                borderRadius: '20px'
              }}
            >
              {ofertas.length} producto{ofertas.length !== 1 ? 's' : ''} en oferta
            </Badge>
          </div>

          <div className="product-grid">
            {ofertas.map(producto => (
              <ProductCard 
                key={producto.id}
                producto={producto}
                agregarAlCarrito={agregarAlCarrito}
              />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default Ofertas;

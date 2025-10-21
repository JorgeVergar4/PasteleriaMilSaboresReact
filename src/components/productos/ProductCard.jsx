import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ producto, agregarAlCarrito }) => {
  return (
    <Card className="product-card h-100">
      <Link to={`/producto/${producto.id}`}>
        <Card.Img 
          variant="top" 
          src={producto.imagen || '/assets/images/logo.png'} 
          alt={producto.nombre}
          loading="lazy"
          onError={(e) => {
            e.target.src = '/assets/images/logo.png';
          }}
        />
      </Link>
      
      <Card.Body className="product-card-body">
        {producto.enOferta && (
          <Badge bg="danger" className="mb-2">
            ¡OFERTA!
          </Badge>
        )}
        
        <div className="product-category">{producto.categoria}</div>
        
        <Card.Title as="h3">
          <Link 
            to={`/producto/${producto.id}`}
            style={{ 
              color: 'var(--accent-chocolate)', 
              textDecoration: 'none' 
            }}
          >
            {producto.nombre}
          </Link>
        </Card.Title>
        
        <div className="product-price">
          ${producto.precio.toLocaleString('es-CL')}
          {producto.precioOriginal && (
            <small 
              className="ms-2 text-decoration-line-through" 
              style={{ color: 'var(--text-secondary)' }}
            >
              ${producto.precioOriginal.toLocaleString('es-CL')}
            </small>
          )}
        </div>
        
        <Button 
          onClick={() => agregarAlCarrito(producto)}
          disabled={producto.stock < 1}
          className="w-100 mt-auto"
          style={{
            background: 'var(--accent-pink)',
            border: 'none',
            color: 'var(--accent-chocolate)',
            fontWeight: 'bold',
            borderRadius: '8px'
          }}
        >
          <i className="bi bi-cart-plus me-2"></i>
          {producto.stock > 0 ? 'Añadir al Carrito' : 'Sin Stock'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PagoError = () => {
  return (
    <Container className="py-section">
      <div className="text-center" style={{
        background: 'var(--white)',
        padding: '60px 40px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          background: 'linear-gradient(135deg, #dc3545, #c82333)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px'
        }}>
          <i className="bi bi-x-lg" style={{ fontSize: '4rem', color: 'white' }}></i>
        </div>

        <h1 style={{ 
          fontFamily: 'var(--font-headings)', 
          color: 'var(--accent-chocolate)',
          marginBottom: '20px'
        }}>
          Error en el Pago
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-main)',
          marginBottom: '30px'
        }}>
          Lo sentimos, hubo un problema al procesar tu pago. Por favor, 
          intenta nuevamente o contacta con nosotros si el problema persiste.
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Button 
            as={Link} 
            to="/checkout" 
            size="lg"
            style={{
              background: 'var(--accent-pink)',
              border: 'none',
              color: 'var(--accent-chocolate)',
              fontWeight: 'bold',
              borderRadius: 'var(--border-radius)',
              padding: '12px 30px'
            }}
          >
            <i className="bi bi-arrow-repeat me-2"></i>
            Intentar de Nuevo
          </Button>

          <Button 
            as={Link} 
            to="/contacto" 
            size="lg"
            variant="outline-secondary"
          >
            <i className="bi bi-headset me-2"></i>
            Contactar Soporte
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PagoError;

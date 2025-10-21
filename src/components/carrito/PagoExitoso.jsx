import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { generarBoletaPDF } from '../../services/pdfService';
import { ordenesService } from '../../data/dataService';
import { notificacionesService } from '../../services/notificacionesService';

const PagoExitoso = ({ usuario }) => {
  const location = useLocation();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrden = () => {
      try {
        // Obtener ID de la orden desde la navegación
        const ordenId = location.state?.ordenId;
        
        if (ordenId) {
          // Buscar la orden por ID
          const ordenEncontrada = ordenesService.getById(ordenId);
          if (ordenEncontrada) {
            setOrden(ordenEncontrada);
            
            // Actualizar estado a confirmado
            ordenesService.update(ordenId, { estado: 'confirmado' });
            
            // Crear notificaciones si hay usuario
            if (usuario) {
              notificacionesService.actualizarEstadoPedido(ordenId, 'confirmado');
              
              // Simular actualizaciones de estado del pedido
              setTimeout(() => {
                notificacionesService.actualizarEstadoPedido(ordenId, 'preparando');
                ordenesService.update(ordenId, { estado: 'preparando' });
              }, 30000); // 30 segundos
              
              setTimeout(() => {
                notificacionesService.actualizarEstadoPedido(ordenId, 'listo');
                ordenesService.update(ordenId, { estado: 'listo' });
              }, 60000); // 1 minuto
              
              setTimeout(() => {
                notificacionesService.actualizarEstadoPedido(ordenId, 'enviado');
                ordenesService.update(ordenId, { estado: 'enviado' });
              }, 90000); // 1.5 minutos
              
              setTimeout(() => {
                notificacionesService.actualizarEstadoPedido(ordenId, 'entregado');
                ordenesService.update(ordenId, { estado: 'entregado' });
              }, 120000); // 2 minutos
            }
          } else {
            console.error('Orden no encontrada');
          }
        } else {
          console.error('No se encontró ID de orden');
        }
      } catch (error) {
        console.error('Error al cargar la orden:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarOrden();
    
    // Limpiar carrito y cupón
    localStorage.removeItem('carrito');
    localStorage.removeItem('cuponAplicado');
  }, [usuario, location.state]);

  const handleDescargarBoleta = () => {
    if (orden) {
      // Usar datos del usuario logueado o datos de envío de la orden
      const datosUsuario = usuario || orden.datosEnvio;
      generarBoletaPDF(orden, datosUsuario);
    }
  };

  if (loading) {
    return (
      <Container className="py-section text-center">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div>
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p>Cargando información de tu pedido...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!orden) {
    return (
      <Container className="py-section text-center">
        <div style={{
          background: 'var(--white)',
          padding: '60px 40px',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--box-shadow)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <i className="bi bi-exclamation-triangle" style={{ fontSize: '4rem', color: '#ffc107' }}></i>
          <h2 className="mt-4" style={{ color: 'var(--accent-chocolate)' }}>
            Error al cargar el pedido
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            No se pudo encontrar la información de tu pedido.
          </p>
          <Button 
            as={Link} 
            to="/" 
            size="lg"
            className="mt-3"
            style={{
              background: 'var(--accent-pink)',
              border: 'none',
              color: 'var(--accent-chocolate)',
              fontWeight: 'bold',
              borderRadius: '8px'
            }}
          >
            <i className="bi bi-house me-2"></i>
            Volver al Inicio
          </Button>
        </div>
      </Container>
    );
  }
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
          background: 'linear-gradient(135deg, #28a745, #20c997)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px'
        }}>
          <i className="bi bi-check-lg" style={{ fontSize: '4rem', color: 'white' }}></i>
        </div>

        <h1 style={{ 
          fontFamily: 'var(--font-headings)', 
          color: 'var(--accent-chocolate)',
          marginBottom: '20px'
        }}>
          ¡Pedido Confirmado!
        </h1>

        <p style={{ 
          fontSize: '1.1rem', 
          color: 'var(--text-main)',
          marginBottom: '30px'
        }}>
          Tu pedido ha sido recibido exitosamente. Te hemos enviado un correo 
          de confirmación con los detalles de tu compra.
        </p>

        <div style={{
          background: 'var(--bg-main)',
          padding: '20px',
          borderRadius: 'var(--border-radius)',
          marginBottom: '30px'
        }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>Número de pedido:</strong> #{orden.numeroOrden}
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>Total pagado:</strong> ${orden.total.toLocaleString('es-CL')}
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '0' }}>
            <strong>Tiempo estimado de entrega:</strong> 2-3 días hábiles
          </p>
        </div>

        <div className="d-flex gap-3 justify-content-center">
          <Button 
            onClick={handleDescargarBoleta}
            size="lg"
            style={{
              background: '#28a745',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              borderRadius: 'var(--border-radius)',
              padding: '12px 30px'
            }}
          >
            <i className="bi bi-download me-2"></i>
            Descargar Boleta
          </Button>
          
          <Button 
            as={Link} 
            to="/" 
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
            <i className="bi bi-house me-2"></i>
            Volver al Inicio
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PagoExitoso;

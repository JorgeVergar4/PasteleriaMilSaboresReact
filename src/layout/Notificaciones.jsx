import React, { useState, useEffect } from 'react';
import { Badge, Button, Dropdown, ListGroup } from 'react-bootstrap';
import { notificacionesService } from '../services/notificacionesService';

const Notificaciones = ({ usuario }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [noLeidas, setNoLeidas] = useState(0);

  useEffect(() => {
    if (usuario) {
      const notifs = notificacionesService.getByUsuario(usuario.id);
      setNotificaciones(notifs);
      setNoLeidas(notificacionesService.getNoLeidas(usuario.id));
    }
  }, [usuario]);

  const marcarLeida = (id) => {
    notificacionesService.marcarLeida(id);
    setNotificaciones(notificacionesService.getByUsuario(usuario.id));
    setNoLeidas(notificacionesService.getNoLeidas(usuario.id));
  };

  const marcarTodasLeidas = () => {
    notificacionesService.marcarTodasLeidas(usuario.id);
    setNotificaciones(notificacionesService.getByUsuario(usuario.id));
    setNoLeidas(0);
  };

  const formatearFecha = (fecha) => {
    const ahora = new Date();
    const diffMs = ahora - new Date(fecha);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ahora';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return new Date(fecha).toLocaleDateString('es-CL');
  };

  if (!usuario) return null;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle 
        variant="link" 
        id="dropdown-notificaciones"
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-main)',
          textDecoration: 'none',
          position: 'relative'
        }}
      >
        <i className="bi bi-bell" style={{ fontSize: '1.2rem' }}></i>
        {noLeidas > 0 && (
          <Badge 
            bg="danger" 
            className="position-absolute top-0 start-100 translate-middle rounded-pill"
            style={{ fontSize: '0.7rem' }}
          >
            {noLeidas}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu 
        style={{ 
          minWidth: '350px', 
          maxHeight: '400px', 
          overflowY: 'auto',
          border: 'none',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
          borderRadius: '12px'
        }}
      >
        <div style={{ padding: '15px', borderBottom: '1px solid #f0f0f0' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h6 style={{ margin: 0, fontWeight: 'bold', color: 'var(--accent-chocolate)' }}>
              Notificaciones
            </h6>
            {noLeidas > 0 && (
              <Button 
                variant="link" 
                size="sm"
                onClick={marcarTodasLeidas}
                style={{ 
                  padding: '2px 8px', 
                  fontSize: '0.8rem',
                  color: 'var(--accent-pink)',
                  textDecoration: 'none'
                }}
              >
                Marcar todas como leídas
              </Button>
            )}
          </div>
        </div>

        {notificaciones.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <i className="bi bi-bell-slash" style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}></i>
            <p style={{ margin: '10px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              No tienes notificaciones
            </p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {notificaciones.map(notif => (
              <ListGroup.Item 
                key={notif.id}
                style={{ 
                  border: 'none',
                  padding: '12px 15px',
                  background: notif.leida ? 'white' : '#f8f9fa',
                  cursor: 'pointer'
                }}
                onClick={() => marcarLeida(notif.id)}
              >
                <div className="d-flex align-items-start">
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: notif.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0
                    }}
                  >
                    <i className={`${notif.icono}`} style={{ color: 'white', fontSize: '1rem' }}></i>
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 style={{ 
                        margin: '0 0 4px', 
                        fontSize: '0.9rem',
                        fontWeight: notif.leida ? 'normal' : 'bold',
                        color: 'var(--text-main)'
                      }}>
                        {notif.titulo}
                      </h6>
                      <small style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.75rem',
                        marginLeft: '8px',
                        flexShrink: 0
                      }}>
                        {formatearFecha(notif.fecha)}
                      </small>
                    </div>
                    
                    <p style={{ 
                      margin: '0', 
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.4'
                    }}>
                      {notif.mensaje}
                    </p>
                    
                    {!notif.leida && (
                      <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--accent-pink)',
                        marginTop: '8px'
                      }}></div>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notificaciones;

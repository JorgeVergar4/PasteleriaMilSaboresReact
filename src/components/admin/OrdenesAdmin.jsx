import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form, Alert } from 'react-bootstrap';
import { LoadingSpinner } from '../ui';
import { ordenesService, usuariosService } from '../../data/dataService';

const OrdenesAdmin = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('todas');
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [showDetallesModal, setShowDetallesModal] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      
      // Cargar órdenes desde localStorage
      ordenesService.loadFromStorage();
      
      const ordenesData = ordenesService.getAll();
      const usuariosData = usuariosService.getAll();
      
      setOrdenes(ordenesData);
      setUsuarios(usuariosData);
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error('Error cargando órdenes:', err);
    } finally {
      setLoading(false);
    }
  };

  const obtenerNombreUsuario = (usuarioId) => {
    if (!usuarioId) return 'Cliente no registrado';
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario ? `${usuario.nombre} ${usuario.apellidos}` : 'Usuario no encontrado';
  };

  const obtenerEmailUsuario = (usuarioId) => {
    if (!usuarioId) return 'No disponible';
    const usuario = usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.email : 'No disponible';
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      'pendiente': { variant: 'warning', text: 'Pendiente' },
      'confirmado': { variant: 'info', text: 'Confirmado' },
      'preparando': { variant: 'primary', text: 'Preparando' },
      'listo': { variant: 'success', text: 'Listo' },
      'enviado': { variant: 'secondary', text: 'Enviado' },
      'entregado': { variant: 'success', text: 'Entregado' },
      'cancelado': { variant: 'danger', text: 'Cancelado' }
    };
    
    const estadoInfo = estados[estado] || { variant: 'light', text: estado };
    return <Badge bg={estadoInfo.variant}>{estadoInfo.text}</Badge>;
  };

  const filtrarOrdenes = () => {
    if (filtro === 'todas') return ordenes;
    return ordenes.filter(orden => orden.estado === filtro);
  };

  const handleCambiarEstado = (orden) => {
    setOrdenSeleccionada(orden);
    setNuevoEstado(orden.estado);
    setShowModal(true);
  };

  const handleVerDetalles = (orden) => {
    setOrdenSeleccionada(orden);
    setShowDetallesModal(true);
  };

  const confirmarCambioEstado = () => {
    if (ordenSeleccionada && nuevoEstado) {
      ordenesService.update(ordenSeleccionada.id, { estado: nuevoEstado });
      setOrdenes(ordenesService.getAll());
      setShowModal(false);
      setOrdenSeleccionada(null);
      setNuevoEstado('');
    }
  };

  const calcularTotalOrden = (orden) => {
    return orden.total || 0;
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <LoadingSpinner 
        message="Cargando órdenes..." 
        size="lg"
      />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
        <Button onClick={cargarDatos}>Reintentar</Button>
      </Alert>
    );
  }

  const ordenesFiltradas = filtrarOrdenes();

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="display-6 fw-bold">
            <i className="bi bi-cart-check me-3"></i>
            Gestión de Órdenes
          </h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5 className="card-title">
                <i className="bi bi-funnel me-2"></i>
                Filtros
              </h5>
              <Form.Select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              >
                <option value="todas">Todas las órdenes</option>
                <option value="pendiente">Pendientes</option>
                <option value="confirmado">Confirmadas</option>
                <option value="preparando">Preparando</option>
                <option value="listo">Listas</option>
                <option value="enviado">Enviadas</option>
                <option value="entregado">Entregadas</option>
                <option value="cancelado">Canceladas</option>
              </Form.Select>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Resumen
              </h5>
              <p className="mb-1">Total de órdenes: <strong>{ordenes.length}</strong></p>
              <p className="mb-0">Mostrando: <strong>{ordenesFiltradas.length}</strong></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <i className="bi bi-list-ul me-2"></i>
                Lista de Órdenes
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              {ordenesFiltradas.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <p className="mt-3 text-muted">No hay órdenes para mostrar</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Método de Pago</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenesFiltradas.map(orden => (
                        <tr key={orden.id}>
                          <td>
                            <strong>#{orden.numeroOrden}</strong>
                          </td>
                          <td>
                            <div>
                              <div className="fw-bold">{obtenerNombreUsuario(orden.usuarioId)}</div>
                              <small className="text-muted">{obtenerEmailUsuario(orden.usuarioId)}</small>
                            </div>
                          </td>
                          <td>
                            <small>{formatearFecha(orden.fecha)}</small>
                          </td>
                          <td>
                            <strong>${calcularTotalOrden(orden).toLocaleString('es-CL')}</strong>
                          </td>
                          <td>
                            {getEstadoBadge(orden.estado)}
                          </td>
                          <td>
                            <Badge bg="secondary" style={{ color: 'white' }}>
                              {orden.metodoPago || 'No especificado'}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                variant="outline-info"
                                size="sm"
                                onClick={() => handleVerDetalles(orden)}
                              >
                                <i className="bi bi-eye me-1"></i>
                                Ver Detalles
                              </Button>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleCambiarEstado(orden)}
                              >
                                <i className="bi bi-pencil me-1"></i>
                                Cambiar Estado
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal para ver detalles de la orden */}
      <Modal show={showDetallesModal} onHide={() => setShowDetallesModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-receipt me-2"></i>
            Detalles de la Orden
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ordenSeleccionada && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <h6><strong>Información de la Orden</strong></h6>
                  <p><strong>Número:</strong> #{ordenSeleccionada.numeroOrden}</p>
                  <p><strong>Fecha:</strong> {formatearFecha(ordenSeleccionada.fecha)}</p>
                  <p><strong>Estado:</strong> {getEstadoBadge(ordenSeleccionada.estado)}</p>
                  <p><strong>Método de Pago:</strong> {ordenSeleccionada.metodoPago || 'No especificado'}</p>
                </Col>
                <Col md={6}>
                  <h6><strong>Información del Cliente</strong></h6>
                  <p><strong>Nombre:</strong> {obtenerNombreUsuario(ordenSeleccionada.usuarioId)}</p>
                  <p><strong>Email:</strong> {obtenerEmailUsuario(ordenSeleccionada.usuarioId)}</p>
                  {ordenSeleccionada.datosEnvio && (
                    <>
                      <p><strong>Teléfono:</strong> {ordenSeleccionada.datosEnvio.telefono}</p>
                      <p><strong>Dirección:</strong> {ordenSeleccionada.datosEnvio.direccion}</p>
                      <p><strong>Comuna:</strong> {ordenSeleccionada.datosEnvio.comuna}</p>
                      <p><strong>Región:</strong> {ordenSeleccionada.datosEnvio.region}</p>
                    </>
                  )}
                </Col>
              </Row>

              <hr />

              <h6><strong>Productos Comprados</strong></h6>
              {ordenSeleccionada.productos && ordenSeleccionada.productos.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordenSeleccionada.productos.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.imagen || '/assets/images/logo.png'} 
                                alt={item.nombre}
                                style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px', borderRadius: '4px' }}
                                onError={(e) => {
                                  e.target.src = '/assets/images/logo.png';
                                }}
                              />
                              <div>
                                <strong>{item.nombre}</strong>
                                <br />
                                <small className="text-muted">{item.categoria}</small>
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <Badge bg="primary">{item.cantidad || 1}</Badge>
                          </td>
                          <td>${item.precio.toLocaleString('es-CL')}</td>
                          <td><strong>${((item.precio || 0) * (item.cantidad || 1)).toLocaleString('es-CL')}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <Alert variant="warning">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  No se encontraron productos en esta orden.
                </Alert>
              )}

              <hr />

              <Row>
                <Col md={6}>
                  <h6><strong>Resumen de Pagos</strong></h6>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${(ordenSeleccionada.subtotal || 0).toLocaleString('es-CL')}</span>
                  </div>
                  {ordenSeleccionada.descuentos > 0 && (
                    <div className="d-flex justify-content-between text-success">
                      <span>Descuentos:</span>
                      <span>-${(ordenSeleccionada.descuentos || 0).toLocaleString('es-CL')}</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <span>IVA (19%):</span>
                    <span>${(ordenSeleccionada.iva || 0).toLocaleString('es-CL')}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>${(ordenSeleccionada.total || 0).toLocaleString('es-CL')}</strong>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetallesModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para cambiar estado */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil me-2"></i>
            Cambiar Estado de Orden
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ordenSeleccionada && (
            <div>
              <p><strong>Orden:</strong> #{ordenSeleccionada.numeroOrden}</p>
              <p><strong>Cliente:</strong> {obtenerNombreUsuario(ordenSeleccionada.usuarioId)}</p>
              <p><strong>Total:</strong> ${calcularTotalOrden(ordenSeleccionada).toLocaleString('es-CL')}</p>
              
              <Form.Group className="mt-3">
                <Form.Label>Nuevo Estado:</Form.Label>
                <Form.Select
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="confirmado">Confirmado</option>
                  <option value="preparando">Preparando</option>
                  <option value="listo">Listo</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </Form.Select>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarCambioEstado}>
            <i className="bi bi-check me-1"></i>
            Confirmar Cambio
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrdenesAdmin;

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Alert } from 'react-bootstrap';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import ProductoAdmin from './ProductoAdmin';
import UsuarioAdmin from './UsuarioAdmin';
import CategoriaAdmin from './CategoriaAdmin';
import Reportes from './Reportes';
import OrdenesAdmin from './OrdenesAdmin';
import { LoadingSpinner } from '../ui';
import { ordenesService, productosService, usuariosService } from '../../data/dataService';

const Dashboard = ({ usuario }) => {
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        setLoading(true);
        
        // Cargar órdenes desde localStorage
        ordenesService.loadFromStorage();
        
        const stats = ordenesService.getEstadisticas();
        const productos = productosService.getAll();
        const usuarios = usuariosService.getAll();
        
        setEstadisticas({
          ...stats,
          totalProductos: productos.length,
          totalUsuarios: usuarios.length
        });
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error('Error cargando estadísticas:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarEstadisticas();
  }, []);

  // Verificar si el usuario es admin
  if (!usuario || usuario.rol !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <Container fluid>
      <Row>
        <Col md={2} className="admin-sidebar p-0">
          <div className="p-4">
            <h4 className="text-white mb-4">
              <i className="bi bi-speedometer2 me-2"></i>
              Panel Admin
            </h4>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin" className="text-white">
                <i className="bi bi-house me-2"></i>
                Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/productos" className="text-white">
                <i className="bi bi-box me-2"></i>
                Productos
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/usuarios" className="text-white">
                <i className="bi bi-people me-2"></i>
                Usuarios
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/ordenes" className="text-white">
                <i className="bi bi-cart-check me-2"></i>
                Órdenes
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/categorias" className="text-white">
                <i className="bi bi-tags me-2"></i>
                Categorías
              </Nav.Link>
              <Nav.Link as={Link} to="/admin/reportes" className="text-white">
                <i className="bi bi-graph-up me-2"></i>
                Reportes
              </Nav.Link>
              <hr className="bg-light" />
              <Nav.Link as={Link} to="/" className="text-white">
                <i className="bi bi-arrow-left me-2"></i>
                Volver a la tienda
              </Nav.Link>
            </Nav>
          </div>
        </Col>

        <Col md={10} className="p-4">
          <Routes>
            <Route path="/" element={<DashboardHome estadisticas={estadisticas} loading={loading} error={error} />} />
            <Route path="/productos" element={<ProductoAdmin />} />
            <Route path="/usuarios" element={<UsuarioAdmin />} />
            <Route path="/ordenes" element={<OrdenesAdmin />} />
            <Route path="/categorias" element={<CategoriaAdmin />} />
            <Route path="/reportes" element={<Reportes />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

const DashboardHome = ({ estadisticas, loading, error }) => {
  if (loading) {
    return (
      <LoadingSpinner 
        message="Cargando estadísticas..." 
        size="lg"
      />
    );
  }

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!estadisticas) {
    return (
      <Alert variant="warning">
        <Alert.Heading>Sin datos</Alert.Heading>
        <p>No se pudieron cargar las estadísticas.</p>
      </Alert>
    );
  }

  return (
    <div>
      <h1 className="display-5 fw-bold mb-4">
        <i className="bi bi-speedometer2 me-3"></i>
        Dashboard Principal
      </h1>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body className="d-flex flex-column">
              <i className="bi bi-box text-primary" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3 text-primary">{estadisticas.totalProductos || 0}</h3>
              <p className="text-muted mb-0">Productos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body className="d-flex flex-column">
              <i className="bi bi-people text-success" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3 text-success">{estadisticas.totalUsuarios || 0}</h3>
              <p className="text-muted mb-0">Usuarios</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body className="d-flex flex-column">
              <i className="bi bi-cart text-warning" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3 text-warning">{estadisticas.totalOrdenes || 0}</h3>
              <p className="text-muted mb-0">Órdenes</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm text-center h-100">
            <Card.Body className="d-flex flex-column">
              <i className="bi bi-currency-dollar text-danger" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3 text-danger">${(estadisticas.ventasHoy || 0).toLocaleString('es-CL')}</h3>
              <p className="text-muted mb-0">Ventas Hoy</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-graph-up me-2"></i>
                Resumen de Ventas
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-3">
                <span>Total de Ventas:</span>
                <strong className="text-primary">${(estadisticas.totalVentas || 0).toLocaleString('es-CL')}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Órdenes Completadas:</span>
                <strong className="text-success">{estadisticas.ordenesCompletadas || 0}</strong>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Órdenes Pendientes:</span>
                <strong className="text-warning">{estadisticas.ordenesPendientes || 0}</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>En Proceso:</span>
                <strong className="text-info">{estadisticas.ordenesEnProceso || 0}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-activity me-2"></i>
                Actividad Reciente
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-circle-fill text-success me-2" style={{ fontSize: '0.5rem' }}></i>
                <span>Última actualización: {new Date().toLocaleString('es-CL')}</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-check-circle text-primary me-2"></i>
                <span>Sistema funcionando correctamente</span>
              </div>
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-shield-check text-success me-2"></i>
                <span>Datos sincronizados</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="bi bi-clock text-info me-2"></i>
                <span>Última orden: {estadisticas.totalOrdenes > 0 ? 'Reciente' : 'Sin órdenes'}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

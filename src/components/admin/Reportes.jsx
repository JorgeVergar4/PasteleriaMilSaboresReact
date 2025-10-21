import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge } from 'react-bootstrap';
import { productosService, usuariosService, ordenesService } from '../../data/dataService';

const Reportes = () => {
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalUsuarios: 0,
    totalOrdenes: 0,
    ventasTotal: 0,
    productosEnOferta: 0,
    productosBajoStock: 0
  });

  useEffect(() => {
    const productos = productosService.getAll();
    const usuarios = usuariosService.getAll();
    const ordenes = ordenesService.getAll();

    const ventasTotal = ordenes.reduce((sum, orden) => sum + orden.total, 0);
    const productosEnOferta = productos.filter(p => p.enOferta).length;
    const productosBajoStock = productos.filter(p => p.stock < 5).length;

    setStats({
      totalProductos: productos.length,
      totalUsuarios: usuarios.length,
      totalOrdenes: ordenes.length,
      ventasTotal: ventasTotal,
      productosEnOferta: productosEnOferta,
      productosBajoStock: productosBajoStock
    });
  }, []);

  const productosBajoStock = productosService.getAll().filter(p => p.stock < 5);

  return (
    <div>
      <h2 className="fw-bold mb-4">Reportes y Estadísticas</h2>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-box text-primary" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">{stats.totalProductos}</h3>
              <p className="text-muted mb-0">Total Productos</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-people text-success" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">{stats.totalUsuarios}</h3>
              <p className="text-muted mb-0">Total Usuarios</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-cart text-warning" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">{stats.totalOrdenes}</h3>
              <p className="text-muted mb-0">Total Órdenes</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-currency-dollar text-danger" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">${stats.ventasTotal.toLocaleString('es-CL')}</h3>
              <p className="text-muted mb-0">Ventas Totales</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-percent text-info" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">{stats.productosEnOferta}</h3>
              <p className="text-muted mb-0">Productos en Oferta</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: '3rem' }}></i>
              <h3 className="mt-3">{stats.productosBajoStock}</h3>
              <p className="text-muted mb-0">Bajo Stock</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {productosBajoStock.length > 0 && (
        <Card className="shadow-sm">
          <Card.Header className="bg-warning text-dark">
            <h5 className="mb-0">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Productos con Stock Bajo (menos de 5 unidades)
            </h5>
          </Card.Header>
          <Card.Body>
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Stock</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {productosBajoStock.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>
                      <Badge bg={producto.stock === 0 ? 'danger' : 'warning'}>
                        {producto.stock}
                      </Badge>
                    </td>
                    <td>
                      {producto.stock === 0 ? (
                        <Badge bg="danger">Sin Stock</Badge>
                      ) : (
                        <Badge bg="warning">Stock Bajo</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Reportes;

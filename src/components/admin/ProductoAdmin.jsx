import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge, Container, Card, Alert, Spinner } from 'react-bootstrap';
import { productosService, categoriasService } from '../../data/dataService';

const ProductoAdmin = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productoEdit, setProductoEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    categoria: '',
    stock: '',
    imagen: '',
    enOferta: false,
    precioOriginal: '',
    ingredientes: '',
    personalizable: false,
    especial: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const productosData = productosService.getAll();
      const categoriasData = categoriasService.getAll();
      
      setProductos(productosData);
      setCategorias(categoriasData);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error cargando datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const cargarProductos = () => {
    setProductos(productosService.getAll());
  };

  const obtenerColorCategoria = (categoriaNombre) => {
    const coloresCategoria = {
      'Tortas Cuadradas': { bg: 'primary', text: 'white' },
      'Tortas Circulares': { bg: 'success', text: 'white' },
      'Postres Individuales': { bg: 'warning', text: 'dark' },
      'Productos Sin Azúcar': { bg: 'info', text: 'white' },
      'Pastelería Tradicional': { bg: 'secondary', text: 'white' },
      'Productos Sin Gluten': { bg: 'danger', text: 'white' },
      'Productos Veganos': { bg: 'success', text: 'white' },
      'Tortas Especiales': { bg: 'light', text: 'dark', customStyle: { backgroundColor: '#E8F4FD', color: '#2C3E50', border: '2px solid #3498DB' } },
      'Historia': { bg: 'dark', text: 'white' }
    };
    
    return coloresCategoria[categoriaNombre] || { bg: 'light', text: 'dark' };
  };

  const handleShowModal = (producto = null) => {
    if (producto) {
      setProductoEdit(producto);
      setFormData({
        ...producto,
        ingredientes: producto.ingredientes ? producto.ingredientes.join(', ') : '',
        precioOriginal: producto.precioOriginal || ''
      });
    } else {
      setProductoEdit(null);
      setFormData({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        stock: '',
        imagen: '',
        enOferta: false,
        precioOriginal: '',
        ingredientes: '',
        personalizable: false,
        especial: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductoEdit(null);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const productoData = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      precioOriginal: formData.precioOriginal ? parseFloat(formData.precioOriginal) : null,
      ingredientes: formData.ingredientes ? formData.ingredientes.split(',').map(i => i.trim()) : []
    };

    if (productoEdit) {
      productosService.update(productoEdit.id, productoData);
    } else {
      productosService.create(productoData);
    }

    cargarProductos();
    handleCloseModal();
  };

  const filtrarProductos = () => {
    let productosFiltrados = productos;

    if (filtroCategoria !== 'todas') {
      productosFiltrados = productosFiltrados.filter(p => p.categoria === filtroCategoria);
    }

    if (busqueda) {
      productosFiltrados = productosFiltrados.filter(p => 
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    return productosFiltrados;
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      productosService.delete(id);
      cargarProductos();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" className="mb-3">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
        <p>Cargando productos...</p>
      </div>
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

  const productosFiltrados = filtrarProductos();

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="display-6 fw-bold">
            <i className="bi bi-box me-3"></i>
            Gestión de Productos
          </h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="card-title">
                <i className="bi bi-funnel me-2"></i>
                Filtros
              </h5>
              <Form.Select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="mb-3"
              >
                <option value="todas">Todas las categorías</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.nombre}>
                    {categoria.nombre}
                  </option>
                ))}
              </Form.Select>
              <Form.Control
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5 className="card-title">
                <i className="bi bi-info-circle me-2"></i>
                Resumen
              </h5>
              <p className="mb-1">Total de productos: <strong>{productos.length}</strong></p>
              <p className="mb-0">Mostrando: <strong>{productosFiltrados.length}</strong></p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body className="text-center">
              <Button variant="primary" size="lg" onClick={() => handleShowModal()}>
                <i className="bi bi-plus-circle me-2"></i>
                Nuevo Producto
              </Button>
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
                Lista de Productos
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              {productosFiltrados.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-inbox" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                  <p className="mt-3 text-muted">No hay productos para mostrar</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Oferta</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {productosFiltrados.map((producto) => (
                        <tr key={producto.id}>
                          <td>
                            <strong>{producto.codigo || producto.id}</strong>
                          </td>
                          <td>
                            <img 
                              src={producto.imagen || '/assets/images/logo.png'} 
                              alt={producto.nombre}
                              style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                              onError={(e) => {
                                e.target.src = '/assets/images/logo.png';
                              }}
                            />
                          </td>
                          <td>
                            <div>
                              <div className="fw-bold">{producto.nombre}</div>
                              {producto.especial && (
                                <Badge bg="info" className="me-1">{producto.especial}</Badge>
                              )}
                              {producto.personalizable && (
                                <Badge bg="warning">Personalizable</Badge>
                              )}
                            </div>
                          </td>
                          <td>
                            <Badge 
                              bg={obtenerColorCategoria(producto.categoria).bg} 
                              style={{ 
                                color: obtenerColorCategoria(producto.categoria).text,
                                ...obtenerColorCategoria(producto.categoria).customStyle
                              }}
                            >
                              {producto.categoria}
                            </Badge>
                          </td>
                          <td>
                            <div>
                              <strong>${producto.precio.toLocaleString('es-CL')}</strong>
                              {producto.enOferta && producto.precioOriginal && (
                                <div>
                                  <small className="text-muted text-decoration-line-through">
                                    ${producto.precioOriginal.toLocaleString('es-CL')}
                                  </small>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <Badge bg={producto.stock > 10 ? 'success' : producto.stock > 0 ? 'warning' : 'danger'}>
                              {producto.stock}
                            </Badge>
                          </td>
                          <td>
                            {producto.enOferta ? (
                              <Badge bg="success">Sí</Badge>
                            ) : (
                              <Badge bg="secondary">No</Badge>
                            )}
                          </td>
                          <td>
                            <Button 
                              variant="outline-warning" 
                              size="sm" 
                              className="me-2"
                              onClick={() => handleShowModal(producto)}
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDelete(producto.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {productoEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Categoría *</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccionar...</option>
                    {categorias.map(categoria => (
                      <option key={categoria.id} value={categoria.nombre}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Descripción *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio *</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Precio Original</Form.Label>
                  <Form.Control
                    type="number"
                    name="precioOriginal"
                    value={formData.precioOriginal}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>URL Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://..."
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Ingredientes</Form.Label>
                  <Form.Control
                    type="text"
                    name="ingredientes"
                    value={formData.ingredientes}
                    onChange={handleChange}
                    placeholder="Separados por comas"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Especial</Form.Label>
                  <Form.Control
                    type="text"
                    name="especial"
                    value={formData.especial}
                    onChange={handleChange}
                    placeholder="Ej: Sin gluten, Vegano, etc."
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="enOferta"
                    checked={formData.enOferta}
                    onChange={handleChange}
                    label="Producto en oferta"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="personalizable"
                    checked={formData.personalizable}
                    onChange={handleChange}
                    label="Personalizable"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {productoEdit ? 'Actualizar' : 'Crear'} Producto
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProductoAdmin;

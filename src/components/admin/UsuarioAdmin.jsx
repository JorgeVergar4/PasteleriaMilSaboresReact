import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { usuariosService } from '../../data/dataService';

const UsuarioAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEdit, setUsuarioEdit] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    telefono: '',
    rol: 'cliente'
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    setUsuarios(usuariosService.getAll());
  };

  const handleShowModal = (usuario = null) => {
    if (usuario) {
      setUsuarioEdit(usuario);
      setFormData({ ...usuario, password: '' });
    } else {
      setUsuarioEdit(null);
      setFormData({
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        telefono: '',
        rol: 'cliente'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioEdit(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (usuarioEdit) {
      const dataActualizar = { ...formData };
      if (!dataActualizar.password) {
        delete dataActualizar.password;
      }
      usuariosService.update(usuarioEdit.id, dataActualizar);
    } else {
      usuariosService.create(formData);
    }

    cargarUsuarios();
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      usuariosService.delete(id);
      cargarUsuarios();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Gestión de Usuarios</h2>
        <Button variant="primary" onClick={() => handleShowModal()}>
          <i className="bi bi-plus-circle me-2"></i>
          Nuevo Usuario
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre} {usuario.apellidos}</td>
              <td>{usuario.email}</td>
              <td>{usuario.telefono || 'N/A'}</td>
              <td>
                <Badge bg={usuario.rol === 'admin' ? 'danger' : 'primary'}>
                  {usuario.rol}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="warning" 
                  size="sm" 
                  className="me-2"
                  onClick={() => handleShowModal(usuario)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button 
                  variant="danger" 
                  size="sm"
                  onClick={() => handleDelete(usuario.id)}
                  disabled={usuario.rol === 'admin'}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {usuarioEdit ? 'Editar Usuario' : 'Nuevo Usuario'}
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
                  <Form.Label>Apellidos *</Form.Label>
                  <Form.Control
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Contraseña {usuarioEdit && '(dejar vacío para no cambiar)'}
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!usuarioEdit}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol *</Form.Label>
                  <Form.Select
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                    required
                  >
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {usuarioEdit ? 'Actualizar' : 'Crear'} Usuario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default UsuarioAdmin;

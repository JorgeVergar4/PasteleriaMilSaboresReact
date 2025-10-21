import React, { useState, useEffect } from 'react';
import { Container, Button, Card, Table, Modal, Form } from 'react-bootstrap';
import { categoriasService } from '../../data/dataService';

const CategoriaAdmin = () => {
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    icono: 'bi-square-fill'
  });

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    setCategorias(categoriasService.getAll());
  };

  const handleClose = () => {
    setShowModal(false);
    setEditando(null);
    setFormData({ nombre: '', descripcion: '', icono: 'bi-square-fill' });
  };

  const handleShow = (categoria = null) => {
    if (categoria) {
      setEditando(categoria.id);
      setFormData({
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
        icono: categoria.icono
      });
    }
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editando) {
      categoriasService.update(editando, formData);
    } else {
      categoriasService.create(formData);
    }
    
    cargarCategorias();
    handleClose();
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      categoriasService.delete(id);
      cargarCategorias();
    }
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ 
          fontFamily: 'var(--font-headings)', 
          color: 'var(--accent-chocolate)' 
        }}>
          <i className="bi bi-tags me-3"></i>
          Gestión de Categorías
        </h2>
        <Button 
          onClick={() => handleShow()}
          style={{
            background: 'var(--accent-pink)',
            border: 'none',
            color: 'var(--accent-chocolate)',
            fontWeight: 'bold',
            borderRadius: 'var(--border-radius)'
          }}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Categoría
        </Button>
      </div>

      <Card style={{ 
        border: 'none', 
        boxShadow: 'var(--box-shadow)',
        borderRadius: 'var(--border-radius)' 
      }}>
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead style={{ 
              background: 'var(--bg-main)',
              color: 'var(--text-main)'
            }}>
              <tr>
                <th style={{ padding: '15px' }}>ID</th>
                <th>Ícono</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4" style={{ color: 'var(--text-secondary)' }}>
                    No hay categorías registradas
                  </td>
                </tr>
              ) : (
                categorias.map(categoria => (
                  <tr key={categoria.id}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>
                      {categoria.id}
                    </td>
                    <td>
                      <i 
                        className={`bi ${categoria.icono}`} 
                        style={{ 
                          fontSize: '1.5rem', 
                          color: 'var(--accent-pink)' 
                        }}
                      ></i>
                    </td>
                    <td style={{ fontWeight: 'bold', color: 'var(--accent-chocolate)' }}>
                      {categoria.nombre}
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>
                      {categoria.descripcion}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleShow(categoria)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminar(categoria.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal para crear/editar */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ borderBottom: '2px solid var(--accent-pink)' }}>
          <Modal.Title style={{ fontFamily: 'var(--font-headings)', color: 'var(--accent-chocolate)' }}>
            {editando ? 'Editar Categoría' : 'Nueva Categoría'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                Nombre *
              </Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                placeholder="Ej: Tortas Cuadradas"
                style={{ borderColor: 'var(--accent-pink)' }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                Descripción *
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                placeholder="Descripción de la categoría"
                style={{ borderColor: 'var(--accent-pink)' }}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>
                Ícono (Bootstrap Icons)
              </Form.Label>
              <Form.Select
                name="icono"
                value={formData.icono}
                onChange={handleChange}
                style={{ borderColor: 'var(--accent-pink)' }}
                >
                <option value="bi-box2-heart-fill">Caja con corazón (Tortas Cuadradas)</option>
                <option value="bi-emoji-smile-fill">Cara feliz (Tortas Circulares)</option>
                <option value="bi-gift-fill">Regalo (Postres Individuales)</option>
                <option value="bi-heart-pulse-fill">Corazón salud (Sin Azúcar)</option>
                <option value="bi-house-heart-fill">Casa corazón (Tradicional)</option>
                <option value="bi-shield-fill-check">Escudo check (Sin Gluten)</option>
                <option value="bi-flower2">Flor (Vegano)</option>
                <option value="bi-stars">Estrellas (Especiales)</option>
                <option value="bi-cake2-fill">Pastel</option>
                <option value="bi-cup-hot-fill">Taza caliente</option>
                <option value="bi-basket2-fill">Canasta</option>
                <option value="bi-award-fill">Premio</option>
                <option value="bi-gem">Gema</option>
              </Form.Select>

              <small className="text-muted d-flex align-items-center mt-2">
                Vista previa: 
                <i className={`bi ${formData.icono} ms-2`} style={{ fontSize: '1.5rem', color: 'var(--accent-pink)' }}></i>
              </small>
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button 
                type="submit"
                style={{
                  background: 'var(--accent-pink)',
                  border: 'none',
                  color: 'var(--accent-chocolate)',
                  fontWeight: 'bold'
                }}
              >
                {editando ? 'Guardar Cambios' : 'Crear Categoría'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CategoriaAdmin;

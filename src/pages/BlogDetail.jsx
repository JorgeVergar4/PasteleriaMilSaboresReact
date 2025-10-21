import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Badge } from 'react-bootstrap';
import { blogsService } from '../data/dataService';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const blogEncontrado = blogsService.getById(id);
    if (blogEncontrado) {
      setBlog(blogEncontrado);
    } else {
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!blog) return null;

  return (
    <Container className="py-section">
      <Button 
        variant="outline-secondary" 
        onClick={() => navigate('/blog')}
        className="mb-4"
        style={{
          borderColor: 'var(--accent-chocolate)',
          color: 'var(--accent-chocolate)',
          borderRadius: '25px',
          padding: '8px 20px',
          fontWeight: '500'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--accent-chocolate)';
          e.target.style.color = 'white';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = 'var(--accent-chocolate)';
        }}
      >
        <i className="bi bi-arrow-left me-2"></i>
        Volver al Blog
      </Button>

      <div style={{
        background: 'var(--white)',
        padding: '50px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)'
      }}>
        <Badge className="badge-pasteleria mb-3">
          {blog.categoria}
        </Badge>

        <h1 style={{ 
          fontFamily: 'var(--font-headings)',
          color: 'var(--accent-chocolate)',
          marginBottom: '20px'
        }}>
          {blog.titulo}
        </h1>

        <div className="mb-4" style={{ color: 'var(--text-secondary)' }}>
          <i className="bi bi-person-circle me-2"></i>
          {blog.autor} • {new Date(blog.fecha).toLocaleDateString('es-CL')}
        </div>

        <img 
          src={blog.imagen} 
          alt={blog.titulo}
          className="img-fluid rounded mb-4"
          style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
        />

        <div style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.9',
          color: 'var(--text-main)'
        }}>
          <p>{blog.contenido}</p>
          <p>
            En Pastelería Mil Sabores, cada día trabajamos para perfeccionar 
            nuestras técnicas y crear productos que no solo sean deliciosos, 
            sino que también sean visualmente impactantes.
          </p>
          <p>
            Nuestro equipo de expertos pasteleros ha perfeccionado el arte de 
            combinar sabores tradicionales con técnicas modernas, logrando 
            resultados excepcionales que deleitan a nuestros clientes día a día.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default BlogDetail;
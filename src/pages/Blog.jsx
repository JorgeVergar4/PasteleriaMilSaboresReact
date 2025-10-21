import React, { useEffect, useState } from 'react';
import { Container, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { blogsService } from '../data/dataService';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(blogsService.getAll());
  }, []);

  return (
    <Container className="py-section">
      <div className="section-title">
        <h2>Nuestro Blog</h2>
        <p>Historias, recetas y novedades</p>
      </div>

      {blogs.map(blog => (
        <Card 
          key={blog.id} 
          className="mb-4"
          style={{ 
            border: 'none', 
            boxShadow: 'var(--box-shadow)',
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden'
          }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img 
                src={blog.imagen} 
                alt={blog.titulo}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  minHeight: '300px'
                }}
              />
            </div>
            <div className="col-md-8">
              <Card.Body className="p-4">
                <Badge className="badge-pasteleria mb-2">
                  {blog.categoria}
                </Badge>
                <h3 style={{ 
                  fontFamily: 'var(--font-headings)',
                  color: 'var(--accent-chocolate)',
                  marginBottom: '15px'
                }}>
                  <Link 
                    to={`/blog/${blog.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    {blog.titulo}
                  </Link>
                </h3>
                <p style={{ 
                  color: 'var(--text-main)', 
                  lineHeight: '1.7',
                  marginBottom: '20px'
                }}>
                  {blog.contenido.substring(0, 180)}...
                </p>
                <div className="d-flex justify-content-between align-items-center">
                  <small style={{ color: 'var(--text-secondary)' }}>
                    <i className="bi bi-person me-1"></i>
                    {blog.autor} • {new Date(blog.fecha).toLocaleDateString('es-CL')}
                  </small>
                  <Link 
                    to={`/blog/${blog.id}`}
                    style={{
                      color: 'var(--accent-chocolate)',
                      fontWeight: 'bold',
                      textDecoration: 'none'
                    }}
                  >
                    Leer más <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      ))}
    </Container>
  );
};

export default Blog;
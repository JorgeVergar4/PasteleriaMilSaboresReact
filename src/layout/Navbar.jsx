import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from 'react-bootstrap';
import Notificaciones from './Notificaciones';

const Navbar = ({ carritoCount = 0, carritoTotal = 0, usuario }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <BootstrapNavbar 
      expand="lg" 
      fixed="top" 
      className={`ms-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          <img 
            src="/assets/images/logo.png" 
            alt="Pastelería Mil Sabores" 
            className="logo-img"
            style={{ height: '40px', width: 'auto' }}
          />
          <span className="d-none d-sm-inline">Pastelería Mil Sabores</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar" />

        <BootstrapNavbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
            <NavLink className="nav-link" to="/productos">
              Productos
            </NavLink>
            <NavLink className="nav-link" to="/categorias">
              Categorías
            </NavLink>
            <NavLink className="nav-link" to="/ofertas">
              Ofertas
            </NavLink>
            <NavLink className="nav-link" to="/blog">
              Blog
            </NavLink>
            <NavLink className="nav-link" to="/nosotros">
              Nosotros
            </NavLink>
            <NavLink className="nav-link" to="/contacto">
              Contacto
            </NavLink>
          </Nav>

          <Nav className="align-items-lg-center">
            {usuario ? (
              <>
                <NavLink className="nav-link" to="/perfil">
                  Hola, {usuario.nombre}
                </NavLink>
                <Notificaciones usuario={usuario} />
                {usuario.rol === 'admin' && (
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                )}
              </>
            ) : (
              <>
                <NavLink className="nav-link" to="/login">
                  Iniciar sesión
                </NavLink>
                <NavLink className="nav-link" to="/registro">
                  Registro
                </NavLink>
              </>
            )}

            <NavLink to="/carrito" className="nav-link position-relative">
              <i className="bi bi-cart3 me-1"></i>
              Carrito
              {carritoCount > 0 && (
                <Badge 
                  bg="danger" 
                  className="position-absolute top-0 start-100 translate-middle rounded-pill"
                >
                  {carritoCount}
                </Badge>
              )}
              {carritoTotal > 0 && (
                <small className="ms-2 text-muted d-none d-lg-inline">
                  ${carritoTotal.toLocaleString('es-CL')}
                </small>
              )}
            </NavLink>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;

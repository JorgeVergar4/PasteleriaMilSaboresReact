import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

/**
 * ErrorBoundary - Componente para capturar errores de React
 * 
 * Este componente envuelve otros componentes y captura cualquier error
 * que ocurra durante el renderizado, en métodos del ciclo de vida,
 * y en constructores de todo el árbol de componentes debajo de él.
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  /**
   * Método estático que se llama cuando se detecta un error
   * @param {Error} error - El error que ocurrió
   * @returns {Object} Nuevo estado para el componente
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * Método que se ejecuta cuando se captura un error
   * @param {Error} error - El error que ocurrió
   * @param {Object} errorInfo - Información adicional del error
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log del error en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    }
  }

  /**
   * Maneja la recarga de la página
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * Renderiza el componente
   * @returns {JSX.Element} El componente renderizado
   */
  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5">
          <div className="text-center">
            <Alert variant="danger" className="p-5">
              <h2 className="mb-4">
                <i className="bi bi-exclamation-triangle me-2"></i>
                ¡Oops! Algo salió mal
              </h2>
              <p className="mb-4">
                Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado 
                y está trabajando para solucionarlo.
              </p>
              <div className="d-flex gap-3 justify-content-center">
                <Button 
                  variant="primary" 
                  onClick={this.handleReload}
                  size="lg"
                >
                  <i className="bi bi-arrow-clockwise me-2"></i>
                  Recargar Página
                </Button>
                <Button 
                  variant="outline-primary" 
                  href="/"
                  size="lg"
                >
                  <i className="bi bi-house me-2"></i>
                  Ir al Inicio
                </Button>
              </div>
            </Alert>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

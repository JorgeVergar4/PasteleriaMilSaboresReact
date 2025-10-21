import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => {
  return (
    <div className="ms-top-bar">
      <Container>
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <div>
            <i className="bi bi-award-fill me-2"></i>
            <span>50 años horneando felicidad • Récord Guinness 1995</span>
          </div>
          <div className="d-flex gap-3 flex-wrap">
            <span>
              <i className="bi bi-telephone-fill me-1"></i>
              +56 9 1234 5678
            </span>
            <span className="d-none d-md-inline">
              <i className="bi bi-clock-fill me-1"></i>
              Lun-Sáb: 9:00-20:00
            </span>
            <span>
              <i className="bi bi-truck me-1"></i>
              Envío gratis RM
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";

const OrderError = () => (
  <div className="order-error">
    <h2>Ocurrió un error en la compra.</h2>
    <p>Tu carrito está vacío o hubo un problema con el pedido.</p>
    <Link to="/">
      <button>Volver al inicio</button>
    </Link>
  </div>
);

export default OrderError;

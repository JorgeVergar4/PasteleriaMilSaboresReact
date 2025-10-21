import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => (
  <div className="order-success">
    <h2>¡Compra realizada con éxito!</h2>
    <p>Gracias por preferir Pastelería Mil Sabores.</p>
    <Link to="/">
      <button>Volver al inicio</button>
    </Link>
  </div>
);

export default OrderSuccess;

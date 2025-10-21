import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePurchase = () => {
    if (cart.length > 0) {
      clearCart();
      navigate("/success");
    } else {
      navigate("/error");
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <section className="checkout">
      <h2>Resumen de compra</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toLocaleString("es-CL")}
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toLocaleString("es-CL")}</h3>
          <button onClick={handlePurchase}>Confirmar compra</button>
        </>
      )}
    </section>
  );
};

export default Checkout;

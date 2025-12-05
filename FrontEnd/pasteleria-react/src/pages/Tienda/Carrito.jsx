import React from "react";
import "../../styles/all.css";
import { useCart } from "../../context/CartContext";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Carrito() {
  const {
    cart,
    total,
    clearCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <>
      <BarraNav />
        <div className="overlay">
          <div className="recuadro">
            <main>
              <h2>🛒 Carrito de Compras</h2>

              {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                <>
                  <div id="carrito-lista">
                    {cart.map((item, index) => (
                      <div key={index} className="carrito-item">
                        <img src={item.img} alt={item.nombre} width="80" />
                        <div>
                          <h4>{item.nombre}</h4>
                          <p>${item.precio.toLocaleString()} CLP</p>

                          <div className="controles">
                            <button onClick={() => decreaseQuantity(item.nombre)}>
                              ➖
                            </button>
                            <span>{item.cantidad}</span>
                            <button onClick={() => increaseQuantity(item.nombre)}>
                              ➕
                            </button>
                          </div>

                          <p>
                            Subtotal: $
                            {(item.precio * item.cantidad).toLocaleString()} CLP
                          </p>
                        </div>

                        <button
                          className="eliminar"
                          onClick={() => removeFromCart(item.nombre)}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>

                  <h3 id="total">Total: ${total.toLocaleString()} CLP</h3>

                  <div className="acciones-carrito">
                    <button id="vaciar" onClick={clearCart}>
                      Vaciar Carrito
                    </button>
                  </div>
                </>
              )}
            </main>
          </div>
        </div>
        <Footer />
    </>
  );
}

export default Carrito;
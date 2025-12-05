import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (producto) => {
    setCart((prevCart) => {
      const existe = prevCart.find((item) => item.nombre === producto.nombre);
      if (existe) {
        return prevCart.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (nombre) => {
    setCart((prevCart) => prevCart.filter((item) => item.nombre !== nombre));
  };

  const increaseQuantity = (nombre) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (nombre) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.nombre === nombre
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const cantidadTotal = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Carrito from "../pages/Tienda/Carrito.jsx";

// 🧩 Mock del CartContext
vi.mock("../context/CartContextñ", () => ({
  useCart: vi.fn(),
}));

import { useCart } from "../../context/CartContext";

describe("Carrito Component", () => {
  it("muestra mensaje de carrito vacío cuando no hay productos", () => {
    useCart.mockReturnValue({
      cart: [],
      total: 0,
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
    });

    render(<Carrito />);
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  it("renderiza correctamente los productos del carrito", () => {
    useCart.mockReturnValue({
      cart: [
        {
          nombre: "Torta Cuadrada de Chocolate",
          precio: 45000,
          cantidad: 2,
          img: "torta.jpg",
        },
      ],
      total: 90000,
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
    });

    render(<Carrito />);

    expect(
      screen.getByText("Torta Cuadrada de Chocolate")
    ).toBeInTheDocument();
    expect(screen.getByText("$45,000 CLP")).toBeInTheDocument();
    expect(screen.getByText("Subtotal: $90,000 CLP")).toBeInTheDocument();
    expect(screen.getByText("Total: $90,000 CLP")).toBeInTheDocument();
  });

  it("permite aumentar y disminuir la cantidad", () => {
    const increaseMock = vi.fn();
    const decreaseMock = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          nombre: "Torta Cuadrada de Chocolate",
          precio: 45000,
          cantidad: 1,
          img: "torta.jpg",
        },
      ],
      total: 45000,
      clearCart: vi.fn(),
      removeFromCart: vi.fn(),
      increaseQuantity: increaseMock,
      decreaseQuantity: decreaseMock,
    });

    render(<Carrito />);

    fireEvent.click(screen.getByText("➕"));
    expect(increaseMock).toHaveBeenCalledWith("Torta Cuadrada de Chocolate");

    fireEvent.click(screen.getByText("➖"));
    expect(decreaseMock).toHaveBeenCalledWith("Torta Cuadrada de Chocolate");
  });

  it("permite eliminar un producto del carrito", () => {
    const removeMock = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          nombre: "Torta Cuadrada de Chocolate",
          precio: 45000,
          cantidad: 1,
          img: "torta.jpg",
        },
      ],
      total: 45000,
      clearCart: vi.fn(),
      removeFromCart: removeMock,
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
    });

    render(<Carrito />);

    fireEvent.click(screen.getByText("❌"));
    expect(removeMock).toHaveBeenCalledWith("Torta Cuadrada de Chocolate");
  });

  it("permite vaciar el carrito", () => {
    const clearMock = vi.fn();

    useCart.mockReturnValue({
      cart: [
        {
          nombre: "Torta Cuadrada de Chocolate",
          precio: 45000,
          cantidad: 1,
          img: "torta.jpg",
        },
      ],
      total: 45000,
      clearCart: clearMock,
      removeFromCart: vi.fn(),
      increaseQuantity: vi.fn(),
      decreaseQuantity: vi.fn(),
    });

    render(<Carrito />);

    fireEvent.click(screen.getByText(/Vaciar Carrito/i));
    expect(clearMock).toHaveBeenCalled();
  });
});

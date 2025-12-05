import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import ProDetalle from "../../pages/admin/Tienda/ProDetalle";
import { productos } from "../../data/productos";

// 🧩 Mock del CartContext
vi.mock("../../assets/context/CartContext", () => ({
  useCart: () => ({
    addToCart: vi.fn(),
  }),
}));

// 🧠 Mock del alert para evitar bloqueos
global.alert = vi.fn();

describe("ProDetalle Component", () => {
  it("muestra 'Producto no encontrado' si no hay query param", () => {
    render(
      <MemoryRouter initialEntries={["/prodetalle"]}>
        <ProDetalle />
      </MemoryRouter>
    );

    expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
  });

  it("renderiza correctamente un producto existente", () => {
    const productoNombre = encodeURIComponent("Torta Cuadrada de Chocolate");

    render(
      <MemoryRouter initialEntries={[`/prodetalle?producto=${productoNombre}`]}>
        <ProDetalle />
      </MemoryRouter>
    );

    expect(screen.getByText("Torta Cuadrada de Chocolate")).toBeInTheDocument();
    expect(screen.getByText("$45.000")).toBeInTheDocument();
    expect(
      screen.getByText(/Deliciosa torta de chocolate/i)
    ).toBeInTheDocument();
  });

  it("permite cambiar la cantidad antes de añadir al carro", () => {
    const productoNombre = encodeURIComponent("Torta Cuadrada de Chocolate");

    render(
      <MemoryRouter initialEntries={[`/prodetalle?producto=${productoNombre}`]}>
        <ProDetalle />
      </MemoryRouter>
    );

    const cantidadInput = screen.getByLabelText(/Cantidad/i);
    fireEvent.change(cantidadInput, { target: { value: "3" } });
    expect(cantidadInput.value).toBe("3");
  });
});
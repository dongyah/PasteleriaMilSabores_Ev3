import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NuevoUsuario from "../pages/admin/Usuarios/Admin_NuevoUsuario.jsx";

describe("Admin_NuevoUsuario", () => {
  test("renderiza inputs del formulario", () => {
    render(
      <MemoryRouter>
        <NuevoUsuario />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Apellidos")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Correo")).toBeInTheDocument();
  });
});

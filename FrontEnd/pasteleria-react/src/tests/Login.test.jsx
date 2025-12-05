import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../pages/Tienda/Login";
import { vi } from "vitest";

// 🧹 Limpieza antes de cada test
beforeEach(() => {
  localStorage.clear();
  vi.resetAllMocks();
});

// 📌 Mock de navigate y alert
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

window.alert = vi.fn();

describe("🧁 Componente Login", () => {
  test("Se renderiza correctamente con los campos y botón", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test("Muestra alerta si las credenciales son incorrectas", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "fake@correo.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(window.alert).toHaveBeenCalledWith("Correo o contraseña incorrectos.");
  });

  test("Permite inicio de sesión de admin y redirige a /admin", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "admin@pasteleria.cl" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "admin123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(window.alert).toHaveBeenCalledWith("Bienvenido, administrador.");
    expect(mockNavigate).toHaveBeenCalledWith("/admin");
  });

  test("Permite inicio de sesión de usuario normal y redirige a /", () => {
    const usuarios = [
      { nombre: "Juan", correo: "juan@mail.com", password: "12345" },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "juan@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /iniciar sesión/i }));

    expect(window.alert).toHaveBeenCalledWith("¡Bienvenido Juan!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});

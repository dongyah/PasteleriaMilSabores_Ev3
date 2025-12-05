import { render, screen, fireEvent } from "@testing-library/react";
import Registro from "../pages/Tienda/Registro";
import { vi } from "vitest";

beforeEach(() => {
  localStorage.clear();
  vi.resetAllMocks();
});

window.alert = vi.fn();
delete window.location;
window.location = { href: "" };

describe("🧁 Componente Registro", () => {
  test("Se renderiza correctamente con todos los campos", () => {
    render(<Registro />);

    expect(screen.getByText("Registro")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre completo")).toBeInTheDocument();
    expect(screen.getByLabelText("Edad")).toBeInTheDocument();
    expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar contraseña")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Código de descuento (opcional)")
    ).toBeInTheDocument();
  });

  test("Muestra alerta si faltan campos obligatorios", () => {
    render(<Registro />);
    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Por favor completa todos los campos obligatorios."
    );
  });

  test("Muestra alerta si las contraseñas no coinciden", () => {
    render(<Registro />);

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Juan" },
    });
    fireEvent.change(screen.getByLabelText("Edad"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "juan@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "xyz456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith("Las contraseñas no coinciden.");
  });

  test("Muestra alerta si el correo ya está registrado", () => {
    const usuarios = [
      { nombre: "Pedro", edad: 30, correo: "pedro@mail.com", password: "1234" },
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    render(<Registro />);

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Pedro" },
    });
    fireEvent.change(screen.getByLabelText("Edad"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "pedro@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "1234" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "1234" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith("Este correo ya está registrado.");
  });

  test("Registra correctamente a usuario mayor de 50 años (descuento 50%)", () => {
    render(<Registro />);

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Marta" },
    });
    fireEvent.change(screen.getByLabelText("Edad"), {
      target: { value: "60" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "marta@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "¡Registro exitoso! Tu descuento es del 50%"
    );

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
    expect(usuariosGuardados).toHaveLength(1);
    expect(usuariosGuardados[0].correo).toBe("marta@mail.com");
    expect(usuariosGuardados[0].descuento).toBe(50);
    expect(window.location.href).toBe("/");
  });

  test("Registra usuario con código FELICES50 (descuento 10%)", () => {
    render(<Registro />);

    fireEvent.change(screen.getByLabelText("Nombre completo"), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByLabelText("Edad"), {
      target: { value: "25" },
    });
    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
      target: { value: "ana@mail.com" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
      target: { value: "abc123" },
    });
    fireEvent.change(screen.getByLabelText("Código de descuento (opcional)"), {
      target: { value: "FELICES50" },
    });

    fireEvent.click(screen.getByRole("button", { name: /registrarse/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "¡Registro exitoso! Tu descuento es del 10%"
    );

    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios"));
    expect(usuariosGuardados[0].descuento).toBe(10);
  });
});

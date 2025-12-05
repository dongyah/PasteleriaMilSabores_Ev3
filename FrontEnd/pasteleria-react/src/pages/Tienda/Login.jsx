import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/all.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

export default function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const admins = {
      "admin@pasteleria.cl": "admin123",
      "gerencia@milSabores.cl": "dulce2025",
      "soporte@pasteleria.cl": "pastelPower",
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    // 🔑 ADMIN LOGIN
    if (admins[correo] && password === admins[correo]) {
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          nombre: "Administrador",
          correo,
          tipo: "admin",
        })
      );
      alert("Bienvenido, administrador.");
      navigate("/admin"); // redirige a la ruta de React
      return;
    }

    // 👤 USUARIO NORMAL
    if (usuario) {
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({
          nombre: usuario.nombre,
          correo: usuario.correo,
          tipo: usuario.tipo || "cliente",
        })
      );
      alert(`¡Bienvenido ${usuario.nombre}!`);
      navigate("/"); // redirige al inicio
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <>
      <BarraNav />
        <div className="overlay">
          <div className="recuadro">
            <div className="presentacion">
              <h1>Iniciar Sesión</h1>
              <p>¿No tienes cuenta todavía?</p>
              <a href="/registro">Regístrate aquí</a>
            </div>

            <form className="form-inis" onSubmit={handleSubmit}>
              <label htmlFor="correo">Correo electrónico</label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />

              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit">Iniciar sesión</button>
            </form>
          </div>
        </div>
      <Footer />
    </>
  );
}
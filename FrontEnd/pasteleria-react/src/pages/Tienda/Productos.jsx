import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/all.css";
import "../../styles/Tienda.css";
import { useCart } from "../../context/CartContext";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Productos() {
  const { addToCart } = useCart();
  const [filtro, setFiltro] = useState("all");

  const productos = [
    { tipo: "cuadrada", nombre: "Torta Cuadrada de Chocolate", precio: 45000, img: "/img/Torta de chocolate.png" },
    { tipo: "cuadrada", nombre: "Torta Cuadrada de Frutas", precio: 50000, img: "/img/torta de frutas.png" },
    { tipo: "circular", nombre: "Torta Circular de Vainilla", precio: 40000, img: "/img/torta de vainilla.png" },
    { tipo: "circular", nombre: "Torta Circular de Manjar", precio: 42000, img: "/img/torta de manjar.png" },
    { tipo: "individuales", nombre: "Mousse de Chocolate", precio: 5000, img: "/img/mousse de chocolate.png" },
    { tipo: "individuales", nombre: "Tiramisú Clásico", precio: 5500, img: "/img/Tiramisú Clásico.png" },
    { tipo: "sin-azúcar", nombre: "Torta Sin Azúcar de Naranja", precio: 48000, img: "/img/Torta Sin Azúcar de Naranja.png" },
    { tipo: "sin-azúcar", nombre: "Cheesecake Sin Azúcar", precio: 47000, img: "/img/Cheesecake Sin Azúcar.png" },
    { tipo: "tradicional", nombre: "Empanada de Manzana", precio: 3000, img: "/img/Empanada de Manzana.png" },
    { tipo: "tradicional", nombre: "Tarta de Santiago", precio: 6000, img: "/img/Tarta de Santiago.png" },
    { tipo: "sin-gluten", nombre: "Brownie Sin Gluten", precio: 4000, img: "/img/Brownie Sin Gluten.png" },
    { tipo: "sin-gluten", nombre: "Pan Sin Gluten", precio: 3500, img: "/img/Pan Sin Gluten.png" },
    { tipo: "veganos", nombre: "Torta Vegana de Chocolate", precio: 50000, img: "/img/Torta Vegana de Chocolate.png" },
    { tipo: "veganos", nombre: "Galletas Veganas de Avena", precio: 4500, img: "/img/Galletas Veganas de Avena.png" },
    { tipo: "especiales", nombre: "Torta Especial de Cumpleaños", precio: 55000, img: "/img/Torta Especial de cumpleaños.png" },
    { tipo: "especiales", nombre: "Torta Especial de Boda", precio: 60000, img: "/img/Torta Especial de Boda.png" },
  ];

  const productosFiltrados =
    filtro === "all" ? productos : productos.filter((p) => p.tipo === filtro);

  return (
    <>
      <BarraNav />
        <main>
          <h2 className="titulo">Productos</h2>

          <div className="filtros">
            <button onClick={() => setFiltro("all")}>Todos</button>
            <button onClick={() => setFiltro("cuadrada")}>Tortas Cuadradas</button>
            <button onClick={() => setFiltro("circular")}>Tortas Circulares</button>
            <button onClick={() => setFiltro("individuales")}>Postres Individuales</button>
            <button onClick={() => setFiltro("sin-azúcar")}>Productos Sin Azúcar</button>
            <button onClick={() => setFiltro("tradicional")}>Pastelería Tradicional</button>
            <button onClick={() => setFiltro("sin-gluten")}>Productos sin Gluten</button>
            <button onClick={() => setFiltro("veganos")}>Productos Veganos</button>
            <button onClick={() => setFiltro("especiales")}>Tortas Especiales</button>
          </div>

          <div className="productos">
            {productosFiltrados.map((prod, index) => (
              <div className="card" key={index}>
                <Link to={`/producto-detalle?producto=${encodeURIComponent(prod.nombre)}`}>
                  <img src={prod.img} alt={prod.nombre} />
                  <h3>{prod.nombre}</h3>
                </Link>
                <p className="precio">${prod.precio.toLocaleString()} CLP</p>
                <button className="add-to-cart" onClick={() => addToCart(prod)}>
                  Añadir
                </button>
              </div>
            ))}
          </div>
        </main>
      <Footer />
    </>
  );
}

export default Productos;

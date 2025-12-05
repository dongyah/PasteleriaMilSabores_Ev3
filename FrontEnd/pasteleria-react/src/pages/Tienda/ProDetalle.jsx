import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { productos } from "../../data/productos"; 
import "../../styles/all.css";
import { useCart } from "../../context/CartContext";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

export default function ProDetalle() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productoSeleccionadoRaw = queryParams.get("producto");

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    // logs para debugging
    console.log("PRODSELECCIONADO RAW:", productoSeleccionadoRaw);
    if (!productoSeleccionadoRaw) {
      setProducto(null);
      return;
    }

    const productoSeleccionado = decodeURIComponent(productoSeleccionadoRaw).trim();
    console.log("PRODSELECCIONADO decoded:", productoSeleccionado);

    // Helper: intenta obtener producto de varias formas
    const buscarProducto = () => {
      if (!productos) return null;

      // 1) Si productos es un objeto con claves: buscar por clave exacta
      if (typeof productos === "object" && !Array.isArray(productos)) {
        if (productos.hasOwnProperty.call(productoSeleccionado)) {
          console.log("Encontrado por clave en objeto (productos[key])");
          const p = productos[productoSeleccionado];
          // Si el objeto no incluye un campo "titulo/nombre", normalizamos:
          return { titulo: p.titulo ?? productoSeleccionado, precio: p.precio, descripcion: p.descripcion, imagen_principal: p.imagen_principal, ...p };
        }
        // También probar key con diferencias de case
        const keys = Object.keys(productos);
        const keyMatch = keys.find(k => k.toLowerCase() === productoSeleccionado.toLowerCase());
        if (keyMatch) {
          console.log("Encontrado por clave (case-insensitive) en objeto:", keyMatch);
          const p = productos[keyMatch];
          return { titulo: p.titulo ?? keyMatch, precio: p.precio, descripcion: p.descripcion, imagen_principal: p.imagen_principal, ...p };
        }
      }

      // 2) Si productos es un array, buscar por p.nombre o p.titulo (case-insensitive)
      if (Array.isArray(productos)) {
        const match = productos.find(
          (p) =>
            (p.nombre && p.nombre.toLowerCase() === productoSeleccionado.toLowerCase()) ||
            (p.titulo && p.titulo.toLowerCase() === productoSeleccionado.toLowerCase())
        );
        if (match) {
          console.log("Encontrado en array por nombre/titulo");
          return match;
        }
      }

      // 3) Buscar dentro de valores del objeto (cuando productos es objeto pero queremos comparar campos dentro)
      if (typeof productos === "object" && !Array.isArray(productos)) {
        const values = Object.values(productos);
        const match = values.find(
          (p) =>
            (p.titulo && p.titulo.toLowerCase() === productoSeleccionado.toLowerCase()) ||
            (p.nombre && p.nombre.toLowerCase() === productoSeleccionado.toLowerCase())
        );
        if (match) {
          console.log("Encontrado dentro de valores del objeto por titulo/nombre");
          return match;
        }
      }

      // 4) Comparación parcial (por ejemplo si URL tiene %20 o ligeras diferencias)
      // buscamos por inclusión (solo si no hay resultados exactos)
      if (Array.isArray(productos)) {
        const includeMatch = productos.find(
          (p) =>
            (p.nombre && p.nombre.toLowerCase().includes(productoSeleccionado.toLowerCase())) ||
            (p.titulo && p.titulo.toLowerCase().includes(productoSeleccionado.toLowerCase()))
        );
        if (includeMatch) {
          console.log("Encontrado por inclusión en array");
          return includeMatch;
        }
      } else {
        const vals = Object.values(productos);
        const includeMatch = vals.find(
          (p) =>
            (p.titulo && p.titulo.toLowerCase().includes(productoSeleccionado.toLowerCase())) ||
            (p.nombre && p.nombre.toLowerCase().includes(productoSeleccionado.toLowerCase()))
        );
        if (includeMatch) {
          console.log("Encontrado por inclusión en objeto->values");
          return includeMatch;
        }
      }

      return null;
    };

    const found = buscarProducto();
    console.log("Producto encontrado:", found);
    setProducto(found ?? null);
  }, [productoSeleccionadoRaw]);

  const agregarAlCarrito = () => {
    if (!producto) return;

    // Normalizamos los datos que enviamos al contexto
    const productoConCantidad = {
      nombre: producto.titulo ?? producto.nombre ?? "Producto",
      precio: producto.precio ?? 0,
      img: producto.imagen_principal ?? producto.img ?? "",
      cantidad: Number(cantidad) || 1,
    };

    addToCart(productoConCantidad);
    // pequeño feedback al usuario
    alert(`${productoConCantidad.nombre} se añadió al carrito`);
  };

  if (!producto) {
    return (
      <div style={{ padding: 20 }}>
        <p>Producto no encontrado.</p>
        <p>Comprueba la consola (F12) para ver qué valor llega en "producto" y la estructura de "productos".</p>
      </div>
    );
  }

  return (
    <>
      <BarraNav/>
            <div>
              <div className="breadcrumb">
                <Link to="/">Home</Link> &gt; <Link to="/productos">Productos</Link> &gt; <span>{producto.titulo ?? producto.nombre}</span>
              </div>

              <main className="product-container">
                <div className="product-images">
                  <img src={producto.imagen_principal ?? producto.img} alt={producto.titulo ?? producto.nombre} className="main-image" />
                </div>

                <div className="product-details">
                  <h2 className="product-title">{producto.titulo ?? producto.nombre}</h2>
                  <p className="product-price">${(producto.precio ?? 0).toLocaleString("es-CL")}</p>
                  <p className="product-description">{producto.descripcion ?? ""}</p>

                  <label htmlFor="cantidad">Cantidad</label>
                  <input type="number" id="cantidad" value={cantidad} min="1" onChange={(e) => setCantidad(Number(e.target.value) || 1)} />

                  <button className="btn-add" onClick={agregarAlCarrito}>Añadir al carro</button>
                </div>
              </main>
            </div>
      <Footer />   
    </>   
  );
}

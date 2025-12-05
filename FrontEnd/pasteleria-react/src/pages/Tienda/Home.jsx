import { Link } from "react-router-dom";
import "../../styles/all.css";
import BarraNav from "./BarraNav";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <BarraNav />
        <main>
          <div className="container">
            <div className="box">
              <h2>Tienda Online</h2>
              <p>
                Pastelería Mil Sabores celebra su 50 aniversario como un referente en la repostería chilena.
                Famosa por su participación en un récord Guinness en 1995, cuando colaboró en la creación de la torta más grande del mundo.
              </p>
              <img src="img/tienda online.png" alt="Pastelería" />
              <Link to="/productos" className="btn">Ver Productos</Link>
            </div>

            <div className="box">
              <h2>Blog</h2>
              <h4>Caso N°1</h4>
              <p>
                ¡Tendencia en pastelería! El «cake painting» está ganando popularidad. Esta técnica transforma los pasteles en obras de arte.
              </p>
              <img src="img/pastel pintado.png" alt="cake painting" />
              <Link to="/blog" className="btn">Ver Blog</Link>
            </div>
          </div>

          <div className="productos">
            {[
              { nombre: "Torta Cuadrada de Chocolate", precio: 45000, img: "img/Torta de chocolate.png" },
              { nombre: "Torta Cuadrada de Frutas", precio: 50000, img: "img/torta de frutas.png" },
              { nombre: "Torta Circular de Vainilla", precio: 40000, img: "img/torta de vainilla.png" },
              { nombre: "Torta Circular de Manjar", precio: 42000, img: "img/torta de manjar.png" },
              { nombre: "Mousse de Chocolate", precio: 5000, img: "img/mousse de chocolate.png" },
              { nombre: "Tiramisú Clásico", precio: 5500, img: "img/Tiramisú Clásico.png" },
              { nombre: "Torta Sin Azúcar de Naranja", precio: 48000, img: "img/Torta Sin Azúcar de Naranja.png" },
              { nombre: "Cheesecake Sin Azúcar", precio: 47000, img: "img/Cheesecake Sin Azúcar.png" },
              { nombre: "Empanada de Manzana", precio: 3000, img: "img/Empanada de Manzana.png" },
              { nombre: "Tarta de Santiago", precio: 6000, img: "img/Tarta de Santiago.png" },
            ].map((prod, i) => (
              <div key={i} className="card">
                <img src={prod.img} alt={prod.nombre} />
                <h3>{prod.nombre}</h3>
                <p className="precio">${prod.precio.toLocaleString()} CLP</p>
                <Link to="/productos" className="btn">Ver Productos</Link>
              </div>
            ))}
          </div>
        </main>
      <Footer />
    </>
  );
}

export default Home;
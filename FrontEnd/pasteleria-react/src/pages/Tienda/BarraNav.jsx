import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../styles/all.css";

function BarraNav() {
  const { cantidadTotal } = useCart();

  return (
    <header>
      <div className="top-bar">
        <div>
          <img src="img/logo_pasteleria.png" alt="logo" width="40" />
          <span>Pastelería Mil Sabores</span>
        </div>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blog">Blogs</Link>
          <Link to="/contacto">Contacto</Link>
        </nav>

        <div className="acciones">
          <Link to="/login">Iniciar sesión</Link> |{" "}
          <Link to="/registro">Registrar usuario</Link> |{" "}
          <Link to="/carrito" className="carrito">
            Carrito ({cantidadTotal})
          </Link>
        </div>
      </div>
    </header>
  );
}

export default BarraNav;

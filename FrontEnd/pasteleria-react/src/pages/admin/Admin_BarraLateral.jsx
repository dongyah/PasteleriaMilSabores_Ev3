
import '../../styles/Admin.css';
import '../../styles/fontello.css';
import { Link } from 'react-router-dom';

function Admin_BarraLateral() {
  return (
    <aside className="barra-lateral">
      <div className="barra-superior">
        <div className="logotipo">
          <img src="/img/logo_pasteleria.png" alt="Logo Pastelería" />
        </div>
        <nav>
          <ul>
            <li><a href="/admin"><i className="icon-home"></i> Inicio</a></li>
            <li><a href="/admin/ordenes"><i className="icon-clipboard"></i> Órdenes</a></li>
            <li><a href="/admin/productos"><i className="icon-birthday"></i> Productos</a></li>
            <li><a href="/admin/usuarios"><i className="icon-users"></i> Usuarios</a></li>
            <li><a href="/admin/reportes"><i className="icon-chart-bar"></i> Reportes</a></li>
            <li><a href="/admin/categorias"><i className="icon-clipboard"></i> Categorías</a></li>
            <li><Link to="/tienda"><i className="icon-shop"></i> Tienda</Link></li>
          </ul>
        </nav>
      </div>
      <div className="barra-pie">
        <ul>
          <li><a href="#"><i className="icon-cog-outline"></i> Configuración</a></li>
          <li><a href="/admin/perfil"><i className="icon-user"></i> Perfil</a></li>
          <li><a href="#"><i className="icon-search"></i> Buscar</a></li>
          <li><a href="#"><i className="icon-help-circled-alt"></i> Ayuda</a></li>
          <li><a href="#"><i className="icon-user-circle"></i> ADMIN</a></li>
        </ul>
      </div>
    </aside>
  );
}

export default Admin_BarraLateral;
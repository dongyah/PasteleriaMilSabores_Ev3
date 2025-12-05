import React from 'react';
import { Link } from 'react-router-dom';
import Admin_BarraLateral from '../admin/Admin_BarraLateral'; 

import '../../styles/Admin.css'; 

function Admin_Dashboard() {
  return (
    <div className="admin-layout">
      
      <Admin_BarraLateral />

      <div className="contenido-principal">
      
        <main className="admin-contenido">
          <header className="header">
            <div className="texto-encabezado">
              <h1 className="titulo-admin">Hola, Admin 👋</h1>
              <p className="subtitulo-admin">Tu panel de control para endulzar sonrisas</p>
            </div>
            <img className="imagen-admin" src="/img/admin-chef.png" alt="Admin Pastelera" />
          </header>

          {/* SECCIÓN DE TARJETAS*/}
          <section className="tarjetas">
            <div className="tarjeta">
              <h3>Productos</h3>
              <p className="tarjeta-descripcion">Gestiona el inventario, crea y edita tus productos.</p>
              <Link to="/admin/productos" className="btn-tarjeta">Ir a Productos</Link>
            </div>
            <div className="tarjeta">
              <h3>Usuarios</h3>
              <p className="tarjeta-descripcion">Administra los roles y la información de los usuarios.</p>
              <Link to="/admin/usuarios" className="btn-tarjeta">Ir a Usuarios</Link>
            </div>
            <div className="tarjeta">
              <h3>Órdenes y Boletas</h3>
              <p className="tarjeta-descripcion">Revisa el listado de todas las órdenes de compra.</p>
              <Link to="/admin/ordenes" className="btn-tarjeta">Ir a Órdenes</Link>
            </div>
            <div className="tarjeta">
              <h3>Reportes</h3>
              <p className="tarjeta-descripcion">Analiza las ventas y el rendimiento de tu negocio.</p>
              <Link to="/admin/reportes" className="btn-tarjeta">Ir a Reportes</Link>
            </div>
            <div className="tarjeta">
              <h3>Mi Perfil</h3>
              <p className="tarjeta-descripcion">Edita tu información personal y de seguridad.</p>
              <Link to="/admin/perfil" className="btn-tarjeta">Ir a Perfil</Link>
            </div>
            <div className="tarjeta">
                <h3>Tienda</h3>
                <p className="tarjeta-descripcion">Visualiza la tienda en tiempo real.</p>
                <Link to="/tienda" className="btn-tarjeta">Ir a Tienda</Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Admin_Dashboard;
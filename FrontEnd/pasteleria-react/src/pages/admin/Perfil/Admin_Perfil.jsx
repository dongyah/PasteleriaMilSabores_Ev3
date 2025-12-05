// src/pages/admin/perfil/Admin_Perfil.jsx

import React, { useState } from 'react';
import Admin_BarraLateral from '../Admin_BarraLateral';

import '../../../styles/Admin.css';

// --- DATOS DE EJEMPLO DEL ADMINISTRADOR ---
const adminUser = {
  nombre: 'Ana',
  apellidos: 'Pérez',
  correo: 'ana.perez@pasteleria.com',
  rol: 'Administrador',
  telefono: '+56912345678',
  fotoUrl: '/img/admin-profile-placeholder.png', 
  actividad: [
    { fecha: '2025-10-15 20:30', accion: 'Inicio de sesión exitoso' },
    { fecha: '2025-10-15 18:15', accion: 'Actualizó el producto T001' },
    { fecha: '2025-10-14 12:05', accion: 'Creó el usuario "Juan García"' },
    { fecha: '2025-10-13 09:45', accion: 'Generó reporte de ventas mensual' },
  ]
};

function Admin_Perfil() {
  // Estado para controlar qué pestaña está activa
  const [activeTab, setActiveTab] = useState('info');

  // Manejador para el envío de formularios (simulado)
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('¡Datos guardados con éxito! (Simulación)');
  };

  return (
    <div className="admin-layout">
      <Admin_BarraLateral />
      <div className="contenido-principal">
        <div className="pagina-perfil p-4">

          <h1 className="titulo-admin mb-4">Mi Perfil</h1>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body d-flex flex-column justify-content-center">
                  <img 
                    src={adminUser.fotoUrl} 
                    alt="Foto de perfil" 
                    className="rounded-circle mb-3 mx-auto" 
                    width="120" 
                    height="120" 
                    style={{ objectFit: 'cover', border: '3px solid #ffc0cb' }}
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x120/FFC0CB/683409?text=AP'; }}
                  />
                  <h4 className="card-title">{adminUser.nombre} {adminUser.apellidos}</h4>
                  <p className="text-muted mb-1">{adminUser.rol}</p>
                  <p className="text-muted">{adminUser.correo}</p>
                  <button className="btn btn-primary btn-sm mt-2">Cambiar Foto</button>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <button className={`nav-link ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
                        Información Personal
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className={`nav-link ${activeTab === 'seguridad' ? 'active' : ''}`} onClick={() => setActiveTab('seguridad')}>
                        Seguridad
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className={`nav-link ${activeTab === 'actividad' ? 'active' : ''}`} onClick={() => setActiveTab('actividad')}>
                        Actividad Reciente
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="card-body p-4">
                  {activeTab === 'info' && (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" defaultValue={adminUser.nombre} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="apellidos" className="form-label">Apellidos</label>
                        <input type="text" className="form-control" id="apellidos" defaultValue={adminUser.apellidos} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input type="tel" className="form-control" id="telefono" defaultValue={adminUser.telefono} />
                      </div>
                      <button type="submit" className="btn btn-success">Guardar Cambios</button>
                    </form>
                  )}

                  {activeTab === 'seguridad' && (
                    <form onSubmit={handleSubmit}>
                      <h5>Cambiar Contraseña</h5>
                      <div className="mb-3">
                        <label htmlFor="pass-actual" className="form-label">Contraseña Actual</label>
                        <input type="password" placeholder='••••••••' className="form-control" id="pass-actual" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pass-nueva" className="form-label">Nueva Contraseña</label>
                        <input type="password" placeholder='••••••••' className="form-control" id="pass-nueva" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="pass-confirmar" className="form-label">Confirmar Nueva Contraseña</label>
                        <input type="password" placeholder='••••••••' className="form-control" id="pass-confirmar" />
                      </div>
                      <button type="submit" className="btn btn-success">Actualizar Contraseña</button>
                    </form>
                  )}

                  {activeTab === 'actividad' && (
                    <div>
                      <h5>Últimas Acciones</h5>
                      <ul className="list-group list-group-flush">
                        {adminUser.actividad.map((item, index) => (
                          <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0">
                            <span>{item.accion}</span>
                            <small className="text-muted">{item.fecha}</small>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Perfil;
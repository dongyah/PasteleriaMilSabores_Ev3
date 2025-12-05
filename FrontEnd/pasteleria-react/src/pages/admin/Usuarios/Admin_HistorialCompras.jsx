import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Admin_BarraLateral from '../Admin_BarraLateral';
import { boletas } from '../../../data/mockBoletas';
import { usuarios } from '../../../data/mockUsuarios';

function Admin_HistorialCompras() {
  const { id } = useParams();
  const usuarioId = parseInt(id);

  const usuario = usuarios.find(u => u.id === usuarioId);
  
  const historial = boletas.filter(boleta => boleta.cliente.rut === usuario?.rut);

  return (
    <div className="admin-layout">
      <Admin_BarraLateral />
      <div className="contenido-principal">
        <main className="admin-contenido p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="titulo-admin">Historial de Compras</h1>
              {usuario ? (
                <p className="lead">Cliente: {usuario.nombre} {usuario.apellidos}</p>
              ) : (
                <p className="lead text-danger">Usuario no encontrado</p>
              )}
            </div>
            <Link to="/admin/usuarios" className="btn btn-secondary">Volver a Usuarios</Link>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              {historial.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col" className="text-center">ID Orden</th>
                        <th scope="col">Fecha</th>
                        <th scope="col" className="text-end">Total</th>
                        <th scope="col" className="text-center">Estado</th>
                        <th scope="col" className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historial.map(orden => (
                        <tr key={orden.id}>
                          <td className="text-center fw-bold">#{orden.id}</td>
                          <td>{orden.fecha}</td>
                          <td className="text-end">${orden.total.toLocaleString('es-CL')}</td>
                          <td className="text-center">
                            <span className={`badge bg-${orden.estado === 'Entregado' ? 'success' : orden.estado === 'Pagado' ? 'primary' : 'warning'}`}>
                              {orden.estado}
                            </span>
                          </td>
                          <td className="text-center">
                            <Link to={`/admin/ordenes/${orden.id}`} className="btn btn-sm btn-info">
                              Ver Boleta
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted">Este usuario no tiene compras registradas.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin_HistorialCompras;

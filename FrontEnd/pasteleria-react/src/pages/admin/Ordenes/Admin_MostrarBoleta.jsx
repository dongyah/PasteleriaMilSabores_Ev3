// src/pages/admin/ordenes/Admin_MostrarBoleta.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { boletas } from '../../../data/mockBoletas'; // Importamos el mock (que también actualizaremos)

function Admin_MostrarBoleta() {
  const { id } = useParams();
  const boleta = boletas.find(b => b.id === parseInt(id));

  if (!boleta) {
    return (
      <div>
        <h2>Boleta no encontrada</h2>
        <Link to="/admin/ordenes">Volver al listado</Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pagina-mostrar-boleta">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="titulo-admin">Detalle de la Orden</h1>
        <div>
          <button onClick={handlePrint} className="btn btn-secondary me-2">Imprimir</button>
          <Link to="/admin/ordenes" className="btn btn-primary">Volver al Listado</Link>
        </div>
      </div>

      <div className="card shadow-sm boleta-container">
        <div className="card-body p-4">
          {/* ... Encabezado e Información del Cliente ... */}
          <div className="row mb-4">
            <div className="col-6">
              <img src="/img/logo_pasteleria.png" alt="Logo Pastelería" style={{ width: '80px' }} />
              <h4 className="mt-2">Pastelería Mil Sabores</h4>
            </div>
            <div className="col-6 text-end">
              <h3>BOLETA</h3>
              <p className="mb-1"><strong>N°:</strong> {boleta.id}</p>
              <p className="mb-0"><strong>Fecha:</strong> {boleta.fecha}</p>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <h5>Cliente:</h5>
              <p className="mb-1">{boleta.cliente.nombre}</p>
              <p className="mb-0">{boleta.cliente.correo}</p>
            </div>
          </div>
          
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th scope="col">Cantidad</th>
                <th scope="col">Descripción</th>
                <th scope="col" className="text-end">Precio Unit.</th>
                <th scope="col" className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {boleta.items.map(item => (
                <tr key={item.id}>
                  <td>{item.cantidad}</td>
                  <td>{item.nombre}</td>
                  <td className="text-end">${item.precioUnitario.toLocaleString('es-CL')}</td>
                  <td className="text-end">${(item.cantidad * item.precioUnitario).toLocaleString('es-CL')}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* --- SECCIÓN DE TOTALES (MODIFICADA) --- */}
          <div className="row justify-content-end mt-4">
            <div className="col-4">
              <ul className="list-group">
                {/* Eliminamos las líneas de Subtotal e IVA */}
                <li className="list-group-item d-flex justify-content-between list-group-item-primary">
                  <h4>Total:</h4>
                  {/* Ahora el total es el mismo que el subtotal */}
                  <h4>${boleta.total.toLocaleString('es-CL')}</h4>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_MostrarBoleta;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Admin_BarraLateral from '../../admin/Admin_BarraLateral';
import { ordenes } from '../../../data/mockOrdenes'; // vamos a importar el mock de las órdenes

// Estilos
import '../../../styles/Admin.css'; 


function Admin_GestionOrdenes() {
  // --- LÓGICA DE PAGINACIÓN ---
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // mostrar 12 órdenes por página

  // Calcular las órdenes a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = ordenes.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ordenes.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="admin-layout">
      <Admin_BarraLateral />
      <div className="contenido-principal">
        <div className="pagina-gestion-ordenes"> 
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="titulo-admin">Gestión de Órdenes y Boletas</h1>
          </div>
          <div className="card shadow-sm">
            <div className="card-header">
              <h5 className="mb-0">Listado de Órdenes</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="text-center">ID Orden</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">Cliente</th>
                      <th scope="col" className="text-end">Total</th>
                      <th scope="col" className="text-center">Estado</th>
                      <th scope="col" className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 2. Mapeamos SOLO las órdenes de la página actual */}
                    {currentItems.map(orden => (
                      <tr key={orden.id}>
                        <td className="text-center fw-bold">#{orden.id}</td>
                        <td>{orden.fecha}</td>
                        <td>{orden.clienteNombre}</td>
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
            </div>
          </div>
          
          {/* 3. Paginación */}
          <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
              {pageNumbers.map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <a onClick={() => paginate(number)} href="#!" className="page-link">
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Admin_GestionOrdenes;
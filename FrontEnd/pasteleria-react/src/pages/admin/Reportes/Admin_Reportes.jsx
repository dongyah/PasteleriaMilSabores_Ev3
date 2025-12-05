import React from 'react';
import { Link } from 'react-router-dom';
import Admin_BarraLateral from '../Admin_BarraLateral';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import '../../../styles/Admin.css';

// REGISTRAR LOS COMPONENTES DE CHART.JS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- DATOS SIMULADOS ---
const lineChartData = {
  labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
  datasets: [{
    label: 'Ventas de la Semana',
    data: [120000, 190000, 150000, 210000, 180000, 250000, 230000],
    fill: true,
    backgroundColor: 'rgba(255, 192, 203, 0.2)',
    borderColor: 'rgb(255, 105, 180)',
    tension: 0.1,
  }],
};

const doughnutChartData = {
  labels: ['Tortas', 'Postres Individuales', 'Pastelería Tradicional'],
  datasets: [{
    data: [55, 25, 20],
    backgroundColor: ['rgb(255, 182, 193)', 'rgb(255, 105, 180)', 'rgb(199, 21, 133)'],
    hoverOffset: 4,
  }],
};

const topProductos = [
  { id: 1, nombre: 'Torta de Chocolate', unidades: 125, ingresos: 1875000 },
  { id: 3, nombre: 'Cheesecake Frutos Rojos', unidades: 98, ingresos: 1764000 },
  { id: 2, nombre: 'Pie de Limón', unidades: 150, ingresos: 1800000 },
  { id: 10, nombre: 'Torta Tres Leches', unidades: 85, ingresos: 1360000 },
  { id: 12, nombre: 'Rollo de Canela', unidades: 320, ingresos: 800000 },
];

function Admin_Reportes() {
  return (
    <div className="admin-layout">
      <Admin_BarraLateral />
      <div className="contenido-principal">
        <main className="admin-contenido p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="titulo-admin">Reportes Generales</h1>
            <input type="date" className="form-control" style={{ maxWidth: '200px' }} />
          </div>

          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Ventas Totales</h6>
                  <p className="card-title fs-4 fw-bold">$1.250.800</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Total de Órdenes</h6>
                  <p className="card-title fs-4 fw-bold">160</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Ticket Promedio</h6>
                  <p className="card-title fs-4 fw-bold">$7.817</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-center shadow-sm h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Nuevos Clientes</h6>
                  <p className="card-title fs-4 fw-bold">25</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- SECCIÓN DE GRÁFICOS --- */}
          <div className="row g-4 mb-4">
            <div className="col-md-8">
              <div className="card shadow-sm h-100">
                <div className="card-header">Ventas a lo Largo del Tiempo</div>
                <div className="card-body"><Line data={lineChartData} /></div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-header">Ventas por Categoría</div>
                <div className="card-body d-flex align-items-center justify-content-center"><Doughnut data={doughnutChartData} /></div>
              </div>
            </div>
          </div>

          {/* --- SECCIÓN DE PRODUCTOS MÁS VENDIDOS --- */}
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Productos Más Vendidos (Resumen)</h5>
              <Link to="/admin/productos/reportes" className="btn btn-sm btn-outline-primary">Ver Reporte Completo</Link>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Unidades Vendidas</th>
                      <th className="text-end">Ingresos Generados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProductos.map(producto => (
                      <tr key={producto.id}>
                        <td>{producto.nombre}</td>
                        <td className="text-center">{producto.unidades}</td>
                        <td className="text-end">${producto.ingresos.toLocaleString('es-CL')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Admin_Reportes;
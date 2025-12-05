import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Admin_BarraLateral from '..//Admin_BarraLateral';
import '../../../styles/Admin.css';
import '../../../styles/Admin_NuevoUsuario.css';
import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:8015/api/v1'; 

function Admin_NuevoUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    fechaNac: '', // YYYY-MM-DD
    rut: '',
    correo: '',
    telefono: '',
    region: '',
    comuna: '',
    direccion: '',
    password: '', 
    tipoUsuario: 'Cliente', // Valor por defecto
    codigoDescuento: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [comunasDisponibles, setComunasDisponibles] = useState([]);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false); // Para evitar doble envío

  // --- EFECTO para cargar SweetAlert y Admin.js ---
  useEffect(() => {

    if (window.Swal && document.querySelector("script[src='/js/Admin.js']")) {
      setIsScriptLoaded(true);
      return;
    }
    if (!window.Swal) {
        const swalScript = document.createElement("script");
        swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        swalScript.async = true;
        document.body.appendChild(swalScript);
    }
    if (!document.querySelector("script[src='/js/Admin.js']")) {
        const adminScript = document.createElement("script");
        adminScript.src = "/js/Admin.js";
        adminScript.async = true;
        adminScript.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(adminScript);
    } else {
        const checkSwal = setInterval(() => {
            if (window.Swal) {
                setIsScriptLoaded(true);
                clearInterval(checkSwal);
            }
        }, 100);
    }
  }, []);

  // --- EFECTO: Reacciona a cambios en la Región ---
  useEffect(() => {
    if (isScriptLoaded && formData.region && window.comunasPorRegion) {
      setComunasDisponibles(window.comunasPorRegion[formData.region] || []);
    } else {
      setComunasDisponibles([]);
    }
    setFormData(prevData => ({ ...prevData, comuna: '' }));
  }, [formData.region, isScriptLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --- MANEJADOR DEL FORMULARIO CON INTEGRACIÓN BACKEND  ---
  const handleSubmit = async (event) => { 
    event.preventDefault();
    setMensaje({ texto: '', tipo: '' });
    
    if (!isScriptLoaded || typeof window.validarRut !== 'function' || !window.Swal) {
        Swal.fire('Error', 'Las herramientas de validación no están listas. Intente de nuevo.', 'warning');
        return;
    }

    // --- VALIDACIONES del formulario ---
    const validarCampoVacio = (texto) => texto.trim() !== '';
    const validarLargoMax = (texto, max) => texto.length <= max;
    const validarCorreoLocal = (correo) => /^[\w\.-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
    const validarPasswordLocal = (pass) => pass.length >= 4 && pass.length <= 10;
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/; 

    if (!validarCampoVacio(formData.nombre)) { Swal.fire('Error', 'El nombre es obligatorio.', 'error'); return; }
    if (!validarLargoMax(formData.nombre, 50)) { Swal.fire('Error', 'El nombre no puede superar los 50 caracteres.', 'error'); return; }
    if (!validarCampoVacio(formData.apellidos)) { Swal.fire('Error', 'Los apellidos son obligatorios.', 'error'); return; }
    if (!validarLargoMax(formData.apellidos, 100)) { Swal.fire('Error', 'Los apellidos no pueden superar los 100 caracteres.', 'error'); return; }
    if (!window.validarRut(formData.rut)) { Swal.fire('Error', 'El RUT ingresado no es válido.', 'error'); return; }
    if (!validarCorreoLocal(formData.correo)) { Swal.fire('Error', 'El correo debe ser @duocuc.cl, @profesor.duoc.cl o @gmail.com.', 'error'); return; }
    if (!validarLargoMax(formData.correo, 100)) { Swal.fire('Error', 'El correo no puede superar los 100 caracteres.', 'error'); return; }
    if (!validarPasswordLocal(formData.password)) { Swal.fire('Error', 'La contraseña debe tener entre 4 y 10 caracteres.', 'error'); return; }
    if (!fechaRegex.test(formData.fechaNac)) { Swal.fire('Error', 'Fecha de nacimiento inválida.', 'error'); return; }
    if (!formData.region || !formData.comuna) { Swal.fire('Error', 'Debe seleccionar una región y comuna.', 'error'); return; }
    if (!validarCampoVacio(formData.direccion)) { Swal.fire('Error', 'La dirección es obligatoria.', 'error'); return; }
    if (!validarLargoMax(formData.direccion, 300)) { Swal.fire('Error', 'La dirección no puede superar los 300 caracteres.', 'error'); return; }


    setIsSubmitting(true); // Bloquear el botón
    
    try {
        const nuevoUsuarioPayload = {
            nombre: formData.nombre,
            apellidos: formData.apellidos,
            fechaNac: formData.fechaNac || null, 
            rut: formData.rut.replace(/[^0-9kK]/g, ''), 
            correo: formData.correo,
            telefono: formData.telefono || null,
            region: formData.region,
            comuna: formData.comuna,
            direccion: formData.direccion,
            password: formData.password, 
            tipoUsuario: formData.tipoUsuario || 'Cliente', 
            codigoDescuento: formData.codigoDescuento || null,
      };
      
      //  Llamada POST al Backend
      const response = await axios.post(`${API_BASE_URL}/usuarios/save`, nuevoUsuarioPayload);

      // 3. Manejo de éxito
      const usuarioCreado = response.data;
      
      Swal.fire(
          '¡Usuario creado!', 
          `ID asignado: ${usuarioCreado.idUsuario} - Tipo: ${usuarioCreado.rol}`, 
          'success'
      );
      
      // Limpiar formulario
      setFormData({
        nombre: '', apellidos: '', fechaNac: '', rut: '', correo: '', telefono: '',
        region: '', comuna: '', direccion: '', password: '', tipoUsuario: 'Cliente', codigoDescuento: ''
      });

    } catch (error) {
      // Manejo de errores del Backend (409 Conflict, 400 Bad Request, etc.)
      console.error("Error al registrar el usuario:", error.response || error);

      let errorMsg = 'Ocurrió un error inesperado al guardar el usuario.';
      if (error.response && error.response.status === 409) {
          errorMsg = 'El correo o RUT ya se encuentran registrados en el sistema.';
      } else if (error.response && error.response.data && error.response.data.message) {
          // mensaje especifico de spring
          errorMsg = error.response.data.message; 
      }
      
      Swal.fire('Error', errorMsg, 'error');
    } finally {
      setIsSubmitting(false); // Desbloquear el botón
    }
  };

  return (
    <div className="admin-layout">
        <Admin_BarraLateral />
        <div className="contenido-principal">
            {/* ... Enlace Volver a Gestión de Usuarios ... */}
            <div className="volver-atras-container">
                <Link to="/admin/usuarios" className="volver-atras-link">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        fill="currentColor" 
                        viewBox="0 0 16 16"
                        style={{ marginRight: '8px', verticalAlign: 'middle' }}
                    >
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                    </svg> 
                    Volver a Gestión de Usuarios
                </Link>
            </div>
            <main className="admin-contenido pt-0">
                <h1 className="titulo-admin">Nuevo Usuario</h1>
                <section className="seccion-formulario">
                    <form className="formulario-usuario" onSubmit={handleSubmit} noValidate>
                        
                        <div className="fila-formulario">
                            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                            <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} onChange={handleChange} />
                        </div>
                        <div className="fila-formulario">
                            <input type="date" name="fechaNac" value={formData.fechaNac} onChange={handleChange} />
                            <input type="text" name="rut" placeholder="RUT (sin puntos, con guión)" value={formData.rut} onChange={handleChange} />
                        </div>
                        <div className="fila-formulario">
                            <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />
                            <input type="tel" name="telefono" placeholder="Teléfono (ej: 912345678)" value={formData.telefono} onChange={handleChange} />
                        </div>
                        <div className="fila-formulario">
                            <select name="region" value={formData.region} onChange={handleChange} disabled={!isScriptLoaded}>
                                <option value="" disabled>Seleccione Región</option>
                                {isScriptLoaded && window.comunasPorRegion && Object.keys(window.comunasPorRegion).map(regionKey => (
                                    <option key={regionKey} value={regionKey}>{regionKey.charAt(0).toUpperCase() + regionKey.slice(1).replace('_', ' ')}</option>
                                ))}
                            </select>
                            <select name="comuna" value={formData.comuna} onChange={handleChange} disabled={!formData.region}>
                                <option value="" disabled>Seleccione Comuna</option>
                                {comunasDisponibles.map(com => ( <option key={com} value={com}>{com}</option> ))}
                            </select>
                        </div>
                        <div className="fila-formulario">
                            <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
                        </div>
                        <div className="fila-formulario">
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? 'Ocultar' : 'Mostrar'}
                                </button>
                            </div>
                        </div>
                        <div className="fila-formulario">
                            <select name="tipoUsuario" value={formData.tipoUsuario} onChange={handleChange}>
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Vendedor">Vendedor</option>
                            </select>
                            <input 
                                type="text" 
                                name="codigoDescuento" 
                                placeholder="Código de Descuento (opcional)" 
                                value={formData.codigoDescuento} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div className="acciones-formulario mt-4">
                            <button type="submit" className="btn-guardar" disabled={!isScriptLoaded || isSubmitting}>
                                {isSubmitting ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    </div>
  );
}

export default Admin_NuevoUsuario;
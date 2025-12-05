import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Admin_BarraLateral from '../Admin_BarraLateral';
import axios from 'axios'; 
import '../../../styles/Admin.css';
import '../../../styles/Admin_NuevoUsuario.css';

const API_BASE_URL = 'http://localhost:8015/api/v1';

function Admin_EditarUsuario() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [fechaNac, setFechaNac] = useState('');
    const [rut, setRut] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [region, setRegion] = useState('');
    const [comuna, setComuna] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState(''); 
    const [codigoDescuento, setCodigoDescuento] = useState(''); 
    const [tipoUsuario, setTipoUsuario] = useState('Cliente');
    
    // --- ESTADOS DE CONTROL ---
    const [showPassword, setShowPassword] = useState(false);
    const [comunasDisponibles, setComunasDisponibles] = useState([]);
    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [cargando, setCargando] = useState(true); 
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const loadScripts = () => {
             if (!window.Swal) {
                 const swalScript = document.createElement("script");
                 swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
                 swalScript.async = true;
                 document.body.appendChild(swalScript);
             }
             const checkReady = setInterval(() => {
                 if (window.Swal && window.comunasPorRegion && window.validarRut) {
                     setIsScriptLoaded(true);
                     clearInterval(checkReady);
                 }
             }, 100);
        };
        loadScripts();
    }, []);

    //  Carga los datos del usuario GET del Backend---
    useEffect(() => {
        const fetchUsuario = async () => {
            setCargando(true);
            if (!isScriptLoaded) return;

            try {
                //  GET: /api/v1/usuarios/find/{id}
                const response = await axios.get(`${API_BASE_URL}/usuarios/find/${id}`);
                const data = response.data;
                
                // Rellenar los estados con los datos del backend
                setNombre(data.nombre || '');
                setApellidos(data.apellidos || '');
                setFechaNac(data.fechaNac || '');
                setRut(data.rut || '');
                setCorreo(data.correo || '');
                setTelefono(data.telefono || '');
                setRegion(data.region || '');
                setComuna(data.comuna || '');
                setDireccion(data.direccion || '');
                setPassword(data.password || ''); 
                setTipoUsuario(data.tipoUsuario || 'Cliente');
                setCodigoDescuento(data.codigoDescuento || '');

                if (data.region && window.comunasPorRegion) {
                    setComunasDisponibles(window.comunasPorRegion[data.region] || []);
                }

            } catch (error) {
                console.error("Error al cargar el usuario:", error.response || error);
                window.Swal.fire('Error de Carga', `El usuario ID ${id} no fue encontrado o error de conexión.`, 'error');
            } finally {
                setCargando(false);
            }
        };

        if (isScriptLoaded) {
            fetchUsuario();
        }
    }, [id, isScriptLoaded]);


    useEffect(() => {
        if (isScriptLoaded && region && window.comunasPorRegion) {
            setComunasDisponibles(window.comunasPorRegion[region] || []);
        }
    }, [region, isScriptLoaded]);


    const handleSubmit = (event) => {
        event.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        if (!isScriptLoaded || !window.Swal || typeof window.validarRut !== 'function') {
             window.Swal.fire('Error', 'Las herramientas de validación no están listas. Intente de nuevo.', 'error');
             return;
        }


        const validarCampoVacio = (texto) => texto.trim() !== '';
        const validarLargoMax = (texto, max) => texto.length <= max;
        const validarCorreo = (correo) => /^[\w\.-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);

        // Validaciones de campos obligatorios/largo
        if (!validarCampoVacio(nombre) || !validarLargoMax(nombre, 50)) {
            window.Swal.fire('Error', 'Nombre obligatorio (Máx. 50 caracteres).', 'error'); return;
        }
        if (!validarCampoVacio(apellidos) || !validarLargoMax(apellidos, 100)) {
            window.Swal.fire('Error', 'Apellidos obligatorios (Máx. 100 caracteres).', 'error'); return;
        }
        if (!window.validarRut(rut)) { 
            window.Swal.fire('Error', 'El RUT ingresado no es válido.', 'error'); return;
        }
        if (!validarCorreo(correo) || !validarLargoMax(correo, 100)) {
            window.Swal.fire('Error', 'Correo inválido o excede el límite (Máx. 100).', 'error'); return;
        }
        if (!validarCampoVacio(direccion) || !validarLargoMax(direccion, 300)) {
            window.Swal.fire('Error', 'Dirección obligatoria (Máx. 300 caracteres).', 'error'); return;
        }
        // Validación de Contraseña 
        if (password && (password.length < 4 || password.length > 10)) {
             window.Swal.fire('Error', 'La contraseña debe tener entre 4 y 10 caracteres.', 'error'); return;
        }
    

        setIsSubmitting(true);
        window.Swal.fire({
            title: '¿Confirmar Actualización?',
            text: "Se modificarán los datos del usuario.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, ¡actualizar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const usuarioPayload = {
                        nombre, apellidos, fechaNac: fechaNac || null, rut, correo, telefono: telefono || null,
                        region, comuna, direccion, 
                        password: password, 
                        tipoUsuario, codigoDescuento: codigoDescuento || null,
                    };
                    
                    // Llamada PUT al Backend
                    await axios.put(`${API_BASE_URL}/usuarios/update/${id}`, usuarioPayload);


                    window.Swal.fire('¡Actualizado!', 'El usuario ha sido modificado.', 'success')
                        .then(() => navigate('/admin/usuarios'));

                } catch (error) {
                    console.error("Error al actualizar:", error.response || error);
                    let errorMsg = 'Error en la actualización. Revise la ruta PUT o si el RUT/Correo ya existe.';
                    window.Swal.fire('Error', errorMsg, 'error');
                }
            }
            setIsSubmitting(false);
        });
    };

    if (cargando) {
        return (
            <div className="admin-layout">
                <Admin_BarraLateral />
                <div className="contenido-principal"><p className="text-center mt-5">Cargando datos del usuario...</p></div>
            </div>
        );
    }
    return (
        <div className="admin-layout">
            <Admin_BarraLateral />
            <div className="contenido-principal">
                <main className="admin-contenido">
                    <div className="volver-atras-container">
                        <Link to="/admin/usuarios" className="volver-atras-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Volver a Gestión de Usuarios
                        </Link>
                    </div>

                    <h1 className="titulo-admin">Editar Usuario</h1>
                    <section className="seccion-formulario">
                        <form className="formulario-usuario" onSubmit={handleSubmit} noValidate>
                            {mensaje.texto && (
                                <p style={{ color: mensaje.tipo === 'error' ? '#D32F2F' : '#388E3C', fontWeight: 'bold', textAlign: 'center', background: mensaje.tipo === 'error' ? '#FFCDD2' : '#C8E6C9', padding: '10px', borderRadius: '8px', border: `1px solid ${mensaje.tipo === 'error' ? '#D32F2F' : '#388E3C'}` }}>
                                    {mensaje.texto}
                                </p>
                            )}
                            
                            <div className="fila-formulario">
                                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                                <input type="text" placeholder="Apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                            </div>
                            <div className="fila-formulario">
                                <input type="date" value={fechaNac} onChange={(e) => setFechaNac(e.target.value)} />
                                <input type="text" placeholder="RUT (sin puntos, con guión)" value={rut} onChange={(e) => setRut(e.target.value)} />
                            </div>
                            <div className="fila-formulario">
                                <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                                <input type="tel" placeholder="Teléfono (ej: 912345678)" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                            <div className="fila-formulario">
                                <select value={region} onChange={(e) => setRegion(e.target.value)} disabled={!isScriptLoaded}>
                                    <option value="" disabled>Seleccione Región</option>
                                    {isScriptLoaded && window.comunasPorRegion && Object.keys(window.comunasPorRegion).map(regionKey => (
                                        <option key={regionKey} value={regionKey}>{regionKey.charAt(0).toUpperCase() + regionKey.slice(1)}</option>
                                    ))}
                                </select>
                                <select value={comuna} onChange={(e) => setComuna(e.target.value)} disabled={!region}>
                                    <option value="" disabled>Seleccione Comuna</option>
                                    {comunasDisponibles.map(com => (
                                        <option key={com} value={com}>{com}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="fila-formulario">
                                <input type="text" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                            </div>
                            <div className="fila-formulario">
                                <div className="input-group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control"
                                        placeholder="Contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                </div>
                                
                                <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                                    <option value="Cliente">Cliente</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>
                                </select>
                                <input type="text" placeholder="Código Descuento (opcional)" value={codigoDescuento} onChange={(e) => setCodigoDescuento(e.target.value)} />
                            </div>
                            <div className="acciones-formulario mt-4">
                                <button type="submit" className="btn-guardar" disabled={isSubmitting || cargando}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Usuario'}
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Admin_EditarUsuario;
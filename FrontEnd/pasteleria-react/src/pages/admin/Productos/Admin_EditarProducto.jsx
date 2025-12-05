import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Admin_BarraLateral from '../Admin_BarraLateral';
import axios from 'axios';
import '../../../styles/Admin.css';
import '../../../styles/Admin_NuevoProducto.css';

const API_BASE_URL = 'http://localhost:8015/api/v1';

function Admin_EditarProducto() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codigo: '',
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        stockCritico: '',
        categoria: '',
        imagen: '',
    });

    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const [cargando, setCargando] = useState(true); 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);


    useEffect(() => {
        const loadScripts = () => {
             if (!window.Swal) {
                 const swalScript = document.createElement("script");
                 swalScript.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
                 swalScript.async = true;
                 document.body.appendChild(swalScript);
             }
             let scriptTag = document.querySelector("script[src='/js/Admin.js']");
             if (!scriptTag) {
                 scriptTag = document.createElement("script");
                 scriptTag.src = "/js/Admin.js";
                 scriptTag.async = true;
                 scriptTag.onload = () => setIsScriptLoaded(true);
                 document.body.appendChild(scriptTag);
             } else {
                 const checkReady = setInterval(() => {
                     if (window.Swal) {
                         setIsScriptLoaded(true);
                         clearInterval(checkReady);
                     }
                 }, 100);
             }
        };
        loadScripts();
    }, []);

    useEffect(() => {
        const fetchProducto = async () => {
            setCargando(true);
            try {
                const response = await axios.get(`${API_BASE_URL}/productos/find/${id}`);
                const data = response.data;
                

                setFormData({
                    codigo: data.codigo || '',
                    nombre: data.nombre || '',
                    descripcion: data.descripcion || '',
                    precio: String(data.precio || 0), 
                    stock: String(data.stock || 0),
                    stockCritico: String(data.stockCritico || ''),
                    categoria: data.categoria || '',
                    imagen: data.imagen || '', 
                });

            } catch (error) {
                console.error("Error al cargar el producto:", error.response || error);
                setMensaje({ texto: `Error: Producto ID ${id} no encontrado o error de conexión.`, tipo: 'error' });
            } finally {
                setCargando(false);
            }
        };

        fetchProducto();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {

            const reader = new FileReader();
            reader.onloadend = () => {
                 setFormData(prevData => ({ ...prevData, imagen: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {

             setFormData(prevData => ({ ...prevData, imagen: '' }));
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setMensaje({ texto: '', tipo: '' });

        if (!isScriptLoaded || !window.Swal) {
             setMensaje({ texto: 'Las herramientas de validación no están listas. Intente de nuevo.', tipo: 'error' });
             return;
        }
        
        // Código (Requerido, Mín: 3, asumimos que el código no cambia en edición, pero validamos)
        if (!formData.codigo.trim() || formData.codigo.length < 3) {
            window.Swal.fire('Error de Validación', 'El código del producto debe tener al menos 3 caracteres.', 'error');
            return;
        }
        // Nombre (Requerido, Máx: 100)
        if (!formData.nombre.trim() || formData.nombre.length > 100) {
            window.Swal.fire('Error de Validación', 'El nombre es obligatorio y no puede superar los 100 caracteres.', 'error');
            return;
        }
        // Descripción (Máx: 500)
        if (formData.descripcion.length > 500) {
            window.Swal.fire('Error de Validación', 'La descripción no puede superar los 500 caracteres.', 'error');
            return;
        }
        // Categoría (Requerido)
        if (!formData.categoria) {
            window.Swal.fire('Error de Validación', 'Debe seleccionar una categoría.', 'error');
            return;
        }
        
        // Precio (Requerido, Mín 0) - Asumo que tienes window.validarPrecio o usas validación JS nativa
        if (isNaN(parseFloat(formData.precio)) || parseFloat(formData.precio) < 0) {
            window.Swal.fire('Error de Validación', 'El precio es obligatorio y debe ser un número mayor o igual a 0.', 'error');
            return;
        }
        // Stock (Requerido, Entero, Mín 0)
        if (isNaN(parseInt(formData.stock)) || parseInt(formData.stock) < 0) {
            window.Swal.fire('Error de Validación', 'El stock es obligatorio y debe ser un número entero mayor o igual a 0.', 'error');
            return;
        }
        // Stock Crítico (Opcional, Entero, Mín 0)
        if (formData.stockCritico && (isNaN(parseInt(formData.stockCritico)) || parseInt(formData.stockCritico) < 0)) {
            window.Swal.fire('Error de Validación', 'El stock crítico debe ser un número entero mayor o igual a 0.', 'error');
            return;
        }

        setIsSubmitting(true);
        window.Swal.fire({
            title: '¿Confirmar Actualización?',
            text: "Se modificarán los datos del producto ID " + id,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, ¡actualizar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const productoPayload = {
                        codigo: formData.codigo,
                        nombre: formData.nombre,
                        descripcion: formData.descripcion || null,
                        precio: parseFloat(formData.precio),
                        stock: parseInt(formData.stock, 10),
                        stockCritico: formData.stockCritico ? parseInt(formData.stockCritico, 10) : null,
                        categoria: formData.categoria, 
                        imagen: formData.imagen || null, 
                    };
                    
                    await axios.put(`${API_BASE_URL}/productos/update/${id}`, productoPayload);


                    window.Swal.fire('¡Actualizado!', 'El producto ha sido modificado.', 'success')
                        .then(() => navigate('/admin/productos'));

                } catch (error) {
                    console.error("Error al actualizar:", error.response || error);
                    let errorMsg = 'Error en la actualización. Revise la ruta PUT y los datos.';
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
                <div className="contenido-principal"><p className="text-center mt-5">Cargando datos del producto...</p></div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <Admin_BarraLateral />
            <div className="contenido-principal">
                <main className="admin-contenido">
                    {/* --- BOTÓN DE VOLVER --- */}
                    <div className="volver-atras-container">
                        <Link to="/admin/productos" className="volver-atras-link">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Volver a Gestión de Productos
                        </Link>
                    </div>

                    <h1 className="titulo-admin">Editar Producto ID: {id}</h1>
                    <section className="seccion-formulario">
                        <form className="formulario-usuario producto" onSubmit={handleSubmit} noValidate>
                            {mensaje.texto && (
                                <p className={`alert ${mensaje.tipo === 'error' ? 'alert-danger' : 'alert-success'}`}>
                                    {mensaje.texto}
                                </p>
                            )}
                            <div className="fila-formulario">
                                <input type="text" name="codigo" placeholder="Código Producto" value={formData.codigo} disabled />
                                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                            </div>
                            <div className="fila-formulario">
                                <textarea name="descripcion" placeholder="Descripción Producto" value={formData.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className="fila-formulario">
                                <input type="number" name="precio" placeholder="Precio $" value={formData.precio} onChange={handleChange} />
                                <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
                                <input type="number" name="stockCritico" placeholder="Stock Crítico" value={formData.stockCritico} onChange={handleChange} />
                            </div>
                            <div className="fila-formulario">
                                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                                    <option value="" disabled>Seleccione Categoría</option>
                                    <option value="Tortas">Tortas</option>
                                    <option value="Postres">Postres</option>
                                    <option value="Pastelería Tradicional">Pastelería Tradicional</option>
                                    <option value="Galletas">Galletas</option>
                                    <option value="Sin Azúcar">Sin Azúcar</option>
                                    <option value="Veganos">Veganos</option>
                                </select>
                                <input type="file" accept="image/*" name="imagenFile" className="form-control" onChange={handleImageChange} />
                            </div>
                            {formData.imagen && (
                                <div className="text-center mt-3">
                                    <p>Vista previa:</p>
                                    <img src={formData.imagen} alt="Vista previa" style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', border: '1px solid #ddd' }} />
                                </div>
                            )}
                            <div className="acciones-formulario mt-4">
                                <button type="submit" className="btn-guardar" disabled={isSubmitting || cargando}>
                                    {isSubmitting ? 'Actualizando...' : 'Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Admin_EditarProducto;
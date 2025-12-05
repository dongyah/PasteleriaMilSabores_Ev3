import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Admin_BarraLateral from '../Admin_BarraLateral';
import axios from 'axios'; 
import '../../../styles/Admin.css';
import '../../../styles/Admin_NuevoProducto.css';


const API_BASE_URL = 'http://localhost:8015/api/v1'; 

function Admin_NuevoProducto() {

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

    // --- ESTADO PARA ALMACENAR LAS CATEGORÍAS DE LA BD ---
    const [categoriasBD, setCategoriasBD] = useState([]); 

    const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 



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
        const fetchCategorias = async () => {
            try {
                // Llama al endpoint de listado de categorías
                const response = await axios.get(`${API_BASE_URL}/categorias/all`);
                setCategoriasBD(response.data);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
                setMensaje({ texto: 'Error al cargar las categorías desde el servidor.', tipo: 'error' });
            }
        };

        fetchCategorias();
    }, []); 


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

        
        const isNumeric = (val) => !isNaN(parseFloat(val)) && isFinite(val);
        
        if (!formData.codigo.trim() || formData.codigo.length < 3) {
            setMensaje({ texto: 'El código debe tener al menos 3 caracteres.', tipo: 'error' });
            return;
        }
        if (!formData.nombre.trim() || formData.nombre.length > 100) {
            setMensaje({ texto: 'El nombre es obligatorio y no puede superar los 100 caracteres.', tipo: 'error' });
            return;
        }
        if (formData.descripcion.length > 500) {
            setMensaje({ texto: 'La descripción no puede superar los 500 caracteres.', tipo: 'error' });
            return;
        }
        if (!formData.categoria) {
            setMensaje({ texto: 'Debe seleccionar una categoría.', tipo: 'error' });
            return;
        }
        if (!isNumeric(formData.precio) || parseFloat(formData.precio) < 0) {
            setMensaje({ texto: 'El precio es obligatorio y debe ser un número mayor o igual a 0.', tipo: 'error' });
            return;
        }
        if (!isNumeric(formData.stock) || parseInt(formData.stock, 10) < 0 || !Number.isInteger(parseFloat(formData.stock))) {
            setMensaje({ texto: 'El stock debe ser un número entero mayor o igual a 0.', tipo: 'error' });
            return;
        }
        // Validación Stock Crítico
        if (formData.stockCritico && (!isNumeric(formData.stockCritico) || parseInt(formData.stockCritico, 10) < 0 || !Number.isInteger(parseFloat(formData.stockCritico)))) {
            setMensaje({ texto: 'El stock crítico debe ser un número entero mayor o igual a 0.', tipo: 'error' });
            return;
        }
        

        setIsSubmitting(true);
        
        try {
            const productoPayload = {
                codigo: formData.codigo,
                nombre: formData.nombre,
                descripcion: formData.descripcion || null,
                precio: parseInt(formData.precio), 
                stock: parseInt(formData.stock, 10),
                stockCritico: formData.stockCritico ? parseInt(formData.stockCritico, 10) : null,
                categoria: formData.categoria, 
                imagen: formData.imagen || null, 
            };
            
            await axios.post(`${API_BASE_URL}/productos/save`, productoPayload);

            setMensaje({ texto: '¡Producto creado con éxito! Redirigiendo...', tipo: 'exito' });
            

            setFormData({ codigo: '', nombre: '', descripcion: '', precio: '', stock: '', stockCritico: '', categoria: '', imagen: '' });
            navigate('/admin/productos'); 

        } catch (error) {
            console.error("Error al registrar el producto:", error.response || error);
            let errorMsg = 'Error al guardar el producto. Revise si el código o nombre ya existen o la ruta.';
            setMensaje({ texto: errorMsg, tipo: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };


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

                    <h1 className="titulo-admin">Nuevo Producto</h1>
                    <section className="seccion-formulario">
                        <form className="formulario-usuario producto" onSubmit={handleSubmit} noValidate>
                            {mensaje.texto && (
                                <p className={`alert ${mensaje.tipo === 'exito' ? 'alert-success' : 'alert-danger'}`}>
                                    {mensaje.texto}
                                </p>
                            )}
                            <div className="fila-formulario">
                                <input type="text" name="codigo" placeholder="Código Producto (Mín. 3)" value={formData.codigo} onChange={handleChange} />
                                <input type="text" name="nombre" placeholder="Nombre (Máx. 100)" value={formData.nombre} onChange={handleChange} />
                            </div>
                            <div className="fila-formulario">
                                <textarea name="descripcion" placeholder="Descripción Producto (Máx. 500)" value={formData.descripcion} onChange={handleChange}></textarea>
                            </div>
                            <div className="fila-formulario">
                                <input type="number" name="precio" placeholder="Precio $ (Mín. 0)" value={formData.precio} onChange={handleChange} />
                                <input type="number" name="stock" placeholder="Stock (Entero, Mín. 0)" value={formData.stock} onChange={handleChange} />
                                <input type="number" name="stockCritico" placeholder="Stock Crítico (Opcional)" value={formData.stockCritico} onChange={handleChange} />
                            </div>
                            <div className="fila-formulario">
                                <select name="categoria" value={formData.categoria} onChange={handleChange}>
                                    <option value="" disabled>Seleccione Categoría</option>
                                    {categoriasBD.map(cat => (

                                        <option key={cat.id} value={cat.nombre}> 
                                            {cat.nombre}
                                        </option>
                                    ))}
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
                                <button type="submit" className="btn-guardar" disabled={isSubmitting}>
                                    {isSubmitting ? 'Guardando...' : 'Guardar Producto'}
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Admin_NuevoProducto;
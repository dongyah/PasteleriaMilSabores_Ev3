// --- Datos para los selects dependientes ---
var comunasPorRegion = {
    "arica_y_parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "valparaiso": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"],
    "metropolitana": ["Santiago", "Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "Tiltil", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"],
    "ohiggins": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"],
    "maule": ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "Retiro", "San Javier", "Villa Alegre", "Yerbas Buenas"],
    "nuble": ["Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "biobio": ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío"],
    "araucania": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"],
    "los_rios": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"],
    "los_lagos": ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"],
    "aysen": ["Coyhaique", "Lago Verde", "Aysén", "Cisnes", "Guaitecas", "Cochrane", "O'Higgins", "Tortel", "Chile Chico", "Río Ibáñez"],
    "magallanes": ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "Antártica", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
};

// --- DATOS DEL MOCK DE USUARIOS (Incluidos aquí para acceso global) ---
var mockUsuarios = [
  { id: 1, nombre: 'Ana', apellidos: 'Pérez Rojas', fechaNac: '1990-05-15', rut: '12.345.678-9', correo: 'ana.perez@example.com', telefono: '987654321', region: 'metropolitana', comuna: 'Santiago', direccion: 'Av. Siempre Viva 123', tipoUsuario: 'Cliente' },
  { id: 2, nombre: 'Juan', apellidos: 'García López', fechaNac: '1985-11-20', rut: '9.876.543-2', correo: 'juan.garcia@example.com', telefono: '912345678', region: 'valparaiso', comuna: 'Viña del Mar', direccion: 'Calle Falsa 456', tipoUsuario: 'Vendedor' },
  { id: 3, nombre: 'María', apellidos: 'López Soto', fechaNac: '2000-01-30', rut: '20.123.456-K', correo: 'maria.lopez@example.com', telefono: '911223344', region: 'biobio', comuna: 'Concepción', direccion: 'Pasaje Corto 789', tipoUsuario: 'Admin' },
  { id: 4, nombre: 'Carlos', apellidos: 'Ruiz Morales', fechaNac: '1992-03-10', rut: '15.987.654-1', correo: 'carlos.ruiz@example.com', telefono: '922334455', region: 'araucania', comuna: 'Temuco', direccion: 'Arturo Prat 101', tipoUsuario: 'Cliente' },
  { id: 5, nombre: 'Lucía', apellidos: 'Fernández Cruz', fechaNac: '1998-07-22', rut: '18.876.543-2', correo: 'lucia.fernandez@example.com', telefono: '933445566', region: 'antofagasta', comuna: 'Antofagasta', direccion: 'Gran Avenida 1213', tipoUsuario: 'Cliente' },
  { id: 6, nombre: 'Pedro', apellidos: 'Martínez Vidal', fechaNac: '1980-09-05', rut: '17.765.432-3', correo: 'pedro.martinez@example.com', telefono: '944556677', region: 'magallanes', comuna: 'Punta Arenas', direccion: 'Av. del Mar 1415', tipoUsuario: 'Vendedor' },
  { id: 7, nombre: 'Sofía', apellidos: 'González Díaz', fechaNac: '1995-12-18', rut: '18.654.321-4', correo: 'sofia.gonzalez@example.com', telefono: '955667788', region: 'metropolitana', comuna: 'Las Condes', direccion: 'Las Condes 1617', tipoUsuario: 'Cliente' },
  { id: 8, nombre: 'Javier', apellidos: 'Torres Ponce', fechaNac: '1989-04-01', rut: '19.543.210-5', correo: 'javier.torres@example.com', telefono: '966778899', region: 'valparaiso', comuna: 'Valparaíso', direccion: 'Libertad 1819', tipoUsuario: 'Cliente' },
  { id: 9, nombre: 'Elena', apellidos: 'Vidal Castro', fechaNac: '1991-02-14', rut: '20.432.109-6', correo: 'elena.vidal@example.com', telefono: '977889900', region: 'biobio', comuna: 'Talcahuano', direccion: 'San Martín 2021', tipoUsuario: 'Admin' },
  { id: 10, nombre: 'Miguel', apellidos: 'Soto Rojas', fechaNac: '1983-06-30', rut: '21.321.098-7', correo: 'miguel.soto@example.com', telefono: '988990011', region: 'araucania', comuna: 'Villarrica', direccion: 'Carrera 2223', tipoUsuario: 'Cliente' },
  { id: 11, nombre: 'Isabel', apellidos: 'Castro Flores', fechaNac: '1999-08-12', rut: '11.210.987-8', correo: 'isabel.castro@example.com', telefono: '999001122', region: 'antofagasta', comuna: 'Calama', direccion: 'Maipú 2425', tipoUsuario: 'Vendedor' },
  { id: 12, nombre: 'Raúl', apellidos: 'Navarro Vega', fechaNac: '1979-10-25', rut: '12.109.876-9', correo: 'raul.navarro@example.com', telefono: '900112233', region: 'magallanes', comuna: 'Puerto Natales', direccion: 'Colón 2627', tipoUsuario: 'Cliente' },
  { id: 13, nombre: 'Carmen', apellidos: 'Ortega Muñoz', fechaNac: '1988-01-01', rut: '13.098.765-K', correo: 'carmen.ortega@example.com', telefono: '911223344', region: 'metropolitana', comuna: 'Puente Alto', direccion: 'Prat 2829', tipoUsuario: 'Cliente' },
  { id: 14, nombre: 'David', apellidos: 'Romero Paredes', fechaNac: '1993-05-09', rut: '14.987.654-0', correo: 'david.romero@example.com', telefono: '922334455', region: 'valparaiso', comuna: 'Quilpué', direccion: 'Aníbal Pinto 3031', tipoUsuario: 'Cliente' },
  { id: 15, nombre: 'Patricia', apellidos: 'Muñoz Bravo', fechaNac: '1987-11-11', rut: '15.876.543-1', correo: 'patricia.munoz@example.com', telefono: '933445566', region: 'biobio', comuna: 'Los Ángeles', direccion: 'Bulnes 3233', tipoUsuario: 'Vendedor' },
  { id: 16, nombre: 'Sergio', apellidos: 'Gil Reyes', fechaNac: '1982-02-28', rut: '16.765.432-2', correo: 'sergio.gil@example.com', telefono: '944556677', region: 'araucania', comuna: 'Angol', direccion: 'Independencia 3435', tipoUsuario: 'Cliente' },
  { id: 17, nombre: 'Mónica', apellidos: 'Alonso Cordero', fechaNac: '1996-06-14', rut: '17.654.321-3', correo: 'monica.alonso@example.com', telefono: '955667788', region: 'antofagasta', comuna: 'Tocopilla', direccion: 'Baquedano 3637', tipoUsuario: 'Cliente' },
  { id: 18, nombre: 'Ricardo', apellidos: 'Blanco Aguilar', fechaNac: '1978-08-08', rut: '18.543.210-4', correo: 'ricardo.blanco@example.com', telefono: '966778899', region: 'magallanes', comuna: 'Porvenir', direccion: 'Ramírez 3839', tipoUsuario: 'Admin' },
  { id: 19, nombre: 'Verónica', apellidos: 'Rubio Pizarro', fechaNac: '2001-03-03', rut: '19.432.109-5', correo: 'veronica.rubio@example.com', telefono: '977889900', region: 'metropolitana', comuna: 'Maipú', direccion: 'Copiapó 4041', tipoUsuario: 'Cliente' },
  { id: 20, nombre: 'Adrián', apellidos: 'Iglesias Tapia', fechaNac: '1984-07-07', rut: '20.321.098-6', correo: 'adrian.iglesias@example.com', telefono: '988990011', region: 'valparaiso', comuna: 'San Antonio', direccion: 'Esmeralda 4243', tipoUsuario: 'Cliente' },
  { id: 21, nombre: 'Laura', apellidos: 'Santos Núñez', fechaNac: '1990-09-09', rut: '21.210.987-7', correo: 'laura.santos@example.com', telefono: '999001122', region: 'biobio', comuna: 'Chillán', direccion: 'Freire 4445', tipoUsuario: 'Vendedor' },
  { id: 22, nombre: 'Francisco', apellidos: 'Molina Donoso', fechaNac: '1986-10-10', rut: '11.109.876-8', correo: 'francisco.molina@example.com', telefono: '900112233', region: 'araucania', comuna: 'Pucón', direccion: 'Errázuriz 4647', tipoUsuario: 'Cliente' },
  { id: 23, nombre: 'Cristina', apellidos: 'Nuñez Salinas', fechaNac: '1994-04-04', rut: '12.098.765-9', correo: 'cristina.nunez@example.com', telefono: '911223344', region: 'antofagasta', comuna: 'Mejillones', direccion: 'Chacabuco 4849', tipoUsuario: 'Cliente' },
  { id: 24, nombre: 'Jorge', apellidos: 'Pascual Cárdenas', fechaNac: '1981-01-20', rut: '13.987.654-K', correo: 'jorge.pascual@example.com', telefono: '922334455', region: 'metropolitana', comuna: 'La Florida', direccion: 'Yungay 5051', tipoUsuario: 'Cliente' },
  { id: 25, nombre: 'Silvia', apellidos: 'Herrero Leiva', fechaNac: '1997-02-15', rut: '14.876.543-0', correo: 'silvia.herrero@example.com', telefono: '933445566', region: 'valparaiso', comuna: 'Villa Alemana', direccion: 'Blanco Encalada 5253', tipoUsuario: 'Admin' }
];

// --- Funciones de Validación Generales ---

function validarCampoVacio(texto) {
    if (typeof texto !== 'string') return false;
    return texto.trim() !== '';
}

function validarLargoMax(texto, max) {
    if (typeof texto !== 'string') return false;
    return texto.length <= max;
}

function validarLargoMin(texto, min) {
    if (typeof texto !== 'string') return false;
    return texto.length >= min;
}

// --- Funciones de Validación para Usuarios ---

function validarRut(rut) {
    if (typeof rut !== 'string' || !/^[0-9]{7,8}-?[0-9kK]$/.test(rut.replace(/\./g, ''))) return false;
    rut = rut.replace(/\./g, '').replace('-', '').trim().toLowerCase();
    var valor = rut.slice(0, -1);
    var dv = rut.slice(-1);
    var suma = 0;
    var multiplo = 2;
    for (var i = valor.length - 1; i >= 0; i--) {
        suma += multiplo * valor.charAt(i);
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }
    var dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'k' : dvEsperado.toString();
    return dv === dvEsperado;
}

function validarCorreo(correo) {
    if (typeof correo !== 'string') return false;
    return /^[\w\.-]+@(duocuc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

function validarPassword(pass) {
    if (typeof pass !== 'string') return false;
    return pass.length >= 4 && pass.length <= 10;
}

function validarTelefono(telefono) {
    return /^[9][0-9]{8}$/.test(telefono);
}

// --- Funciones de Validación para Productos ---

function validarPrecio(precio) {
    const num = parseInt(precio, 10);
    return !isNaN(num) && num >= 0 && String(precio).indexOf('.') === -1;
}

function validarStock(stock) {
    const num = parseInt(stock, 10);
    return !isNaN(num) && num >= 0 && String(stock).indexOf('.') === -1;
}


// --- LÓGICA DE PAGINACIÓN PARA USUARIOS ---
var paginaActualUsuarios = 1;
var usuariosPorPagina = 13; // 13 para que abarque más en la pantalla

/**
 * Carga usuarios desde LocalStorage y mock, los combina, y dibuja la página actual en la tabla.
 * @param {number} pagina 
 */
function cargarUsuarios(pagina = 1) {
    paginaActualUsuarios = pagina;
    var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    var tbody = document.getElementById("tablaUsuarios"); 

    if (!tbody) { return; }
    tbody.innerHTML = ""; 

    var idsGuardados = new Set(usuariosGuardados.map(u => u.id));
    var usuariosMockUnicos = mockUsuarios.filter(u => !idsGuardados.has(u.id));
    var usuariosCombinados = [...usuariosGuardados, ...usuariosMockUnicos];
    usuariosCombinados.sort((a, b) => a.id - b.id);

    var inicio = (pagina - 1) * usuariosPorPagina;
    var fin = inicio + usuariosPorPagina;
    var usuariosPagina = usuariosCombinados.slice(inicio, fin);

    if (usuariosPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="12" class="text-center text-muted">No hay usuarios para mostrar.</td></tr>'; // Ajustado colspan
        renderizarPaginacionUsuarios(usuariosCombinados.length);
        return; // l innerhtml es para dibujar la tabla
    }

    usuariosPagina.forEach(function(usuario) {
        var fila = document.createElement("tr");
        // Añadimos todas las columnas según el formulario
        fila.innerHTML = `
            <td class="text-center">${usuario.id}</td>
            <td>${usuario.nombre || ''}</td>
            <td>${usuario.apellidos || ''}</td>
            <td>${usuario.fechaNac || ''}</td>
            <td class="text-center">${usuario.rut || ''}</td>
            <td>${usuario.correo || ''}</td>
            <td>${usuario.telefono || ''}</td>
            <td>${usuario.region || ''}</td>
            <td>${usuario.comuna || ''}</td>
            <td>${usuario.direccion || ''}</td>
            <td class="text-center">${usuario.tipoUsuario || ''}</td>
            <td class="text-center">
                <a href="/admin/editar-usuario/${usuario.id}" class="btn btn-sm btn-primary me-2" title="Editar">✏️</a>
                <a href="/admin/usuarios/historial/${usuario.id}" class="btn btn-sm btn-info me-2" title="Historial">📋</a>
                <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    renderizarPaginacionUsuarios(usuariosCombinados.length);
}

/**
 * Dibuja los botones de paginación.
 * @param {number} totalUsuarios - El número total de usuarios combinados.
 */
function renderizarPaginacionUsuarios(totalUsuarios) {
    var paginacionContainer = document.getElementById("paginacionUsuarios");
    if (!paginacionContainer) return;

    paginacionContainer.innerHTML = '';
    var totalPaginas = Math.ceil(totalUsuarios / usuariosPorPagina);

    if (totalPaginas <= 1) return;

    var nav = document.createElement('nav');
    var ul = document.createElement('ul');
    ul.className = 'pagination mb-0';

    for (let i = 1; i <= totalPaginas; i++) {
        var li = document.createElement('li');
        li.className = `page-item ${i === paginaActualUsuarios ? 'active' : ''}`;
        var a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#!';
        a.textContent = i;
        // Usamos una función anónima para pasar el número de página correctamente
        a.onclick = (function(pageNumber) {
            return function() { 
                cargarUsuarios(pageNumber); 
                return false; // Evita que el enlace '#!' cambie la URL
            };
        })(i); 
        li.appendChild(a);
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    paginacionContainer.appendChild(nav);
}

/**
 * Elimina un usuario de LocalStorage usando SweetAlert2 y recarga la tabla.
 * @param {number} id - El ID del usuario a eliminar.
 */
function eliminarUsuario(id) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
        // Filtramos solo los usuarios de LocalStorage
        var nuevosUsuariosGuardados = usuariosGuardados.filter(u => u.id !== id);
        localStorage.setItem("usuarios", JSON.stringify(nuevosUsuariosGuardados));
        
        cargarUsuarios(paginaActualUsuarios); 
        
        Swal.fire(
          '¡Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        )
      }
    })
}

// --- LÓGICA PARA GESTIÓN DE PRODUCTOS (MODIFICADA) ---
var paginaActualProductos = 1;
var productosPorPagina = 13;


function cargarProductos(pagina = 1) {
    paginaActualProductos = pagina;
    // Solo leemos desde LocalStorage
    var productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    var tbody = document.getElementById("tablaProductos"); 

    if (!tbody) { return; }
    tbody.innerHTML = ""; 

    // Ordenamos los productos guardados
    productosGuardados.sort((a, b) => a.id - b.id);

    // Calculamos qué productos mostrar según la página
    var inicio = (pagina - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;
    var productosPagina = productosGuardados.slice(inicio, fin);

    if (productosPagina.length === 0) {
        tbody.innerHTML = '<tr><td colspan="10" class="text-center text-muted">No hay productos guardados. ¡Crea uno nuevo!</td></tr>';
        renderizarPaginacionProductos(productosGuardados.length); // Renderiza paginación basada en LS
        return;
    }

    // Dibujamos la tabla solo con los productos de LocalStorage
    productosPagina.forEach(function(producto) {
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td class="text-center">${producto.id}</td>
            <td>${producto.codigo || ''}</td>
            <td>${producto.nombre || ''}</td>
            <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${producto.descripcion || ''}</td>
            <td class="text-end">${producto.precio ? '$' + producto.precio.toLocaleString('es-CL') : ''}</td>
            <td class="text-center">${producto.stock}</td>
            <td class="text-center">${producto.stockCritico || ''}</td>
            <td>${producto.categoria || ''}</td>
            <td class="text-center">
              ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;" />` : ''}
            </td>
            <td class="text-center">
                <a href="/admin/editar-producto/${producto.id}" class="btn btn-sm btn-primary me-2" title="Editar">✏️</a>
                <button class="btn btn-sm btn-danger" onclick="eliminarProducto(${producto.id})" title="Eliminar">🗑️</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

    renderizarPaginacionProductos(productosGuardados.length); // Paginación basada en LS
}

/**
 * Dibuja los controles de paginación para productos (basado en el total de LS).
 */
function renderizarPaginacionProductos(totalProductos) {
    var paginacionContainer = document.getElementById("paginacionProductos");
    if (!paginacionContainer) return;

    paginacionContainer.innerHTML = '';
    var totalPaginas = Math.ceil(totalProductos / productosPorPagina);

    if (totalPaginas <= 1) return;

    var nav = document.createElement('nav');
    var ul = document.createElement('ul');
    ul.className = 'pagination mb-0';

    for (let i = 1; i <= totalPaginas; i++) {
        var li = document.createElement('li');
        li.className = `page-item ${i === paginaActualProductos ? 'active' : ''}`;
        var a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#!';
        a.textContent = i;
        a.onclick = (function(pageNumber) {
            return function() { 
                cargarProductos(pageNumber); 
                return false;
            };
        })(i); 
        li.appendChild(a);
        ul.appendChild(li);
    }
    nav.appendChild(ul);
    paginacionContainer.appendChild(nav);
}

/**
 * Elimina un producto de LocalStorage usando SweetAlert2 y recarga la tabla.
 */
function eliminarProducto(id) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
        // Solo trabajamos con la lista de LocalStorage
        var nuevosProductosGuardados = productosGuardados.filter(p => p.id !== id);
        localStorage.setItem("productos", JSON.stringify(nuevosProductosGuardados));
        
        cargarProductos(paginaActualProductos); // Vuelve a dibujar la tabla solo con LS
        
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        )
      }
    })
}

// --- CARGA INICIAL ---
document.addEventListener('DOMContentLoaded', function() {
    if (typeof cargarUsuarios === 'function' && document.getElementById('tablaUsuarios')) { 
        cargarUsuarios(1); 
    }
    if (typeof cargarProductos === 'function' && document.getElementById('tablaProductos')) { 
        cargarProductos(1); 
    }
});

// === VARIABLES GLOBALES ===
// Lista de productos de la tienda
const productosDisponibles = [
    {
        id: 1, 
        nombre: "Laptop Gaming MSI", 
        precio: 3299.99, 
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=250&fit=crop&auto=format", 
        categoria: "Laptops"
    },
    {
        id: 2, 
        nombre: "iPhone 15 Pro", 
        precio: 2990.99, 
        imagen: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=250&fit=crop&auto=format", 
        categoria: "Smartphones"
    },
    {
        id: 3, 
        nombre: "Monitor 4K LG", 
        precio: 3990.99, 
        imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=250&fit=crop&auto=format", 
        categoria: "Monitores"
    },
    {
        id: 4, 
        nombre: "Teclado Mecánico", 
        precio: 4990.99, 
        imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=250&fit=crop&auto=format", 
        categoria: "Accesorios"
    },
    {
        id: 5, 
        nombre: "Audífonos Sony", 
        precio: 5990.99, 
        imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=250&fit=crop&auto=format", 
        categoria: "Audio"
    },
    {
        id: 6, 
        nombre: "Tablet iPad Pro", 
        precio: 6990.99, 
        imagen: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=250&fit=crop&auto=format", 
        categoria: "Tablets"
    },
    {
        id: 7, 
        nombre: "Cámara Canon", 
        precio: 7990.99, 
        imagen: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=250&fit=crop&auto=format", 
        categoria: "Cámaras"
    },
    {
        id: 8, 
        nombre: "Smartwatch Apple", 
        precio: 8990.99, 
        imagen: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=250&fit=crop&auto=format", 
        categoria: "Wearables"
    },
    {
        id: 9, 
        nombre: "Drone DJI Mini", 
        precio: 9990.99, 
        imagen: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=300&h=250&fit=crop&auto=format", 
        categoria: "Drones"
    }
];

// Carrito de compras (lista de productos seleccionados)
let carritoCompras = [];

// === FUNCIONES PRINCIPALES ===

// Función que se ejecuta cuando la página termina de cargar
function iniciarTienda() {
    console.log("🚀 Iniciando TechMart...");
    mostrarProductos();
    actualizarContadorCarrito();
    configurarFormularios();
}

// Función para mostrar todos los productos en la página
function mostrarProductos() {
    console.log("📦 Cargando productos...");
    
    // Obtener el contenedor donde van los productos
    const contenedorProductos = document.getElementById('listaProductos');
    
    // Limpiar contenedor
    contenedorProductos.innerHTML = '';
    
    // Crear HTML para cada producto
    productosDisponibles.forEach(function(producto) {
        // Crear tarjeta de producto
        const tarjetaProducto = document.createElement('div');
        tarjetaProducto.className = 'tarjeta-producto';
        
        // Contenido HTML de la tarjeta
        tarjetaProducto.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
            <div class="contenido-tarjeta">
                <span class="categoria-producto">${producto.categoria}</span>
                <h3 class="nombre-producto">${producto.nombre}</h3>
                <p class="descripcion-producto">Producto de alta calidad con las mejores especificaciones del mercado.</p>
                <div class="seccion-inferior">
                    <span class="precio-producto">S/${producto.precio}</span>
                    <button class="boton-agregar" onclick="agregarAlCarrito(${producto.id})">
                        <i class="fas fa-cart-plus"></i> Agregar
                    </button>
                </div>
            </div>
        `;
        
        // Agregar tarjeta al contenedor
        contenedorProductos.appendChild(tarjetaProducto);
    });
    
    console.log("✅ Productos cargados correctamente");
}

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    console.log("🛒 Agregando producto al carrito, ID:", idProducto);
    
    // Buscar el producto por su ID
    const producto = productosDisponibles.find(function(p) {
        return p.id === idProducto;
    });
    
    // Si no encuentra el producto, salir
    if (!producto) {
        console.log("❌ Producto no encontrado");
        return;
    }
    
    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carritoCompras.find(function(item) {
        return item.id === idProducto;
    });
    
    if (productoEnCarrito) {
        // Si ya está, aumentar la cantidad
        productoEnCarrito.cantidad += 1;
        console.log("📈 Cantidad aumentada:", productoEnCarrito.cantidad);
    } else {
        // Si no está, agregarlo nuevo
        const nuevoItem = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            cantidad: 1
        };
        carritoCompras.push(nuevoItem);
        console.log("✅ Producto agregado:", nuevoItem.nombre);
    }
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    mostrarNotificacion(producto.nombre + " agregado al carrito");
}

// Función para actualizar el número en el botón del carrito
function actualizarContadorCarrito() {
    // Calcular total de productos en el carrito
    let totalProductos = 0;
    carritoCompras.forEach(function(item) {
        totalProductos += item.cantidad;
    });
    
    // Actualizar el contador en la página
    document.getElementById('contadorCarrito').textContent = totalProductos;
    console.log("🔢 Contador actualizado:", totalProductos);
}

// Función para calcular el total de dinero del carrito
function calcularTotalCarrito() {
    let total = 0;
    carritoCompras.forEach(function(item) {
        total += item.precio * item.cantidad;
    });
    return total;
}

// Función para mostrar el contenido del carrito
function mostrarCarritoCompleto() {
    console.log("🛒 Mostrando carrito completo...");
    
    const contenedorCarrito = document.getElementById('productosEnCarrito');
    const totalElement = document.getElementById('totalCarrito');
    
    // Si el carrito está vacío
    if (carritoCompras.length === 0) {
        contenedorCarrito.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #6c757d;">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        totalElement.textContent = '0.00';
        return;
    }
    
    // Limpiar contenedor
    contenedorCarrito.innerHTML = '';
    
    // Mostrar cada producto del carrito
    carritoCompras.forEach(function(item) {
        const elementoCarrito = document.createElement('div');
        elementoCarrito.className = 'elemento-carrito';
        
        elementoCarrito.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="imagen-carrito">
            <div class="info-producto">
                <h6>${item.nombre}</h6>
                <small>S/${item.precio}</small>
            </div>
            <div class="controles-cantidad">
                <button class="boton-cantidad" onclick="cambiarCantidad(${item.id}, ${item.cantidad - 1})">-</button>
                <span>${item.cantidad}</span>
                <button class="boton-cantidad" onclick="cambiarCantidad(${item.id}, ${item.cantidad + 1})">+</button>
                <button class="boton-eliminar" onclick="eliminarDelCarrito(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        contenedorCarrito.appendChild(elementoCarrito);
    });
    
    // Actualizar total
    const total = calcularTotalCarrito();
    totalElement.textContent = total.toFixed(2);
    
    console.log("✅ Carrito mostrado, total: S/", total.toFixed(2));
}

// Función para cambiar la cantidad de un producto
function cambiarCantidad(idProducto, nuevaCantidad) {
    console.log("🔄 Cambiando cantidad, ID:", idProducto, "Nueva cantidad:", nuevaCantidad);
    
    if (nuevaCantidad <= 0) {
        eliminarDelCarrito(idProducto);
        return;
    }
    
    const item = carritoCompras.find(function(producto) {
        return producto.id === idProducto;
    });
    
    if (item) {
        item.cantidad = nuevaCantidad;
        actualizarContadorCarrito();
        mostrarCarritoCompleto();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(idProducto) {
    console.log("🗑️ Eliminando producto del carrito, ID:", idProducto);
    
    // Filtrar el carrito para quitar el producto
    carritoCompras = carritoCompras.filter(function(item) {
        return item.id !== idProducto;
    });
    
    // Actualizar interfaz
    actualizarContadorCarrito();
    mostrarCarritoCompleto();
    
    console.log("✅ Producto eliminado");
}

// Función para vaciar todo el carrito
function vaciarCarrito() {
    console.log("🧹 Vaciando carrito completo...");
    carritoCompras = [];
    actualizarContadorCarrito();
    mostrarCarritoCompleto();
    mostrarNotificacion("Carrito vaciado");
}

// === FUNCIONES DE NAVEGACIÓN ===

// Función para ir a una sección específica
function irASeccion(selector) {
    const elemento = document.querySelector(selector);
    if (elemento) {
        elemento.scrollIntoView({ 
            behavior: 'smooth' 
        });
    }
}

// Función para abrir el modal del carrito
function abrirCarrito() {
    console.log("🛒 Abriendo carrito...");
    mostrarCarritoCompleto();
    const modal = new bootstrap.Modal(document.getElementById('modalCarrito'));
    modal.show();
}

// Función para abrir el modal de login
function abrirLogin() {
    console.log("👤 Abriendo login...");
    const modal = new bootstrap.Modal(document.getElementById('modalLogin'));
    modal.show();
}

// === FUNCIONES DE COMPRA ===

// Función para iniciar el proceso de compra
function finalizarCompra() {
    console.log("💳 Iniciando proceso de compra...");
    
    // Verificar que hay productos en el carrito
    if (carritoCompras.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Calcular total y mostrarlo en el modal de pago
    const total = calcularTotalCarrito();
    document.getElementById('totalPagar').textContent = total.toFixed(2);
    
    // Cerrar modal del carrito
    const modalCarrito = bootstrap.Modal.getInstance(document.getElementById('modalCarrito'));
    modalCarrito.hide();
    
    // Abrir modal de pago
    const modalPago = new bootstrap.Modal(document.getElementById('modalPago'));
    modalPago.show();
    
    console.log("💰 Total a pagar: S/", total.toFixed(2));
}

// Función para procesar el pago
function procesarPago(evento) {
    console.log("💳 Procesando pago...");
    
    // Prevenir que el formulario se envíe normalmente
    evento.preventDefault();
    
    // Obtener el formulario
    const formulario = evento.target;
    
    // Verificar si todos los campos están llenos
    if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
        console.log("❌ Formulario inválido");
        return;
    }
    
    // Generar número de orden único
    const numeroOrden = 'TM' + Date.now();
    document.getElementById('numeroOrden').textContent = numeroOrden;
    
    // Cerrar modal de pago
    const modalPago = bootstrap.Modal.getInstance(document.getElementById('modalPago'));
    modalPago.hide();
    
    // Mostrar modal de éxito
    const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
    modalExito.show();
    
    // Vaciar carrito
    vaciarCarrito();
    
    // Limpiar formulario
    formulario.reset();
    formulario.classList.remove('was-validated');
    
    console.log("✅ Compra procesada exitosamente, orden:", numeroOrden);
}

// === FUNCIONES DE FORMATEO ===

// Función para formatear número de tarjeta
function formatearTarjeta(input) {
    // Quitar todo lo que no sea número
    let valor = input.value.replace(/\D/g, '');
    
    // Agregar espacios cada 4 dígitos
    let valorFormateado = '';
    for (let i = 0; i < valor.length; i++) {
        if (i > 0 && i % 4 === 0) {
            valorFormateado += ' ';
        }
        valorFormateado += valor[i];
    }
    
    // Limitar a 19 caracteres (16 números + 3 espacios)
    input.value = valorFormateado.substring(0, 19);
}

// Función para formatear fecha de vencimiento
function formatearFecha(input) {
    // Quitar todo lo que no sea número
    let valor = input.value.replace(/\D/g, '');
    
    // Agregar / después del mes
    if (valor.length >= 2) {
        valor = valor.substring(0, 2) + '/' + valor.substring(2, 4);
    }
    
    input.value = valor;
}

// Función para permitir solo números
function soloNumeros(input) {
    input.value = input.value.replace(/\D/g, '');
}

// === FUNCIONES DE UTILIDAD ===

// Función para cambiar entre tema claro y oscuro
function cambiarTema() {
    console.log("🌙 Cambiando tema...");
    
    const body = document.body;
    const botonTema = document.getElementById('botonTema');
    const iconoTema = document.getElementById('iconoTema');
    
    // Verificar tema actual
    const temaActual = body.getAttribute('data-tema');
    
    if (temaActual === 'oscuro') {
        // Cambiar a tema claro
        body.setAttribute('data-tema', 'claro');
        iconoTema.className = 'fas fa-moon';
        localStorage.setItem('tema', 'claro');
        console.log("☀️ Tema claro activado");
    } else {
        // Cambiar a tema oscuro
        body.setAttribute('data-tema', 'oscuro');
        iconoTema.className = 'fas fa-sun';
        localStorage.setItem('tema', 'oscuro');
        console.log("🌙 Tema oscuro activado");
    }
    
    // Resetear estilos de scroll para aplicar el nuevo tema
    const barra = document.querySelector('.barra-superior');
    barra.style.backgroundColor = '';
    barra.style.backdropFilter = '';
    barra.style.boxShadow = '';
}

// Función para cargar el tema guardado
function cargarTemaGuardado() {
    const temaGuardado = localStorage.getItem('tema');
    const body = document.body;
    const iconoTema = document.getElementById('iconoTema');
    
    if (temaGuardado === 'oscuro') {
        body.setAttribute('data-tema', 'oscuro');
        iconoTema.className = 'fas fa-sun';
        console.log("🌙 Tema oscuro cargado desde memoria");
    } else {
        body.setAttribute('data-tema', 'claro');
        iconoTema.className = 'fas fa-moon';
        console.log("☀️ Tema claro cargado por defecto");
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
    console.log("📢 Notificación:", mensaje);
    
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.innerHTML = `
        <i class="fas fa-check-circle"></i> ${mensaje}
    `;
    
    // Agregar al documento
    document.body.appendChild(notificacion);
    
    // Eliminar después de 3 segundos
    setTimeout(function() {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 3000);
}

// Función para configurar los formularios
function configurarFormularios() {
    console.log("⚙️ Configurando formularios...");
    
    // Configurar formulario de pago
    const formularioPago = document.getElementById('formularioPago');
    if (formularioPago) {
        formularioPago.addEventListener('submit', procesarPago);
    }
    
    // Configurar formateo de campos
    const campoTarjeta = document.getElementById('numeroTarjeta');
    if (campoTarjeta) {
        campoTarjeta.addEventListener('input', function() {
            formatearTarjeta(this);
        });
    }
    
    const campoFecha = document.getElementById('vencimiento');
    if (campoFecha) {
        campoFecha.addEventListener('input', function() {
            formatearFecha(this);
        });
    }
    
    const campoCVV = document.getElementById('cvv');
    if (campoCVV) {
        campoCVV.addEventListener('input', function() {
            soloNumeros(this);
        });
    }
    
    const campoCCI = document.getElementById('cci');
    if (campoCCI) {
        campoCCI.addEventListener('input', function() {
            soloNumeros(this);
        });
    }
    
    console.log("✅ Formularios configurados");
}

// Función para efectos de scroll en la barra
function configurarEfectosScroll() {
    window.addEventListener('scroll', function() {
        const barra = document.querySelector('.barra-superior');
        const temaActual = document.body.getAttribute('data-tema');
        
        if (window.scrollY > 50) {
            if (temaActual === 'oscuro') {
                // Tema oscuro - fondo más transparente
                barra.style.backgroundColor = 'rgba(31, 41, 55, 0.95)';
            } else {
                // Tema claro - fondo más transparente
                barra.style.backgroundColor = 'rgba(248, 249, 250, 0.95)';
            }
            barra.style.backdropFilter = 'blur(10px)';
            barra.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            // Volver a colores normales
            barra.style.backgroundColor = '';
            barra.style.backdropFilter = '';
            barra.style.boxShadow = '';
        }
    });
}

// === INICIO DE LA APLICACIÓN ===

// Esperar a que la página esté completamente cargada
document.addEventListener('DOMContentLoaded', function() {
    console.log("🌟 Página cargada, iniciando aplicación...");
    
    // Cargar tema guardado primero
    cargarTemaGuardado();
    
    // Iniciar todas las funciones principales
    iniciarTienda();
    configurarEfectosScroll();
    
    console.log("🎉 TechMart iniciado correctamente!");
});
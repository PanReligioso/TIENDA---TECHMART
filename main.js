// Productos con imágenes optimizadas
const products = [
    {
        id: 1, 
        name: "iPhone 15 Pro", 
        price: 3299, 
        image: "https://www.teknofilo.com/wp-content/uploads/2023/10/Analisis-iPhone-15-Pro-Teknofilo-5.jpg",
        description: "El smartphone más avanzado con chip A17 Pro"
    },
    {
        id: 2, 
        name: "MacBook Air M2", 
        price: 4299, 
        image: "https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/504776234_1120571640112953_2076837557340405788_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JbXZ7_vjuGUQ7kNvwGzFJrg&_nc_oc=AdmxReZC47JRFcPpPu8WHBM9OA1Onr-oM2MXqkkdXo3q9OBoANHJuBB0eN-_zzMcs7c&_nc_zt=23&_nc_ht=scontent-lim1-1.xx&_nc_gid=bSEn4EKoDZ_YRhEsiGzgFg&oh=00_AfP7XLJcV_B92EJ5lng99JYO1KXk8FO-RSL4p1ZVKMH90g&oe=68649682",
        description: "Ultraligero y potente para profesionales"
    },
    {
        id: 3, 
        name: "AirPods Pro 2", 
        price: 829, 
        image: "https://www.sopitas.com/wp-content/uploads/2024/09/anuncio-mas-importante-apple-event-millones-de-vida-auditiva-airpods-pro-1.jpeg?resize=1024,484",
        description: "Cancelación de ruido adaptativa"
    },
    {
        id: 4, 
        name: "iPad Pro M2", 
        price: 2999, 
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
        description: "La tablet más potente del mercado"
    },
    {
        id: 5, 
        name: "Apple Watch Ultra", 
        price: 2659, 
        image: "https://www.corbataslester.com/magazine/wp-content/uploads/2015/05/apple-watch-fancy-1-1024x609.png",
        description: "Diseñado para aventuras extremas"
    },
    {
        id: 6, 
        name: "Gaming PC RTX 4090", 
        price: 13299, 
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&h=600&fit=crop",
        description: "El PC gaming definitivo con RTX 4090"
    }
];

let cart = [];
let isDarkMode = false;

// Toggle tema oscuro
function toggleTheme() {
    isDarkMode = !isDarkMode;
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    
    if (isDarkMode) {
        html.setAttribute('data-bs-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        html.setAttribute('data-bs-theme', 'light');
        themeIcon.className = 'fas fa-moon';
    }
}

// Cargar productos con diseño responsive
function loadProducts() {
    const productGrid = document.getElementById('productGrid');
    productGrid.innerHTML = products.map((product, index) => `
        <div class="col-6 col-md-6 col-lg-4 col-xl-4">
            <div class="card product-card h-100" style="animation-delay: ${index * 0.1}s">
                <div class="overflow-hidden">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                </div>
                <div class="card-body d-flex flex-column p-3">
                    <h5 class="card-title fw-bold h6">${product.name}</h5>
                    <p class="card-text text-muted mb-auto small">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                        <span class="h5 text-primary mb-0 fw-bold">S/ ${product.price}</span>
                        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus me-1"></i> <span class="d-none d-md-inline">Agregar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Agregar al carrito con feedback visual
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCart();
    
    // Animación de feedback
    const badge = document.getElementById('cartCount');
    badge.style.transform = 'scale(1.5)';
    badge.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 300);

    // Mostrar toast de confirmación en móviles
    if (window.innerWidth < 768) {
        showToast('Producto agregado al carrito');
    }
}

// Mostrar toast para móviles
function showToast(message) {
    const toastHtml = `
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">TechStore</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', toastHtml);
    
    setTimeout(() => {
        const toastElement = document.querySelector('.toast-container');
        if (toastElement) {
            toastElement.remove();
        }
    }, 3000);
}

// Actualizar carrito con diseño responsive
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold small">${item.name}</h6>
                    <small class="text-muted">S/ ${item.price} c/u</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary p-1" onclick="changeQuantity(${item.id}, -1)" style="width: 30px; height: 30px;">
                        <i class="fas fa-minus" style="font-size: 0.7rem;"></i>
                    </button>
                    <span class="mx-2 fw-bold small">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary p-1" onclick="changeQuantity(${item.id}, 1)" style="width: 30px; height: 30px;">
                        <i class="fas fa-plus" style="font-size: 0.7rem;"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-2 p-1" onclick="removeFromCart(${item.id})" style="width: 30px; height: 30px;">
                        <i class="fas fa-trash" style="font-size: 0.7rem;"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    checkoutBtn.disabled = cart.length === 0;
}

// Cambiar cantidad
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Toggle carrito con manejo responsive
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
    
    // Prevenir scroll en móviles
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : 'auto';
}

// Proceder al pago
function proceedToPayment() {
    if (cart.length === 0) return;
    
    const modalTotal = document.getElementById('modalTotal');
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    modalTotal.textContent = totalPrice.toFixed(2);
    
    toggleCart(); // Cerrar carrito
    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

// Procesar pago con validación mejorada
function processPayment() {
    const form = document.getElementById('paymentForm');
    
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }
    
    // Mostrar loader
    const modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    const modalBody = document.querySelector('#paymentModal .modal-body');
    const originalContent = modalBody.innerHTML;
    
    modalBody.innerHTML = `
        <div class="text-center py-5">
            <div class="loader"></div>
            <p class="mt-3">Procesando pago...</p>
        </div>
    `;
    
    // Simular procesamiento
    setTimeout(() => {
        modalBody.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-check-circle fa-5x text-success mb-3"></i>
                <h4>¡Pago Exitoso!</h4>
                <p>Tu pedido ha sido procesado correctamente.</p>
                <p class="text-muted">Recibirás un email de confirmación en breve.</p>
            </div>
        `;
        
        // Limpiar carrito después de 2 segundos
        setTimeout(() => {
            cart = [];
            updateCart();
            modal.hide();
            modalBody.innerHTML = originalContent;
            form.classList.remove('was-validated');
            form.reset();
        }, 2000);
    }, 2000);
}

// Inicialización y event listeners
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCart();
    
    // Formatear input de tarjeta
    const cardInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
    if (cardInput) {
        cardInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g);
            if (formattedValue) {
                e.target.value = formattedValue.join(' ');
            } else {
                e.target.value = value;
            }
        });
    }
    
    // Formatear fecha de vencimiento
    const dateInput = document.querySelector('input[placeholder="MM/AA"]');
    if (dateInput) {
        dateInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0,2) + '/' + value.substring(2,4);
            }
            e.target.value = value;
        });
    }
    
    // Solo números para CVV
    const cvvInput = document.querySelector('input[placeholder="123"]');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Cerrar carrito al hacer clic fuera en móviles
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartBtn = document.querySelector('[onclick="toggleCart()"]');
        
        if (cartSidebar && cartSidebar.classList.contains('open') && 
            !cartSidebar.contains(e.target) && 
            cartBtn && !cartBtn.contains(e.target)) {
            toggleCart();
        }
    });
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
        }
    }
});

// Manejo de errores de imágenes
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2NjYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        e.target.alt = 'Imagen no disponible';
    }
}, true);

// Optimización de rendimiento para dispositivos móviles
if (window.innerWidth < 768) {
    // Reducir calidad de animaciones en móviles
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Lazy loading mejorado para móviles
    const observerOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    }, observerOptions);

    // Aplicar lazy loading a imágenes
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
function renderHeader() {
  const headerContainer = document.querySelector('[data-header]');
  if (!headerContainer) return;
  const sesion = usuarioActual();
  const cantidadCarrito = obtenerCantidadItems();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const isActive = (page) => currentPage === page ? 'text-red-600 font-bold' : 'text-gray-700 hover:text-red-600';

  headerContainer.innerHTML = `
    <header class="bg-white shadow-md sticky top-0 z-40 border-b-4 border-yellow-400">
      <div class="bg-red-600 text-white text-xs sm:text-sm py-2">
        <div class="container-page flex justify-between items-center px-4">
          <div class="flex items-center gap-2 sm:gap-4">
            <span class="flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              (555) 123-4567
            </span>
            <span class="hidden sm:flex items-center gap-1">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/></svg>
              Lun-Dom 11:00 - 23:00
            </span>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden md:inline">🍔 Delivery gratis en pedidos +$80</span>
          </div>
        </div>
      </div>

      <nav class="container-page px-4 py-3">
        <div class="flex justify-between items-center">
          <a href="index.html" class="flex items-center gap-2 group">
            <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:rotate-12 transition-transform">
              🍔
            </div>
            <div>
              <p class="font-display text-xl sm:text-2xl font-bold text-gray-900 leading-none">El Sabor</p>
              <p class="text-xs text-red-600 font-bold tracking-widest">EXPLOSIVO</p>
            </div>
          </a>

          <button id="mobile-menu-btn" class="md:hidden text-gray-700 hover:text-red-600">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <ul class="hidden md:flex items-center gap-6 font-semibold">
            <li><a href="index.html" class="${isActive('index.html')} transition">Inicio</a></li>
            <li><a href="productos.html" class="${isActive('productos.html')} transition">Productos</a></li>
            <li><a href="nosotros.html" class="${isActive('nosotros.html')} transition">Nosotros</a></li>
            <li><a href="contacto.html" class="${isActive('contacto.html')} transition">Contacto</a></li>
          </ul>

          <div class="hidden md:flex items-center gap-3">
            <a href="carrito.html" class="relative p-2 text-gray-700 hover:text-red-600 transition">
              <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span data-cart-badge class="${cantidadCarrito > 0 ? '' : 'hidden'} absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">${cantidadCarrito}</span>
            </a>
            ${sesion ? `
              <a href="perfil.html" class="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition">
                <div class="w-8 h-8 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  ${sesion.nombre.charAt(0).toUpperCase()}
                </div>
                <span class="text-sm font-semibold text-gray-700">${sesion.nombre.split(' ')[0]}</span>
              </a>
            ` : `
              <a href="login.html" class="text-sm font-semibold text-gray-700 hover:text-red-600">Ingresar</a>
              <a href="registro.html" class="btn-primary text-sm py-2 px-4">Registrarse</a>
            `}
          </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden mt-4 pb-2 border-t border-gray-200 pt-4">
          <ul class="flex flex-col gap-3 font-semibold">
            <li><a href="index.html" class="block py-2 ${isActive('index.html')}">Inicio</a></li>
            <li><a href="productos.html" class="block py-2 ${isActive('productos.html')}">Productos</a></li>
            <li><a href="nosotros.html" class="block py-2 ${isActive('nosotros.html')}">Nosotros</a></li>
            <li><a href="contacto.html" class="block py-2 ${isActive('contacto.html')}">Contacto</a></li>
            <li class="border-t border-gray-200 pt-3 mt-2 flex justify-between items-center">
              <a href="carrito.html" class="flex items-center gap-2 py-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                Carrito
                <span data-cart-badge class="${cantidadCarrito > 0 ? '' : 'hidden'} bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">${cantidadCarrito}</span>
              </a>
              ${sesion ? `
                <a href="perfil.html" class="text-red-600 font-bold">Mi Perfil</a>
              ` : `
                <a href="login.html" class="btn-primary text-sm py-2 px-4">Ingresar</a>
              `}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  `;

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function renderFooter() {
  const footerContainer = document.querySelector('[data-footer]');
  if (!footerContainer) return;
  footerContainer.innerHTML = `
    <footer class="bg-gray-900 text-gray-300 mt-16">
      <div class="container-page px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="md:col-span-1">
            <div class="flex items-center gap-2 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-red-500 to-yellow-500 rounded-xl flex items-center justify-center text-2xl">
                🍔
              </div>
              <div>
                <p class="font-display text-xl font-bold text-white leading-none">El Sabor</p>
                <p class="text-xs text-yellow-400 font-bold tracking-widest">EXPLOSIVO</p>
              </div>
            </div>
            <p class="text-sm leading-relaxed">
              Comida rápida con sabor premium. Ingredientes frescos, delivery rápido y la mejor atención.
            </p>
            <div class="flex gap-3 mt-4">
              <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" class="w-9 h-9 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h3 class="text-white font-bold mb-4">Navegación</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="index.html" class="hover:text-yellow-400 transition">Inicio</a></li>
              <li><a href="productos.html" class="hover:text-yellow-400 transition">Productos</a></li>
              <li><a href="nosotros.html" class="hover:text-yellow-400 transition">Nosotros</a></li>
              <li><a href="contacto.html" class="hover:text-yellow-400 transition">Contacto</a></li>
              <li><a href="carrito.html" class="hover:text-yellow-400 transition">Carrito</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-bold mb-4">Mi Cuenta</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="login.html" class="hover:text-yellow-400 transition">Iniciar sesión</a></li>
              <li><a href="registro.html" class="hover:text-yellow-400 transition">Crear cuenta</a></li>
              <li><a href="perfil.html" class="hover:text-yellow-400 transition">Mi perfil</a></li>
              <li><a href="recuperar.html" class="hover:text-yellow-400 transition">Recuperar contraseña</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-white font-bold mb-4">Legal</h3>
            <ul class="space-y-2 text-sm">
              <li><a href="privacidad.html" class="hover:text-yellow-400 transition">Políticas de privacidad</a></li>
              <li><a href="terminos.html" class="hover:text-yellow-400 transition">Términos y condiciones</a></li>
            </ul>
            <div class="mt-6">
              <h4 class="text-white font-bold mb-2">Contacto</h4>
              <p class="text-sm">📍 Av. Principal 123, Ciudad</p>
              <p class="text-sm">📞 (555) 123-4567</p>
              <p class="text-sm">✉️ hola@elsaborexplosivo.com</p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; ${new Date().getFullYear()} El Sabor Explosivo. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `;
}

function mostrarToast(mensaje, tipo = 'success') {
  const container = document.getElementById('toast-container') || (() => {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'fixed top-24 right-4 z-50 flex flex-col gap-2';
    document.body.appendChild(div);
    return div;
  })();
  const colores = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500'
  };
  const iconos = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '!'
  };
  const toast = document.createElement('div');
  toast.className = `${colores[tipo]} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px] animate-fade-in`;
  toast.innerHTML = `
    <span class="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center font-bold">${iconos[tipo]}</span>
    <span class="flex-1 font-medium">${mensaje}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function confirmarAccion(mensaje) {
  return window.confirm(mensaje);
}

function renderCardProducto(producto) {
  const rating = promedioRating(producto.id);
  const numResenas = contarResenas(producto.id);
  return `
    <a href="producto.html?id=${producto.id}" class="group bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-yellow-400">
      <div class="relative overflow-hidden aspect-[4/3]">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        ${producto.destacado ? '<span class="absolute top-3 left-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">⭐ DESTACADO</span>' : ''}
        ${producto.stock < 10 ? '<span class="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">¡Pocas unidades!</span>' : ''}
      </div>
      <div class="p-5">
        <div class="flex items-center gap-1 mb-2">
          ${renderEstrellas(rating, 'sm')}
          <span class="text-xs text-gray-500 ml-1">(${numResenas})</span>
        </div>
        <h3 class="font-bold text-lg text-gray-900 mb-1 group-hover:text-red-600 transition line-clamp-1">${producto.nombre}</h3>
        <p class="text-sm text-gray-500 mb-3 line-clamp-2">${producto.descripcion}</p>
        <div class="flex items-center justify-between">
          <span class="text-2xl font-bold text-red-600">${formatearPrecio(producto.precio)}</span>
          <span class="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-yellow-400 group-hover:text-gray-900 transition shadow-md">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </span>
        </div>
      </div>
    </a>
  `;
}

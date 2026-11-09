function inicializarPagina() {
  inicializarStorage();
  renderHeader();
  renderFooter();
  actualizarBadgeCarrito();

  const page = document.body.dataset.page;
  switch (page) {
    case 'home':
      initHome();
      break;
    case 'productos':
      initProductos();
      break;
    case 'producto':
      initProducto();
      break;
    case 'contacto':
      initContacto();
      break;
    case 'carrito':
      initCarrito();
      break;
    case 'checkout':
      initCheckout();
      break;
    case 'confirmacion':
      initConfirmacion();
      break;
    case 'perfil':
      initPerfil();
      break;
    case 'pedido':
      initPedido();
      break;
    case 'resena':
      initResena();
      break;
    case 'registro':
      initRegistro();
      break;
    case 'login':
      initLogin();
      break;
    case 'recuperar':
      initRecuperar();
      break;
  }
}

function initHome() {
  const contCategorias = document.getElementById('categorias-grid');
  if (contCategorias) {
    contCategorias.innerHTML = CATEGORIAS.map(cat => `
      <a href="productos.html?cat=${cat.id}" class="group bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 border-2 border-transparent hover:border-red-500">
        <div class="text-5xl mb-3 group-hover:scale-110 transition-transform">${cat.icono}</div>
        <h3 class="font-bold text-gray-900 group-hover:text-red-600 transition">${cat.nombre}</h3>
        <p class="text-sm text-gray-500 mt-1">${cat.descripcion}</p>
      </a>
    `).join('');
  }

  const contDestacados = document.getElementById('destacados-grid');
  if (contDestacados) {
    const destacados = PRODUCTOS.filter(p => p.destacado).slice(0, 8);
    contDestacados.innerHTML = destacados.map(renderCardProducto).join('');
  }

  const contTestimonios = document.getElementById('testimonios-list');
  if (contTestimonios) {
    contTestimonios.innerHTML = TESTIMONIOS.map(t => `
      <div class="bg-white p-6 rounded-2xl shadow-md border-t-4 border-yellow-400">
        ${renderEstrellas(t.rating, 'md')}
        <p class="text-gray-700 italic mt-3 mb-3">"${t.texto}"</p>
        <p class="font-bold text-gray-900">${t.nombre}</p>
      </div>
    `).join('');
  }
}

function initProductos() {
  const contGrid = document.getElementById('productos-grid');
  const contFiltros = document.getElementById('filtros-categorias');
  const inputBuscar = document.getElementById('buscar');
  const selectOrden = document.getElementById('ordenar');

  if (!contGrid) return;

  let categoriaActiva = obtenerQueryParam('cat') || 'todas';
  let textoBuscar = '';
  let orden = 'destacados';

  const catBtns = [`<button data-cat="todas" class="cat-btn px-5 py-2 rounded-full font-bold transition border-2">🍽️ Todas</button>`]
    .concat(CATEGORIAS.map(c => `<button data-cat="${c.id}" class="cat-btn px-5 py-2 rounded-full font-bold transition border-2">${c.icono} ${c.nombre}</button>`))
    .join('');
  contFiltros.innerHTML = catBtns;

  const actualizarVista = () => {
    let lista = [...PRODUCTOS];
    if (categoriaActiva !== 'todas') {
      lista = lista.filter(p => p.categoria === categoriaActiva);
    }
    if (textoBuscar.trim()) {
      const q = textoBuscar.toLowerCase();
      lista = lista.filter(p => p.nombre.toLowerCase().includes(q) || p.descripcion.toLowerCase().includes(q));
    }
    if (orden === 'precio-asc') lista.sort((a, b) => a.precio - b.precio);
    else if (orden === 'precio-desc') lista.sort((a, b) => b.precio - a.precio);
    else if (orden === 'nombre') lista.sort((a, b) => a.nombre.localeCompare(b.nombre));
    else lista.sort((a, b) => (b.destacado - a.destacado));

    document.querySelectorAll('.cat-btn').forEach(b => {
      if (b.dataset.cat === categoriaActiva) {
        b.classList.add('bg-red-600', 'text-white', 'border-red-600');
        b.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
      } else {
        b.classList.remove('bg-red-600', 'text-white', 'border-red-600');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200', 'hover:border-red-500');
      }
    });

    if (lista.length === 0) {
      contGrid.innerHTML = `
        <div class="col-span-full text-center py-16">
          <div class="text-6xl mb-4">🔍</div>
          <p class="text-xl text-gray-600">No encontramos productos con esos criterios.</p>
        </div>
      `;
    } else {
      contGrid.innerHTML = lista.map(renderCardProducto).join('');
    }
    const contador = document.getElementById('contador-productos');
    if (contador) contador.textContent = lista.length;
  };

  contFiltros.addEventListener('click', e => {
    if (e.target.classList.contains('cat-btn')) {
      categoriaActiva = e.target.dataset.cat;
      actualizarVista();
    }
  });
  inputBuscar.addEventListener('input', e => {
    textoBuscar = e.target.value;
    actualizarVista();
  });
  selectOrden.addEventListener('change', e => {
    orden = e.target.value;
    actualizarVista();
  });

  actualizarVista();
}

function initProducto() {
  const id = obtenerQueryParam('id');
  const producto = obtenerProducto(id);
  const cont = document.getElementById('producto-detalle');
  if (!producto) {
    cont.innerHTML = '<p class="text-center text-xl py-16">Producto no encontrado.</p>';
    return;
  }
  document.title = `${producto.nombre} - El Sabor Explosivo`;

  const rating = promedioRating(producto.id);
  const numResenas = contarResenas(producto.id);
  const sesion = usuarioActual();
  const categoria = obtenerCategoria(producto.categoria);

  cont.innerHTML = `
    <nav class="text-sm mb-6">
      <a href="index.html" class="text-gray-500 hover:text-red-600">Inicio</a>
      <span class="mx-2 text-gray-400">/</span>
      <a href="productos.html" class="text-gray-500 hover:text-red-600">Productos</a>
      <span class="mx-2 text-gray-400">/</span>
      <a href="productos.html?cat=${producto.categoria}" class="text-gray-500 hover:text-red-600">${categoria.nombre}</a>
    </nav>

    <div class="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-xl overflow-hidden">
      <div class="relative bg-gradient-to-br from-amber-50 to-yellow-50 p-8 flex items-center justify-center">
        <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full max-w-md rounded-2xl shadow-lg object-cover aspect-square">
        ${producto.destacado ? '<span class="absolute top-6 left-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold shadow-lg">⭐ DESTACADO</span>' : ''}
      </div>

      <div class="p-8 md:p-10">
        <p class="text-sm text-red-600 font-bold tracking-wider mb-2">${categoria.icono} ${categoria.nombre.toUpperCase()}</p>
        <h1 class="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">${producto.nombre}</h1>

        <div class="flex items-center gap-3 mb-6">
          ${renderEstrellas(rating, 'md')}
          <span class="text-gray-600 font-bold">${rating}</span>
          <span class="text-gray-400">(${numResenas} reseñas)</span>
        </div>

        <p class="text-gray-600 leading-relaxed mb-6">${producto.descripcion}</p>

        <div class="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
          <p class="text-sm font-bold text-gray-900 mb-1">🥩 Ingredientes:</p>
          <p class="text-sm text-gray-700">${producto.ingredientes}</p>
        </div>

        <div class="flex items-center gap-6 mb-6">
          <span class="text-4xl font-bold text-red-600">${formatearPrecio(producto.precio)}</span>
          <span class="text-sm ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'} font-bold">
            ${producto.stock > 0 ? `✓ ${producto.stock} disponibles` : '✕ Agotado'}
          </span>
        </div>

        <div class="flex items-center gap-4 mb-6">
          <span class="font-bold text-gray-700">Cantidad:</span>
          <div class="flex items-center bg-gray-100 rounded-full">
            <button id="qty-minus" class="w-10 h-10 rounded-full hover:bg-red-600 hover:text-white font-bold transition">−</button>
            <input id="qty-input" type="number" value="1" min="1" max="${producto.stock}" class="w-16 text-center bg-transparent font-bold focus:outline-none">
            <button id="qty-plus" class="w-10 h-10 rounded-full hover:bg-red-600 hover:text-white font-bold transition">+</button>
          </div>
        </div>

        <button id="btn-add-cart" class="btn-primary w-full text-lg py-4 mb-3">
          🛒 Agregar al carrito
        </button>

        ${sesion ? `
          <a href="resena.html?producto=${producto.id}" class="block text-center bg-yellow-400 text-gray-900 hover:bg-yellow-500 font-bold py-3 rounded-xl transition">
            ⭐ Dejar una reseña
          </a>
        ` : `
          <p class="text-center text-sm text-gray-500">
            <a href="login.html" class="text-red-600 font-bold hover:underline">Inicia sesión</a> para dejar una reseña
          </p>
        `}
      </div>
    </div>

    <section class="mt-16">
      <h2 class="text-2xl md:text-3xl font-display font-bold mb-6">⭐ Reseñas de clientes</h2>
      <div id="lista-resenas"></div>
    </section>
  `;

  const qtyInput = document.getElementById('qty-input');
  document.getElementById('qty-minus').addEventListener('click', () => {
    const v = parseInt(qtyInput.value) || 1;
    if (v > 1) qtyInput.value = v - 1;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    const v = parseInt(qtyInput.value) || 1;
    if (v < producto.stock) qtyInput.value = v + 1;
  });
  document.getElementById('btn-add-cart').addEventListener('click', () => {
    const cant = parseInt(qtyInput.value) || 1;
    agregarAlCarrito(producto.id, cant);
    mostrarToast(`✓ ${producto.nombre} agregado al carrito`, 'success');
  });

  const resenas = obtenerResenasProducto(producto.id);
  const listaResenas = document.getElementById('lista-resenas');
  if (resenas.length === 0) {
    listaResenas.innerHTML = '<p class="text-gray-500 italic">Aún no hay reseñas para este producto. ¡Sé el primero!</p>';
  } else {
    listaResenas.innerHTML = `
      <div class="space-y-4">
        ${resenas.map(r => `
          <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400">
            <div class="flex justify-between items-start mb-2">
              <div>
                <p class="font-bold text-gray-900">${r.usuario}</p>
                <p class="text-xs text-gray-500">${formatearFecha(r.fecha)}</p>
              </div>
              <div>${renderEstrellas(r.rating, 'sm')}</div>
            </div>
            <p class="text-gray-700">${r.comentario}</p>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function initContacto() {
  const form = document.getElementById('contacto-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    if (!fd.get('nombre') || !fd.get('email') || !fd.get('mensaje')) {
      mostrarToast('Completa todos los campos requeridos', 'error');
      return;
    }
    mostrarToast('✓ Mensaje enviado. Te responderemos pronto.', 'success');
    form.reset();
  });
}

function initCarrito() {
  const cont = document.getElementById('carrito-contenido');
  if (!cont) return;
  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    cont.innerHTML = `
      <div class="text-center py-16">
        <div class="text-7xl mb-4">🛒</div>
        <h2 class="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
        <p class="text-gray-600 mb-8">¡Anímate a probar nuestras hamburguesas!</p>
        <a href="productos.html" class="btn-primary inline-block">Ver productos</a>
      </div>
    `;
    return;
  }

  const itemsHTML = carrito.map(item => `
    <div class="flex gap-4 items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
      <img src="${item.imagen}" alt="${item.nombre}" class="w-24 h-24 object-cover rounded-lg">
      <div class="flex-1">
        <h3 class="font-bold text-gray-900">${item.nombre}</h3>
        <p class="text-red-600 font-bold">${formatearPrecio(item.precio)}</p>
      </div>
      <div class="flex items-center bg-gray-100 rounded-full">
        <button class="qty-c w-8 h-8 rounded-full hover:bg-red-600 hover:text-white font-bold transition" data-id="${item.id}" data-act="-" >−</button>
        <span class="w-10 text-center font-bold">${item.cantidad}</span>
        <button class="qty-c w-8 h-8 rounded-full hover:bg-red-600 hover:text-white font-bold transition" data-id="${item.id}" data-act="+">+</button>
      </div>
      <div class="text-right">
        <p class="font-bold text-gray-900">${formatearPrecio(item.precio * item.cantidad)}</p>
        <button class="text-red-600 hover:text-red-800 text-sm mt-1" data-del="${item.id}">🗑️ Eliminar</button>
      </div>
    </div>
  `).join('');

  const subtotal = calcularSubtotal();

  cont.innerHTML = `
    <h1 class="text-3xl md:text-4xl font-display font-bold mb-8">🛒 Tu Carrito</h1>
    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-4">
        ${itemsHTML}
        <button id="btn-vaciar" class="text-red-600 hover:text-red-800 font-bold text-sm">🗑️ Vaciar carrito</button>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-red-600 h-fit sticky top-32">
        <h2 class="text-xl font-bold mb-4">Resumen</h2>
        <div class="space-y-2 mb-4 text-sm">
          <div class="flex justify-between"><span>Subtotal</span><span class="font-bold">${formatearPrecio(subtotal)}</span></div>
          <div class="flex justify-between text-gray-500"><span>Envío</span><span>Calculado en checkout</span></div>
        </div>
        <div class="border-t pt-3 mb-6">
          <div class="flex justify-between text-lg font-bold"><span>Total estimado</span><span class="text-red-600">${formatearPrecio(subtotal)}</span></div>
        </div>
        <a href="checkout.html" class="btn-primary w-full block text-center mb-3">Proceder al pago →</a>
        <a href="productos.html" class="block text-center text-gray-600 hover:text-red-600 text-sm">← Seguir comprando</a>
      </div>
    </div>
  `;

  cont.querySelectorAll('[data-act]').forEach(b => {
    b.addEventListener('click', () => {
      const item = obtenerCarrito().find(i => i.id === b.dataset.id);
      if (!item) return;
      const nueva = b.dataset.act === '+' ? item.cantidad + 1 : item.cantidad - 1;
      cambiarCantidadCarrito(item.id, nueva);
      initCarrito();
    });
  });
  cont.querySelectorAll('[data-del]').forEach(b => {
    b.addEventListener('click', () => {
      if (confirmarAccion('¿Eliminar este producto del carrito?')) {
        eliminarDelCarrito(b.dataset.del);
        initCarrito();
      }
    });
  });
  const btnVaciar = document.getElementById('btn-vaciar');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', () => {
      if (confirmarAccion('¿Vaciar todo el carrito?')) {
        vaciarCarrito();
        initCarrito();
      }
    });
  }
}

function initCheckout() {
  if (!requiereAutenticacion('checkout.html')) return;
  const cont = document.getElementById('checkout-contenido');
  const carrito = obtenerCarrito();
  const usuario = obtenerUsuarioCompleto();

  if (carrito.length === 0) {
    cont.innerHTML = `
      <div class="text-center py-16">
        <div class="text-7xl mb-4">🛒</div>
        <h2 class="text-3xl font-bold mb-4">No hay productos en tu carrito</h2>
        <a href="productos.html" class="btn-primary inline-block">Ver productos</a>
      </div>
    `;
    return;
  }

  const subtotal = calcularSubtotal();

  cont.innerHTML = `
    <h1 class="text-3xl md:text-4xl font-display font-bold mb-8">💳 Finalizar pedido</h1>
    <form id="checkout-form" class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <section class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">📍 Dirección de entrega</h2>
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label>Nombre completo *</label>
              <input name="nombre" required value="${usuario?.nombre || ''}">
            </div>
            <div class="form-group">
              <label>Teléfono *</label>
              <input name="telefono" required value="${usuario?.telefono || ''}">
            </div>
            <div class="form-group sm:col-span-2">
              <label>Dirección / Calle *</label>
              <input name="calle" required value="${usuario?.direccion || ''}">
            </div>
            <div class="form-group">
              <label>Ciudad *</label>
              <input name="ciudad" required value="Ciudad">
            </div>
            <div class="form-group">
              <label>Código Postal</label>
              <input name="codigoPostal" value="7500000">
            </div>
            <div class="form-group sm:col-span-2">
              <label>Referencia</label>
              <input name="referencia" placeholder="Ej: Casa de 2 pisos, portón negro">
            </div>
          </div>
        </section>

        <section class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">🚚 Tipo de envío</h2>
          <div class="space-y-3">
            <label class="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="tipoEnvio" value="retiro" class="mt-1">
              <div class="flex-1">
                <p class="font-bold">Retiro en local</p>
                <p class="text-sm text-gray-600">Recoge tu pedido en nuestro local (gratis)</p>
              </div>
              <span class="font-bold text-green-600">GRATIS</span>
            </label>
            <label class="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="tipoEnvio" value="estandar" checked class="mt-1">
              <div class="flex-1">
                <p class="font-bold">Estándar (45-60 min)</p>
                <p class="text-sm text-gray-600">Delivery normal a tu domicilio</p>
              </div>
              <span class="font-bold text-gray-700">$5.000</span>
            </label>
            <label class="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="tipoEnvio" value="express" class="mt-1">
              <div class="flex-1">
                <p class="font-bold">Express (20-30 min)</p>
                <p class="text-sm text-gray-600">Delivery prioritario, llega más rápido</p>
              </div>
              <span class="font-bold text-red-600">$10.000</span>
            </label>
          </div>
        </section>

        <section class="bg-white p-6 rounded-2xl shadow-md">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">💰 Medio de pago</h2>
          <div class="space-y-3">
            <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="metodoPago" value="Efectivo contra entrega" checked>
              <span class="text-2xl">💵</span>
              <span class="font-bold flex-1">Efectivo contra entrega</span>
            </label>
            <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="metodoPago" value="Tarjeta de Crédito/Débito">
              <span class="text-2xl">💳</span>
              <span class="font-bold flex-1">Tarjeta de Crédito/Débito</span>
            </label>
            <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="metodoPago" value="Yape / Plin">
              <span class="text-2xl">📱</span>
              <span class="font-bold flex-1">Yape / Plin</span>
            </label>
            <label class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 has-[:checked]:border-red-600 has-[:checked]:bg-red-50 transition">
              <input type="radio" name="metodoPago" value="Transferencia Bancaria">
              <span class="text-2xl">🏦</span>
              <span class="font-bold flex-1">Transferencia Bancaria</span>
            </label>
          </div>
        </section>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xl border-t-4 border-red-600 h-fit sticky top-32">
        <h2 class="text-xl font-bold mb-4">Tu pedido</h2>
        <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
          ${carrito.map(item => `
            <div class="flex gap-3 text-sm">
              <img src="${item.imagen}" class="w-12 h-12 rounded-lg object-cover">
              <div class="flex-1">
                <p class="font-bold">${item.nombre}</p>
                <p class="text-gray-500">${item.cantidad} × ${formatearPrecio(item.precio)}</p>
              </div>
              <span class="font-bold">${formatearPrecio(item.precio * item.cantidad)}</span>
            </div>
          `).join('')}
        </div>
        <div class="border-t pt-3 space-y-2 text-sm">
          <div class="flex justify-between"><span>Subtotal</span><span id="ck-subtotal" class="font-bold">${formatearPrecio(subtotal)}</span></div>
          <div class="flex justify-between"><span>Envío</span><span id="ck-envio" class="font-bold">$5.000</span></div>
        </div>
        <div class="border-t pt-3 mt-3">
          <div class="flex justify-between text-lg font-bold"><span>Total</span><span id="ck-total" class="text-red-600">${formatearPrecio(subtotal + 5000)}</span></div>
        </div>
        <button type="submit" class="btn-primary w-full mt-6 py-4 text-lg">✓ Confirmar pedido</button>
        <a href="carrito.html" class="block text-center text-gray-600 hover:text-red-600 text-sm mt-3">← Volver al carrito</a>
      </div>
    </form>
  `;

  const form = document.getElementById('checkout-form');
  const ckEnvio = document.getElementById('ck-envio');
  const ckTotal = document.getElementById('ck-total');
  form.querySelectorAll('input[name="tipoEnvio"]').forEach(r => {
    r.addEventListener('change', () => {
      const envio = parseFloat(calcularEnvio(r.value));
      ckEnvio.textContent = formatearPrecio(envio);
      ckTotal.textContent = formatearPrecio(subtotal + envio);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    if (!fd.get('nombre') || !fd.get('telefono') || !fd.get('calle') || !fd.get('ciudad')) {
      mostrarToast('Completa todos los campos requeridos', 'error');
      return;
    }
    const tipoEnvioVal = fd.get('tipoEnvio');
    const enviosLabel = { 'retiro': 'Retiro en local', 'estandar': 'Estándar (45-60 min)', 'express': 'Express (20-30 min)' };
    const nuevoPedido = {
      id: generarIdPedido(),
      usuarioEmail: usuario.email,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Procesando',
      productos: carrito.map(item => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
        imagen: item.imagen
      })),
      subtotal: subtotal,
      envio: calcularEnvio(tipoEnvioVal),
      total: subtotal + calcularEnvio(tipoEnvioVal),
      tipoEnvio: enviosLabel[tipoEnvioVal],
      direccion: {
        nombre: fd.get('nombre'),
        telefono: fd.get('telefono'),
        calle: fd.get('calle'),
        ciudad: fd.get('ciudad'),
        codigoPostal: fd.get('codigoPostal') || ''
      },
      metodoPago: fd.get('metodoPago')
    };
    const pedidos = obtenerPedidos();
    pedidos.push(nuevoPedido);
    guardarPedidos(pedidos);
    vaciarCarrito();
    window.location.href = 'confirmacion.html?orden=' + nuevoPedido.id;
  });
}

function initConfirmacion() {
  const id = obtenerQueryParam('orden');
  const cont = document.getElementById('confirmacion-contenido');
  const pedido = obtenerPedidos().find(p => p.id === id);

  if (!pedido) {
    cont.innerHTML = '<p class="text-center text-xl py-16">No se encontró el pedido.</p>';
    return;
  }

  cont.innerHTML = `
    <div class="text-center mb-10 print-hide">
      <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
        <svg class="w-14 h-14 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
        </svg>
      </div>
      <h1 class="text-3xl md:text-4xl font-display font-bold mb-2">¡Pedido confirmado!</h1>
      <p class="text-gray-600 text-lg">Tu pedido fue realizado con éxito</p>
      <p class="text-sm text-gray-500 mt-2">Número de orden: <span class="font-mono font-bold text-red-600">${pedido.id}</span></p>
    </div>

    <div id="comprobante" class="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto">
      <div class="flex justify-between items-start border-b pb-6 mb-6">
        <div>
          <h2 class="font-display text-2xl font-bold">🍔 El Sabor Explosivo</h2>
          <p class="text-sm text-gray-500">Av. Principal 123, Santiago, Chile</p>
          <p class="text-sm text-gray-500">Tel: +56 2 2345 6789</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-500">COMPROBANTE</p>
          <p class="font-mono font-bold">${pedido.id}</p>
          <p class="text-sm text-gray-600">${formatearFecha(pedido.fecha)}</p>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-6 mb-6 text-sm">
        <div>
          <p class="text-xs text-gray-500 mb-1">CLIENTE</p>
          <p class="font-bold">${pedido.direccion.nombre}</p>
          <p>${pedido.direccion.telefono}</p>
          <p>${pedido.direccion.calle}, ${pedido.direccion.ciudad}</p>
          ${pedido.direccion.codigoPostal ? `<p>CP: ${pedido.direccion.codigoPostal}</p>` : ''}
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">ENVÍO Y PAGO</p>
          <p class="font-bold">${pedido.tipoEnvio}</p>
          <p>${pedido.metodoPago}</p>
          <p class="mt-1">Estado: ${renderBadgeEstado(pedido.estado)}</p>
        </div>
      </div>

      <table class="w-full text-sm mb-6">
        <thead class="border-b-2 border-gray-200">
          <tr class="text-left">
            <th class="py-2">Producto</th>
            <th class="py-2 text-center">Cant.</th>
            <th class="py-2 text-right">Precio</th>
            <th class="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${pedido.productos.map(p => `
            <tr class="border-b">
              <td class="py-3 font-semibold">${p.nombre}</td>
              <td class="py-3 text-center">${p.cantidad}</td>
              <td class="py-3 text-right">${formatearPrecio(p.precio)}</td>
              <td class="py-3 text-right font-bold">${formatearPrecio(p.precio * p.cantidad)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="border-t pt-4 max-w-xs ml-auto text-sm space-y-1">
        <div class="flex justify-between"><span>Subtotal</span><span>${formatearPrecio(pedido.subtotal)}</span></div>
        <div class="flex justify-between"><span>Envío</span><span>${formatearPrecio(pedido.envio)}</span></div>
        <div class="flex justify-between text-lg font-bold pt-2 border-t mt-2"><span>TOTAL</span><span class="text-red-600">${formatearPrecio(pedido.total)}</span></div>
      </div>

      <div class="text-center text-xs text-gray-500 mt-8 pt-6 border-t">
        ¡Gracias por tu compra! Te notificaremos cuando tu pedido esté en camino.
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10 print-hide">
      <button id="btn-print" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
        Imprimir comprobante
      </button>
      <a href="perfil.html" class="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition flex items-center justify-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
        Ver historial de pedidos
      </a>
    </div>
  `;

  document.getElementById('btn-print').addEventListener('click', () => window.print());
}

function initPerfil() {
  if (!requiereAutenticacion('perfil.html')) return;
  const cont = document.getElementById('perfil-contenido');
  const usuario = obtenerUsuarioCompleto();
  const pedidos = obtenerPedidos().filter(p => p.usuarioEmail === usuario.email).reverse();

  cont.innerHTML = `
    <h1 class="text-3xl md:text-4xl font-display font-bold mb-8">👤 Mi Perfil</h1>

    <div class="grid lg:grid-cols-3 gap-8">
      <div class="lg:col-span-1">
        <div class="bg-white rounded-2xl shadow-xl p-6 text-center border-t-4 border-red-600">
          <div class="w-24 h-24 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
            ${usuario.nombre.charAt(0).toUpperCase()}
          </div>
          <h2 class="text-xl font-bold mb-1">${usuario.nombre}</h2>
          <p class="text-gray-500 text-sm mb-4">${usuario.email}</p>
          <p class="text-xs text-gray-500 mb-6">Miembro desde ${formatearFecha(usuario.fechaRegistro)}</p>

          <div class="grid grid-cols-2 gap-2 mb-4">
            <div class="bg-red-50 p-3 rounded-lg">
              <p class="text-2xl font-bold text-red-600">${pedidos.length}</p>
              <p class="text-xs text-gray-600">Pedidos</p>
            </div>
            <div class="bg-yellow-50 p-3 rounded-lg">
              <p class="text-2xl font-bold text-yellow-600">$${pedidos.reduce((a, p) => a + p.total, 0).toLocaleString('es-CL')}</p>
              <p class="text-xs text-gray-600">Gastado</p>
            </div>
          </div>

          <button id="btn-logout" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 rounded-lg transition">Cerrar sesión</button>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-6 mt-6">
          <h3 class="font-bold mb-4">Editar datos</h3>
          <form id="perfil-form" class="space-y-3">
            <div class="form-group">
              <label class="text-xs">Nombre</label>
              <input name="nombre" value="${usuario.nombre}" required>
            </div>
            <div class="form-group">
              <label class="text-xs">Teléfono</label>
              <input name="telefono" value="${usuario.telefono || ''}">
            </div>
            <div class="form-group">
              <label class="text-xs">Dirección</label>
              <input name="direccion" value="${usuario.direccion || ''}">
            </div>
            <button type="submit" class="btn-primary w-full text-sm py-2">Guardar cambios</button>
          </form>
        </div>
      </div>

      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-xl p-6">
          <h3 class="text-2xl font-bold mb-6 flex items-center gap-2">📋 Historial de pedidos</h3>
          ${pedidos.length === 0 ? `
            <div class="text-center py-12">
              <div class="text-6xl mb-3">📦</div>
              <p class="text-gray-500 mb-4">Aún no has realizado pedidos.</p>
              <a href="productos.html" class="btn-primary inline-block">Explorar productos</a>
            </div>
          ` : `
            <div class="space-y-4">
              ${pedidos.map(p => `
                <a href="pedido.html?id=${p.id}" class="block border-2 border-gray-100 hover:border-red-500 rounded-xl p-4 transition">
                  <div class="flex justify-between items-start mb-2">
                    <div>
                      <p class="font-mono font-bold text-red-600">${p.id}</p>
                      <p class="text-sm text-gray-500">${formatearFecha(p.fecha)} · ${p.productos.length} ${p.productos.length === 1 ? 'producto' : 'productos'}</p>
                    </div>
                    ${renderBadgeEstado(p.estado)}
                  </div>
                  <div class="flex justify-between items-center mt-3 pt-3 border-t">
                    <p class="text-sm text-gray-600">${p.productos[0].nombre}${p.productos.length > 1 ? ` y ${p.productos.length - 1} más` : ''}</p>
                    <p class="font-bold text-lg">${formatearPrecio(p.total)}</p>
                  </div>
                </a>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-logout').addEventListener('click', () => {
    if (confirmarAccion('¿Cerrar sesión?')) {
      logout();
      window.location.href = 'index.html';
    }
  });

  document.getElementById('perfil-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const r = actualizarPerfil({
      nombre: fd.get('nombre'),
      telefono: fd.get('telefono'),
      direccion: fd.get('direccion')
    });
    if (r.ok) {
      mostrarToast('✓ Perfil actualizado', 'success');
      initPerfil();
    } else {
      mostrarToast(r.mensaje, 'error');
    }
  });
}

function initPedido() {
  if (!requiereAutenticacion('perfil.html')) return;
  const id = obtenerQueryParam('id');
  const cont = document.getElementById('pedido-contenido');
  const usuario = obtenerUsuarioCompleto();
  const pedido = obtenerPedidos().find(p => p.id === id && p.usuarioEmail === usuario.email);

  if (!pedido) {
    cont.innerHTML = '<p class="text-center text-xl py-16">Pedido no encontrado.</p>';
    return;
  }

  cont.innerHTML = `
    <nav class="text-sm mb-6 print-hide">
      <a href="perfil.html" class="text-gray-500 hover:text-red-600">Mi Perfil</a>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-700">Detalle del pedido</span>
    </nav>

    <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div class="flex flex-wrap justify-between items-start gap-4 pb-6 border-b mb-6">
        <div>
          <p class="text-xs text-gray-500">PEDIDO</p>
          <p class="font-mono font-bold text-2xl text-red-600">${pedido.id}</p>
          <p class="text-sm text-gray-600 mt-1">${formatearFecha(pedido.fecha)}</p>
        </div>
        <div class="text-right">
          ${renderBadgeEstado(pedido.estado)}
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <p class="text-xs text-gray-500 mb-2 font-bold tracking-wider">📍 DIRECCIÓN DE ENTREGA</p>
          <p class="font-bold">${pedido.direccion.nombre}</p>
          <p class="text-sm text-gray-700">${pedido.direccion.telefono}</p>
          <p class="text-sm text-gray-700">${pedido.direccion.calle}</p>
          <p class="text-sm text-gray-700">${pedido.direccion.ciudad}${pedido.direccion.codigoPostal ? `, CP ${pedido.direccion.codigoPostal}` : ''}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-2 font-bold tracking-wider">🚚 ENVÍO Y PAGO</p>
          <p class="font-bold">${pedido.tipoEnvio}</p>
          <p class="text-sm text-gray-700">${pedido.metodoPago}</p>
        </div>
      </div>

      <h3 class="font-bold mb-3">Productos</h3>
      <div class="space-y-3 mb-6">
        ${pedido.productos.map(p => `
          <div class="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <img src="${p.imagen}" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1">
              <p class="font-bold">${p.nombre}</p>
              <p class="text-sm text-gray-500">${p.cantidad} × ${formatearPrecio(p.precio)}</p>
            </div>
            <span class="font-bold">${formatearPrecio(p.precio * p.cantidad)}</span>
          </div>
        `).join('')}
      </div>

      ${pedido.estado === 'Entregado' ? `
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p class="font-bold text-gray-900 mb-2">⭐ ¿Cómo estuvo tu pedido?</p>
          <p class="text-sm text-gray-600 mb-3">Deja una reseña de los productos que probaste.</p>
          <div class="flex flex-wrap gap-2">
            ${pedido.productos.map(p => `
              <a href="resena.html?producto=${p.id}&pedido=${pedido.id}" class="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-bold py-2 px-4 rounded-lg transition">
                Reseñar ${p.nombre}
              </a>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="border-t pt-4 max-w-xs ml-auto space-y-1 text-sm">
        <div class="flex justify-between"><span>Subtotal</span><span>${formatearPrecio(pedido.subtotal)}</span></div>
        <div class="flex justify-between"><span>Envío</span><span>${formatearPrecio(pedido.envio)}</span></div>
        <div class="flex justify-between text-lg font-bold pt-2 border-t mt-2"><span>TOTAL</span><span class="text-red-600">${formatearPrecio(pedido.total)}</span></div>
      </div>

      <div class="flex gap-3 mt-8 print-hide">
        <a href="perfil.html" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition">← Volver al perfil</a>
      </div>
    </div>
  `;
}

function initResena() {
  if (!requiereAutenticacion('productos.html')) return;
  const id = obtenerQueryParam('producto');
  const cont = document.getElementById('resena-contenido');
  const producto = obtenerProducto(id);
  const usuario = obtenerUsuarioCompleto();

  if (!producto) {
    cont.innerHTML = '<p class="text-center text-xl py-16">Producto no encontrado.</p>';
    return;
  }

  cont.innerHTML = `
    <nav class="text-sm mb-6">
      <a href="productos.html" class="text-gray-500 hover:text-red-600">Productos</a>
      <span class="mx-2 text-gray-400">/</span>
      <a href="producto.html?id=${producto.id}" class="text-gray-500 hover:text-red-600">${producto.nombre}</a>
      <span class="mx-2 text-gray-400">/</span>
      <span class="text-gray-700">Escribir reseña</span>
    </nav>

    <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="bg-gradient-to-r from-red-600 to-yellow-500 p-6 text-white text-center">
        <img src="${producto.imagen}" class="w-24 h-24 object-cover rounded-full mx-auto mb-3 border-4 border-white shadow-lg">
        <h2 class="font-display text-2xl font-bold">${producto.nombre}</h2>
        <p class="text-white/90 text-sm">${formatearPrecio(producto.precio)}</p>
      </div>

      <form id="resena-form" class="p-6 md:p-8 space-y-6">
        <div>
          <label class="block font-bold mb-3 text-center">¿Cómo calificarías este producto?</label>
          <div id="rating-stars" class="flex justify-center gap-2 text-5xl cursor-pointer select-none">
            ${[1,2,3,4,5].map(i => `<button type="button" class="star-btn text-gray-300 hover:text-yellow-400 transition" data-value="${i}">★</button>`).join('')}
          </div>
          <p id="rating-label" class="text-center text-gray-500 mt-2 text-sm">Selecciona una calificación</p>
          <input type="hidden" name="rating" id="rating-input" value="0" required>
        </div>

        <div class="form-group">
          <label>Tu reseña</label>
          <textarea name="comentario" rows="5" required placeholder="Cuéntanos qué te pareció el producto..."></textarea>
        </div>

        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-gray-700">
          <p class="font-bold mb-1">📝 Reseñando como:</p>
          <p>${usuario.nombre} · ${usuario.email}</p>
        </div>

        <div class="flex gap-3">
          <a href="producto.html?id=${producto.id}" class="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl transition flex-1 text-center">Cancelar</a>
          <button type="submit" class="btn-primary flex-1 py-3">Publicar reseña</button>
        </div>
      </form>
    </div>
  `;

  let ratingActual = 0;
  const labels = ['', 'Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'];
  const stars = cont.querySelectorAll('.star-btn');
  const label = document.getElementById('rating-label');
  const input = document.getElementById('rating-input');

  const pintar = (n) => {
    stars.forEach((s, i) => {
      s.classList.toggle('text-yellow-400', i < n);
      s.classList.toggle('text-gray-300', i >= n);
    });
  };

  stars.forEach((s, i) => {
    s.addEventListener('mouseenter', () => pintar(i + 1));
    s.addEventListener('mouseleave', () => pintar(ratingActual));
    s.addEventListener('click', () => {
      ratingActual = i + 1;
      input.value = ratingActual;
      label.textContent = `${ratingActual}/5 - ${labels[ratingActual]}`;
    });
  });

  document.getElementById('resena-form').addEventListener('submit', e => {
    e.preventDefault();
    if (parseInt(input.value) === 0) {
      mostrarToast('Selecciona una calificación con estrellas', 'error');
      return;
    }
    const fd = new FormData(e.target);
    const nuevaResena = {
      id: 'r' + Date.now(),
      productoId: producto.id,
      usuario: usuario.nombre,
      rating: parseInt(input.value),
      comentario: fd.get('comentario'),
      fecha: new Date().toISOString().split('T')[0]
    };
    const resenas = obtenerResenas();
    resenas.push(nuevaResena);
    guardarResenas(resenas);
    mostrarToast('✓ Reseña publicada. ¡Gracias!', 'success');
    setTimeout(() => window.location.href = 'producto.html?id=' + producto.id, 1500);
  });
}

function initRegistro() {
  if (estaAutenticado()) {
    window.location.href = 'perfil.html';
    return;
  }
  const form = document.getElementById('registro-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const datos = {
      nombre: fd.get('nombre'),
      email: fd.get('email'),
      telefono: fd.get('telefono'),
      password: fd.get('password'),
      direccion: fd.get('direccion')
    };
    const pass2 = fd.get('password2');
    if (!datos.nombre || !datos.email || !datos.password) {
      mostrarToast('Completa todos los campos requeridos', 'error');
      return;
    }
    if (datos.password.length < 6) {
      mostrarToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }
    if (datos.password !== pass2) {
      mostrarToast('Las contraseñas no coinciden', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
      mostrarToast('Email inválido', 'error');
      return;
    }
    const r = registrarUsuario(datos);
    if (r.ok) {
      mostrarToast('✓ Cuenta creada. Bienvenido!', 'success');
      setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
      mostrarToast(r.mensaje, 'error');
    }
  });
}

function initLogin() {
  if (estaAutenticado()) {
    window.location.href = 'perfil.html';
    return;
  }
  const form = document.getElementById('login-form');
  const redirect = obtenerQueryParam('redirect');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const r = login(fd.get('email'), fd.get('password'));
    if (r.ok) {
      mostrarToast('✓ Bienvenido ' + r.usuario.nombre, 'success');
      setTimeout(() => {
        window.location.href = redirect ? decodeURIComponent(redirect) : 'index.html';
      }, 800);
    } else {
      mostrarToast(r.mensaje, 'error');
    }
  });
}

function initRecuperar() {
  const form = document.getElementById('recuperar-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = fd.get('email');
    if (!email) {
      mostrarToast('Ingresa tu email', 'error');
      return;
    }
    const r = recuperarPassword(email);
    if (r.ok) {
      mostrarToast('✓ ' + r.mensaje, 'success');
      form.reset();
    } else {
      mostrarToast(r.mensaje, 'error');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  inicializarPagina();
});

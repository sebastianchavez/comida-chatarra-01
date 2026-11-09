function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito') || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function agregarAlCarrito(productoId, cantidad = 1) {
  const producto = obtenerProducto(productoId);
  if (!producto) return false;
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => item.id === productoId);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: cantidad
    });
  }
  guardarCarrito(carrito);
  actualizarBadgeCarrito();
  return true;
}

function cambiarCantidadCarrito(productoId, cantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.id === productoId);
  if (!item) return;
  if (cantidad <= 0) {
    eliminarDelCarrito(productoId);
    return;
  }
  item.cantidad = cantidad;
  guardarCarrito(carrito);
  actualizarBadgeCarrito();
}

function eliminarDelCarrito(productoId) {
  let carrito = obtenerCarrito();
  carrito = carrito.filter(i => i.id !== productoId);
  guardarCarrito(carrito);
  actualizarBadgeCarrito();
}

function vaciarCarrito() {
  guardarCarrito([]);
  actualizarBadgeCarrito();
}

function obtenerCantidadItems() {
  const carrito = obtenerCarrito();
  return carrito.reduce((acc, item) => acc + item.cantidad, 0);
}

function calcularSubtotal() {
  const carrito = obtenerCarrito();
  return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function calcularEnvio(tipoEnvio) {
  const map = {
    'retiro': 0,
    'estandar': 5000,
    'express': 10000
  };
  return map[tipoEnvio] !== undefined ? map[tipoEnvio] : 5;
}

function calcularTotal(tipoEnvio) {
  return calcularSubtotal() + calcularEnvio(tipoEnvio);
}

function actualizarBadgeCarrito() {
  const badges = document.querySelectorAll('[data-cart-badge]');
  const cantidad = obtenerCantidadItems();
  badges.forEach(badge => {
    if (cantidad > 0) {
      badge.textContent = cantidad;
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

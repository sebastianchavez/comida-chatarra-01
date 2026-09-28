const STORAGE_KEYS = {
  USUARIOS: 'usuarios',
  SESION: 'sesionActual',
  CARRITO: 'carrito',
  PEDIDOS: 'pedidos',
  RESENAS: 'resenas'
};

function inicializarStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USUARIOS)) {
    localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(USUARIOS_INICIALES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.PEDIDOS)) {
    localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(PEDIDOS_INICIALES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.RESENAS)) {
    localStorage.setItem(STORAGE_KEYS.RESENAS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CARRITO)) {
    localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify([]));
  }
}

function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS) || '[]');
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));
}

function obtenerSesion() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.SESION) || 'null');
}

function guardarSesion(sesion) {
  localStorage.setItem(STORAGE_KEYS.SESION, JSON.stringify(sesion));
}

function cerrarSesion() {
  localStorage.removeItem(STORAGE_KEYS.SESION);
}

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CARRITO) || '[]');
}

function guardarCarrito(carrito) {
  localStorage.setItem(STORAGE_KEYS.CARRITO, JSON.stringify(carrito));
}

function obtenerPedidos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.PEDIDOS) || '[]');
}

function guardarPedidos(pedidos) {
  localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidos));
}

function obtenerResenas() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESENAS) || '[]');
}

function guardarResenas(resenas) {
  localStorage.setItem(STORAGE_KEYS.RESENAS, JSON.stringify(resenas));
}

function obtenerQueryParam(nombre) {
  const params = new URLSearchParams(window.location.search);
  return params.get(nombre);
}

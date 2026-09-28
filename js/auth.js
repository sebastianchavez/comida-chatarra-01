function login(email, password) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!usuario) {
    return { ok: false, mensaje: 'Email o contraseña incorrectos.' };
  }
  const sesion = {
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email
  };
  guardarSesion(sesion);
  return { ok: true, usuario: sesion };
}

function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();
  const existe = usuarios.find(u => u.email.toLowerCase() === datos.email.toLowerCase());
  if (existe) {
    return { ok: false, mensaje: 'Ya existe una cuenta con ese email.' };
  }
  const nuevoUsuario = {
    id: 'u' + Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    password: datos.password,
    telefono: datos.telefono || '',
    direccion: datos.direccion || '',
    fechaRegistro: new Date().toISOString().split('T')[0]
  };
  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);
  const sesion = {
    id: nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    email: nuevoUsuario.email
  };
  guardarSesion(sesion);
  return { ok: true, usuario: sesion };
}

function usuarioActual() {
  return obtenerSesion();
}

function estaAutenticado() {
  return obtenerSesion() !== null;
}

function logout() {
  cerrarSesion();
}

function actualizarPerfil(datos) {
  const sesion = obtenerSesion();
  if (!sesion) return { ok: false, mensaje: 'No hay sesión activa.' };
  const usuarios = obtenerUsuarios();
  const idx = usuarios.findIndex(u => u.id === sesion.id);
  if (idx === -1) return { ok: false, mensaje: 'Usuario no encontrado.' };
  usuarios[idx] = { ...usuarios[idx], ...datos };
  guardarUsuarios(usuarios);
  guardarSesion({
    id: usuarios[idx].id,
    nombre: usuarios[idx].nombre,
    email: usuarios[idx].email
  });
  return { ok: true, usuario: usuarios[idx] };
}

function obtenerUsuarioCompleto() {
  const sesion = obtenerSesion();
  if (!sesion) return null;
  const usuarios = obtenerUsuarios();
  return usuarios.find(u => u.id === sesion.id) || null;
}

function recuperarPassword(email) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!usuario) {
    return { ok: false, mensaje: 'No encontramos una cuenta con ese email.' };
  }
  return { ok: true, mensaje: 'Te enviamos un enlace de recuperación a tu correo.' };
}

function requiereAutenticacion(redirectUrl) {
  if (!estaAutenticado()) {
    window.location.href = 'login.html?redirect=' + encodeURIComponent(redirectUrl);
    return false;
  }
  return true;
}

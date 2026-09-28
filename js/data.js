const CATEGORIAS = [
  { id: 'hamburguesas', nombre: 'Hamburguesas', icono: '🍔', descripcion: 'Carne 100% res a la parrilla' },
  { id: 'papas', nombre: 'Papas & Acompañamientos', icono: '🍟', descripcion: 'El complemento perfecto' },
  { id: 'hotdogs', nombre: 'Hot Dogs', icono: '🌭', descripcion: 'Salchichas premium en pan artesanal' },
  { id: 'pizzas', nombre: 'Pizzas', icono: '🍕', descripcion: 'Masa artesanal horneada al momento' },
  { id: 'bebidas', nombre: 'Bebidas', icono: '🥤', descripcion: 'Refrescos, malteadas y más' },
  { id: 'combos', nombre: 'Combos & Promos', icono: '🎉', descripcion: 'Ahorra con nuestros combos' },
  { id: 'postres', nombre: 'Postres', icono: '🍦', descripcion: 'El toque dulce final' }
];

const PRODUCTOS = [
  {
    id: 'p001',
    nombre: 'Hamburguesa Clásica',
    categoria: 'hamburguesas',
    precio: 18.00,
    imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    descripcion: 'Nuestra hamburguesa insignia: carne de res 150g a la parrilla, queso cheddar derretido, lechuga fresca, tomate, cebolla y nuestra salsa secreta en pan brioche tostado.',
    ingredientes: 'Carne de res 150g, pan brioche, queso cheddar, lechuga, tomate, cebolla, salsa de la casa',
    destacado: true,
    stock: 35
  },
  {
    id: 'p002',
    nombre: 'Doble Queso BBQ',
    categoria: 'hamburguesas',
    precio: 24.00,
    imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    descripcion: 'Doble carne de res, doble queso cheddar, tocino crujiente, aros de cebolla y abundante salsa BBQ ahumada. Para los más hambrientos.',
    ingredientes: 'Doble carne 300g, doble queso cheddar, tocino, aros de cebolla, salsa BBQ',
    destacado: true,
    stock: 28
  },
  {
    id: 'p003',
    nombre: 'Hamburguesa BBQ Bacon',
    categoria: 'hamburguesas',
    precio: 22.00,
    imagen: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
    descripcion: 'Carne de res a la parrilla, tocino ahumado, queso cheddar, cebolla caramelizada, pickles y nuestra salsa BBQ de la casa.',
    ingredientes: 'Carne 150g, tocino ahumado, queso cheddar, cebolla caramelizada, pickles, salsa BBQ',
    destacado: true,
    stock: 30
  },
  {
    id: 'p004',
    nombre: 'Hamburguesa Veggie',
    categoria: 'hamburguesas',
    precio: 19.00,
    imagen: 'https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?w=600&q=80',
    descripcion: 'Hamburguesa 100% vegetal a base de garbanzos y quinoa, con queso mozzarella, palta, rúcula y alioli de ajo.',
    ingredientes: 'Medallón de garbanzos y quinoa, mozzarella, palta, rúcula, alioli de ajo',
    destacado: false,
    stock: 15
  },
  {
    id: 'p005',
    nombre: 'Papas Fritas Clásicas',
    categoria: 'papas',
    precio: 7.00,
    imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=80',
    descripcion: 'Papas cortadas a mano, fritas en aceite vegetal hasta quedar doradas y crujientes. Servidas con sal marina.',
    ingredientes: 'Papas frescas, aceite vegetal, sal marina',
    destacado: true,
    stock: 60
  },
  {
    id: 'p006',
    nombre: 'Papas con Queso y Tocino',
    categoria: 'papas',
    precio: 12.00,
    imagen: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    descripcion: 'Papas fritas crocantes cubiertas con queso cheddar derretido, trozos de tocino ahumado y cebollín fresco.',
    ingredientes: 'Papas, queso cheddar, tocino, cebollín',
    destacado: true,
    stock: 40
  },
  {
    id: 'p007',
    nombre: 'Aros de Cebolla',
    categoria: 'papas',
    precio: 9.00,
    imagen: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=80',
    descripcion: 'Aros de cebolla empanizados y fritos hasta quedar dorados y crujientes. Acompañados de salsa ranch.',
    ingredientes: 'Cebolla, harina, pan rallado, especias, salsa ranch',
    destacado: false,
    stock: 35
  },
  {
    id: 'p008',
    nombre: 'Hot Dog Especial',
    categoria: 'hotdogs',
    precio: 14.00,
    imagen: 'https://images.unsplash.com/photo-1612392062798-2bb6fcae7c4d?w=600&q=80',
    descripcion: 'Salchicha premium 100% res en pan artesanal, con cebolla caramelizada, mostaza Dijon, ketchup y chucrut.',
    ingredientes: 'Salchicha premium, pan artesanal, cebolla caramelizada, mostaza, ketchup, chucrut',
    destacado: true,
    stock: 25
  },
  {
    id: 'p009',
    nombre: 'Hot Dog Chili Cheese',
    categoria: 'hotdogs',
    precio: 16.00,
    imagen: 'https://images.unsplash.com/photo-1599050751795-6cdaafbc2319?w=600&q=80',
    descripcion: 'Salchicha premium, chili con carne, queso cheddar fundido, cebolla blanca y jalapeños. Explosión de sabor.',
    ingredientes: 'Salchicha premium, chili con carne, queso cheddar, cebolla, jalapeños',
    destacado: false,
    stock: 22
  },
  {
    id: 'p010',
    nombre: 'Pizza Pepperoni',
    categoria: 'pizzas',
    precio: 28.00,
    imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=80',
    descripcion: 'Masa artesanal, salsa de tomate San Marzano, mozzarella y abundante pepperoni ligeramente picante. 8 porciones.',
    ingredientes: 'Masa artesanal, salsa San Marzano, mozzarella, pepperoni',
    destacado: true,
    stock: 18
  },
  {
    id: 'p011',
    nombre: 'Pizza Hawaiana',
    categoria: 'pizzas',
    precio: 26.00,
    imagen: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80',
    descripcion: 'Clásica pizza con jamón, piña en trozos y mozzarella sobre masa artesanal. El debate eterno, el placer garantizado.',
    ingredientes: 'Masa artesanal, salsa de tomate, jamón, piña, mozzarella',
    destacado: false,
    stock: 16
  },
  {
    id: 'p012',
    nombre: 'Refresco de Cola',
    categoria: 'bebidas',
    precio: 5.00,
    imagen: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600&q=80',
    descripcion: 'Refresco de cola bien helado en vaso de 500ml con hielo. El compañero inseparable de tu comida.',
    ingredientes: 'Refresco de cola, hielo',
    destacado: false,
    stock: 100
  },
  {
    id: 'p013',
    nombre: 'Malteada de Chocolate',
    categoria: 'bebidas',
    precio: 9.00,
    imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
    descripcion: 'Cremosa malteada de chocolate con helado artesanal, leche entera y topping de crema batida.',
    ingredientes: 'Helado de chocolate, leche entera, crema batida',
    destacado: true,
    stock: 30
  },
  {
    id: 'p014',
    nombre: 'Combo Familiar',
    categoria: 'combos',
    precio: 65.00,
    imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&q=80',
    descripcion: '4 hamburguesas clásicas + 2 porciones grandes de papas + 4 refrescos. Ideal para compartir en familia.',
    ingredientes: '4 hamburguesas clásicas, 2 papas grandes, 4 refrescos',
    destacado: true,
    stock: 12
  },
  {
    id: 'p015',
    nombre: 'Combo Pareja',
    categoria: 'combos',
    precio: 42.00,
    imagen: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=80',
    descripcion: '2 hamburguesas BBQ Bacon + 1 papas con queso + 2 refrescos. La combinación perfecta para dos.',
    ingredientes: '2 hamburguesas BBQ Bacon, 1 papas con queso, 2 refrescos',
    destacado: true,
    stock: 18
  },
  {
    id: 'p016',
    nombre: 'Combo Infantil',
    categoria: 'combos',
    precio: 18.00,
    imagen: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80',
    descripcion: 'Mini hamburguesa + papas pequeñas + jugo de caja + juguete sorpresa. Diversión asegurada para los más pequeños.',
    ingredientes: 'Mini hamburguesa, papas pequeñas, jugo, juguete',
    destacado: false,
    stock: 25
  },
  {
    id: 'p017',
    nombre: 'Helado de Cono',
    categoria: 'postres',
    precio: 6.00,
    imagen: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=600&q=80',
    descripcion: 'Cono crujiente con dos bolas de helado a elección: vainilla, chocolate, fresa o cookies & cream.',
    ingredientes: 'Cono, helado artesanal',
    destacado: false,
    stock: 40
  },
  {
    id: 'p018',
    nombre: 'Brownie con Helado',
    categoria: 'postres',
    precio: 10.00,
    imagen: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80',
    descripcion: 'Brownie tibio de chocolate con bola de helado de vainilla, salsa de chocolate caliente y nueces picadas.',
    ingredientes: 'Brownie de chocolate, helado de vainilla, salsa de chocolate, nueces',
    destacado: true,
    stock: 22
  }
];

const EQUIPO = [
  {
    id: 'e001',
    nombre: 'Carlos Méndez',
    rol: 'Fundador y Chef Principal',
    foto: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&q=80',
    descripcion: 'Con más de 20 años en la industria gastronómica, Carlos creó "El Sabor Explosivo" con la visión de ofrecer comida rápida de calidad premium.'
  },
  {
    id: 'e002',
    nombre: 'Lucía Vargas',
    rol: 'Sous Chef',
    foto: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400&q=80',
    descripcion: 'Especialista en cocina internacional y desarrollo de nuevos productos. Encargada de mantener la excelencia en cada plato.'
  },
  {
    id: 'e003',
    nombre: 'Miguel Rojas',
    rol: 'Jefe de Operaciones',
    foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    descripcion: 'El cerebro detrás de la logística y atención al cliente. Asegura que cada pedido llegue perfecto y a tiempo.'
  },
  {
    id: 'e004',
    nombre: 'Andrea Silva',
    rol: 'Gerente de Local',
    foto: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80',
    descripcion: 'La anfitriona de nuestro local. Encargada de que cada visita sea una experiencia memorable para nuestros clientes.'
  }
];

const TESTIMONIOS = [
  { nombre: 'Roberto Pérez', texto: 'Las mejores hamburguesas que he probado en la ciudad. La salsa secreta es increíble.', rating: 5 },
  { nombre: 'María González', texto: 'El combo familiar es perfecto para los domingos. Todos quedamos satisfechos y a buen precio.', rating: 5 },
  { nombre: 'Fernando Castro', texto: 'Delivery rápido y la comida llega caliente. Mis hijos aman los nuggets y las papas.', rating: 4 }
];

const RESENAS_INICIALES = [
  { id: 'r001', productoId: 'p001', usuario: 'Roberto Pérez', rating: 5, comentario: 'Increíble hamburguesa, el pan brioche y la carne son perfectos. La salsa secreta es adictiva.', fecha: '2024-09-15' },
  { id: 'r002', productoId: 'p001', usuario: 'Patricia López', rating: 5, comentario: 'Sin duda la mejor hamburguesa clásica de la zona. Siempre pido los viernes.', fecha: '2024-09-20' },
  { id: 'r003', productoId: 'p002', usuario: 'Andrés Torres', rating: 5, comentario: 'La doble queso BBQ es brutal. Para los que tienen hambre de verdad. Súper recomendada.', fecha: '2024-09-25' },
  { id: 'r004', productoId: 'p005', usuario: 'Sofía Ramírez', rating: 4, comentario: 'Papas doradas y crujientes, pero el tamaño podría ser un poco mayor. Aún así, buen sabor.', fecha: '2024-09-10' },
  { id: 'r005', productoId: 'p010', usuario: 'Diego Morales', rating: 5, comentario: 'La masa es perfecta y el pepperoni tiene el toque picante ideal. Pizza de otro nivel.', fecha: '2024-09-18' },
  { id: 'r006', productoId: 'p014', usuario: 'Carolina Vega', rating: 5, comentario: 'El combo familiar es un golazo. Para 4 personas queda perfecto y todos felices.', fecha: '2024-09-22' },
  { id: 'r007', productoId: 'p018', usuario: 'Lucía Fernández', rating: 5, comentario: 'El brownie tibio con helado es el final perfecto. Porción generosa y sabor espectacular.', fecha: '2024-09-28' }
];

const PEDIDOS_INICIALES = [
  {
    id: 'ORD-20240915-001',
    usuarioEmail: 'carlos@ejemplo.com',
    fecha: '2024-09-15',
    estado: 'Entregado',
    productos: [
      { id: 'p001', nombre: 'Hamburguesa Clásica', precio: 18.00, cantidad: 2, imagen: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80' },
      { id: 'p005', nombre: 'Papas Fritas Clásicas', precio: 7.00, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&q=80' },
      { id: 'p012', nombre: 'Refresco de Cola', precio: 5.00, cantidad: 2, imagen: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&q=80' }
    ],
    subtotal: 53.00,
    envio: 5.00,
    total: 58.00,
    tipoEnvio: 'Estándar (45-60 min)',
    direccion: { nombre: 'Carlos Méndez', telefono: '555-1234', calle: 'Av. Principal 123', ciudad: 'Ciudad', codigoPostal: '12345' },
    metodoPago: 'Efectivo contra entrega'
  },
  {
    id: 'ORD-20240920-002',
    usuarioEmail: 'carlos@ejemplo.com',
    fecha: '2024-09-20',
    estado: 'En camino',
    productos: [
      { id: 'p014', nombre: 'Combo Familiar', precio: 65.00, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&q=80' }
    ],
    subtotal: 65.00,
    envio: 8.00,
    total: 73.00,
    tipoEnvio: 'Express (20-30 min)',
    direccion: { nombre: 'Carlos Méndez', telefono: '555-1234', calle: 'Av. Principal 123', ciudad: 'Ciudad', codigoPostal: '12345' },
    metodoPago: 'Tarjeta de Crédito'
  },
  {
    id: 'ORD-20240925-003',
    usuarioEmail: 'carlos@ejemplo.com',
    fecha: '2024-09-25',
    estado: 'Procesando',
    productos: [
      { id: 'p010', nombre: 'Pizza Pepperoni', precio: 28.00, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&q=80' },
      { id: 'p013', nombre: 'Malteada de Chocolate', precio: 9.00, cantidad: 1, imagen: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200&q=80' }
    ],
    subtotal: 37.00,
    envio: 5.00,
    total: 42.00,
    tipoEnvio: 'Estándar (45-60 min)',
    direccion: { nombre: 'Carlos Méndez', telefono: '555-1234', calle: 'Av. Principal 123', ciudad: 'Ciudad', codigoPostal: '12345' },
    metodoPago: 'Yape / Plin'
  }
];

const USUARIOS_INICIALES = [
  {
    id: 'u001',
    nombre: 'Carlos Méndez',
    email: 'carlos@ejemplo.com',
    password: '123456',
    telefono: '555-1234',
    direccion: 'Av. Principal 123, Ciudad',
    fechaRegistro: '2024-01-15'
  },
  {
    id: 'u002',
    nombre: 'Lucía Vargas',
    email: 'lucia@ejemplo.com',
    password: '123456',
    telefono: '555-5678',
    direccion: 'Calle Secundaria 456, Ciudad',
    fechaRegistro: '2024-03-20'
  }
];

function formatearPrecio(precio) {
  return `$${precio.toFixed(2)}`;
}

function formatearFecha(fecha) {
  const d = new Date(fecha);
  return d.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generarIdPedido() {
  const fecha = new Date();
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `ORD-${year}${month}${day}-${random}`;
}

function obtenerProducto(id) {
  return PRODUCTOS.find(p => p.id === id);
}

function obtenerCategoria(id) {
  return CATEGORIAS.find(c => c.id === id);
}

function obtenerResenasProducto(productoId) {
  const resenasStorage = JSON.parse(localStorage.getItem('resenas') || '[]');
  const todas = [...RESENAS_INICIALES, ...resenasStorage];
  return todas.filter(r => r.productoId === productoId);
}

function promedioRating(productoId) {
  const resenas = obtenerResenasProducto(productoId);
  if (resenas.length === 0) return 0;
  const suma = resenas.reduce((acc, r) => acc + r.rating, 0);
  return (suma / resenas.length).toFixed(1);
}

function contarResenas(productoId) {
  return obtenerResenasProducto(productoId).length;
}

function renderEstrellas(rating, size = 'sm') {
  const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6', xl: 'w-8 h-8' };
  const cls = sizes[size] || sizes.sm;
  const estrellas = [];
  const ratingNum = parseFloat(rating);
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(ratingNum);
    const half = !filled && i - 0.5 <= ratingNum;
    const color = filled || half ? 'text-yellow-400' : 'text-gray-300';
    estrellas.push(`<svg class="${cls} ${color} inline" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118L10 13.347l-3.37 2.448c-.783.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.643 8.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.954z"/></svg>`);
  }
  return estrellas.join('');
}

function renderBadgeEstado(estado) {
  const map = {
    'Procesando': 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'En camino': 'bg-blue-100 text-blue-800 border-blue-300',
    'Entregado': 'bg-green-100 text-green-800 border-green-300',
    'Cancelado': 'bg-red-100 text-red-800 border-red-300'
  };
  const cls = map[estado] || 'bg-gray-100 text-gray-800 border-gray-300';
  return `<span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${cls}">${estado}</span>`;
}

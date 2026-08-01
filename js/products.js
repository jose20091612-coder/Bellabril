/* ================================================================
   BELLABRIL — Catálogo de Productos

   ▶ CÓMO AGREGAR UN PRODUCTO:
     Usá el panel de administración: abrí admin.html en tu navegador,
     entrá con la contraseña y completá el formulario.
     Después descargá el nuevo products.js y reemplazá este archivo.

   ▶ CATEGORÍAS disponibles:
     novedades | skincare | maquillaje | cabello | unas | pestanas | perfumeria
================================================================ */

const CATEGORIAS = [
  { id: 'todos',       nombre: 'Todos',              icono: '🌸' },
  { id: 'novedades',   nombre: 'Novedades',           icono: '✨' },
  { id: 'skincare',    nombre: 'Skincare',             icono: '🧴' },
  { id: 'maquillaje',  nombre: 'Maquillaje',           icono: '💄' },
  { id: 'cabello',     nombre: 'Cabello',              icono: '✂️' },
  { id: 'unas',        nombre: 'Uñas',                icono: '💅' },
  { id: 'pestanas',    nombre: 'Pestañas y cejas',    icono: '👁️' },
  { id: 'perfumeria',  nombre: 'Perfumería',           icono: '🌸' },
];

/* ================================================================
   ↓ PRODUCTOS — editá desde admin.html
================================================================ */
const PRODUCTS = [
  {
    id: 1,
    nombre:      "Sérum Vitamina C Iluminador",
    precio:      4200,
    categoria:   "skincare",
    imagen:      "assets/productos/skincare/serum-vitamina-c.jpg",
    descripcion: "Sérum concentrado con vitamina C pura. Unifica el tono y da luminosidad al instante.",
    nuevo:       true,
    destacado:   true,
    stock:       true
  },
  {
    id: 2,
    nombre:      "Base Líquida Cobertura Total",
    precio:      3800,
    categoria:   "maquillaje",
    imagen:      "assets/productos/maquillaje/base-cobertura-total.jpg",
    descripcion: "Base de larga duración con cobertura total. 30 tonos disponibles.",
    nuevo:       true,
    destacado:   false,
    stock:       true
  },
  {
    id: 3,
    nombre:      "Esmalte Semipermanente Nude Rose",
    precio:      2200,
    categoria:   "unas",
    imagen:      "assets/productos/unas/esmalte-nude-rose.jpg",
    descripcion: "Color nude rosado de larga duración. Hasta 3 semanas sin despegarse.",
    nuevo:       false,
    destacado:   true,
    stock:       true
  },
  {
    id: 4,
    nombre:      "Shampoo Reparador Keratina",
    precio:      2900,
    categoria:   "cabello",
    imagen:      "assets/productos/cabello/shampoo-keratina.jpg",
    descripcion: "Shampoo con keratina hidrolizada. Repara el cabello dañado desde la primera aplicación.",
    nuevo:       false,
    destacado:   true,
    stock:       true
  },
  {
    id: 5,
    nombre:      "Perfume Floral Femenino 100ml",
    precio:      8500,
    categoria:   "perfumeria",
    imagen:      "assets/productos/perfumeria/perfume-floral.jpg",
    descripcion: "Fragancia floral con notas de jazmín, rosa y vainilla. Duración 8 horas.",
    nuevo:       false,
    destacado:   true,
    stock:       true
  },
  {
    id: 6,
    nombre:      "Kit Extensiones de Pestañas",
    precio:      3500,
    categoria:   "pestanas",
    imagen:      "assets/productos/pestanas/kit-extensiones.jpg",
    descripcion: "Kit completo para extensiones de pestañas pelo a pelo. Incluye pegamento y pinzas.",
    nuevo:       true,
    destacado:   false,
    stock:       false
  },
  {
    id: 7,
    nombre:      "Crema Extra Ácida Colormaster — Fidelité",
    precio:      5500,
    categoria:   "cabello",
    imagen:      "assets/productos/cabello/colormaster-crema-extra-acida-fidelite.jpg",
    descripcion: "Crema extra ácida de la línea Color Care System de Fidelité, formulada con D-Panthenol para sellar la fibra capilar luego de la coloración. Ayuda a cerrar la cutícula del cabello, cuidando el color y dejándolo con mejor aspecto después del proceso químico.",
    caracteristicas: [
      "Sella la fibra capilar post-coloración",
      "Fórmula con D-Panthenol",
      "Línea profesional Fidelité — Color Care System",
      "Contenido neto: 270g / 9.52 oz",
      "pH ácido, ideal como paso final de coloración"
    ],
    nuevo:       false,
    destacado:   false,
    stock:       true
  },
  {
    id: 8,
    nombre:      "Shampoo Mythical Argán — Fidelité",
    precio:      8000,
    categoria:   "cabello",
    imagen:      "assets/productos/cabello/shampoo-mythical-argan-fidelite.jpg",
    descripcion: "Shampoo profesional de la línea Mythical de Fidelité, formulado con aceite virgen de argán y filtro UV. Limpia suavemente mientras nutre el cabello, dejándolo con brillo y suavidad.",
    caracteristicas: [
      "Formulado con aceite virgen de argán",
      "Filtro UV para proteger el color",
      "Línea profesional Fidelité",
      "Contenido: 260ml / 8.79 fl oz",
      "Ideal para usar junto al acondicionador de la misma línea"
    ],
    nuevo:       false,
    destacado:   true,
    stock:       true
  },
  {
    id: 9,
    nombre:      "Acondicionador Mythical Argán — Fidelité",
    precio:      8000,
    categoria:   "cabello",
    imagen:      "assets/productos/cabello/acondicionador-mythical-argan-fidelite.jpg",
    descripcion: "Acondicionador profesional de la línea Mythical de Fidelité, con aceite virgen de argán y filtro UV. Facilita el desenredado y deja el cabello suave, hidratado y con brillo.",
    caracteristicas: [
      "Formulado con aceite virgen de argán",
      "Filtro UV para proteger el color",
      "Línea profesional Fidelité",
      "Contenido: 260ml / 8.79 fl oz",
      "Complementa el shampoo de la misma línea"
    ],
    nuevo:       false,
    destacado:   true,
    stock:       true
  },
  {
    id: 10,
    nombre:      "Ampollas Capilares — Fidelité",
    precio:      2000,
    categoria:   "cabello",
    imagen:      "assets/productos/cabello/ampollas-varias.jpeg",
    descripcion: "Ampollas capilares de la línea Fidelité. Aportan brillo, nutrición y revitalizan el cabello en cada aplicación. Disponibles en 5 variantes según lo que necesite tu cabello.",
    caracteristicas: [
      "Linen Seed: ayuda a disciplinar y suavizar el cabello, aportando brillo y controlando el frizz",
      "100% Free: fórmula libre de agregados agresivos, nutre e hidrata sin pesar el cabello",
      "Caviar: acción regeneradora intensiva que revitaliza el cabello dañado y devuelve firmeza y brillo",
      "Argán: complejo de argán que aporta brillo, nutrición y revitaliza el cabello",
      "Instant Nourishing Complex: nutrición instantánea, ideal para un efecto rápido de brillo y suavidad"
    ],
    nuevo:       false,
    destacado:   false,
    stock:       true
  },
];

/* ================================================================
   RENDERIZADO — no modificar lo de abajo
================================================================ */

function _cardHTML(p) {
  const badge = !p.stock
    ? `<span class="product-card__badge badge-agotado">Sin stock</span>`
    : p.nuevo
      ? `<span class="product-card__badge badge-nuevo">Nuevo ✦</span>`
      : '';

  const btn = !p.stock
    ? `<button class="btn btn-outline btn-sm product-card__add" disabled>Sin stock</button>`
    : `<button class="btn btn-primary btn-sm product-card__add" onclick="addToCart(${p.id})">Agregar al carrito</button>`;

  return `
    <article class="product-card reveal">
      <a href="producto-detalle.html?id=${p.id}" class="product-card__image">
        ${badge}
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.style.opacity=0">
      </a>
      <div class="product-card__body">
        <a href="producto-detalle.html?id=${p.id}" class="product-card__titlelink">
          <h3 class="product-card__name">${p.nombre}</h3>
          <p class="product-card__desc">${p.descripcion}</p>
        </a>
        <p class="product-card__price">${Cart.formatPrice(p.precio)}</p>
        ${btn}
      </div>
    </article>`;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p && p.stock) Cart.add(p);
}

function sortProducts(list, sort = 'destacado') {
  const sorted = list.slice();
  switch (sort) {
    case 'precio-asc':  return sorted.sort((a, b) => a.precio - b.precio);
    case 'precio-desc': return sorted.sort((a, b) => b.precio - a.precio);
    case 'az':           return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
    case 'za':           return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre, 'es'));
    case 'nuevo':         return sorted.sort((a, b) => b.id - a.id);
    case 'viejo':         return sorted.sort((a, b) => a.id - b.id);
    case 'vendidos':
    case 'destacado':
    default:
      return sorted.sort((a, b) => (b.destacado === true) - (a.destacado === true));
  }
}

function renderProducts(containerId, filter = 'todos', limit = null, sort = 'destacado') {
  const el = document.getElementById(containerId);
  if (!el) return;
  let list;
  if (filter === 'todos')          list = PRODUCTS;
  else if (filter === 'novedades') list = PRODUCTS.filter(p => p.nuevo);
  else                              list = PRODUCTS.filter(p => p.categoria === filter);
  list = sortProducts(list, sort);
  if (limit) list = list.slice(0, limit);
  el.innerHTML = list.length
    ? list.map(_cardHTML).join('')
    : `<p style="text-align:center;color:var(--text-light);padding:48px;grid-column:1/-1">
         No hay productos en esta categoría todavía.
       </p>`;
  _reveal(el);
}

function renderDestacados(containerId, max = 6) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = PRODUCTS.filter(p => p.destacado && p.stock !== false).slice(0, max);
  el.innerHTML = list.map(_cardHTML).join('');
  _reveal(el);
}

function renderNuevos(containerId, max = 4) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const list = PRODUCTS.filter(p => p.nuevo).slice(0, max);
  el.innerHTML = list.map(_cardHTML).join('');
  _reveal(el);
}

function _reveal(parent) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 75);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  parent.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initReveal() {
  _reveal(document);
}

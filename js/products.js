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
      <div class="product-card__image">
        ${badge}
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.style.opacity=0">
      </div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.nombre}</h3>
        <p class="product-card__desc">${p.descripcion}</p>
        <p class="product-card__price">${Cart.formatPrice(p.precio)}</p>
        ${btn}
      </div>
    </article>`;
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (p && p.stock) Cart.add(p);
}

function renderProducts(containerId, filter = 'todos', limit = null) {
  const el = document.getElementById(containerId);
  if (!el) return;
  let list = filter === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.categoria === filter);
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

/* ================================================================
   BELLABRIL — Carrito de Compras
   Usa localStorage. No requiere backend.
   ================================================================ */

const Cart = (() => {
  const KEY = 'bellabril_cart';

  function getItems() {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _updateBadge();
  }

  function add(product, qty = 1) {
    const items = getItems();
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: product.id, nombre: product.nombre, precio: product.precio, imagen: product.imagen, qty });
    }
    save(items);
    showToast(`✨ ${product.nombre} agregado al carrito`);
  }

  function remove(id) {
    save(getItems().filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (!item) return;
    if (qty <= 0) { remove(id); return; }
    item.qty = qty;
    save(items);
  }

  function getTotal() {
    return getItems().reduce((s, i) => s + i.precio * i.qty, 0);
  }

  function getCount() {
    return getItems().reduce((s, i) => s + i.qty, 0);
  }

  function clear() {
    localStorage.removeItem(KEY);
    _updateBadge();
  }

  function formatPrice(n) {
    return '$' + Number(n).toLocaleString('es-AR');
  }

  function showToast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.classList.remove('show'), 2800);
  }

  function _updateBadge() {
    const count = getCount();
    const badge = document.getElementById('cartCount');
    if (!badge) return;
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
  }

  document.addEventListener('DOMContentLoaded', _updateBadge);

  return { getItems, add, remove, updateQty, getTotal, getCount, clear, formatPrice, showToast };
})();

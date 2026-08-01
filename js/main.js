/* ================================================================
   BELLABRIL — Interacciones UI
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header: hide on scroll down, show on scroll up ── */
  const header = document.getElementById('header');
  if (header) {
    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      header.classList.toggle('scrolled', y > 8);
      if (y > lastY && y > 80) {
        header.classList.add('hidden');
      } else {
        header.classList.remove('hidden');
      }
      lastY = y;
    }, { passive: true });
  }

  /* ── Mobile menu ── */
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', e => {
      if (!header.contains(e.target)) nav.classList.remove('open');
    });
  }

  /* ── Active nav link ── */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  /* ── Hero sparkles ── */
  const sparkleContainer = document.querySelector('.hero__sparkles');
  if (sparkleContainer) {
    for (let i = 0; i < 20; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;`
        + `--dur:${2+Math.random()*3}s;--delay:${Math.random()*4}s;`
        + `width:${4+Math.random()*7}px;height:${4+Math.random()*7}px`;
      sparkleContainer.appendChild(s);
    }
  }

  /* ── Productos.html: filtro por categoría (vía ?cat=) + orden ── */
  const productsGrid = document.getElementById('productsGrid');
  const sortSelect    = document.getElementById('sortSelect');
  if (productsGrid) {
    const params = new URLSearchParams(location.search);
    let active = params.get('cat') || 'todos';
    let sort   = params.get('sort') || 'destacado';
    if (sortSelect) sortSelect.value = sort;

    function applySort(value) {
      sort = value;
      renderProducts('productsGrid', active, null, sort);
      const url = new URL(location);
      url.searchParams.set('sort', sort);
      history.replaceState({}, '', url);
    }

    if (sortSelect) sortSelect.addEventListener('change', () => applySort(sortSelect.value));
    renderProducts('productsGrid', active, null, sort);
  }

  /* ── Checkout: payment method toggle ── */
  document.querySelectorAll('.payment-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.payment-opt').forEach(o => {
        o.classList.remove('selected');
        const d = document.getElementById(o.dataset.detail);
        if (d) d.classList.remove('show');
      });
      opt.classList.add('selected');
      const radio = opt.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      const detail = document.getElementById(opt.dataset.detail);
      if (detail) detail.classList.add('show');
    });
  });

  /* ── Copy to clipboard ── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        const orig = btn.textContent;
        btn.textContent = '✓ Copiado';
        setTimeout(() => btn.textContent = orig, 2000);
      } catch {}
    });
  });

  /* ── Carrito.html: render cart ── */
  if (document.getElementById('cartItemsContainer')) renderCartPage();

  /* ── Checkout.html: render order box ── */
  if (document.getElementById('orderItemsBox')) {
    renderOrderBox();
    const session = typeof Auth !== 'undefined' ? Auth.getSession() : null;
    if (session) {
      const n = document.getElementById('nombre');
      const e = document.getElementById('email');
      const t = document.getElementById('telefono');
      if (n && !n.value) n.value = session.nombre;
      if (e && !e.value) e.value = session.email;
      if (t && !t.value && session.telefono) t.value = session.telefono;
    }
  }

  /* ── Checkout form submit ── */
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
});

/* ── CART PAGE ─────────────────────────────── */
function renderCartPage() {
  const container = document.getElementById('cartItemsContainer');
  const emptyEl   = document.getElementById('cartEmpty');
  const summaryEl = document.getElementById('cartSummary');
  const items = Cart.getItems();

  if (!items.length) {
    container.style.display = 'none';
    if (emptyEl) emptyEl.style.display = 'block';
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';

  container.innerHTML = items.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item__img" src="${item.imagen}" alt="${item.nombre}" onerror="this.style.opacity=0">
      <div>
        <p class="cart-item__name">${item.nombre}</p>
        <p class="cart-item__price">${Cart.formatPrice(item.precio)} c/u</p>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="changeQty(${item.id}, ${item.qty - 1})">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, ${item.qty + 1})">+</button>
        </div>
      </div>
      <div style="text-align:right">
        <p style="font-weight:700;margin-bottom:6px">${Cart.formatPrice(item.precio * item.qty)}</p>
        <button class="remove-btn" onclick="removeItem(${item.id})" title="Eliminar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
          </svg>
        </button>
      </div>
    </div>`).join('');

  // Summary
  const total = Cart.getTotal();
  const envio = total >= 15000 ? 0 : 1500; // gratis sobre $15.000
  const totalFinal = total + envio;
  document.getElementById('subtotalVal').textContent = Cart.formatPrice(total);
  document.getElementById('envioVal').textContent    = envio === 0 ? 'Gratis 🎉' : Cart.formatPrice(envio);
  document.getElementById('totalVal').textContent    = Cart.formatPrice(totalFinal);
}

function changeQty(id, qty) { Cart.updateQty(id, qty); renderCartPage(); }
function removeItem(id)      { Cart.remove(id); renderCartPage(); }

/* ── CHECKOUT ──────────────────────────────── */
function renderOrderBox() {
  const items = Cart.getItems();
  const box   = document.getElementById('orderItemsBox');
  if (!items.length) { location.href = 'carrito.html'; return; }

  box.innerHTML = items.map(i => `
    <div class="order-item">
      <img class="order-item__img" src="${i.imagen}" alt="${i.nombre}" onerror="this.style.opacity=0">
      <div class="order-item__name">${i.nombre} <span class="order-item__qty">x${i.qty}</span></div>
      <span class="order-item__sub">${Cart.formatPrice(i.precio * i.qty)}</span>
    </div>`).join('');

  const total = Cart.getTotal();
  const envio = total >= 15000 ? 0 : 1500;
  document.getElementById('orderSubtotal').textContent = Cart.formatPrice(total);
  document.getElementById('orderEnvio').textContent    = envio === 0 ? 'Gratis 🎉' : Cart.formatPrice(envio);
  document.getElementById('orderTotal').textContent    = Cart.formatPrice(total + envio);
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const f = e.target;
  const nombre    = f.nombre.value.trim();
  const telefono  = f.telefono.value.trim();
  const email     = f.email.value.trim();
  const provincia = f.provincia ? f.provincia.value.trim() : '';

  const paymentRadio = document.querySelector('input[name="payment"]:checked');
  const payment = paymentRadio ? paymentRadio.value : 'transferencia';

  const items = Cart.getItems();
  const total = Cart.getTotal();
  const envio = total >= 15000 ? 0 : 1500;

  const lines = items.map(i => `• ${i.nombre} x${i.qty} — ${Cart.formatPrice(i.precio * i.qty)}`).join('\n');
  const payText = payment === 'mercadopago' ? 'Mercado Pago' : 'Transferencia bancaria';

  const msg = encodeURIComponent(
    `¡Hola Bellabril! 🌸 Quiero confirmar un pedido:\n\n` +
    `*Productos:*\n${lines}\n` +
    `*Subtotal:* ${Cart.formatPrice(total)}\n` +
    `*Envío:* ${envio === 0 ? 'Gratis' : Cart.formatPrice(envio)}\n` +
    `*TOTAL:* ${Cart.formatPrice(total + envio)}\n\n` +
    `*Mis datos:*\n` +
    `Nombre: ${nombre}\n` +
    `Teléfono: ${telefono}\n` +
    `Email: ${email}\n` +
    (provincia ? `Provincia: ${provincia}\n` : '') +
    `\n*Método de pago:* ${payText}\n\n` +
    `¡Gracias! 💜`
  );

  // <!-- REVISAR: reemplazá 54XXXXXXXXXX con el número de WhatsApp de la dueña (sin 0, sin 15) -->
  const waNumber = '5491126971330';
  if (typeof Auth !== 'undefined' && Auth.isLoggedIn()) {
    Auth.saveOrder({ items, total: Cart.getTotal(), metodo: payText });
  }
  Cart.clear();
  window.open(`https://wa.me/${waNumber}?text=${msg}`, '_blank');
  setTimeout(() => location.href = 'index.html', 800);
}

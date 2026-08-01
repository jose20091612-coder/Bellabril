// ============================================================
//  BELLABRIL — Lógica de cupones (frontend)
// ============================================================

const CouponAPI = '/api/coupon'

const Coupon = (() => {
  let applied = null  // { code, type, value, discount }

  // ── Inicializa el campo de cupón en checkout ──────────────
  function initCheckout() {
    const box = document.getElementById('couponBox')
    if (!box) return

    box.innerHTML = `
      <div style="margin-bottom:16px">
        <p style="font-size:0.8rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--text-medium);margin-bottom:8px">Código de descuento</p>
        <div style="display:flex;gap:8px">
          <input id="couponInput" type="text" placeholder="Ej: BIENVENIDA"
            style="flex:1;padding:10px 14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-family:'Nunito',sans-serif;font-size:0.9rem;outline:none;text-transform:uppercase;transition:border-color 0.3s"
            oninput="this.value=this.value.toUpperCase()"
            onfocus="this.style.borderColor='var(--purple)'"
            onblur="this.style.borderColor='var(--border)'">
          <button id="couponBtn" onclick="Coupon.apply()"
            style="padding:10px 16px;background:var(--gradient);color:white;border:none;border-radius:var(--radius-sm);font-family:'Nunito',sans-serif;font-weight:700;font-size:0.85rem;cursor:pointer;white-space:nowrap;transition:opacity 0.3s">
            Aplicar
          </button>
        </div>
        <div id="couponMsg" style="margin-top:8px;font-size:0.82rem;min-height:18px"></div>
      </div>
    `
  }

  // ── Aplica el cupón ───────────────────────────────────────
  async function apply() {
    const input = document.getElementById('couponInput')
    const msg   = document.getElementById('couponMsg')
    const btn   = document.getElementById('couponBtn')
    if (!input) return

    const code  = input.value.trim().toUpperCase()
    const email = (document.getElementById('email')?.value || '').trim().toLowerCase()

    if (!code) { showMsg(msg, 'Ingresá un código de descuento', 'warn'); return }

    btn.disabled = true
    btn.textContent = 'Verificando…'

    try {
      const res = await fetch(CouponAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'validate', code, email }),
      })
      const data = await res.json()

      if (data.valid) {
        applied = { code, type: data.type, value: data.value }
        showMsg(msg, `✓ ${data.message}`, 'ok')
        input.disabled = true
        btn.textContent = 'Quitar'
        btn.onclick = removeCoupon
        btn.style.background = '#888'
        updateSummary()
      } else {
        showMsg(msg, data.message || 'Código inválido', 'error')
        applied = null
        updateSummary()
      }
    } catch {
      showMsg(msg, 'Error al verificar. Intentá de nuevo.', 'error')
    } finally {
      if (btn.textContent !== 'Quitar') {
        btn.disabled = false
        btn.textContent = 'Aplicar'
      }
    }
  }

  function removeCoupon() {
    applied = null
    const input = document.getElementById('couponInput')
    const btn   = document.getElementById('couponBtn')
    const msg   = document.getElementById('couponMsg')
    if (input) { input.disabled = false; input.value = '' }
    if (btn)   { btn.textContent = 'Aplicar'; btn.style.background = 'var(--gradient)'; btn.onclick = apply }
    if (msg)   msg.innerHTML = ''
    updateSummary()
  }

  // ── Actualiza las filas del resumen ───────────────────────
  function updateSummary() {
    // Buscar subtotal actual desde cart
    const items = Cart ? Cart.getItems() : []
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0)

    const discountRow  = document.getElementById('discountRow')
    const discountVal  = document.getElementById('discountVal')
    const orderTotal   = document.getElementById('orderTotal')
    const orderSubtotal = document.getElementById('orderSubtotal')

    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toLocaleString('es-AR')}`

    let discount = 0
    if (applied) {
      discount = applied.type === 'percent'
        ? Math.round(subtotal * applied.value / 100)
        : Math.min(applied.value, subtotal)
    }

    if (discountRow) discountRow.style.display = applied ? 'flex' : 'none'
    if (discountVal) discountVal.textContent = `-$${discount.toLocaleString('es-AR')}`

    const total = Math.max(0, subtotal - discount)
    if (orderTotal) orderTotal.textContent = `$${total.toLocaleString('es-AR')}`

    return { subtotal, discount, total, code: applied?.code || null }
  }

  // ── Marca el cupón como usado al confirmar pedido ─────────
  async function markUsed(email) {
    if (!applied) return
    try {
      await fetch(CouponAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_used', code: applied.code, email }),
      })
    } catch { /* silencioso */ }
  }

  function getApplied() { return applied }

  // ── Carga el banner si el cupón está vigente ──────────────
  async function loadBanner() {
    const banner = document.getElementById('promoBanner')
    if (!banner) return
    try {
      const res  = await fetch(CouponAPI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'status' }),
      })
      const data = await res.json()
      if (!data.active) banner.style.display = 'none'
    } catch {
      // Si falla la API, mostrar el banner igual (conservador)
    }
  }

  function showMsg(el, text, type) {
    if (!el) return
    const colors = { ok: '#22c55e', error: '#ef4444', warn: '#f59e0b' }
    el.innerHTML = `<span style="color:${colors[type] || '#555'}">${text}</span>`
  }

  return { initCheckout, apply, removeCoupon, updateSummary, markUsed, getApplied, loadBanner }
})()

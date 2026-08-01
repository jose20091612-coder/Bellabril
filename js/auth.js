/* ================================================================
   BELLABRIL — Autenticación con localStorage
   MVP: almacena cuentas en el navegador del usuario.
================================================================ */

const Auth = (() => {
  const USERS_KEY   = 'bellabril_users';
  const SESSION_KEY = 'bellabril_session';

  function _getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function _saveUsers(u) {
    localStorage.setItem(USERS_KEY, JSON.stringify(u));
  }

  // Hash con salt usando Web Crypto API (SHA-256).
  // Mucho más seguro que el hash anterior (FNV-1a sin salt).
  // Es async — las funciones que lo usan también deben serlo.
  async function _hash(pwd, salt) {
    const s    = salt || crypto.getRandomValues(new Uint8Array(16)).reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')
    const enc  = new TextEncoder()
    const key  = await crypto.subtle.importKey('raw', enc.encode(pwd), { name: 'PBKDF2' }, false, ['deriveBits'])
    const bits = await crypto.subtle.deriveBits(
      { name: 'PBKDF2', salt: enc.encode(s), iterations: 100_000, hash: 'SHA-256' },
      key, 256
    )
    const hash = Array.from(new Uint8Array(bits)).map(b => b.toString(16).padStart(2, '0')).join('')
    return `${s}:${hash}`
  }

  // Escapa caracteres HTML para evitar XSS al insertar texto en innerHTML
  function _esc(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  function _setSession(user, remember = false) {
    const data = JSON.stringify({ id: user.id, nombre: user.nombre, email: user.email, telefono: user.telefono || '' });
    sessionStorage.setItem(SESSION_KEY, data);
    if (remember) localStorage.setItem(SESSION_KEY, data);
  }

  function getSession() {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function isLoggedIn() { return !!getSession(); }

  async function register({ nombre, email, password, telefono = '' }) {
    // Validaciones de entrada
    if (!nombre || nombre.length > 100) return { ok: false, error: 'Nombre inválido.' }
    if (!email || email.length > 200)   return { ok: false, error: 'Email inválido.' }
    if (!password || password.length < 6 || password.length > 200) return { ok: false, error: 'La contraseña debe tener al menos 6 caracteres.' }

    const users = _getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Ya existe una cuenta con ese email.' };
    }
    const hashed = await _hash(password)
    const user = { id: Date.now(), nombre: nombre.trim(), email: email.toLowerCase().trim(), password: hashed, telefono: (telefono || '').trim(), fechaAlta: new Date().toISOString() };
    users.push(user);
    _saveUsers(users);
    _setSession(user, true);
    return { ok: true, user };
  }

  async function login(email, password, remember = false) {
    if (!email || !password) return { ok: false, error: 'Completá todos los campos.' }
    const users = _getUsers();
    const user  = users.find(u => u.email === email.toLowerCase().trim())
    if (!user) return { ok: false, error: 'Email o contraseña incorrectos.' };

    // Verificar hash: extraer salt del hash almacenado y rehashear
    const [salt] = user.password.split(':')
    const attempt = await _hash(password, salt)
    if (attempt !== user.password) return { ok: false, error: 'Email o contraseña incorrectos.' }

    _setSession(user, remember);
    return { ok: true, user };
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  }

  async function updateProfile(data) {
    const session = getSession();
    if (!session) return;
    const users = _getUsers();
    const idx   = users.findIndex(u => u.id === session.id);
    if (idx < 0) return;
    if (data.password) data.password = await _hash(data.password);
    Object.assign(users[idx], data);
    _saveUsers(users);
    _setSession(users[idx], true);
  }

  function saveOrder(order) {
    const session = getSession();
    if (!session) return;
    const key    = `bellabril_orders_${session.id}`;
    const orders = JSON.parse(localStorage.getItem(key) || '[]');
    orders.unshift({ ...order, id: Date.now(), fecha: new Date().toISOString(), estado: 'Pendiente' });
    localStorage.setItem(key, JSON.stringify(orders));
  }

  function getOrders() {
    const session = getSession();
    if (!session) return [];
    return JSON.parse(localStorage.getItem(`bellabril_orders_${session.id}`) || '[]');
  }

  // Render user button in header — llamado desde main.js
  function renderHeaderBtn() {
    const el = document.getElementById('userBtn');
    if (!el) return;
    const s = getSession();
    if (s) {
      const first = _esc(s.nombre.split(' ')[0]);  // XSS fix: escapar antes de insertar en innerHTML
      el.className = 'user-menu-wrap';
      el.innerHTML = `
        <button class="user-trigger" aria-haspopup="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          ${first}
        </button>
        <div class="user-dropdown">
          <a href="mi-cuenta.html">Mi cuenta</a>
          <a href="mi-cuenta.html#pedidos">Mis pedidos</a>
          <div class="udivider"></div>
          <button onclick="Auth.logout();location.href='index.html'">Cerrar sesión</button>
        </div>`;
    } else {
      el.className = '';
      el.innerHTML = `
        <a href="login.html" class="user-icon-btn" aria-label="Iniciar sesión" title="Iniciar sesión">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
        </a>`;
    }
  }

  document.addEventListener('DOMContentLoaded', renderHeaderBtn);

  return { register, login, logout, getSession, isLoggedIn, updateProfile, saveOrder, getOrders, renderHeaderBtn };
})();

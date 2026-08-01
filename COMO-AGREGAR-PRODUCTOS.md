# Cómo agregar productos a Bellabril

## Paso 1 — Guardá la foto del producto

Copiá la imagen del producto en la carpeta correspondiente:

```
assets/productos/
├── esmaltes/       ← fotos de esmaltes acá
├── geles/          ← fotos de geles acá
├── acrilicos/      ← fotos de acrílicos acá
├── decoracion/     ← fotos de decoración acá
├── herramientas/   ← fotos de herramientas acá
└── kits/           ← fotos de kits acá
```

**Recomendación para las fotos:**
- Formato: JPG o PNG
- Tamaño: cuadrada (1:1), mínimo 600×600 px
- Nombre: sin espacios ni mayúsculas, ej: `rosa-nude.jpg`, `gel-constructor.jpg`

---

## Paso 2 — Abrí el archivo de productos

Abrí el archivo: `js/products.js`

---

## Paso 3 — Copiá este bloque y completalo

```javascript
{
  id:          7,                              // número único, siempre mayor al último
  nombre:      "Nombre del producto",          // nombre tal como se va a mostrar
  precio:      0000,                           // precio en pesos ARS (solo números)
  categoria:   "esmaltes",                     // esmaltes | geles | acrilicos | decoracion | herramientas | kits
  imagen:      "assets/productos/esmaltes/nombre-foto.jpg",
  descripcion: "Descripción breve del producto.",
  nuevo:       false,   // true = aparece en "Nuevos ingresos" en el home
  destacado:   false,   // true = aparece en "Favoritos" en el home
  stock:       true     // false = muestra "Sin stock" y desactiva el botón
},
```

Pegalo dentro del array `PRODUCTS`, después del último producto (antes del `]`).

---

## Paso 4 — Guardá el archivo

Listo. El sitio se actualiza automáticamente con el nuevo producto.

---

## Datos que necesitás completar (una sola vez)

Buscá los comentarios `<!-- REVISAR -->` en los archivos HTML y completá:

| Dato | Dónde |
|------|-------|
| Número de WhatsApp | `index.html`, `productos.html`, `carrito.html`, `nosotros.html`, `contacto.html`, `js/main.js` |
| CBU de transferencia | `checkout.html` |
| Alias de transferencia | `checkout.html` |
| Nombre del titular | `checkout.html` |
| Link de Instagram | `index.html`, `productos.html`, `nosotros.html` |
| Email de contacto | `contacto.html` |
| Horario de atención | `contacto.html` |

**Formato del número de WhatsApp:** sin 0 y sin 15, con código de país.
Ejemplo: número `011 1534-5678` → en el código va `5491115345678`

---

## Cómo previsualizar el sitio

1. Abrí VS Code
2. Instalá la extensión **Live Server** (si no la tenés)
3. Hacé clic derecho en `index.html` → **Open with Live Server**
4. El sitio se abre en tu navegador en `http://127.0.0.1:5500`

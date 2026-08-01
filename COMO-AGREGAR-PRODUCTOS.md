# Cómo agregar productos a Bellabril

La forma más fácil es usando el **panel de administración** (`admin.html`). No hace falta tocar código.

---

## Paso 1 — Guardá la foto del producto

Copiá la imagen dentro de `assets/productos/`, en la carpeta de su categoría:

```
assets/productos/
├── skincare/     ← cremas, sérums, limpiadores...
├── maquillaje/   ← bases, labiales, sombras...
├── cabello/      ← shampoo, tratamientos...
├── unas/         ← esmaltes, geles, acrílicos...
├── pestanas/     ← pestañas, cejas, lash lift...
└── perfumeria/   ← perfumes y fragancias
```

**Recomendación para las fotos:**
- Formato: JPG o PNG
- Tamaño: cuadrada (1:1), mínimo 600×600 px
- Nombre: sin espacios ni mayúsculas, ej: `rosa-nude.jpg`, `serum-vitamina-c.jpg`

---

## Paso 2 — Abrí el panel de administración

1. Abrí `admin.html` en el navegador (doble clic, o con Live Server).
2. Ingresá la contraseña: `bellabril2024` (podés cambiarla buscando `const PWD` dentro de `admin.html`).

---

## Paso 3 — Cargá el producto

1. Clic en **"+ Agregar producto"**.
2. Completá nombre, precio, categoría (elegí una de las 6 reales: Skincare, Maquillaje, Cabello, Uñas, Pestañas y cejas, Perfumería), la ruta de la imagen que guardaste en el Paso 1 (ej: `assets/productos/skincare/serum-vitamina-c.jpg`) y una descripción breve.
3. Marcá si es **Destacado** (aparece en "Favoritos" del inicio) y/o **Nuevo ingreso** (aparece en "Nuevos ingresos" del inicio).
4. Guardar.

Repetí para cada producto. Podés editar o eliminar cualquiera desde la tabla.

---

## Paso 4 — Publicá los cambios en la web

El panel guarda los productos en tu navegador mientras cargás, pero **el sitio online no se actualiza solo** — hay que exportar y subir:

1. Andá a la pestaña **"Exportar"** del panel.
2. Clic en **"Descargar products.js"**.
3. Reemplazá el archivo `js/products.js` de la carpeta del proyecto por el que acabás de descargar.
4. Avisame ("hacé los cambios") y yo me encargo de subirlo a GitHub — Netlify lo publica solo en unos minutos.

---

## Datos que todavía hay que revisar (una sola vez)

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

## Cómo previsualizar el sitio antes de subirlo

1. Abrí VS Code
2. Instalá la extensión **Live Server** (si no la tenés)
3. Clic derecho en `index.html` → **Open with Live Server**
4. El sitio se abre en tu navegador en `http://127.0.0.1:5500`

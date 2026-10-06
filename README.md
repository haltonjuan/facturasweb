# Facturas Online

Generador gratuito de facturas, cuentas de cobro y recibos en PDF (texto real), con logo y QR. Sitio estático en GitHub Pages: sin servidor, los datos nunca salen del navegador.

## Estructura
| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura, SEO (canonical, Open Graph, JSON-LD) y Analytics |
| `css/01-base.css` … `04-components-v2.css` | Diseño del generador (modo oscuro y claro, Material 3) |
| `css/landing.css` | Diseño de las páginas de aterrizaje y legales |
| `js/locales/es.js`, `en.js`, `fr.js` | Textos por idioma (todo texto nuevo va en los tres) |
| `js/i18n.js` | Idioma activo, detección automática y función `T()` |
| `js/pdf.js` | Generación del PDF (jsPDF) |
| `js/app.js` | Formularios, vista previa y eventos |
| `js/carousel.js` | Cinta de ejemplos |
| `js/ui-enhancements.js` | Selects personalizados, dropzone y detalles de UI |
| `js/analytics.js` | Google Analytics (se usa en todas las páginas) |
| `img/` | Imágenes de ejemplo y `og.jpg` (tu carpeta actual, no incluida en el ZIP) |
| `favicon.png` | Ícono del sitio (tu archivo actual, no incluido en el ZIP) |
| `*.html` (raíz) | 8 páginas de aterrizaje SEO + sobre-nosotros, contacto, privacidad, términos y 404 |
| `robots.txt`, `sitemap.xml` | Indexación en Google |
| `CNAME`, `.nojekyll` | Dominio propio en GitHub Pages |
| `docs/SEO-ADSENSE.md` | Lista de verificación de SEO y AdSense |

## Reglas
- Un archivo, una responsabilidad. No mezclar HTML, CSS y JS.
- Todo texto nuevo va en los tres idiomas dentro de `js/locales/`.
- Al cambiar un archivo, subir el número `?v=` de su etiqueta (en `index.html` y en las páginas) para evitar caché.
- Orden de carga: `locales/*.js` → `i18n.js` → `pdf.js` → `app.js` → `carousel.js` → `ui-enhancements.js`.
- Si agregas una página nueva: añádela a `sitemap.xml` y enlázala desde el pie de página.

## Publicar
```
git add . && git commit -m "mensaje" && git push
```

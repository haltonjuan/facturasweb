# SEO y Google AdSense: lista de verificación

## Ya incluido en este proyecto
- `robots.txt` (permite todo, incluido el rastreador de AdSense `Mediapartners-Google`, y apunta al sitemap).
- `sitemap.xml` con la portada, las 8 páginas de aterrizaje y las 4 páginas informativas.
- `<title>`, `description`, `canonical`, `robots`, Open Graph y Twitter en cada página.
- Datos estructurados: `WebApplication` y `WebSite` (portada), `FAQPage` (portada y aterrizaje) y `BreadcrumbList` (aterrizaje e informativas).
- La portada actualiza description, Open Graph, Twitter y el esquema de preguntas frecuentes al cambiar de idioma.
- Páginas que AdSense espera ver: Sobre nosotros, Contacto, Política de Privacidad (con Analytics, cookies y AdSense) y Términos. Enlazadas en el pie de todas las páginas.
- Página 404 con `noindex`, `CNAME` y `.nojekyll` para GitHub Pages.
- Google Analytics (`G-GSDM0DSMY7`) en todas las páginas.

## Archivos que NO van en el ZIP (déjalos como están en tu repositorio)
- `favicon.png`
- `img/og.jpg` (imagen al compartir en redes, 1200x630)
- `img/factura-1.webp` y `img/factura-2.webp` (cinta de ejemplos)

## Pendiente de tu lado
1. **Search Console**: verifica `https://facturasonline.lat/` y envía `https://facturasonline.lat/sitemap.xml`. Después usa "Inspeccionar URL" y "Solicitar indexación" en las páginas nuevas.
2. **AdSense, al solicitar la aprobación**: pega en el `<head>` de `index.html` y de las páginas el código que te da AdSense (`<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX" crossorigin="anonymous"></script>`).
3. **ads.txt**: cuando tengas tu ID de editor, crea `ads.txt` en la raíz con `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
4. **Espacios de anuncio**: los dos `<div class="ad">` de `index.html` están vacíos. Reemplázalos por tus unidades de AdSense cuando te aprueben; no dejes cuadros vacíos visibles mucho tiempo.
5. **Consentimiento de cookies**: si recibes visitas del Espacio Económico Europeo, Reino Unido o Suiza, Google exige un mensaje de consentimiento certificado (CMP). Activa el de Google en AdSense (Privacidad y mensajería).
6. **Contenido**: AdSense valora contenido original y útil. Las páginas de aterrizaje son cortas; ampliarlas con más ejemplos, guías y preguntas frecuentes mejora la aprobación y el posicionamiento.
7. Si cambias el dominio o el correo de contacto, actualízalo en `js/locales/*.js` y en las páginas informativas.

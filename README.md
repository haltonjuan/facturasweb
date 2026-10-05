# Facturas Online

Generador gratuito de facturas, cuentas de cobro y recibos en PDF (texto real), con logo y QR. Sitio estatico en GitHub Pages: sin servidor, los datos nunca salen del navegador.

## Estructura
| Archivo | Responsabilidad |
|---|---|
| `index.html` | Solo estructura y SEO |
| `css/styles.css` | Todo el diseno (modo oscuro y claro) |
| `js/i18n.js` | Idiomas ES/EN/FR y deteccion automatica |
| `js/app.js` | Formularios, vista previa y eventos |
| `js/pdf.js` | Generacion del PDF (jsPDF) |
| `js/carousel.js` | Cinta de ejemplos |
| `img/` | Imagenes de ejemplo |

## Reglas
- Un archivo, una responsabilidad. No mezclar HTML, CSS y JS.
- Todo texto nuevo va en los tres idiomas dentro de `js/i18n.js`.
- Al cambiar un archivo, subir el numero `?v=` de su etiqueta en `index.html` para evitar cache.
- Los archivos JS cargan en este orden: i18n, pdf, app.

## Publicar
```
git add . && git commit -m "mensaje" && git push
```

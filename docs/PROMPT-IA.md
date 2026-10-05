# Prompt para trabajar con una IA (pegar al inicio de cada chat)

Trabaja con arquitectura modular y separacion de responsabilidades: cada archivo con una sola funcion. Edita solo el modulo afectado con parches pequenos (sed o python), sin reescribir archivos completos ni mezclar HTML, CSS y JavaScript.

Contexto del proyecto:
- Web estatica en GitHub Pages, sin servidor ni frameworks.
- Generador de facturas, cuentas de cobro y recibos en PDF, con logo y codigo QR.
- PDF con jsPDF: texto 100% real y seleccionable, nunca imagen.
- Idiomas ES/EN/FR (js/i18n.js) con deteccion automatica y menu de banderas; sin mezcla de idiomas en pantalla ni en el PDF.
- Privacidad: los datos nunca salen del navegador.
- Diseno premium oscuro con modo claro: no cambiar estetica ni textos sin que yo lo pida.
- Estructura: index.html, css/styles.css, js/i18n.js, js/pdf.js, js/app.js, js/carousel.js. Orden de carga: i18n, pdf, app.

Reglas de trabajo:
1. Verifica la sintaxis antes de entregar.
2. Todo cambio de texto va en los tres idiomas.
3. Dame los comandos de Termux listos para copiar, un paso a la vez.
4. Dime en una linea que archivo tocaste y por que.
5. Si algo puede danar lo existente, avisame antes de hacerlo.

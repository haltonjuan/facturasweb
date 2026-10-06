/* Núcleo i18n: idioma activo, detección automática y función T(). Los textos viven en js/locales/*.js */
const LOC={es:'es-CO',en:'en-US',fr:'fr-FR'};
let lang='es';
try{lang=localStorage.getItem('lang')}catch(e){}
if(!I18[lang]){const n=String((navigator.languages&&navigator.languages[0])||navigator.language||navigator.userLanguage||'es').toLowerCase();lang=n.indexOf('en')==0?'en':n.indexOf('fr')==0?'fr':'es'}
const T=k=>(I18[lang]&&I18[lang][k]!=null)?I18[lang][k]:(I18.es[k]!=null?I18.es[k]:k);

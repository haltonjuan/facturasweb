/* Traducción de landings estáticas. El español queda en el HTML (SEO). EN/FR solo si el visitante lo eligió o su navegador lo pide; nunca para bots. No toca meta, canonical ni JSON-LD. */
(function(){
var BOT=/bot|crawl|spider|slurp|google|bing|mediapartners|lighthouse|headless|preview/i;
var UI={es:{about:'Sobre nosotros',priv:'Política de Privacidad',terms:'Términos de Servicio',contact:'Contacto',home:'Inicio',copy:'Generador de Facturas Gratis Online'},en:{about:'About us',priv:'Privacy Policy',terms:'Terms of Service',contact:'Contact',home:'Home',copy:'Free Online Invoice Generator'},fr:{about:'À propos',priv:'Politique de confidentialité',terms:'Conditions d’utilisation',contact:'Contact',home:'Accueil',copy:'Générateur de factures gratuit en ligne'}};
function saved(){try{var l=localStorage.getItem('lang');return /^(es|en|fr)$/.test(l)?l:''}catch(e){return ''}}
function pick(){var s=saved();if(s)return s;if(BOT.test(navigator.userAgent))return 'es';var n=String((navigator.languages&&navigator.languages[0])||navigator.language||'es').toLowerCase();return n.indexOf('en')==0?'en':n.indexOf('fr')==0?'fr':'es'}
function sw(cur){var t=document.querySelector('.top');if(!t)return;var b=document.createElement('span');b.style.cssText='float:right';['es','en','fr'].forEach(function(l){var a=document.createElement('a');a.href='#';a.textContent=l.toUpperCase();a.style.cssText='margin-left:12px;font-weight:'+(l==cur?'700':'500')+';opacity:'+(l==cur?'1':'.7');a.onclick=function(e){e.preventDefault();try{localStorage.setItem('lang',l)}catch(x){}location.reload()};b.appendChild(a)});t.appendChild(b)}
function run(){var lang=pick(),slug=location.pathname.replace(/^\/+|\/+$|\.html$/g,''),D=window.LD&&window.LD[slug];sw(lang);
if(lang==='es'||!D||!D[lang])return;
var m=document.querySelector('main');if(!m)return;m.innerHTML=D[lang].h;document.title=D[lang].t;document.documentElement.lang=lang;
var u=UI[lang],f=document.querySelector('footer');if(f){var a=f.querySelectorAll('.legal-links a'),k=['about','priv','terms','contact'];for(var i=0;i<a.length&&i<4;i++)a[i].textContent=u[k[i]];var n=f.childNodes;for(var j=0;j<n.length;j++){if(n[j].nodeType==3&&n[j].nodeValue.indexOf('©')>-1)n[j].nodeValue='© 2026 '+u.copy+' · '}var h=f.querySelector(':scope > a');if(h)h.textContent=u.home}}
run()})();

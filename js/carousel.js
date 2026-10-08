/* Cinta de ejemplos (carrusel). Velocidad: constante SPEED. */
(()=>{
/* ===== EDITA AQUÍ: velocidad de la cinta en píxeles por segundo ===== */
const SPEED=50;
const box=document.getElementById('cz'),trk=document.getElementById('czk');
if(!box||!trk)return;
const base=[...trk.children];
for(let i=0;i<2;i++)base.forEach(f=>{const c=f.cloneNode(true),m=c.querySelector('img');c.setAttribute('aria-hidden','true');m.alt='';m.removeAttribute('data-ia');trk.append(c)});
trk.classList.add('run');box.classList.add('on');
const calc=()=>{const f=trk.firstElementChild,P=(f.getBoundingClientRect().width+(parseFloat(getComputedStyle(f).marginRight)||0))*base.length;trk.style.setProperty('--p',-P+'px');trk.style.setProperty('--d',P/SPEED+'s')};
calc();addEventListener('resize',calc);
const hold=()=>box.classList.add('hold'),go=()=>box.classList.remove('hold');
box.addEventListener('pointerdown',hold);['pointerup','pointercancel','pointerleave'].forEach(t=>box.addEventListener(t,go));
box.addEventListener('contextmenu',e=>e.preventDefault());
})();

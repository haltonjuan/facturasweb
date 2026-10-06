/* Decoración UI v2 (no toca IDs ni lógica): custom select sincronizado, dropzone y texto de confianza */
(()=>{const D={es:['Arrastra tu logo aquí o haz clic para subir','Subir archivo'],en:['Drag your logo here or click to upload','Upload file'],fr:['Glissez votre logo ici ou cliquez pour importer','Importer un fichier']};
const L=()=>D[typeof lang!=='undefined'&&D[lang]?lang:'es'],Q=s=>document.querySelectorAll(s);let cur=null;
const set=(n,v)=>{if(n.textContent!==v)n.textContent=v};
const sync=cs=>{const s=cs.querySelector('select');set(cs.querySelector('.ct'),(s.options[s.selectedIndex]||{}).textContent||'')};
const close=()=>{if(cur){cur.classList.remove('open');cur.firstChild.setAttribute('aria-expanded','false');cur=null}};
function open(cs){close();const s=cs.querySelector('select'),m=cs.querySelector('.cm');m.innerHTML='';[...s.options].forEach(o=>{const i=document.createElement('div');i.className='co'+(o.value===s.value?' on hl':'');i.setAttribute('role','option');i.dataset.v=o.value;i.textContent=o.textContent;m.append(i)});cs.classList.add('open');cs.firstChild.setAttribute('aria-expanded','true');cur=cs;const h=m.querySelector('.hl');h&&h.scrollIntoView({block:'nearest'})}
function pick(cs,v){const s=cs.querySelector('select');s.value=v;['input','change'].forEach(e=>s.dispatchEvent(new Event(e,{bubbles:true})));sync(cs);close()}
document.addEventListener('click',e=>{const o=e.target.closest('.co'),b=e.target.closest('.cb');
if(o){e.preventDefault();pick(o.closest('.cs'),o.dataset.v);return}
if(b){e.preventDefault();const cs=b.parentElement;cs.classList.contains('open')?close():open(cs);return}
close();setTimeout(()=>Q('.cs').forEach(sync),0)});
document.addEventListener('keydown',e=>{const b=e.target.closest&&e.target.closest('.cb');if(!b)return;const cs=b.parentElement;
if(e.key==='Escape'){close();return}
if(!['Enter',' ','ArrowDown','ArrowUp'].includes(e.key))return;e.preventDefault();
if(!cs.classList.contains('open')){open(cs);return}
const os=[...cs.querySelectorAll('.co')];let i=os.findIndex(x=>x.classList.contains('hl'));
if(e.key==='Enter'||e.key===' '){i>=0&&pick(cs,os[i].dataset.v);return}
i=Math.max(0,Math.min(os.length-1,i+(e.key==='ArrowDown'?1:-1)));os.forEach((x,k)=>x.classList.toggle('hl',k===i));os[i].scrollIntoView({block:'nearest'})});
function run(){
Q('select').forEach(s=>{if(s.parentElement.classList.contains('cs'))return;const w=document.createElement('div');w.className='cs';w.innerHTML='<div class="cb" role="combobox" tabindex="0" aria-haspopup="listbox" aria-expanded="false"><span class="ct"></span><span class="mi" aria-hidden="true">expand_more</span></div><div class="cm" role="listbox"></div>';s.before(w);w.append(s)});
Q('.cs').forEach(sync);
const l=document.querySelector('#lg')&&document.querySelector('#lg').closest('label');
if(l){l.id='lgl';let z=l.querySelector('.dz');if(!z){z=document.createElement('div');z.className='dz';l.append(z);
['dragenter','dragover'].forEach(e=>l.addEventListener(e,()=>l.classList.add('over')));['dragleave','drop'].forEach(e=>l.addEventListener(e,()=>l.classList.remove('over')));
l.querySelector('#lg').addEventListener('change',e=>{z.dataset.f=e.target.files[0]?e.target.files[0].name:'';run()})}
const k=(typeof lang!=='undefined'?lang:'es')+'|'+(z.dataset.f||'');
if(z.dataset.k!==k){z.dataset.k=k;z.innerHTML='<span class="mi big" aria-hidden="true">cloud_upload</span><span class="t"></span><span class="sb"></span>';z.querySelector('.t').textContent=z.dataset.f||L()[0];z.querySelector('.sb').textContent=L()[1]}}
Q('.ih').forEach(h=>{const r=h.nextElementSibling;h.hidden=!(r&&r.children.length)})}
new MutationObserver(()=>{clearTimeout(run.k);run.k=setTimeout(run,30)}).observe(document.body,{childList:true,subtree:true});run()})();

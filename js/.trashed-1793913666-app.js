/* Logica de la app: formularios, modelo de datos, vista previa y eventos. */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TK=['invoice_title','credit_note_title','cash_receipt_title'];
const TLK=['total_due','tl1','tl2'];
let tab=0,sty=3,logo=null;
const CUC=['USD','COP','EUR','MXN','ARS','PEN','CLP','BRL','GBP'];
const cuName=c=>{try{return new Intl.DisplayNames([lang],{type:'currency'}).of(c)+' ('+c+')'}catch(e){return c}};
const fm=(n,c,x)=>{n=+n||0;if(c=='otra')return(x||'$')+' '+n.toLocaleString(LOC[lang],{maximumFractionDigits:2});const d=/COP|CLP/.test(c)?0:2;try{return n.toLocaleString(LOC[lang],{style:'currency',currency:c,minimumFractionDigits:d,maximumFractionDigits:d})}catch(e){return c+' '+n.toFixed(2)}};
const DT=[['','dt_none'],['NIT/RUT','NIT / RUT'],['C.C.','dt_cc'],['C.E.','dt_ce'],['DNI','DNI'],['Pasaporte','dt_pas'],['Licencia de conducir','dt_lic'],['RFC','dt_rfc'],['CUIT','dt_cuit'],['RUC','dt_ruc'],['NIF','dt_nif'],['Tax ID','dt_tax'],['otro','dt_other']];
const PM=[0,1,2,3,4,5,6];
const CC=[['+1','US|CA'],['+34','ES'],['+33','FR'],['+52','MX'],['+54','AR'],['+55','BR'],['+56','CL'],['+57','CO'],['+58','VE'],['+51','PE'],['+593','EC'],['+591','BO'],['+595','PY'],['+598','UY'],['+506','CR'],['+507','PA'],['+502','GT'],['+503','SV'],['+504','HN'],['+505','NI'],['+53','CU'],['+351','PT'],['+44','GB'],['+49','DE'],['+39','IT'],['+32','BE'],['+41','CH'],['+212','MA'],['+221','SN'],['+225','CI']];
const ccName=c=>{try{const n=new Intl.DisplayNames([lang],{type:'region'});return c[0]+' '+c[1].split('|').map(r=>n.of(r)).join(' / ')}catch(e){return c[0]}};
const PHN=(l,k,kp,kx)=>`<label>${l}<div class="tph"><span class="phs"><select data-k="${kp}"><option value="">${T('cc_none')}</option>${CC.map(c=>`<option value="${c[0]}">${ccName(c)}</option>`).join('')}<option value="otro">${T('cc_other')}</option></select><span class="dtc" data-dx="${kp}" hidden><input data-k="${kx}" data-own="${kp}" placeholder="+" aria-label="${T('cc_other')}" maxlength="6" inputmode="tel" autocomplete="off"><button type="button" class="b g dtl" data-back="${kp}" title="${T('back_list')}" aria-label="${T('back_list')}">✕</button></span></span><input data-k="${k}" type="tel" autocomplete="tel-national"></div></label>`;
const fld=(l,k,t='text',p='')=>`<label>${l}<input data-k="${k}" type="${t}" placeholder="${p}"${t=='number'?' min="0" step="any" inputmode="decimal"':''}></label>`;
const ta=(l,k,h,p='')=>`<label>${l}<textarea data-k="${k}" style="min-height:${h}px" placeholder="${p}"></textarea></label>`;
const buildPN=()=>{
const DOC=(kt,kn,kx)=>`<div class="r"><label>${T('doc_type')}<select data-k="${kt}">${DT.map(o=>`<option value="${o[0]}">${T(o[1])}</option>`).join('')}</select><span class="dtc" data-dx="${kt}" hidden><input data-k="${kx}" data-own="${kt}" placeholder="${T('ph_doc_own')}" aria-label="${T('ph_doc_own')}" maxlength="30" autocomplete="off"><button type="button" class="b g dtl" data-back="${kt}" title="${T('back_list')}" aria-label="${T('back_list')}">✕</button></span></label>${fld(T('doc_num'),kn,'text',T('ph_doc_num'))}</div>`;
const EM=`<fieldset><legend>${T('em_legend')}</legend>${fld(T('l_name_co'),'em','text','Mi Negocio S.A.S.')}${DOC('dt','nit','dtx')}${PHN(T('l_tel'),'tel','tp','tpx')}${fld(T('mail'),'mail','email')}${fld(T('addr'),'dir')}</fieldset>`;
const CL=`<fieldset><legend>${T('cl_legend')}</legend>${fld(T('cl_name'),'cl')}${DOC('cdt','clnit','cdtx')}${PHN(T('client_phone'),'cltel','ctp','ctpx')}${fld(T('client_address'),'cldir')}</fieldset>`;
const MT=`<div class="sep"><div class="r">${fld(T('date'),'date','date')}${fld(T('invoice_number'),'nro','text','0001')}</div><label>${T('cur_l')}<select data-k="cur">${CUC.map(c=>`<option value="${c}">${cuName(c)}</option>`).join('')}<option value="otra">${T('cur_other')}</option></select></label><label data-cx hidden>${T('cur_own')}<input data-k="curx" placeholder="${T('ph_cur')}"></label></div>`;
return[
EM+CL+MT+`<fieldset><legend>${T('items_legend')}</legend><div class="it ih"><span>${T('description')}</span><span>${T('quantity')}</span><span>${T('price')}</span><span></span></div><div id="rows"></div><button type="button" class="b g" id="ar">${T('add_row')}</button></fieldset>`+fld(T('tax_lbl'),'tax','number','19')+fld(T('disc_lbl'),'dsc','number',T('ph_disc'))+ta(T('notes_lbl'),'nt',64,T('ph_notes')),
EM+CL+MT+ta(T('services_lbl'),'sv',90,T('ph_services'))+fld(T('val_lbl'),'val','number')+fld(T('due_date'),'due','text',T('ph_due'))+`<fieldset><legend>${T('bank_details')}</legend><div class="r">${fld(T('l_bank'),'bk')}${fld(T('l_acct_type'),'bt','text',T('ph_acct_type'))}</div>${fld(T('l_acct_no'),'bn')}</fieldset>`,
EM+MT+`<fieldset><legend>${T('tab2')}</legend>${fld(T('received_from'),'cl','text',T('cl_name'))}${fld(T('l_sum'),'amt','number')}${ta(T('l_concept'),'con',72,T('ph_concept'))}<label>${T('payment_method')}<select data-k="pm">${PM.map(p=>`<option value="${p}">${T('pm'+p)}</option>`).join('')}</select></label></fieldset>`
]};
const row=(v)=>{const d=document.createElement('div');d.className='it';d.innerHTML='<input placeholder="'+T('description')+'"><input type="number" min="0" step="any" value="1" aria-label="'+T('quantity')+'"><input type="number" min="0" step="any" placeholder="'+T('price')+'" aria-label="'+T('price')+'"><button type="button" class="b g x" title="'+T('del_row')+'" aria-label="'+T('del_row')+'">✕</button>';if(v)[...d.querySelectorAll('input')].forEach((x,n)=>x.value=v[n]);$('#rows').append(d)};
function buildPanels(keep){
let sv=[],rv=[];
if(keep){sv=$$('#pn [data-k]').map(i=>[i.closest('.panel').id,i.dataset.k,i.value]);rv=$$('#rows .it:not(.ih)').map(r=>[...r.querySelectorAll('input')].map(i=>i.value))}
$('#pn').innerHTML=buildPN().map((h,i)=>`<div class="panel" id="p${i}"${i!=tab?' hidden':''}>${h}</div>`).join('');
sv.forEach(a=>{const e=$('#'+a[0]+' [data-k="'+a[1]+'"]');if(e)e.value=a[2]});
if(rv.length)rv.forEach(v=>row(v));else row();
}
buildPanels(0);
const today=new Date(Date.now()-new Date().getTimezoneOffset()*6e4).toISOString().slice(0,10);
$$('[data-k=date]').forEach(i=>i.value=today);
$$('[data-k=nro]').forEach(i=>i.value='0001');
$$('[data-k=cur]').forEach(i=>i.value='USD');
const g=k=>{const i=$(`#p${tab} [data-k="${k}"]`);return i?i.value.trim():''};

/* ===== Modelo de datos: la vista previa y el PDF salen de aquí, así siempre coinciden ===== */
const nv=v=>/^(no|no aplica|n\/a|na|s\/n|sin documento|ninguno|ninguna|-+)\.?$/i.test(v)?'':v;
const phn=(k,kp,kx)=>{const n=g(k);if(!n)return'';let c=g(kp);if(c=='otro'){c=g(kx).replace(/[^\d+]/g,'');c=c?(c[0]=='+'?c:'+'+c):''}return c&&!/^\+/.test(n)?c+' '+n:n};
const idl=(kt,kn,kx)=>{const n=nv(g(kn));if(!n)return'';const ty=g(kt);return(ty=='otro'?g(kx)||T('doc_word'):ty||T('doc_word'))+': '+n};
const initials=s=>((s||'').match(/[\p{L}\p{N}]+/gu)||[]).slice(0,2).map(w=>w[0]).join('').toUpperCase();
function qrUrl(){
let u=$('#qu').value.trim();const p=$('#qp').value;if(p=='none')return'';
if(u){if(p=='wa'&&/^\+?[\d\s-]{7,}$/.test(u))u='https://wa.me/'+u.replace(/\D/g,'');else if(p=='ig'&&!/^https?:/i.test(u))u='https://instagram.com/'+u.replace(/^@/,'')}
return u}
function model(){
const cu=g('cur')||'USD',cx=g('curx');
const dec=/COP|CLP/.test(cu)?0:2,K=Math.pow(10,dec),rd=x=>Math.round(((+x||0)+Number.EPSILON)*K)/K;
const d=g('date');
const D={tab,sty,m:n=>fm(n,cu,cx),cu,cx,title:T(TK[tab]),nro:g('nro'),
em:g('em'),id:idl('dt','nit','dtx'),tel:phn('tel','tp','tpx'),mail:g('mail'),dir:g('dir'),
date:d?new Date(d+'T12:00').toLocaleDateString(LOC[lang],{day:'numeric',month:'long',year:'numeric'}):'',
cl:g('cl'),cid:tab<2?idl('cdt','clnit','cdtx'):'',ctel:tab<2?phn('cltel','ctp','ctpx'):'',cdir:tab<2?g('cldir'):'',
qr:qrUrl(),tl:T(TLK[tab]),tot:0};
if(tab==0){
D.rows=$$('#rows .it').map(r=>{const[a,q,p]=[...r.querySelectorAll('input')].map(i=>i.value.trim());const Q=+q||0,P=+p||0;return{d:a,q:Q,p:P,a:rd(Q*P)}}).filter(r=>r.d||r.p);
D.sub=D.rows.reduce((a,r)=>a+r.a,0);
D.ds=Math.min(100,Math.max(0,+g('dsc')||0));D.dv=rd(D.sub*D.ds/100);
D.base=D.sub-D.dv;
D.tx=+g('tax')||0;D.iva=rd(D.base*D.tx/100);
D.tot=D.base+D.iva;D.nt=g('nt');
}else if(tab==1){
D.tot=rd(g('val'));D.sv=g('sv');D.due=g('due');
D.bank=[[T('l_bank'),g('bk')],[T('l_acct_type'),g('bt')],[T('acct_no'),g('bn')]].filter(b=>b[1]);
D.sig=[T('signature_emisor'),T('signature_client')];
}else{
D.tot=rd(g('amt'));D.con=g('con');D.pm=T('pm'+(g('pm')||0));
D.sig=[T('sg_by'),T('sg_rec')];
}
return D}

/* ===== Vista previa (HTML) ===== */
function htmlDoc(D){
const ln=(l,v)=>v?`<div>${l?l+': ':''}${esc(v)}</div>`:'';
const ini=initials(D.em);
const mark=logo?`<img src="${logo.u}" alt="Logo">`:(ini?`<div class="av">${esc(ini)}</div>`:'');
const who=`<div class="who">${mark}<div>${D.em?`<b style="font-size:17px">${esc(D.em)}</b>`:''}${D.id?`<div>${esc(D.id)}</div>`:''}${ln(T('tel_s'),D.tel)}${ln(T('mail'),D.mail)}${ln(T('addr'),D.dir)}</div></div>`;
let h=`<div class="hd">${who}<div class="meta"><h3>${D.title}</h3><div class="mt">${T('invoice_number')} ${esc(D.nro)||'______'}</div></div></div>`;
const c=(D.cl?`<div><b>${esc(D.cl)}</b></div>`:'')+(D.cid?`<div>${esc(D.cid)}</div>`:'')+ln(T('tel_s'),D.ctel)+ln(T('addr'),D.cdir);
const cb=D.tab<2&&c?`<div class="bx"><small class="mt">${T('cliente').toUpperCase()}</small>${c}</div>`:'<div></div>';
const dc=(D.date?`<div><small class="mt">${T('date').toUpperCase()}</small><div>${esc(D.date)}</div></div>`:'')+(D.due?`<div style="margin-top:6px"><small class="mt">${T('due_date').toUpperCase()}</small><div>${esc(D.due)}</div></div>`:'');
if((D.tab<2&&c)||dc)h+=`<div class="rw">${cb}<div class="dc">${dc}</div></div>`;
const tot=`<div class="ln tot"><span>${D.tl}</span><span>${D.m(D.tot)}</span></div>`;
if(D.tab==0){
h+=`<div class="tw"><table><thead><tr><th>${T('description')}</th><th class="n">${T('quantity')}</th><th class="n">${T('price')}</th><th class="n">${T('total_item')}</th></tr></thead><tbody>${D.rows.map(r=>`<tr><td>${esc(r.d)}</td><td class="n">${r.q}</td><td class="n">${D.m(r.p)}</td><td class="n">${D.m(r.a)}</td></tr>`).join('')}</tbody></table></div><div class="tt"><div class="ln"><span>${T('subtotal')}</span><span>${D.m(D.sub)}</span></div>${D.ds?`<div class="ln"><span>${T('discount')} (${D.ds}%)</span><span>-${D.m(D.dv)}</span></div><div class="ln"><span>${T('taxable_base')}</span><span>${D.m(D.base)}</span></div>`:''}${D.tx?`<div class="ln"><span>${T('tax')} (${D.tx}%)</span><span>+${D.m(D.iva)}</span></div>`:''}${tot}</div>${D.nt?`<div class="bx" style="margin-top:18px"><small class="mt">${T('notes_h').toUpperCase()}</small>${esc(D.nt)}</div>`:''}`;
}else if(D.tab==1){
h+=(D.sv?`<div class="bx"><small class="mt">${T('services_lbl').toUpperCase()}</small>${esc(D.sv)}</div>`:'')+`<div class="tt">${tot}</div>`+(D.bank.length?`<div class="bk"><small class="mt">${T('bank_details').toUpperCase()}</small>${D.bank.map(b=>ln(b[0],b[1])).join('')}</div>`:'');
}else{
h+=`<div class="bx"><small class="mt">${T('received_from').toUpperCase()}</small><b>${esc(D.cl)||'__________'}</b></div><div class="bx"><small class="mt">${T('for_concept').toUpperCase()}</small>${esc(D.con)||'__________'}</div><div class="bx"><small class="mt">${T('payment_method').toUpperCase()}</small>${esc(D.pm)}</div><div class="tt">${tot}</div>`;
}
if(D.sig)h+=`<div class="sg"><div>${D.sig[0]}</div><div>${D.sig[1]}</div></div>`;
if(D.qr)h+=`<div class="ft"><span></span><div class="qr"><div class="qrc"></div><small>${T('qt')}</small></div></div>`;
return h}
function render(){
const D=model();
$$('[data-cx]').forEach(l=>l.hidden=D.cu!='otra');
['dt','cdt','tp','ctp'].forEach(k=>{const o=g(k)=='otro';$$('select[data-k="'+k+'"]').forEach(s=>s.hidden=o);$$('[data-dx="'+k+'"]').forEach(l=>l.hidden=!o)});
$('#mini').className='doc mini t'+sty;$('#mini').innerHTML=htmlDoc(D);
if(D.qr)$$('.qrc').forEach(q=>{try{new QRCode(q,{text:D.qr,width:92,height:92,correctLevel:QRCode.CorrectLevel.M})}catch(e){}});
$('#lt').innerHTML='<span>'+D.tl+'</span><b>'+D.m(D.tot)+'</b>';
}



/* ===== Documento "Otro": campo vacío para escribir; si lo dejan vacío vuelve a "Sin documento" ===== */
const own=(k,v)=>{$$('select[data-k="'+k+'"]').forEach(s=>s.value=v);const kx=$('[data-own="'+k+'"]').dataset.k;$$('[data-k="'+kx+'"]').forEach(i=>i.value='')};
document.addEventListener('change',e=>{const s=e.target;if(s.tagName=='SELECT'&&(s.dataset.k=='dt'||s.dataset.k=='cdt'||s.dataset.k=='tp'||s.dataset.k=='ctp')&&s.value=='otro'){
const kx=$('[data-own="'+s.dataset.k+'"]').dataset.k;$$('[data-k="'+kx+'"]').forEach(i=>i.value='');render();
const i=$('#p'+tab+' [data-own="'+s.dataset.k+'"]');setTimeout(()=>i&&i.focus(),30)}});
document.addEventListener('focusout',e=>{const i=e.target;if(i.dataset&&i.dataset.own&&!i.value.trim()){own(i.dataset.own,'');render()}});
document.addEventListener('click',e=>{const b=e.target.closest('[data-back]');if(b){own(b.dataset.back,'');render()}});
/* ===== Eventos ===== */
document.addEventListener('input',e=>{const k=e.target.dataset.k;if(k)$$(`[data-k="${k}"]`).forEach(x=>{if(x!==e.target)x.value=e.target.value});render()});
document.addEventListener('click',e=>{const x=e.target.closest('.x');if(x){x.parentElement.remove();render()}});
document.addEventListener('click',e=>{if(e.target.closest('#ar')){row();render()}});
$$('nav button').forEach((b,i)=>b.onclick=()=>{tab=i;$('#ct').textContent=T('ct'+i);$$('nav button').forEach((x,j)=>x.setAttribute('aria-selected',j==i));$$('.panel').forEach((p,j)=>p.hidden=j!=i);render()});
$('#sty').onchange=e=>{sty=+e.target.value;render()};
/* Logo: se lee en local (FileReader), se reduce y se guarda como PNG/JPG que jsPDF entiende */
$('#lg').onchange=e=>{const f=e.target.files[0];if(!f){logo=null;return render()}
const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{
const k=Math.min(1,700/Math.max(im.width,im.height)),w=Math.max(1,Math.round(im.width*k)),h=Math.max(1,Math.round(im.height*k));
const cv=document.createElement('canvas');cv.width=w;cv.height=h;const cx=cv.getContext('2d');
const png=/png|webp|gif|svg/.test(f.type);if(!png){cx.fillStyle='#fff';cx.fillRect(0,0,w,h)}
cx.drawImage(im,0,0,w,h);
logo={u:cv.toDataURL(png?'image/png':'image/jpeg',.92),t:png?'PNG':'JPEG',w,h};render()};
im.onerror=()=>{logo=null;render()};im.src=r.result};r.readAsDataURL(f)};
$('#dl').onclick=()=>{
render();
try{if(!window.jspdf)throw 0;makePDF(model());
if(typeof gtag==='function'){gtag('event','descarga_pdf',{'event_category':'Interacción','event_label':'Factura Descargada Successfully','idioma_activo':lang||'es'})}}
catch(e){console.error(e);alert(T('pdf_err'))}
};
const R=document.documentElement,tg=$('#tg'),th=l=>{R.dataset.theme=l;tg.textContent=l?'☾':'☀';try{localStorage.setItem('th',l)}catch(e){}};
try{th(localStorage.getItem('th')||'')}catch(e){}
tg.onclick=()=>th(R.dataset.theme=='light'?'':'light');
$$('[data-m]').forEach(b=>b.onclick=()=>$('#'+b.dataset.m).showModal());
$$('dialog').forEach(d=>d.onclick=e=>{if(e.target==d||e.target.dataset.c!==undefined)d.close()});
/* JSON-LD de las preguntas frecuentes (se regenera al cambiar de idioma) */
function updateFaqSchema(){
let ld=document.getElementById('faq-ld');
if(!ld){ld=document.createElement('script');ld.type='application/ld+json';ld.id='faq-ld';document.head.append(ld)}
const fq=$$('.faq details').map(d=>({'@type':'Question',name:d.querySelector('h2').textContent,acceptedAnswer:{'@type':'Answer',text:d.querySelector('p').textContent}}));
ld.textContent=JSON.stringify({'@context':'https://schema.org','@type':'FAQPage',mainEntity:fq})}
/* Metadatos y atributos de accesibilidad traducibles */
function applyMeta(){
const set=(s,v)=>{const e=document.querySelector(s);if(e)e.setAttribute('content',v)};
set('meta[name=description]',T('desc'));
['og:title','twitter:title'].forEach(p=>set('meta[property="'+p+'"],meta[name="'+p+'"]',T('title')));
['og:description','twitter:description'].forEach(p=>set('meta[property="'+p+'"],meta[name="'+p+'"]',T('desc')));
tg.title=T('theme_t');
$$('[data-ia]').forEach(e=>{const[a,k]=e.dataset.ia.split(':');e.setAttribute(a,T(k))})}
function applyLang(){
R.lang=lang;document.title=T('title');
$$('[data-i]').forEach(e=>e.textContent=T(e.dataset.i));
$$('[data-ih]').forEach(e=>e.innerHTML=T(e.dataset.ih));
applyMeta();
R.style.setProperty('--ot',JSON.stringify(T('opt_open')));R.style.setProperty('--oc',JSON.stringify(T('opt_close')));
$$('.lgb').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l==lang));
$('#ct').textContent=T('ct'+tab);
buildPanels(1);render();updateFaqSchema();
}
document.addEventListener('click',e=>{const b=e.target.closest('.lgb');if(b){lang=b.dataset.l;try{localStorage.setItem('lang',lang)}catch(x){}applyLang()}});
applyLang();

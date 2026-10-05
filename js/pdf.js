/* Generacion del PDF con jsPDF (texto real y seleccionable). Depende de i18n.js y de app.js (en tiempo de ejecucion). */
/* ===== PDF con texto real (jsPDF: texto y vectores, sin imágenes de la página) ===== */
const PW=210,PH=297,MX=14,MTOP=14,MBOT=14,CW=PW-2*MX;
const WIN=' €‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ';
const S=s=>Array.from(String(s==null?'':s).replace(/[    ]/g,' ')).map(ch=>{const c=ch.charCodeAt(0);return(c==10||(c>=32&&c<127)||(c>=161&&c<=255)||WIN.indexOf(ch)>0)?ch:'?'}).join('');
const hx=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
function qrMatrix(u){const t=document.createElement('div');const q=new QRCode(t,{text:u,width:92,height:92,correctLevel:QRCode.CorrectLevel.M});return q._oQRCode}
function makePDF(D){
const{jsPDF}=window.jspdf;
const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
doc.setProperties({title:S(D.title+(D.nro?' - '+D.nro:'')),creator:'facturasonline.lat'});
const C={ink:'#1e293b',mut:'#64748b',ln:'#e2e8f0',mint:'#e8f5e9',mintLn:'#bfe3c8',mintInk:'#0f2a1d'};
const st=D.sty;
const fill=h=>doc.setFillColor(...hx(h)),stroke=h=>doc.setDrawColor(...hx(h)),ink=h=>doc.setTextColor(...hx(h));
const font=(sz,b)=>{doc.setFont('helvetica',b?'bold':'normal');doc.setFontSize(sz)};
const wrap=(t,w)=>doc.splitTextToSize(S(t),w);
const tx=(t,x,y,o)=>doc.text(S(t),x,y,o);
let y=0;
const ensure=h=>{if(y+h>PH-MBOT){doc.addPage();y=MTOP}};
/* --- Encabezado --- */
const top=st==2?10:MTOP;
const ini=initials(D.em).replace(/[^A-Z0-9]/gi,'');
let mw=0,mh=0,lg=null;
if(logo){const k=Math.min(40/logo.w,20/logo.h);mw=logo.w*k;mh=logo.h*k;lg=logo}else if(ini){mw=mh=15}
const lx=MX+(mw?mw+4:0),lwid=112-(mw?mw+4:0);
const tl=[];
if(D.em){font(12.5,1);wrap(D.em,lwid).forEach((s,i)=>tl.push([s,12.5,1,5.6]))}
font(9,0);
[D.id,D.tel&&T('tel_s')+': '+D.tel,D.mail&&T('mail')+': '+D.mail,D.dir&&T('addr')+': '+D.dir].filter(Boolean).forEach(s=>wrap(s,lwid).forEach(w=>tl.push([w,9,0,4.4])));
const textH=tl.reduce((a,l)=>a+l[3],0);
const hh=Math.max(textH,mh,13);
const hc=st==2?'#ffffff':C.ink,hs=st==2?'#c7d2fe':C.mut;
if(st==2){fill('#312e81');doc.rect(0,0,PW,top+hh+8,'F')}
if(lg){try{doc.addImage(lg.u,lg.t,MX,top,mw,mh)}catch(e){}}
else if(ini){fill(st==2?'#4f4aa8':'#e2e8f0');doc.circle(MX+7.5,top+7.5,7.5,'F');font(11,1);ink(st==2?'#ffffff':'#334155');tx(ini,MX+7.5,top+9.2,{align:'center'})}
let ty=top+4.2;
tl.forEach(l=>{font(l[1],l[2]);ink(l[2]?hc:(st==2?'#e0e7ff':'#475569'));tx(l[0],lx,ty);ty+=l[3]});
font(15,1);ink(hc);tx(D.title,PW-MX,top+5,{align:'right'});
font(10,0);ink(hs);tx(T('invoice_number')+' '+(D.nro||'______'),PW-MX,top+11,{align:'right'})
const hb=top+hh;
if(st==2){y=hb+8+9}
else{stroke(st==3?'#334155':C.ln);doc.setLineWidth(st==3?.9:.25);doc.line(MX,hb+4.5,PW-MX,hb+4.5);y=hb+13}
/* --- Cliente y fechas --- */
const lab=(t,x,yy,o)=>{font(7.5,1);ink(C.mut);tx(t,x,yy,o)};
const yi=y;let yl=y;
if(D.tab<2&&(D.cl||D.cid||D.ctel||D.cdir)){
lab(T('cliente').toUpperCase(),MX,yl);yl+=4.6;
if(D.cl){font(10.5,1);ink(C.ink);wrap(D.cl,100).forEach(s=>{tx(s,MX,yl);yl+=4.8})}
font(9.5,0);ink('#334155');
[D.cid,D.ctel&&T('tel_s')+': '+D.ctel,D.cdir&&T('addr')+': '+D.cdir].filter(Boolean).forEach(s=>wrap(s,100).forEach(w=>{tx(w,MX,yl);yl+=4.4}))}
let yr=y;
if(D.date){lab(T('date').toUpperCase(),PW-MX,yr,{align:'right'});yr+=4.6;font(10,0);ink(C.ink);tx(D.date,PW-MX,yr,{align:'right'});yr+=6}
if(D.due){lab(T('due_date').toUpperCase(),PW-MX,yr,{align:'right'});yr+=4.6;font(10,0);ink(C.ink);wrap(D.due,70).forEach(s=>{tx(s,PW-MX,yr,{align:'right'});yr+=4.6});yr+=1.4}
y=Math.max(yl,yr)>yi?Math.max(yl,yr)+4:y;
/* --- Bloques --- */
const block=(label,text,bold)=>{
ensure(14);lab(label,MX,y);y+=4.8;font(10.5,bold);ink(C.ink);
wrap(text,CW).forEach(s=>{ensure(5);tx(s,MX,y);y+=4.8});y+=4};
const totalBox=()=>{
const w=82,x=PW-MX-w,hgt=12;ensure(hgt+2);
fill(C.mint);stroke(C.mintLn);doc.setLineWidth(.3);doc.roundedRect(x,y,w,hgt,2,2,'FD');
font(11,1);ink(C.mintInk);tx(D.tl,x+4,y+7.6);font(13,1);tx(D.m(D.tot),x+w-4,y+7.8,{align:'right'});y+=hgt+6};
/* --- Contenido por documento --- */
if(D.tab==0){
const qR=MX+104,pR=MX+140,aR=PW-MX;
const thead=()=>{
const hgt=8;ensure(hgt+10);
if(st==1){stroke(C.ln);doc.setLineWidth(.25);doc.line(MX,y+hgt,PW-MX,y+hgt)}
else{fill(st==2?'#e0e7ff':'#f1f5f9');doc.rect(MX,y,CW,hgt,'F')}
font(8,st==1?0:1);ink(st==2?'#312e81':C.mut);
tx(T('description').toUpperCase(),MX+2,y+5.2);tx(T('quantity').toUpperCase(),qR,y+5.2,{align:'right'});tx(T('price').toUpperCase(),pR,y+5.2,{align:'right'});tx(T('total_item').toUpperCase(),aR-2,y+5.2,{align:'right'});
y+=hgt};
thead();
D.rows.forEach((r,i)=>{
font(10,0);const dl=wrap(r.d||'',80);const hgt=Math.max(dl.length*4.5,4.5)+4.4;
if(y+hgt>PH-MBOT){doc.addPage();y=MTOP;thead()}
if(st==2&&i%2){fill('#f1f5f9');doc.rect(MX,y,CW,hgt,'F')}
ink(C.ink);dl.forEach((s,j)=>tx(s,MX+2,y+5.4+j*4.5));
tx(String(r.q),qR,y+5.4,{align:'right'});tx(D.m(r.p),pR,y+5.4,{align:'right'});tx(D.m(r.a),aR-2,y+5.4,{align:'right'});
stroke(C.ln);doc.setLineWidth(.2);doc.line(MX,y+hgt,PW-MX,y+hgt);y+=hgt});
y+=6;
const tr=[[T('subtotal'),D.m(D.sub)]];
if(D.ds){tr.push([T('discount')+' ('+D.ds+'%)','-'+D.m(D.dv)]);tr.push([T('taxable_base'),D.m(D.base)])}
if(D.tx)tr.push([T('tax')+' ('+D.tx+'%)','+'+D.m(D.iva)]);
ensure(tr.length*6.5+20);
tr.forEach(l=>{font(10,0);ink('#475569');tx(l[0],PW-MX-82+4,y+4);ink(C.ink);tx(l[1],PW-MX-4,y+4,{align:'right'});y+=6.5});
y+=2;totalBox();
if(D.nt)block(T('notes_h').toUpperCase(),D.nt,0);
}else if(D.tab==1){
if(D.sv)block(T('services_lbl').toUpperCase(),D.sv,0);
totalBox();
if(D.bank.length){
const hgt=9+D.bank.length*5.2+3;ensure(hgt+2);
stroke('#cbd5e1');doc.setLineWidth(.3);doc.roundedRect(MX,y,CW,hgt,2.5,2.5,'S');
lab(T('bank_details').toUpperCase(),MX+5,y+6);
let by=y+11.5;D.bank.forEach(b=>{font(10,0);ink(C.mut);tx(b[0]+':',MX+5,by);font(10,1);ink(C.ink);tx(b[1],MX+42,by);by+=5.2});
y+=hgt+6}
}else{
block(T('received_from').toUpperCase(),D.cl||'__________',1);
block(T('for_concept').toUpperCase(),D.con||'__________',0);
block(T('payment_method').toUpperCase(),D.pm,0);
totalBox();
}
/* --- Firmas --- */
if(D.sig){
ensure(34);y+=20;stroke('#94a3b8');doc.setLineWidth(.3);
doc.line(MX,y,MX+76,y);doc.line(PW-MX-76,y,PW-MX,y);
font(8.5,0);ink(C.mut);tx(D.sig[0],MX+38,y+4.6,{align:'center'});tx(D.sig[1],PW-MX-38,y+4.6,{align:'center'});y+=10}
/* --- QR vectorial (al pie de la última página) --- */
if(D.qr){
const bw=36,bh=bw+9;let yq=Math.max(y+4,PH-MBOT-bh);
if(yq+bh>PH-MBOT){doc.addPage();yq=PH-MBOT-bh}
const xq=PW-MX-bw;
fill('#ffffff');stroke(C.ln);doc.setLineWidth(.25);doc.roundedRect(xq,yq,bw,bw,2,2,'FD');
try{const q=qrMatrix(D.qr),n=q.getModuleCount(),pad=3.2,cs=(bw-2*pad)/n;fill('#000000');
for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(q.isDark(r,c))doc.rect(xq+pad+c*cs,yq+pad+r*cs,cs+.02,cs+.02,'F')}catch(e){}
font(7.5,0);ink(C.mut);wrap(T('qt'),bw).forEach((s,i)=>tx(s,xq+bw/2,yq+bw+4+i*3.4,{align:'center'}))}
const fn=(D.title+'-'+(g('date')||'documento')).replace(/[^\w-]+/g,'-')+'.pdf';
doc.save(fn)}

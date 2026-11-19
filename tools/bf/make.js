const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const T=path.resolve(__dirname,'..');const F=f=>'file://'+T+'/node_modules/@fontsource/'+f;
const logo=fs.readFileSync(T+'/logo.svg','utf8');
const P=[
 {slug:'elementor',kicker:'For Elementor',name:'Bright Addons Pro',price:'$10',lt:'$30',accent:'#FFD66B',
  items:['56 free + 98 Pro widgets','Theme Builder and Popup Builder','WooCommerce Builder and Mega Menu']},
 {slug:'blocks',kicker:'For the block editor',name:'Bright Addons Blocks Pro',price:'$10',lt:'$30',accent:'#7EF0B0',
  items:['161 blocks (99 Pro + 62 free)','10 Pro effects for every block','Theme Templates and block popups']},
 {slug:'woocommerce',kicker:'For WooCommerce',name:'Bright Addons for WooCommerce Pro',price:'$14.50',lt:'$44.50',accent:'#FF9EC4',
  items:['28 store modules','Wishlist, Swatches and Side Cart','Gift Cards and Abandoned Cart Recovery']},
];
const css=(w,h,sq)=>`
@font-face{font-family:J;src:url(${F('plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff2')});font-weight:800}
@font-face{font-family:I;src:url(${F('inter/files/inter-latin-500-normal.woff2')});font-weight:500}
@font-face{font-family:I;src:url(${F('inter/files/inter-latin-600-normal.woff2')});font-weight:600}
*{margin:0;box-sizing:border-box}body{width:${w}px;height:${h}px;overflow:hidden}
.b{position:relative;width:100%;height:100%;padding:${sq?'72px 72px':'52px 60px'};color:#fff;font-family:I;
background:radial-gradient(circle at 85% 20%,rgba(192,77,224,.55),transparent 45%),radial-gradient(circle at 10% 110%,rgba(106,77,255,.6),transparent 50%),#0E0B26;overflow:hidden}
.ring{position:absolute;border:2px solid rgba(255,255,255,.08);border-radius:50%}
.logo{display:inline-flex;background:#fff;border-radius:14px;padding:${sq?'14px 20px':'11px 16px'}}.logo svg{height:${sq?34:28}px;width:auto}
.bf{margin-top:${sq?56:30}px;display:inline-block;font:800 ${sq?22:17}px J;letter-spacing:.18em;color:#0E0B26;background:var(--a);padding:8px 16px;border-radius:999px}
.k{margin-top:${sq?26:18}px;font:600 ${sq?26:19}px I;color:#C9C6E6}
h1{font:800 ${sq?66:44}px/1.08 J;margin-top:8px;max-width:${sq?'100%':'660px'}}
.p{margin-top:${sq?22:14}px;font:800 ${sq?40:30}px J}.p em{font-style:normal;color:var(--a)}.p small{font:500 ${sq?24:18}px I;color:#C9C6E6;margin-left:10px}
ul{list-style:none;padding:0;margin-top:${sq?30:20}px;display:flex;flex-direction:column;gap:${sq?14:9}px}
li{font:500 ${sq?27:19}px I;color:#E9E6FF}li:before{content:"";display:inline-block;width:${sq?12:9}px;height:${sq?12:9}px;border-radius:50%;background:var(--a);margin-right:14px;vertical-align:middle}
.foot{position:absolute;left:${sq?72:60}px;right:${sq?72:60}px;bottom:${sq?60:40}px;display:flex;justify-content:space-between;font:600 ${sq?24:17}px I;color:#C9C6E6}
.foot b{color:#fff}
.tag{position:absolute;${sq?'right:72px;bottom:150px;width:300px;height:300px':'right:70px;top:150px;width:300px;height:300px'};border-radius:50%;background:var(--a);color:#0E0B26;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(-10deg);box-shadow:0 0 0 14px rgba(255,255,255,.08),0 20px 60px rgba(0,0,0,.4)}
.tag b{font:800 ${sq?110:110}px/0.9 J}.tag span{font:800 ${sq?34:40}px J;letter-spacing:.12em}`;
const html=(p,w,h,sq)=>`<html><head><style>${css(w,h,sq)}</style></head><body><div class="b" style="--a:${p.accent}">
<div class="ring" style="width:700px;height:700px;right:-260px;top:-300px"></div><div class="ring" style="width:420px;height:420px;left:-180px;bottom:-240px"></div>
<div class="logo">${logo}</div><br><div class="bf">BLACK FRIDAY</div>
<div class="k">${p.kicker}</div><h1>${p.name}</h1>
<div class="p">From <em>${p.price}</em> a year<small>lifetime from ${p.lt}</small></div>
<ul>${p.items.map(i=>'<li>'+i+'</li>').join('')}</ul>
<div class="tag"><b>50%</b><span>OFF</span></div>
<div class="foot"><span>Ends 30 November · No code needed</span><b>brightaddons.com</b></div></div></body></html>`;
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const out=path.resolve(T,'../images/black-friday');fs.mkdirSync(out,{recursive:true});
for(const p of P)for(const [w,h,sq,n] of [[1200,630,0,'wide'],[1080,1080,1,'square']]){
 const pg=await b.newPage({viewport:{width:w,height:h}});const f=`${out}/_tmp.html`;fs.writeFileSync(f,html(p,w,h,sq));await pg.goto('file://'+f);await pg.evaluate(()=>document.fonts.ready);
 await pg.screenshot({path:`${out}/bf-2026-${p.slug}-${n}.png`});await pg.close();console.log(p.slug,n)}
fs.unlinkSync(`${out}/_tmp.html`);await b.close()})();

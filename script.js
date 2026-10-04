/* 釜山行程 App：行程內容在 index.html，這裡只負責切換分頁、行李勾選與插畫 */
var tab='day',cur=0,n0=0;
function $(i){return document.getElementById(i)}
function ck(k){try{return localStorage.getItem(k)==='1'}catch(e){return false}}
function sv(k,v){try{localStorage.setItem(k,v?'1':'0')}catch(e){}upd()}
function upd(){var a=document.querySelectorAll('label.ck input');if(!a.length)return;var n=0;a.forEach(function(c){if(c.checked)n++});$('pg').style.width=(n/a.length*100)+'%';$('pt').textContent=n+'/'+a.length}

/* ---- 插畫 ---- */
function W(y,c){return '<path d="M0 '+y+'q25 -7 50 0t50 0t50 0t50 0t50 0t50 0V90H0Z" fill="'+c+'"/>'}
function ST(x,y,d){return '<path d="M'+x+' '+y+'q-8 -9 0 -17t0 -15" stroke="#fff" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round" transform="translate('+(d||0)+' 0)"/>'}
var PAL={temple:['#cfe8f7','#f6e3d0'],luge:['#cfeee0','#e6f6ff'],train:['#ffe4c7','#cfe8f7'],sky:['#c9def6','#f7e8f2'],museum:['#5b4bb0','#e69bd0'],village:['#ffe9c9','#cfe8f7'],cable:['#d6ebfa','#fdf1d6'],spa:['#ffe1e6','#e1f3ff'],plane:['#cfe8f7','#eef7fd'],shop:['#ffe0ea','#fff3cc'],coffee:['#f3e3d3','#ffeedd'],food:['#ffe3d0','#fff0d9'],sea:['#bfe3f6','#f6efd9']};
var SC={
temple:function(){return '<circle cx="240" cy="26" r="12" fill="#ffd66b"/><path d="M0 90V54Q50 38 110 66L150 90Z" fill="#8a9bb0"/><rect x="62" y="44" width="40" height="16" fill="#f4f0ea"/><rect x="66" y="48" width="8" height="12" fill="#e0585b"/><rect x="78" y="48" width="8" height="12" fill="#e0585b"/><path d="M52 44L82 28L112 44Z" fill="#3a5a8c"/><path d="M64 30L82 16L100 30Z" fill="#4a6fa5"/>'+W(70,'#8cc6e8')+W(80,'#6bb0dc')},
luge:function(){return '<circle cx="250" cy="22" r="11" fill="#ffd66b"/><path d="M0 90V54Q80 22 170 50T300 40V90Z" fill="#8fd1a8"/><path d="M14 60Q90 30 160 54T292 46" stroke="#fff" stroke-width="5" fill="none"/><rect x="150" y="44" width="16" height="9" rx="4" fill="#e5698a"/><circle cx="154" cy="55" r="3" fill="#3a5a8c"/><circle cx="163" cy="55" r="3" fill="#3a5a8c"/>'+W(78,'#8cc6e8')},
train:function(){return '<circle cx="250" cy="22" r="11" fill="#ffd66b"/><path d="M0 62Q80 50 160 60T300 54" stroke="#4a6fa5" stroke-width="3" fill="none"/><rect x="70" y="42" width="26" height="14" rx="6" fill="#ffb84d"/><rect x="104" y="44" width="26" height="14" rx="6" fill="#ff7a8a"/><rect x="138" y="46" width="26" height="14" rx="6" fill="#5fc3a8"/>'+W(72,'#8cc6e8')+W(82,'#6bb0dc')},
sky:function(){return '<circle cx="60" cy="24" r="12" fill="#fff6d0"/><rect x="100" y="52" width="22" height="38" fill="#a9c0e2"/><rect x="160" y="44" width="20" height="46" fill="#9bb6dc"/><rect x="188" y="56" width="26" height="34" fill="#b4c9e6"/><rect x="132" y="12" width="24" height="78" fill="#6f97c9"/><rect x="126" y="6" width="36" height="10" rx="3" fill="#4a6fa5"/>'},
museum:function(){return '<path d="M-10 46Q60 8 130 40T310 24" stroke="#ffe29a" stroke-width="8" fill="none" opacity=".85"/><path d="M-10 60Q60 20 130 56T310 40" stroke="#ffd1f0" stroke-width="12" fill="none" opacity=".85"/><path d="M-10 74Q70 36 140 70T310 56" stroke="#9fe3ff" stroke-width="10" fill="none" opacity=".85"/><circle cx="60" cy="20" r="2" fill="#fff"/><circle cx="220" cy="16" r="3" fill="#fff"/><circle cx="260" cy="70" r="2" fill="#fff"/>'},
village:function(){var o='<path d="M0 90V30Q100 20 300 58V90Z" fill="#cfe3c8"/>',c=['#ff9fb5','#ffd166','#7fd6c2','#ffb36b','#a9a3ff','#fff'];for(var i=0;i<8;i++)for(var r=0;r<2;r++){var x=10+i*36+r*14,y=22+i*4+r*20;o+='<rect x="'+x+'" y="'+y+'" width="28" height="16" fill="'+c[(i+r*3)%6]+'"/><rect x="'+(x+10)+'" y="'+(y+5)+'" width="7" height="7" fill="#4a6fa5" opacity=".6"/>'}return o+W(80,'#8cc6e8')},
cable:function(){return '<circle cx="250" cy="20" r="10" fill="#ffd66b"/><path d="M60 80L66 18M244 80L238 18" stroke="#4a6fa5" stroke-width="4"/><path d="M0 40L66 18L238 18L300 36" stroke="#4a6fa5" stroke-width="2" fill="none"/><path d="M140 18V30" stroke="#4a6fa5"/><rect x="128" y="30" width="24" height="16" rx="5" fill="#e5698a"/><rect x="132" y="34" width="16" height="7" rx="2" fill="#fff" opacity=".8"/>'+W(66,'#8cc6e8')+W(78,'#6bb0dc')},
spa:function(){return '<rect x="40" y="52" width="220" height="30" rx="12" fill="#8fd6f0"/><path d="M60 64q15 -6 30 0t30 0t30 0t30 0t30 0" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>'+ST(110,48)+ST(150,48)+ST(190,48)},
plane:function(){return '<ellipse cx="60" cy="68" rx="34" ry="8" fill="#fff"/><ellipse cx="240" cy="30" rx="30" ry="7" fill="#fff"/><path d="M70 52L215 38Q236 40 232 48L120 62Z" fill="#fff" stroke="#9bb6dc" stroke-width="2"/><path d="M130 54L150 30L160 32L148 54Z" fill="#9bb6dc"/>'},
shop:function(){return '<rect x="70" y="40" width="50" height="44" rx="4" fill="#ff7aa2"/><path d="M84 40q11 -22 22 0" stroke="#c94b78" stroke-width="3" fill="none"/><rect x="140" y="30" width="56" height="54" rx="4" fill="#ffd166"/><path d="M156 30q12 -24 24 0" stroke="#c9972b" stroke-width="3" fill="none"/><rect x="210" y="46" width="38" height="38" rx="4" fill="#7fd6c2"/><path d="M220 46q9 -18 18 0" stroke="#3f9c88" stroke-width="3" fill="none"/>'},
coffee:function(){return '<ellipse cx="140" cy="80" rx="46" ry="6" fill="#e5cdb5"/><path d="M110 44h60v20a30 22 0 0 1 -60 0z" fill="#fff"/><path d="M170 50q22 0 20 14t-22 12" stroke="#fff" stroke-width="6" fill="none"/><ellipse cx="140" cy="44" rx="30" ry="5" fill="#a9724a"/>'+ST(128,38)+ST(150,38)},
food:function(){return '<path d="M92 52h116a58 36 0 0 1 -116 0z" fill="#e5698a"/><rect x="88" y="48" width="124" height="6" rx="3" fill="#c94b78"/><path d="M100 48q50 -22 100 0z" fill="#ffd166"/><path d="M196 14L236 46M206 12L246 42" stroke="#a9724a" stroke-width="3"/>'+ST(130,34)+ST(160,34)},
sea:function(){return '<circle cx="70" cy="24" r="12" fill="#ffd66b"/><path d="M0 54H300" stroke="#4a6fa5" stroke-width="3"/><path d="M90 54V16M210 54V16" stroke="#4a6fa5" stroke-width="3"/><path d="M0 52Q45 50 90 16Q150 56 210 16Q255 50 300 52" stroke="#4a6fa5" stroke-width="2" fill="none"/>'+W(58,'#8cc6e8')+W(70,'#6bb0dc')+'<rect y="80" width="300" height="10" fill="#f3e2b8"/>'}};
function art(k){var p=PAL[k],g='g'+(++n0);return '<svg viewBox="0 0 300 90" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="'+g+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+p[0]+'"/><stop offset="1" stop-color="'+p[1]+'"/></linearGradient></defs><rect width="300" height="90" fill="url(#'+g+')"/>'+SC[k]()+'</svg>'}

/* ---- 分頁與日期切換 ---- */
function show(){
  document.querySelectorAll('.tab').forEach(function(s){s.hidden=s.id!=='t-'+tab});
  document.querySelectorAll('.day').forEach(function(s,n){s.hidden=n!==cur});
  $('chips').style.display=tab==='day'?'flex':'none';
  document.querySelectorAll('.chip').forEach(function(b,n){b.classList.toggle('on',n===cur)});
  document.querySelectorAll('nav button').forEach(function(b){b.classList.toggle('on',b.dataset.t===tab)});
}
document.querySelectorAll('.chip').forEach(function(b,n){b.onclick=function(){cur=n;show()}});
document.querySelectorAll('nav button').forEach(function(b){b.onclick=function(){tab=b.dataset.t;show();window.scrollTo(0,0)}});

/* ---- 景點插畫、行李勾選 ---- */
document.querySelectorAll('i[data-k]').forEach(function(e){var d=document.createElement('div');d.innerHTML=art(e.dataset.k);e.replaceWith(d.firstChild)});
document.querySelectorAll('label.ck input').forEach(function(c){c.checked=ck(c.dataset.id);c.onchange=function(){sv(c.dataset.id,c.checked)}});

/* ---- 頂部插畫 ---- */
(function(){var o='<circle cx="335" cy="26" r="13" fill="#ffd66b"/>';[[40,18],[150,30],[250,14]].forEach(function(c){o+='<ellipse cx="'+c[0]+'" cy="'+c[1]+'" rx="26" ry="7" fill="#fff"/><ellipse cx="'+(c[0]+14)+'" cy="'+(c[1]-5)+'" rx="15" ry="7" fill="#fff"/>'});
o+='<path d="M0 68H400" stroke="#4a6fa5" stroke-width="3"/><path d="M122 68V16M278 68V16M114 68L122 16L130 68M270 68L278 16L286 68" stroke="#4a6fa5" stroke-width="3" fill="none"/><path d="M0 66Q60 62 122 16Q200 74 278 16Q340 62 400 66" stroke="#4a6fa5" stroke-width="2" fill="none"/>';
for(var j=0;j<40;j++)o+='<circle cx="'+(j*10+3)+'" cy="66" r="1.4" fill="#f2a93b"/>';
o+='<rect y="70" width="400" height="26" fill="#a9d3ee"/>';for(var k=0;k<12;k++)o+='<path d="M'+(k*34+8)+' '+(76+k%3*6)+'h18" stroke="#fff" opacity=".7" stroke-width="2"/>';
$('hv').innerHTML=o})();
show();upd();

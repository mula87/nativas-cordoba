// Esquemas de flor y fruto
const MES = ["E","F","M","A","M","J","J","A","S","O","N","D"];

function flowerSVG(t,c){
  const s='stroke="#3a3a2a" stroke-opacity=".45" stroke-width="1.2"';
  const stem='<path d="M60 118 C60 95 60 80 60 60" stroke="#5f7d45" stroke-width="3" fill="none"/>';
  let g='';
  if(t==='espiga'){g=stem;for(let i=0;i<14;i++){const y=20+i*6,x=60+(i%2?5:-5);g+=`<circle cx="${x}" cy="${y}" r="5" fill="${c}" ${s}/>`;}}
  else if(t==='glomerulo'){g='<path d="M60 118 V70" stroke="#5f7d45" stroke-width="3"/>';for(let a=0;a<36;a++){const r=a<18?24:14,ang=a*0.7;g+=`<line x1="60" y1="48" x2="${60+Math.cos(ang)*r}" y2="${48+Math.sin(ang)*r}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`;}g+=`<circle cx="60" cy="48" r="9" fill="${c}"/>`;}
  else if(t==='papilionacea'){g=stem+`<ellipse cx="60" cy="40" rx="30" ry="26" fill="${c}" ${s}/><path d="M42 42 Q60 20 78 42" stroke="#B23A2A" stroke-width="2" fill="none" opacity=".7"/><path d="M48 46 Q60 30 72 46" stroke="#B23A2A" stroke-width="1.5" fill="none" opacity=".6"/><ellipse cx="46" cy="66" rx="13" ry="9" fill="${c}" ${s}/><ellipse cx="74" cy="66" rx="13" ry="9" fill="${c}" ${s}/><path d="M52 72 Q60 86 68 72 Z" fill="${c}" ${s}/>`;}
  else if(t==='tubular'){g='<path d="M60 118 V90" stroke="#5f7d45" stroke-width="3"/>';[[40,50],[60,38],[80,50]].forEach(([x,y])=>{g+=`<path d="M60 90 L${x} ${y+22}" stroke="#5f7d45" stroke-width="2"/><rect x="${x-5}" y="${y}" width="10" height="24" rx="4" fill="${c}" ${s}/>`;for(let k=0;k<5;k++){const a=k*1.256-1.57;g+=`<ellipse cx="${x+Math.cos(a)*8}" cy="${y+Math.sin(a)*8}" rx="5" ry="3.5" fill="${c}" ${s} transform="rotate(${a*57} ${x+Math.cos(a)*8} ${y+Math.sin(a)*8})"/>`;}});}
  else if(t==='estrella'){g=stem;for(let k=0;k<5;k++){const a=k*72;g+=`<ellipse cx="60" cy="26" rx="11" ry="20" fill="${c}" ${s} transform="rotate(${a} 60 46)"/>`;}g+=`<circle cx="60" cy="46" r="7" fill="#9a7b22"/>`;}
  else if(t==='verticilo'){g='<path d="M60 118 V12" stroke="#5f7d45" stroke-width="3"/>';[30,60,90].forEach(y=>{for(let k=-4;k<=4;k++){g+=`<circle cx="${60+k*5}" cy="${y+Math.abs(k)*1.2}" r="4.5" fill="${c}" ${s}/>`;}g+=`<path d="M60 ${y+8} L34 ${y+18} M60 ${y+8} L86 ${y+18}" stroke="#5f7d45" stroke-width="3"/>`;});}
  else if(t==='panoja'){g='<path d="M60 118 V24" stroke="#5f7d45" stroke-width="2.5"/>';for(let i=0;i<6;i++){const y=28+i*14,w=12+i*4;g+=`<path d="M60 ${y} L${60-w} ${y+10} M60 ${y} L${60+w} ${y+10}" stroke="#5f7d45" stroke-width="1.5"/>`;[-w,w,-w/2,w/2].forEach(dx=>g+=`<circle cx="${60+dx}" cy="${y+10}" r="3.5" fill="${c}" ${s}/>`);}}
  else if(t==='amento'){g='<path d="M10 20 Q60 10 110 24" stroke="#7a5a44" stroke-width="3" fill="none"/>';[30,60,90].forEach(x=>{g+=`<path d="M${x} 18 Q${x+4} 60 ${x} 100" stroke="#7a5a44" stroke-width="1.2" fill="none"/>`;for(let i=0;i<8;i++)g+=`<circle cx="${x+(i%2?3:-3)}" cy="${28+i*9}" r="3.5" fill="${c}" ${s}/>`;});}
  else {g='<path d="M60 118 V40" stroke="#5f7d45" stroke-width="3"/><ellipse cx="38" cy="60" rx="20" ry="10" fill="#7f9a5c" transform="rotate(-25 38 60)"/>';for(let i=0;i<10;i++)g+=`<circle cx="${52+(i%3)*8}" cy="${34+Math.floor(i/3)*7}" r="3" fill="${c}" ${s}/>`;}
  return `<svg viewBox="0 0 120 120" role="img" aria-label="Esquema de la flor">${g}</svg>`;
}
function fruitSVG(t,c,m){
  const s='stroke="#2b2418" stroke-opacity=".5" stroke-width="1.2"';let g='';
  if(t==='legumbre'){g=`<path d="M14 96 C30 40 70 18 108 22 C78 32 40 60 24 102 Z" fill="${c}" ${s}/>`;if(m){[[40,66],[56,48],[74,36],[90,28]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="6" ry="3" fill="${m}" opacity=".75"/>`);}else{[[38,70],[52,54],[68,42],[84,32]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="4" ry="3" fill="#000" opacity=".12"/>`);}}
  else if(t==='legumbre_gruesa'){g=`<rect x="20" y="44" width="84" height="30" rx="15" fill="${c}" ${s} transform="rotate(-20 62 59)"/><path d="M28 72 Q62 52 98 38" stroke="#000" stroke-opacity=".25" stroke-width="1.5" fill="none"/>`;}
  else if(t==='legumbre_torulosa'){for(let i=0;i<5;i++)g+=`<ellipse cx="${22+i*19}" cy="${82-i*12}" rx="11" ry="8" fill="${c}" ${s} transform="rotate(-32 ${22+i*19} ${82-i*12})"/>`;}
  else if(t==='drupa'){g=`<path d="M60 22 V34" stroke="#5f7d45" stroke-width="3"/><circle cx="60" cy="66" r="32" fill="${c}" ${s}/><ellipse cx="48" cy="54" rx="8" ry="5" fill="#fff" opacity=".35"/>`;}
  else if(t==='drupa_pequena'){g='<path d="M30 20 Q60 50 60 60 M90 22 Q66 46 60 60 M60 60 L44 84 M60 60 L80 88" stroke="#5f7d45" stroke-width="2" fill="none"/>';[[30,28],[90,30],[44,90],[80,94],[60,58]].forEach(([x,y])=>g+=`<circle cx="${x}" cy="${y}" r="11" fill="${c}" ${s}/><circle cx="${x-3}" cy="${y-3}" r="2.5" fill="#fff" opacity=".4"/>`);}
  else if(t==='capsula_lenosa'){g=`<ellipse cx="44" cy="62" rx="22" ry="38" fill="${c}" ${s} transform="rotate(-12 44 62)"/><ellipse cx="78" cy="62" rx="22" ry="38" fill="${c}" ${s} transform="rotate(12 78 62)" opacity=".9"/><ellipse cx="80" cy="62" rx="13" ry="28" fill="#e8dcc0" transform="rotate(12 80 62)" opacity=".8"/><circle cx="80" cy="58" r="5" fill="#a88a55"/>`;}
  else if(t==='capsula_algodon'){for(let i=0;i<40;i++){const a=i*0.157,r=30+(i%3)*5;g+=`<line x1="60" y1="60" x2="${60+Math.cos(a)*r}" y2="${60+Math.sin(a)*r}" stroke="#bdb6a6" stroke-width="1.4"/>`;}g+=`<circle cx="60" cy="60" r="26" fill="${c}" ${s}/><circle cx="60" cy="60" r="8" fill="#b9a06a"/>`;}
  else if(t==='tetranucula'){g=`<path d="M60 20 L40 70 Q60 92 80 70 Z" fill="#9db07a" ${s}/>`;[[52,72],[68,72],[52,86],[68,86]].forEach(([x,y])=>g+=`<ellipse cx="${x}" cy="${y}" rx="7" ry="8" fill="${c}" ${s}/>`);}
  else if(t==='aquenio'){g=`<ellipse cx="60" cy="62" rx="16" ry="24" fill="${c}" ${s}/>`;for(let i=0;i<8;i++){const a=i*0.785;g+=`<line x1="${60+Math.cos(a)*16}" y1="${62+Math.sin(a)*22}" x2="${60+Math.cos(a)*30}" y2="${62+Math.sin(a)*36}" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`;}}
  else if(t==='foliculo'){g=`<path d="M60 18 V36" stroke="#5f7d45" stroke-width="3"/><path d="M28 70 Q30 36 60 36 Q90 36 92 70 Q88 98 60 100 Q32 98 28 70 Z" fill="${c}" ${s}/><path d="M60 36 L60 100" stroke="#000" stroke-opacity=".25"/><circle cx="60" cy="68" r="15" fill="#111"/><circle cx="55" cy="63" r="4" fill="#fff" opacity=".6"/>`;}
  return `<svg viewBox="0 0 120 120" role="img" aria-label="Esquema del fruto">${g}</svg>`;
}
function months(arr,cls){return `<div class="months ${cls}">${MES.map((_,i)=>`<span class="${arr.includes(i+1)?'on':''}"></span>`).join('')}</div>`;}
function rango(arr){const n=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];return n[arr[0]-1]+" a "+n[arr[arr.length-1]-1];}


// Nativas de Córdoba — arma el índice, cada ficha y los carteles a partir de datos/plantas.js y datos/galeria.js
(function(){
  const P = window.PLANTAS || [];
  const G = window.GALERIA || {};
  const pagina = document.body.dataset.pagina;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const sciCorto = p => p.cientifico.split(" (")[0];
  const urlPlanta = id => new URL(id + ".html", location.href).href;
  const fotosPropias = id => ((G[id] && G[id].fotos) || []).filter(f => f && f.archivo);

  // Foto de referencia de iNaturalist (solo si la planta no tiene fotos propias)
  const cacheINat = {};
  function fotoINat(p){
    const q = sciCorto(p);
    if (cacheINat[q]) return cacheINat[q];
    cacheINat[q] = fetch("https://api.inaturalist.org/v1/taxa?per_page=1&q=" + encodeURIComponent(q))
      .then(r => r.json())
      .then(d => {
        const t = d.results && d.results[0];
        if (!t || !t.default_photo) return null;
        return { url: t.default_photo.medium_url, credito: t.default_photo.attribution, enlace: "https://www.inaturalist.org/taxa/" + t.id };
      })
      .catch(() => null);
    return cacheINat[q];
  }

  function months(arr, cls){ return `<div class="months ${cls}">${MES.map((_,i)=>`<span class="${arr.includes(i+1)?"on":""}"></span>`).join("")}</div>`; }

  // ---------- ÍNDICE ----------
  if (pagina === "indice"){
    const box = document.getElementById("grid");
    P.forEach((p,i) => {
      const propia = fotosPropias(p.id)[0];
      box.insertAdjacentHTML("beforeend", `
        <a class="card" href="${p.id}.html">
          <div class="thumb" id="th-${p.id}">${propia ? `<img src="${esc(propia.archivo)}" alt="${esc(p.vulgar)}" loading="lazy">` : flowerSVG(p.flor_tipo,p.flor_color)}</div>
          <div class="txt"><span class="no">FICHA N.º ${String(i+1).padStart(2,"0")}</span><b>${esc(p.vulgar)}</b><i>${esc(sciCorto(p))}</i></div>
        </a>`);
      if (!propia) fotoINat(p).then(f => { if (f) document.getElementById("th-"+p.id).innerHTML = `<img src="${f.url}" alt="${esc(p.vulgar)}" loading="lazy">`; });
    });
  }

  // ---------- FICHA DE UNA PLANTA ----------
  if (pagina === "planta"){
    const id = document.body.dataset.planta;
    const i = P.findIndex(x => x.id === id), p = P[i];
    if (!p) return;
    document.title = p.vulgar + " · Nativas de Córdoba";
    const q = encodeURIComponent(sciCorto(p));
    document.getElementById("ficha").innerHTML = `
    <article class="sheet">
      <div class="spec">
        <div class="draws">
          <figure>${flowerSVG(p.flor_tipo,p.flor_color)}<figcaption>Flor</figcaption></figure>
          <figure>${fruitSVG(p.fruto_tipo,p.fruto_color,p.fruto_mancha)}<figcaption>Fruto</figcaption></figure>
        </div>
        <div class="pheno">
          <div class="lbl"><span>Floración</span><span>${rango(p.flor_meses)}</span></div>${months(p.flor_meses,"f")}
          <div class="lbl"><span>Fructificación</span><span>${rango(p.fruto_meses)}</span></div>${months(p.fruto_meses,"r")}
          <div class="mletters">${MES.map(m=>`<span>${m}</span>`).join("")}</div>
        </div>
        <div><a href="https://www.inaturalist.org/taxa/search?q=${q}" target="_blank" rel="noopener">Más fotos en iNaturalist ↗</a></div>
      </div>
      <div class="data">
        <div style="display:grid;gap:2px">
          <span class="no">FICHA N.º ${String(i+1).padStart(2,"0")}</span>
          <h2>${esc(p.vulgar)}</h2>
          <span class="sci">${esc(p.cientifico)}</span>
          <span class="fam">Familia ${esc(p.familia)}</span>
        </div>
        <dl>
          <dt>Otros nombres</dt><dd>${esc(p.otros)}</dd>
          <dt>Porte</dt><dd>${esc(p.porte)}</dd>
          <dt>Dónde vive</dt><dd>${esc(p.ambiente)}</dd>
          <dt>Hoja</dt><dd>${esc(p.hoja)}</dd>
          <dt>Flor</dt><dd>${esc(p.flor)}</dd>
          <dt>Fruto</dt><dd>${esc(p.fruto)}</dd>
          <dt>Usos</dt><dd><ul>${p.usos.map(u=>`<li>${esc(u)}</li>`).join("")}</ul></dd>
        </dl>
        <div class="dato"><b>¿Sabías que…?</b>${esc(p.dato)}</div>
      </div>
    </article>`;

    // Fotos y leyenda
    const extra = document.getElementById("extra");
    const fotos = fotosPropias(id);
    const leyenda = (G[id] && G[id].leyenda || "").trim();
    let html = "";
    if (fotos.length){
      html += `<span class="sec-t">Fotos</span><div class="galeria">${fotos.map(f=>`
        <figure><img src="${esc(f.archivo)}" alt="${esc(f.epigrafe || p.vulgar)}" loading="lazy">${f.epigrafe?`<figcaption>${esc(f.epigrafe)}</figcaption>`:""}</figure>`).join("")}</div>`;
    } else {
      html += `<div id="ref"></div>`;
    }
    if (leyenda){
      html += `<span class="sec-t">Leyenda</span><div class="leyenda">${leyenda.split(/\n\s*\n/).map(x=>`<p>${esc(x).replace(/\n/g,"<br>")}</p>`).join("")}</div>`;
    }
    extra.innerHTML = html;
    if (!fotos.length) fotoINat(p).then(f => {
      if (!f) return;
      document.getElementById("ref").innerHTML = `<span class="sec-t">Foto de referencia</span><div class="galeria"><figure><img src="${f.url}" alt="${esc(p.vulgar)}"><figcaption>${esc(p.vulgar)}<span class="credito">${esc(f.credito)} · <a href="${f.enlace}" target="_blank" rel="noopener">iNaturalist</a></span></figcaption></figure></div>`;
    });

    const prev = P[(i-1+P.length)%P.length], next = P[(i+1)%P.length];
    document.getElementById("navp").innerHTML = `<a href="${prev.id}.html">← ${esc(prev.vulgar)}</a><a href="index.html">Todas las plantas</a><a href="${next.id}.html">${esc(next.vulgar)} →</a>`;
  }

  // ---------- CARTELES ----------
  if (pagina === "carteles"){
    if (location.protocol === "file:") document.getElementById("aviso").hidden = false;
    const box = document.getElementById("carteles");
    P.forEach((p,i) => {
      box.insertAdjacentHTML("beforeend", `
      <div class="cartel">
        <div class="banda"><span>PLANTA NATIVA DE CÓRDOBA</span><span>FICHA N.º ${String(i+1).padStart(2,"0")}</span></div>
        <div class="cuerpo">
          <div style="min-width:0">
            <div class="nom">${esc(p.vulgar)}</div>
            <div class="csci">${esc(sciCorto(p))}</div>
            <div class="cfam">Familia ${esc(p.familia)}</div>
            <div class="cotros"><b>OTROS NOMBRES</b>${esc(p.otros)}</div>
          </div>
          <div class="qrbox"><div id="qr-${p.id}"></div>Escaneame y conocé más</div>
        </div>
      </div>`);
      if (window.qrcode){ const qr = qrcode(0, "M"); qr.addData(urlPlanta(p.id)); qr.make(); document.getElementById("qr-"+p.id).innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); }
    });
    document.getElementById("imprimir").addEventListener("click", () => window.print());
  }
})();

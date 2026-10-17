/* Our Atlas — 渲染影片 / 章节 / 相册 + 灯箱 */

const SRC_LABEL = { bilibili: "Bilibili", youtube: "YouTube" };
let curChapter = "all";
(function () {
  const p = new URLSearchParams(location.search).get("ch");
  if (p) curChapter = p;
})();

const filmTitle = f => (LANG === "en" ? f.title_en : f.title);
const photoCap  = p => (LANG === "en" ? p.caption_en : p.caption);
const chapName  = c => (LANG === "en" ? c.name_en : c.name);

function iframeFor(src) {
  return `<iframe src="${src}" width="960" height="540" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen frameborder="0"></iframe>`;
}

/* ---------- 灯箱 ---------- */
function openLB(html) {
  const lb = document.getElementById("lb");
  const body = document.getElementById("lbBody");
  if (!lb || !body) return;
  body.innerHTML = html;
  lb.classList.add("open");
}
function closeLB() {
  const lb = document.getElementById("lb");
  const body = document.getElementById("lbBody");
  if (lb) lb.classList.remove("open");
  if (body) body.innerHTML = "";
}
function lbSwitch(j) {
  const s = (window.__curSrcs || [])[j];
  if (!s) return;
  const f = document.getElementById("lbFrame");
  if (f) f.innerHTML = iframeFor(s.src);
  document.querySelectorAll(".lb-src button").forEach(b => {
    b.classList.toggle("active", Number(b.dataset.j) === j);
  });
}

/* ---------- 影片 ---------- */
function renderFilms(elId, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = data.map((f, i) => `
    <div class="film-card" onclick="openFilm(${i})">
      <div class="film-thumb">
        <img src="${f.cover}" alt="${filmTitle(f)}" loading="lazy">
        <div class="film-play"><span>▶</span></div>
      </div>
      <div class="film-body">
        <div class="film-title">${filmTitle(f)}</div>
        <div class="film-meta">4K · ${f.dur}</div>
      </div>
    </div>`).join("");
  window.__films = data;
}
function openFilm(i) {
  const f = (window.__films || [])[i];
  if (!f) return;
  const srcs = f.sources;
  let html = "";
  if (srcs.length > 1) {
    html += '<div class="lb-src">' + srcs.map((s, j) =>
      `<button class="${j === 0 ? "active" : ""}" data-j="${j}" onclick="lbSwitch(${j})">${SRC_LABEL[s.source] || s.source}</button>`
    ).join("") + "</div>";
  }
  html += `<div id="lbFrame">${iframeFor(srcs[0].src)}</div>`;
  html += `<div class="lb-cap">${filmTitle(f)}</div>`;
  openLB(html);
  window.__curSrcs = srcs;
}

/* ---------- 章节卡（首页） ---------- */
function renderChapters(elId, chapters, photos) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = chapters.map(c => {
    const n = photos.filter(p => p.chapter === c.slug).length;
    const unit = LANG === "en" ? "photos" : "张照片";
    return `<a class="chap" href="gallery.html?ch=${c.slug}">
      <img src="${c.cover}" alt="${chapName(c)}" loading="lazy">
      <div class="chap-mask"></div>
      <div class="chap-txt">
        <div class="chap-name">${chapName(c)}</div>
        <div class="chap-cnt">${n} ${unit}</div>
      </div>
    </a>`;
  }).join("");
}

/* ---------- 相册 ---------- */
function renderChips(elId, chapters, photos) {
  const el = document.getElementById(elId);
  if (!el) return;
  const cnt = s => photos.filter(p => p.chapter === s).length;
  const items = [{ slug: "all", name: I18N[LANG]["filter.all"], n: photos.length }]
    .concat(chapters.map(c => ({ slug: c.slug, name: chapName(c), n: cnt(c.slug) })));
  el.innerHTML = items.map(it =>
    `<button class="chip${it.slug === curChapter ? " active" : ""}" onclick="setChapter('${it.slug}', this)">${it.name}<span class="n">${it.n}</span></button>`
  ).join("");
}

function renderGallery(elId, photos) {
  const el = document.getElementById(elId);
  if (!el) return;
  const list = photos.filter(p => curChapter === "all" || p.chapter === curChapter);
  window.__photos = list;
  el.innerHTML = list.map((p, i) => `
    <div class="ph" onclick="openPhoto(${i})">
      <img src="${p.src}" alt="${photoCap(p)}" loading="lazy">
      <div class="ph-cap">${photoCap(p)}</div>
    </div>`).join("");
}

function setChapter(ch, btn) {
  curChapter = ch;
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderGallery("grid", photoData);
}

function openPhoto(i) {
  const p = (window.__photos || [])[i];
  if (!p) return;
  openLB(`<img src="${p.src}" alt="${photoCap(p)}"><div class="lb-cap">${photoCap(p)}</div>`);
}

/* ---------- 初始化 ---------- */
function renderAll() {
  if (document.getElementById("filmGrid")) renderFilms("filmGrid", filmData);
  if (document.getElementById("chapGrid")) renderChapters("chapGrid", chapterData, photoData);
  if (document.getElementById("grid")) {
    renderChips("chips", chapterData, photoData);
    renderGallery("grid", photoData);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  const lb = document.getElementById("lb");
  if (lb) lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeLB(); });
});

window.onLangChange = renderAll;

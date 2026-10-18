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
const videoCap  = v => (LANG === "en" ? v.caption_en : v.caption);
const thumbOf   = s => s.replace("assets/img/", "assets/img/t/");

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
  const a = document.getElementById("lbAlt");
  if (a && s.url) a.href = s.url;
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
  // 健壮回退：每个源一个「观看」按钮，直连原生网页/App——内嵌播放器失败也不影响观看
  html += `<div class="lb-watch">` + srcs.map(s =>
    `<a class="watch-btn ${s.source}" href="${s.url}" target="_blank" rel="noopener">${watchLabel(s.source)}</a>`
  ).join("") + `</div>`;
  openLB(html);
  window.__curSrcs = srcs;
}
function watchLabel(src) {
  const L = SRC_LABEL[src] || src;
  if (src === "bilibili") return LANG === "en" ? "Watch on Bilibili" : "在 B 站观看";
  if (src === "youtube") return LANG === "en" ? "Watch on YouTube" : "在 YouTube 观看";
  return LANG === "en" ? `Watch on ${L}` : `在 ${L} 观看`;
}

/* ---------- 章节卡（首页） ---------- */
function renderChapters(elId, chapters, photos) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = chapters.map(c => {
    const n = photos.filter(p => p.chapter === c.slug).length;
    const unit = LANG === "en" ? "photos" : "张照片";
    return `<a class="chap" href="gallery.html?ch=${c.slug}">
      <img src="${thumbOf(c.cover)}" alt="${chapName(c)}" loading="lazy">
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
  const vids = (typeof videoData !== "undefined")
    ? videoData.filter(v => curChapter === "all" || v.chapter === curChapter) : [];
  window.__videos = vids;
  const vidHtml = vids.map((v, i) => `
    <div class="ph vid" onclick="openVideo(${i})">
      <img src="${v.poster}" alt="${videoCap(v)}" loading="lazy">
      <div class="vid-play"><span>▶</span></div>
      <div class="ph-cap">${videoCap(v)}</div>
    </div>`).join("");
  el.innerHTML = vidHtml + list.map((p, i) => `
    <div class="ph" onclick="openPhoto(${i})">
      <img src="${thumbOf(p.src)}" alt="${photoCap(p)}" loading="lazy">
      <div class="ph-cap">${photoCap(p)}</div>
    </div>`).join("");
}
function openVideo(i) {
  const v = (window.__videos || [])[i];
  if (!v) return;
  openLB(`<video src="${v.src}" controls autoplay playsinline preload="metadata"></video><div class="lb-cap">${videoCap(v)}</div>`);
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
  window.__lbIndex = i;
  const total = (window.__photos || []).length;
  openLB(`<img src="${p.src}" alt="${photoCap(p)}"><div class="lb-cap"><span>${photoCap(p)}</span><span class="lb-count">${i + 1} / ${total}</span></div>`);
}

/* ---------- 纪念日倒计时 ---------- */
function renderDays(elId) {
  const el = document.getElementById(elId);
  if (!el || typeof TOGETHER_SINCE === "undefined") return;
  const since = new Date(TOGETHER_SINCE + "T00:00:00");
  if (isNaN(since)) return;
  const n = Math.max(1, Math.floor((Date.now() - since.getTime()) / 86400000) + 1);
  el.textContent = I18N[LANG]["hero.days"].replace("{n}", n);
}

/* ---------- 周年自动条目（到点自动出现，内容后补） ---------- */
function anniversaryEntries() {
  const out = [];
  const now = new Date();
  const add = (anchor, titleKey) => {
    if (typeof anchor === "undefined") return;
    const base = new Date(anchor + "T00:00:00");
    if (isNaN(base)) return;
    for (let y = base.getFullYear() + 1; y <= now.getFullYear(); y++) {
      const d = new Date(y, base.getMonth(), base.getDate());
      if (d > now) break;
      out.push({
        year: String(y),
        date: `${y}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(base.getDate()).padStart(2, "0")}`,
        title: I18N[LANG][titleKey].replace("{n}", y - base.getFullYear()),
        title_en: null,
        place: "", place_en: "",
        cover: null,
        text: I18N[LANG]["anni.text"],
        text_en: null,
        auto: true
      });
    }
  };
  add(TOGETHER_SINCE, "anni.together");
  add(MARRIED, "anni.title");
  return out;
}
function mergedMemories() {
  const all = (typeof memoryData !== "undefined" ? memoryData : []).concat(anniversaryEntries());
  return all.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

/* ---------- 故事时间线 ---------- */
function renderStory(elId, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = data.map(s => {
    const d = LANG === "en" ? s.date_en : s.date;
    const n = LANG === "en" ? s.name_en : s.name;
    const t = LANG === "en" ? s.text_en : s.text;
    return `<div class="tl-item${s.placeholder ? " tl-ph" : ""}">
      <div class="tl-date">${d}</div>
      <div class="tl-name">${n}</div>
      <div class="tl-desc">${t}</div>
    </div>`;
  }).join("");
}

/* ---------- 回忆（按年份） ---------- */
function renderMemories(elId, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  const sorted = [...data].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const years = [...new Set(sorted.map(m => m.year))];
  let html = "";
  years.forEach(y => {
    html += `<div class="mem-year">${y}</div>`;
    sorted.filter(m => m.year === y).forEach(m => {
      const t  = (LANG === "en" && m.title_en) ? m.title_en : m.title;
      const pl = (LANG === "en" && m.place_en) ? m.place_en : m.place;
      const tx = (LANG === "en" && m.text_en) ? m.text_en : m.text;
      const cover = m.cover
        ? `<div class="mem-cover"><img src="${thumbOf(m.cover)}" alt="${t}" loading="lazy"></div>`
        : "";
      html += `<article class="mem${m.auto ? " mem-auto" : ""}">
        ${cover}
        <div class="mem-body">
          <div class="mem-date">${m.date}</div>
          <h3 class="mem-title">${t}</h3>
          ${pl ? `<div class="mem-place">${pl}</div>` : ""}
          <p class="mem-text">${tx}</p>
        </div>
      </article>`;
    });
  });
  if (!data.length) {
    html = `<p class="mem-empty">${LANG === "en" ? "No memories yet." : "还没有回忆条目。"}</p>`;
  }
  el.innerHTML = html;
}

/* ---------- 蜜月 ---------- */
/* ---------- 蜜月：手绘路线图 + 每日行程 ---------- */
function renderRouteMap(data) {
  const stops = data.routeStops || [];
  const d = data.routePath || "";
  const path = d ? `<path d="${d}" fill="none" stroke="var(--copper)" stroke-width="2" stroke-dasharray="6 6" stroke-linecap="round" marker-end="url(#honeyArrow)"/>` : "";
  const nodes = stops.map(s => `
    <g>
      <circle cx="${s.x}" cy="${s.y}" r="14" fill="#fffdfa" stroke="var(--green)" stroke-width="1.2"/>
      <text x="${s.x}" y="${s.y+1}" text-anchor="middle" dominant-baseline="central" font-size="11" fill="var(--green)" font-family="var(--sans)">${s.day}</text>
      <text x="${s.x}" y="${s.y+32}" text-anchor="middle" font-size="16" fill="var(--green)" font-family="var(--serif)">${LANG === "en" ? s.name_en : s.name}</text>
      <text x="${s.x}" y="${s.y+48}" text-anchor="middle" font-size="10" fill="var(--ink-3)" font-family="var(--sans)" letter-spacing="1.5">${LANG === "en" ? s.name : s.name_en}</text>
    </g>`).join("");
  return `<svg viewBox="0 0 720 440" role="img" aria-label="${LANG === "en" ? "Route map" : "路线图"}" style="display:block;width:100%;height:auto">
  <defs><marker id="honeyArrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="var(--copper)" stroke-width="1.6" stroke-linecap="round"/></marker></defs>
  <rect x="0" y="0" width="720" height="440" fill="none"/>
  <path d="M430 110 C470 118 500 150 505 200 C510 255 500 310 470 340 C445 362 415 358 400 330 C385 300 382 250 388 200 C393 155 405 118 430 110 Z" fill="#e6efe9" stroke="#c7d6cc" stroke-width="1"/>
  <path d="M105 332 L170 248 L235 332 Z" fill="#dce8e0" stroke="#a9bfb2" stroke-width="1"/>
  <path d="M185 336 L248 244 L311 336 Z" fill="#dce8e0" stroke="#a9bfb2" stroke-width="1"/>
  <path d="M262 330 L306 264 L350 330 Z" fill="#dce8e0" stroke="#a9bfb2" stroke-width="1"/>
  <rect x="352" y="316" width="10" height="10" fill="var(--copper)" opacity=".5"/>
  <circle cx="690" cy="52" r="16" fill="none" stroke="var(--line)" stroke-width="1"/>
  <path d="M690 40 L690 47" stroke="var(--copper)" stroke-width="1.5" stroke-linecap="round"/>
  <text x="690" y="58" text-anchor="middle" font-size="11" fill="var(--ink-3)" font-family="var(--sans)">N</text>
  ${path}${nodes}
</svg>`;
}

function renderHoney(elId, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  const intro = LANG === "en" ? data.intro_en : data.intro;
  const routeLabel = `<div class="kicker" style="margin:6px 0 12px">${I18N[LANG]["sec.route"]}</div>`;
  const map = `<div class="honey-map">${renderRouteMap(data)}</div>`;
  const places = data.places.map(p => `
    <div class="hp">
      <img src="${thumbOf(p.img)}" alt="${LANG === "en" ? p.name_en : p.name}" loading="lazy">
      <div class="hp-txt">
        <div class="hp-name">${LANG === "en" ? p.name_en : p.name}</div>
        <div class="hp-desc">${LANG === "en" ? p.text_en : p.text}</div>
      </div>
    </div>`).join("");
  const days = (data.days || []).map(dy => `
    <div class="hday">
      <div class="hday-date">${LANG === "en" ? dy.date_en : dy.date}</div>
      <div class="hday-title">${LANG === "en" ? dy.title_en : dy.title}</div>
      <p class="hday-text">${LANG === "en" ? dy.text_en : dy.text}</p>
    </div>`).join("");
  const daysBlock = days ? `<div class="kicker" style="margin:0 0 12px">${I18N[LANG]["sec.days"]}</div><div class="honey-days">${days}</div>` : "";
  const photos = data.photos.map((src, i) =>
    `<div class="ph" onclick="openHoneyPhoto(${i})"><img src="${thumbOf(src)}" alt="" loading="lazy"></div>`).join("");
  el.innerHTML = `<p class="honey-intro">${intro}</p>
    ${routeLabel}${map}
    <div class="honey-places">${places}</div>
    ${daysBlock}
    <div class="grid honey-grid">${photos}</div>`;
  window.__honeyPhotos = data.photos;
}
function openHoneyPhoto(i) {
  const src = (window.__honeyPhotos || [])[i];
  if (src) openLB(`<img src="${src}" alt="">`);
}

/* ---------- 配乐（B 站外链） ---------- */
function renderMusic(elId, data) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = data.map(m => `
    <div class="music-card">
      <div class="music-frame"><iframe src="${m.src}" title="${m.label}" loading="lazy" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen frameborder="0" scrolling="no"></iframe></div>
      <div class="music-label">${LANG === "en" ? (m.label_en || m.label) : m.label}</div>
    </div>`).join("");
}

/* ---------- 初始化 ---------- */
function renderAll() {
  if (document.getElementById("filmGrid") && typeof filmData !== "undefined") renderFilms("filmGrid", filmData);
  if (document.getElementById("musicGrid") && typeof musicData !== "undefined") renderMusic("musicGrid", musicData);
  if (document.getElementById("chapGrid") && typeof chapterData !== "undefined") renderChapters("chapGrid", chapterData, photoData);
  if (document.getElementById("grid") && typeof photoData !== "undefined") {
    renderChips("chips", chapterData, photoData);
    renderGallery("grid", photoData);
  }
  if (document.getElementById("timeline") && typeof storyData !== "undefined") renderStory("timeline", storyData);
  if (document.getElementById("memList") && typeof memoryData !== "undefined") renderMemories("memList", mergedMemories());
  if (document.getElementById("latestMem") && typeof memoryData !== "undefined") renderMemories("latestMem", mergedMemories().slice(0, 1));
  if (document.getElementById("heroDays")) renderDays("heroDays");
  if (document.getElementById("honeyBody") && typeof honeyData !== "undefined") renderHoney("honeyBody", honeyData);
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  const lb = document.getElementById("lb");
  if (lb) lb.addEventListener("click", e => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", e => {
    const lbEl = document.getElementById("lb");
    if (!lbEl || !lbEl.classList.contains("open")) return;
    if (e.key === "Escape") { closeLB(); return; }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      const list = window.__photos || [];
      if (!list.length) return;
      let i = (window.__lbIndex || 0) + (e.key === "ArrowRight" ? 1 : -1);
      if (i < 0) i = list.length - 1;
      if (i >= list.length) i = 0;
      openPhoto(i);
    }
  });
});

window.onLangChange = renderAll;

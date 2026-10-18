/* Wedding Atlas — 双语切换 / 导航 / 移动端菜单 */

const I18N = {
  zh: {
    "brand.sub": "婚礼 & 蜜月 · 2026.10",
    "nav.home": "首页", "nav.story": "故事", "nav.honeymoon": "蜜月", "nav.memories": "回忆", "nav.gallery": "相册", "nav.films": "影片",
    "hero.kicker": "WEDDING & HONEYMOON",
    "hero.name": "吴坚 & 肖维",
    "hero.line": "从大足到洱海，四站，一本属于我们的地图册",
    "hero.date": "2026.10.09",
    "hero.days": "在一起第 {n} 天",
    "days.kicker": "TOGETHER · 在 一 起",
    "days.unit": "天",
    "days.sub": "自 2025 年 4 月 27 日起 · 每一天都算数",
    "anni.toast": "在一起 {n} 周年快乐 · 彩带为你而飞",
    "intro.sub": "我 们 的 地 图 册",
    "intro.sound": "进入 · 有声",
    "intro.mute": "静音进入",
    "intro.note": "配乐来自我们的婚礼影片原声",
    "music.title": "配乐 · A Thousand Years",
    "music.sub": "来自婚礼影片原声 · B 站",
    "anni.title": "结婚 {n} 周年",
    "anni.together": "在一起 {n} 周年",
    "anni.text": "这一页，等我们一起写。",
    "sec.route": "路线",
    "sec.days": "每日行程",
    "sec.memories": "我们的回忆", "sec.memories.meta": "按年份",
    "sec.latest": "最新回忆", "sec.latest.more": "全部回忆 →",
    "sec.honey": "蜜月 · 大理", "sec.honey.sub": "洱海 · 苍山 · 沙溪",
    "mem.empty": "以后每年的周年与旅行，都会记在这里。",
    "story.note": "灰色的阶段待补充",
    "sec.films": "影片", "sec.films.meta": "3 部 · 4K",
    "film.alt": "打不开？点这里看原视频",
    "sec.chapters": "章节", "sec.chapters.meta": "219 张照片 · 17 支短片",
    "sec.films.page": "三部影片", "sec.films.pageSub": "B 站优先播放，可切换 YouTube",
    "sec.music": "配乐", "sec.music.meta": "原声来自这三部影片",
    "sec.gallery.page": "相册", "sec.gallery.pageSub": "按四站浏览",
    "filter.all": "全部",
    "chap.dazu": "大足", "chap.lanxi": "兰溪", "chap.shanshuidong": "风景区", "chap.dali": "大理", "chap.yibin": "宜宾", "chap.us": "我们",
    "story.kicker": "OUR STORY",
    "story.title": "我们的故事",
    "story.lead": "从相识到蜜月，我们的故事会在这里慢慢写长。",    "story.letterTitle": "写给你",
    "story.letterBody": "（这里留给 Jian 写给她的一段话。）",
    "foot.names": "吴坚 & 肖维",
    "foot.note": "我们的地图册 · Wedding Atlas"
  },
  en: {
    "brand.sub": "Wedding & Honeymoon · Oct 2026",
    "nav.home": "Home", "nav.story": "Story", "nav.honeymoon": "Honeymoon", "nav.memories": "Memories", "nav.gallery": "Gallery", "nav.films": "Films",
    "hero.kicker": "WEDDING & HONEYMOON",
    "hero.name": "Jian & Wei",
    "hero.line": "From Dazu to Erhai — four chapters, one atlas of ours.",
    "hero.date": "Oct 9, 2026",
    "hero.days": "Day {n} together",
    "days.kicker": "TOGETHER",
    "days.unit": "days",
    "days.sub": "Since Apr 27, 2025 · every day counts",
    "anni.toast": "Happy {n} years together · confetti for you",
    "intro.sub": "Our Atlas",
    "intro.sound": "Enter · with sound",
    "intro.mute": "Enter muted",
    "intro.note": "Soundtrack from our wedding films",
    "music.title": "A Thousand Years",
    "music.sub": "From our wedding film · Bilibili",
    "anni.title": "{n} years married",
    "anni.together": "{n} years together",
    "anni.text": "This page awaits us.",
    "sec.route": "Route",
    "sec.days": "Itinerary",
    "sec.memories": "Memories", "sec.memories.meta": "By year",
    "sec.latest": "Latest memory", "sec.latest.more": "All memories →",
    "sec.honey": "Honeymoon · Dali", "sec.honey.sub": "Erhai · Cangshan · Shaxi",
    "mem.empty": "Anniversaries and trips will be recorded here, year by year.",
    "story.note": "Grey stages are to be filled in",
    "sec.films": "Films", "sec.films.meta": "3 films · 4K",
    "film.alt": "Can't play? Open the original video",
    "sec.chapters": "Chapters", "sec.chapters.meta": "219 photos · 17 clips",
    "sec.films.page": "Three Films", "sec.films.pageSub": "Bilibili first; YouTube available",
    "sec.music": "Soundtrack", "sec.music.meta": "Audio from the three films",
    "sec.gallery.page": "Gallery", "sec.gallery.pageSub": "Browse by chapter",
    "filter.all": "All",
    "chap.dazu": "Dazu", "chap.lanxi": "Lanxi", "chap.shanshuidong": "Scenic Area", "chap.dali": "Dali", "chap.yibin": "Yibin", "chap.us": "Us",
    "story.kicker": "OUR STORY",
    "story.title": "Our Story",
    "story.lead": "From the day we met to the honeymoon — our story, written longer over time.",
    "story.letterTitle": "To You",
    "story.letterBody": "(A letter for Jian to write.)",
    "foot.names": "Jian & Wei",
    "foot.note": "Wedding Atlas"
  }
};

let LANG = localStorage.getItem("atlas-lang") || "zh";

function applyLang(){
  document.documentElement.lang = LANG === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.dataset.i18n;
    const v = I18N[LANG] && I18N[LANG][k];
    if (v) el.textContent = v;
  });
  const btn = document.getElementById("langBtn");
  if (btn) btn.textContent = LANG === "zh" ? "EN" : "中";
  if (typeof window.onLangChange === "function") window.onLangChange();
}

function toggleLang(){
  LANG = LANG === "zh" ? "en" : "zh";
  localStorage.setItem("atlas-lang", LANG);
  applyLang();
}

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const links = document.getElementById("navLinks");
  if (burger && links) burger.addEventListener("click", () => links.classList.toggle("open"));
  applyLang();
  mountMusic();
  initMusic(false);
  initIntro();
  initPetals();
  initReveal();
  initDaysBoard();
  initTimeline();
  initTypewriter();
  initConfetti();
});

/* ─── v6：「第 N 天」大数字牌 ─── */
function daysSince(anchor) {
  const base = new Date(anchor + "T00:00:00");
  if (isNaN(base)) return null;
  return Math.max(1, Math.floor((Date.now() - base.getTime()) / 86400000) + 1);
}
function initDaysBoard() {
  const el = document.getElementById("daysBig");
  if (!el || typeof TOGETHER_SINCE === "undefined") return;
  const n = daysSince(TOGETHER_SINCE);
  if (n) el.textContent = n;
}

/* ─── v6：时间线逐节点点亮 ─── */
function initTimeline() {
  const run = () => {
    const items = document.querySelectorAll(".tl-item");
    if (!items.length) return;
    const light = it => it.classList.add("lit");
    if (!("IntersectionObserver" in window)) { items.forEach(light); return; }
    const io = new IntersectionObserver(es => {
      es.forEach(e => { if (e.isIntersecting) { light(e.target); io.unobserve(e.target); } });
    }, { threshold: .4 });
    items.forEach(it => io.observe(it));
  };
  // .tl-item 由 render.js 的 renderStory 动态生成，且 main.js 先于 render.js 触发
  // DOMContentLoaded —— 必须延迟到渲染完成后再取节点，否则观察器落空。
  if (window.requestAnimationFrame) requestAnimationFrame(() => requestAnimationFrame(run));
  else setTimeout(run, 0);
}

/* ─── v6：写信页打字机 ─── */
function initTypewriter() {
  const p = document.querySelector(".letter p");
  if (!p) return;
  const full = p.textContent;
  if (!full || full.length < 2) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || full.length > 420) return;
  const btn = document.getElementById("langBtn");
  const cursor = document.createElement("span");
  cursor.className = "tw-cursor";
  let i = 0;
  p.textContent = "";
  p.appendChild(cursor);
  window.__twTimer = setInterval(() => {
    i++;
    p.textContent = full.slice(0, i);
    p.appendChild(cursor);
    if (i >= full.length) { clearInterval(window.__twTimer); setTimeout(() => cursor.remove(), 1800); }
  }, 55);
  if (btn) btn.addEventListener("click", () => { clearInterval(window.__twTimer); }, { once: true });
}

/* ─── v6：周年彩带（纪念日当天自动） ─── */
function initConfetti() {
  if (typeof anniversaryEntries !== "function") return;
  const t = new Date();
  const pad = n => String(n).padStart(2, "0");
  const today = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
  const hit = anniversaryEntries().find(a => a.date === today);
  if (!hit) return;
  const colors = ["#b07d5a", "#1b3a2d", "#e8a9b8", "#c9a98c", "#f5d3d8", "#97c459"];
  const box = document.createElement("div");
  box.className = "confetti";
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("i");
    c.className = "cf";
    c.style.left = (Math.random() * 100) + "%";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = (2.6 + Math.random() * 2.4) + "s";
    c.style.animationDelay = (Math.random() * 0.8) + "s";
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 6500);
  const toast = document.createElement("div");
  toast.className = "days-toast";
  const n = (hit.title.match(/(\d+)/) || [null, ""])[1];
  toast.textContent = (I18N[LANG]["anni.toast"] || "").replace("{n}", n);
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 5200);
}

/* ─── v5：电影感片头（仅首页） ─── */
function initIntro() {
  const intro = document.getElementById("intro");
  if (!intro) return;
  const done = (withSound) => {
    if (withSound) { sessionStorage.setItem("atlas-music", "1"); initMusic(true); }
    intro.classList.add("hide");
    document.body.classList.remove("intro-lock");
    setTimeout(() => intro.remove(), 1300);
  };
  const s = document.getElementById("enterSound");
  const m = document.getElementById("enterMute");
  if (s) s.addEventListener("click", () => done(true));
  if (m) m.addEventListener("click", () => done(false));
}

/* ─── v5：浮动音乐播放器（B 站外链，不托管 mp3） ─── */
const MUSIC_SRC = "https://player.bilibili.com/player.html?bvid=BV1CJHd6pEdx&page=1&high_quality=1&danmaku=0&autoplay=1";
function mountMusic() {
  if (document.getElementById("music")) return;
  const div = document.createElement("div");
  div.className = "music"; div.id = "music";
  div.innerHTML =
    '<div class="music-box"><div class="music-cap"><b data-i18n="music.title">配乐 · A Thousand Years</b><span data-i18n="music.sub">来自婚礼影片原声 · B 站</span></div><div class="music-frame"></div></div>' +
    '<button class="music-btn" id="musicBtn" aria-label="music">&#9834;</button>';
  document.body.appendChild(div);
}
function initMusic(autoplay) {
  const wrap = document.getElementById("music");
  if (!wrap) return;
  const btn = wrap.querySelector(".music-btn");
  const frame = wrap.querySelector(".music-frame");
  const load = () => {
    if (frame.dataset.loaded) return;
    frame.innerHTML = '<iframe src="' + MUSIC_SRC + '" title="music" allow="autoplay; encrypted-media" frameborder="0" scrolling="no" allowfullscreen></iframe>';
    frame.dataset.loaded = "1";
  };
  if (btn && !btn.dataset.bound) {
    btn.dataset.bound = "1";
    btn.addEventListener("click", () => {
      load();
      const was = wrap.classList.toggle("open");
      btn.classList.toggle("playing", was);
      if (was) sessionStorage.setItem("atlas-music", "1");
    });
  }
  if (autoplay) { load(); wrap.classList.add("open"); if (btn) btn.classList.add("playing"); }
  else if (sessionStorage.getItem("atlas-music") === "1") { load(); if (btn) btn.classList.add("playing"); }
}

/* ─── v5：花瓣（仅首页 hero） ─── */
function initPetals() {
  const box = document.getElementById("petals");
  if (!box) return;
  for (let i = 0; i < 10; i++) {
    const p = document.createElement("i");
    p.className = "petal";
    p.style.left = (Math.random() * 96) + "%";
    p.style.animationDuration = (9 + Math.random() * 10) + "s";
    p.style.animationDelay = (-Math.random() * 12) + "s";
    p.style.transform = "scale(" + (0.6 + Math.random() * 0.8) + ")";
    box.appendChild(p);
  }
}

/* ─── v5：滚动渐显 ─── */
function initReveal() {
  document.documentElement.classList.add("js");
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".sec").forEach(s => s.classList.add("vis"));
    return;
  }
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); } });
  }, { threshold: .08 });
  document.querySelectorAll(".sec").forEach(s => io.observe(s));
}

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
    "anni.title": "结婚 {n} 周年",
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
    "sec.chapters": "四站", "sec.chapters.meta": "162 张照片",
    "sec.films.page": "三部影片", "sec.films.pageSub": "B 站优先播放，可切换 YouTube",
    "sec.music": "配乐", "sec.music.meta": "原声来自这三部影片",
    "sec.gallery.page": "相册", "sec.gallery.pageSub": "按四站浏览",
    "filter.all": "全部",
    "chap.dazu": "大足", "chap.lanxi": "兰溪", "chap.shanshuidong": "山水洞", "chap.dali": "大理",
    "story.kicker": "OUR STORY",
    "story.title": "我们的故事",
    "story.lead": "从相识到蜜月，我们的故事会在这里慢慢写长。",
    "story.letterTitle": "写给你",
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
    "anni.title": "{n} years together",
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
    "sec.chapters": "Four Chapters", "sec.chapters.meta": "162 photos",
    "sec.films.page": "Three Films", "sec.films.pageSub": "Bilibili first; YouTube available",
    "sec.music": "Soundtrack", "sec.music.meta": "Audio from the three films",
    "sec.gallery.page": "Gallery", "sec.gallery.pageSub": "Browse by chapter",
    "filter.all": "All",
    "chap.dazu": "Dazu", "chap.lanxi": "Lanxi", "chap.shanshuidong": "Shanshui Cave", "chap.dali": "Dali",
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
});

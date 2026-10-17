/* Wedding Atlas — 双语切换 / 导航 / 移动端菜单 */

const I18N = {
  zh: {
    "brand.sub": "婚礼 & 蜜月 · 2026.10",
    "nav.home": "首页", "nav.films": "影片", "nav.gallery": "相册", "nav.story": "故事",
    "hero.kicker": "WEDDING & HONEYMOON",
    "hero.name": "吴坚 & 肖维",
    "hero.sub": "从大足到兰溪，再到山水洞，最后到洱海",
    "sec.films": "影片", "sec.films.meta": "3 部 · 4K",
    "sec.chapters": "四站", "sec.chapters.meta": "104 张照片",
    "sec.films.page": "三部影片", "sec.films.pageSub": "B 站优先播放，可切换 YouTube",
    "sec.gallery.page": "相册", "sec.gallery.pageSub": "按四站浏览",
    "filter.all": "全部",
    "chap.dazu": "大足", "chap.lanxi": "兰溪", "chap.shanshuidong": "山水洞", "chap.dali": "大理",
    "story.kicker": "OUR STORY",
    "story.title": "我们的故事",
    "story.lead": "2026 年 10 月，从大足出发，经兰溪、山水洞，最后到洱海。四站，一本属于我们的地图册。",
    "story.t1d": "2026.10.07", "story.t1n": "山水洞 · 婚纱照", "story.t1s": "花木屋前、秋千与花田，把最好的样子留在光里。",
    "story.t2d": "2026.10.09", "story.t2n": "大足 · 婚礼", "story.t2s": "亲友满堂，一拜天地，也拜这一路相伴。",
    "story.t3d": "2026.10.09", "story.t3n": "兰溪 · 婚礼", "story.t3s": "另一处故乡，另一场热闹与祝福。",
    "story.t4d": "2026.10.11", "story.t4n": "大理 · 蜜月", "story.t4s": "洱海、苍山、沙溪，风把日子吹得很慢。",
    "story.letterTitle": "写给你",
    "story.letterBody": "（这里留给 Jian 写给她的一段话。）",
    "foot.names": "吴坚 & 肖维",
    "foot.note": "我们的地图册 · Wedding Atlas"
  },
  en: {
    "brand.sub": "Wedding & Honeymoon · Oct 2026",
    "nav.home": "Home", "nav.films": "Films", "nav.gallery": "Gallery", "nav.story": "Story",
    "hero.kicker": "WEDDING & HONEYMOON",
    "hero.name": "Jian & Wei",
    "hero.sub": "From Dazu to Lanxi, to Shanshui Cave, and finally Erhai",
    "sec.films": "Films", "sec.films.meta": "3 films · 4K",
    "sec.chapters": "Four Chapters", "sec.chapters.meta": "104 photos",
    "sec.films.page": "Three Films", "sec.films.pageSub": "Bilibili first; YouTube available",
    "sec.gallery.page": "Gallery", "sec.gallery.pageSub": "Browse by chapter",
    "filter.all": "All",
    "chap.dazu": "Dazu", "chap.lanxi": "Lanxi", "chap.shanshuidong": "Shanshui Cave", "chap.dali": "Dali",
    "story.kicker": "OUR STORY",
    "story.title": "Our Story",
    "story.lead": "October 2026 — from Dazu, through Lanxi and Shanshui Cave, to Erhai. Four chapters, one atlas of ours.",
    "story.t1d": "Oct 7, 2026", "story.t1n": "Shanshui Cave · Wedding photos", "story.t1s": "A flower cabin, a swing, a field in bloom — the best of us, kept in light.",
    "story.t2d": "Oct 9, 2026", "story.t2n": "Dazu · Wedding", "story.t2s": "Family and friends, a hall full of blessings.",
    "story.t3d": "Oct 9, 2026", "story.t3n": "Lanxi · Wedding", "story.t3s": "Another hometown, another round of joy.",
    "story.t4d": "Oct 11, 2026", "story.t4n": "Dali · Honeymoon", "story.t4s": "Erhai, Cangshan, Shaxi — days slowed down by the wind.",
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

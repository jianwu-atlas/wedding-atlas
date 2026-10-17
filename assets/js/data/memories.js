/* 我们的回忆 —— 按年份归档；以后每年新增一条即可 */
/* 纪念锚点：首页「在一起第 N 天」与回忆页自动周年条目都从这里算。
   ⚠ 待 Jian 补真实的"在一起"起始日（现在是婚礼日 2026-10-09 占位）。 */
const TOGETHER_SINCE = "2025-04-27";   /* 正式交往（Days Matter：肖维正式交往 539 天@2026-10-18） */
const MARRIED = "2026-03-02";          /* 领证纪念日（Days Matter：结婚 2026年3月2号） */

const memoryData = [
  {
    year: "2026", date: "2026-10-11",
    title: "蜜月 · 大理", title_en: "Honeymoon · Dali",
    place: "洱海 · 苍山 · 沙溪", place_en: "Erhai · Cangshan · Shaxi",
    cover: "assets/img/dali/01.jpg",
    text: "我们的第一段旅程。环海、上山、进古镇，把日子过得慢一点。",
    text_en: "Our first journey — around the lake, up the mountain, into the old town."
  },
  {
    year: "2026", date: "2026-10-09",
    title: "我们的婚礼", title_en: "Our Wedding",
    place: "大足 · 兰溪", place_en: "Dazu · Lanxi",
    cover: "assets/img/dazu/01.jpg",
    text: "两场婚礼，两个故乡。",
    text_en: "Two weddings, two hometowns."
  }
];

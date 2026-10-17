/* 蜜月 · 大理 —— 路线与地点；文字可随时替换 */
const honeyData = {
  intro: "2026 年 10 月，大理。洱海、苍山、沙溪——三天两夜，风把日子吹得很慢。",
  intro_en: "October 2026, Dali — Erhai, Cangshan, Shaxi. Three days, slowed down by the wind.",
  places: [
    { name: "洱海", name_en: "Erhai", text: "环海路骑行，风很大，天很蓝。", text_en: "Cycling the lakeside road — strong wind, deep blue sky.", img: "assets/img/dali/08.jpg" },
    { name: "苍山", name_en: "Cangshan", text: "索道上去，云在脚下。", text_en: "Up by cable car, clouds beneath us.", img: "assets/img/dali/22.jpg" },
    { name: "沙溪", name_en: "Shaxi", text: "古镇的下午，时间很慢。", text_en: "An afternoon in the old town, time slowed down.", img: "assets/img/dali/38.jpg" }
  ],
  /* 手绘路线图的停靠点（坐标对应 viewBox 720×440；地图底图在 render.js 里画） */
  routePath: "M430 285 C340 302 285 308 215 305 C192 262 158 190 130 120",
  routeStops: [
    { x: 430, y: 285, day: 1, name: "洱海", name_en: "Erhai" },
    { x: 215, y: 305, day: 2, name: "苍山", name_en: "Cangshan" },
    { x: 130, y: 120, day: 3, name: "沙溪", name_en: "Shaxi" }
  ],
  /* 每日行程（⚠ 文案为初稿，Jian 可随时改；日期待核实） */
  days: [
    {
      date: "2026.10.11", date_en: "Oct 11, 2026",
      title: "环洱海", title_en: "Around Erhai",
      text: "沿着环海路慢慢骑，风很大，天很蓝，云的影子落在水面上。",
      text_en: "Cycling the lakeside road — strong wind, deep blue sky, clouds drifting on the water."
    },
    {
      date: "2026.10.12", date_en: "Oct 12, 2026",
      title: "上苍山", title_en: "Up Cangshan",
      text: "坐索道上去，云在脚下，回头看洱海像一面安静的镜子。",
      text_en: "Up by cable car, clouds beneath our feet — Erhai below like a quiet mirror."
    },
    {
      date: "2026.10.13", date_en: "Oct 13, 2026",
      title: "沙溪古镇", title_en: "Shaxi old town",
      text: "古镇的下午，时间走得很慢，慢到听得见自己的脚步。",
      text_en: "An afternoon in the old town — time moved slowly enough to hear our own footsteps."
    }
  ],
  photos: [
    "assets/img/dali/01.jpg", "assets/img/dali/08.jpg", "assets/img/dali/15.jpg", "assets/img/dali/22.jpg",
    "assets/img/dali/30.jpg", "assets/img/dali/38.jpg", "assets/img/dali/46.jpg", "assets/img/dali/55.jpg"
  ]
};

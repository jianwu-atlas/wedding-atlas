/* 影片数据 —— B 站优先（国内直连），YouTube 作次选 */
const filmData = [
  {
    id: "film-1",
    date: "2026-10-12",
    cover: "assets/img/films/film-1.jpg",
    dur: "7:41",
    title: "婚礼蜜月影片｜婚礼 · 蜜月 · 4K",
    title_en: "Wedding & Honeymoon · 4K",
    sources: [
      { source: "bilibili", src: "https://player.bilibili.com/player.html?bvid=BV1L3p46FEDE&page=1&high_quality=1&danmaku=0&autoplay=0" },
      { source: "youtube",  src: "https://www.youtube.com/embed/COaOpLmc_iQ?start=0" }
    ]
  },
  {
    id: "film-2",
    date: "2026-10-11",
    cover: "assets/img/films/film-2.jpg",
    dur: "4:45",
    title: "婚礼影片｜WEDDING DAY · 4K",
    title_en: "Wedding Day · 4K",
    sources: [
      { source: "bilibili", src: "https://player.bilibili.com/player.html?bvid=BV1CJHd6pEdx&page=1&high_quality=1&danmaku=0&autoplay=0" },
      { source: "youtube",  src: "https://www.youtube.com/embed/2d-WzuMwpW0?start=0" }
    ]
  },
  {
    id: "film-3",
    date: "2026-10-10",
    cover: "assets/img/films/film-3.jpg",
    dur: "3:53",
    title: "蜜月影片｜蜜月 · 大理 · 4K",
    title_en: "Honeymoon in Dali · 4K",
    sources: [
      { source: "bilibili", src: "https://player.bilibili.com/player.html?bvid=BV1xjHd6xEHR&page=1&high_quality=1&danmaku=0&autoplay=0" },
      { source: "youtube",  src: "https://www.youtube.com/embed/iWVSWx9Ctc8?start=0" }
    ]
  }
];

/* 章节元数据（相册与首页共用） */
const chapterData = [
  { slug: "dazu",         date: "2026-10-09", name: "大足",   name_en: "Dazu",            cover: "assets/img/dazu/01.jpg" },
  { slug: "lanxi",        date: "2026-10-09", name: "兰溪",   name_en: "Lanxi",           cover: "assets/img/lanxi/01.jpg" },
  { slug: "shanshuidong", date: "2026-10-07", name: "山水洞", name_en: "Shanshui Cave",   cover: "assets/img/shanshuidong/01.jpg" },
  { slug: "dali",         date: "2026-10-11", name: "大理",   name_en: "Dali",            cover: "assets/img/dali/01.jpg" }
];

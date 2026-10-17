# AGENTS.md · wedding-atlas

> 吴坚 & 肖维的婚礼/蜜月纪念站。进入本目录先读本文件。

## 定位

纯静态、无框架、数据驱动。风格：暖白 `#faf8f4` + 墨绿 `#1b3a2d` + 铜金 `#b07d5a`；标题 Cormorant Garamond，正文 Inter。

## 结构

| 文件 | 职责 |
|---|---|
| `index.html` | Hero + 3 部影片 + 四站导览 |
| `films.html` | 3 部影片（B 站优先，可切 YouTube） |
| `gallery.html` | 相册：四站筛选 + 灯箱 |
| `story.html` | 时间线 + 「写给你」 |
| `assets/css/style.css` | 全站唯一样式表 |
| `assets/js/main.js` | 双语（`I18N` 字典 + `data-i18n`）、导航、移动端菜单 |
| `assets/js/render.js` | 渲染影片/章节/相册、灯箱、平台切换 |
| `assets/js/data/films.js` | `filmData` + `chapterData` |
| `assets/js/data/photos.js` | `photoData`（178 条，脚本生成，勿手改结构） |
| `assets/img/{dazu,lanxi,shanshuidong,dali}/NN.jpg` | 压缩图（长边 1600、EXIF 已剥离） |

## 约定

1. **相对路径**：全站 `assets/...`，禁止 `/assets/...`（部署在 `/wedding-atlas/` 子路径）。
2. **改文案走 `I18N`**（`main.js`），HTML 里用 `data-i18n="key"`；中英两套都要补。
3. **影片默认 B 站**：`filmData[i].sources` 第一项即默认播放源。
4. **图片**：新增照片 → 放对应章节目录并重编号 → 重新生成 `photos.js`；发布前必须剥 EXIF。
5. **隐私**：`robots.txt` Disallow + 每页 `noindex`；不提交原图。
6. **不要动** `jianwu-atlas.github.io` 主站；本仓库是独立项目页。

## 部署

GitHub Pages：Settings → Pages → `main` / root → `https://jianwu-atlas.github.io/wedding-atlas/`。

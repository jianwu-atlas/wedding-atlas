# Wedding Atlas · 我们的地图册

吴坚 & 肖维的婚礼与蜜月纪念站（2026.10）。

- 在线地址：`https://jianwu-atlas.github.io/wedding-atlas/`
- 纯静态、无框架；数据驱动（`assets/js/data/*.js`）。
- 中英双语：右上角「中 / EN」切换，选择存 `localStorage`。
- 影片：B 站优先播放，可切换 YouTube（一卡多平台）。
- 相册：178 张照片 + 13 支章节短片，按五章（大足 / 兰溪 / 风景区 / 大理 / 我们）筛选 + 灯箱。

## 目录

```
index.html      首页（Hero + 影片 + 四站导览）
films.html      三部影片
gallery.html    相册（按站筛选 + 灯箱）
story.html      时间线 + 写给她的信
assets/css/style.css
assets/js/main.js      双语切换 / 导航
assets/js/render.js    渲染影片、章节、相册与灯箱
assets/js/data/films.js   影片 + 章节元数据
assets/js/data/photos.js  178 张照片清单（脚本生成）
assets/img/               压缩后的图片（长边 1600，EXIF 已剥离）
```

## 本地预览

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 维护

- 换照片：替换 `assets/img/<章节>/NN.jpg`，再重跑 `photos.js` 生成脚本（或手改）。
- 改文案/双语：`assets/js/main.js` 的 `I18N` 字典。
- 改影片：`assets/js/data/films.js`（B 站放数组第一位即为默认）。

## 隐私

- `robots.txt` 全站 `Disallow`，每页 `noindex,nofollow` —— 公开但**不被搜索引擎收录**。
- 图片已**剥离 EXIF/GPS**；仓库只存 Web 压缩版，不存原图。

## 部署

GitHub Pages 项目页：仓库 Settings → Pages → Source 选 `main` / root。
因部署在 `/wedding-atlas/` 子路径，**全站必须使用相对路径**（`assets/...`，不可写成 `/assets/...`）。

<div align="center">

# StyleMate

**网页设计风格库 + 实时调参器**

12 套经过实际项目检验的视觉预设，拖动四条轴实时预览，一键导出 CSS 变量 / Tailwind 配置 / AI 提示词。

纯静态 · 零依赖 · 无后端 · MIT

</div>

---

## 为什么不是又一个配色表网站

大多数风格库给你一张好看的截图，你看完只能凭印象去「抄」。

StyleMate 把风格拆成**可执行的决策**：配色 token、圆角尺度、字重配比，外加三条**硬性规则**——违反任何一条，这套风格的气质就垮了。然后把它变成能直接粘进项目的代码。

再加上一个实时调参器：既然风格本质是几条参数，那就让你自己拖。

## 快速开始

```bash
git clone https://github.com/你的用户名/stylemate.git
cd stylemate
python -m http.server 8899 --bind 127.0.0.1
```

打开 <http://127.0.0.1:8899>。

> **必须通过 HTTP 访问。** 直接双击 `index.html` 用 `file://` 打开时，浏览器的剪贴板安全策略会禁用复制功能，部分脚本也会被拦截。

没有 Python？任意静态服务器都行：

```bash
npx serve .          # Node
php -S localhost:8899 # PHP
```

## 功能

| | |
|---|---|
| **12 套风格预设** | 深色 / 浅色 / 极简 / 大胆 / 渐变，6 类气质 |
| **实时调参器** | 色相、饱和度、圆角、字号四条轴，拖动即变 |
| **三种导出格式** | CSS 自定义属性、Tailwind theme、AI 提示词 |
| **WCAG 对比度分级** | 每个颜色组合自动计算并如实标注 AAA / AA / 不达标 |
| **筛选与搜索** | 按气质筛选，支持中文名、英文名、标签关键词 |
| **深浅模式自适应** | 详情页 showcase 用真实 token 渲染，浅色风格不会被强行套深色 |
| **零依赖** | 纯 HTML / CSS / 原生 JS，没有框架、没有构建、没有 npm install |

## 目录结构

```
stylemate/
├── site.config.js          ★ 域名等站点配置，只改这里
├── index.html              首页（内含调参器）
├── styles.html             风格库列表
├── 404.html
├── styles/*.html           12 个详情页 ← 由脚本生成，不要手改
├── assets/
│   ├── css/core.css        全部样式，token 定义在顶部 :root
│   └── js/
│       ├── styles-data.js  ★ 唯一数据源
│       ├── app.js          通用：复制、toast、滚动动画、埋点
│       ├── tuner.js        调参器与三种导出
│       ├── home.js         首页渲染
│       └── catalog.js      筛选与搜索
├── build/
│   ├── generate.js         生成详情页 + sitemap + robots
│   ├── test-tuner.js       30 项交互回归测试
│   └── test-mobile.js      三断点布局审计
├── sitemap.xml             ← 生成
└── robots.txt              ← 生成
```

## 加一套你自己的风格

**1.** 打开 `assets/js/styles-data.js`，往数组末尾追加一个对象：

```js
{
  slug: "my-style",              // 用于文件名和 URL，只能是小写字母和连字符
  name: "My Style",              // 英文名
  zh: "我的风格",                 // 中文名
  tagline: "一句话说清它的气质",
  desc: "两三句说明适合什么产品、为什么这样设计。",
  category: "dark",              // dark | light | minimal | bold | gradient
  mood: ["科技", "克制"],         // 显示为标签
  stars: 0,
  uses: "0",
  updated: "2026-11-12",
  font: { display: "Inter", body: "Inter", weight: 620 },
  radius: "14px",
  tokens: {
    bg: "#09070d", surface: "#121018", border: "#2b2734",
    text: "#f7f6f8", muted: "#b4b0bf",
    accent: "#a35ff2", accentAlt: "#2cdd9c"
  },
  rules: [
    "第一条硬性约束",
    "第二条",
    "第三条"
  ],
  showcase: {
    eyebrow: "小标签",
    title: "展示区大标题",
    body: "一两句正文。",
    cta: "主按钮", cta2: "次按钮"
  }
}
```

**2.** 重新生成详情页：

```bash
node build/generate.js
```

**3.** 跑测试确认没写错：

```bash
node build/test-tuner.js     # 交互 + 生成内容
node build/test-mobile.js    # 390 / 768 / 1440 三断点
```

首页卡片、跑马灯、详情页、sitemap 全部自动更新，不需要碰任何 HTML。

## 配置域名

编辑 `site.config.js`：

```js
module.exports = {
  siteUrl: "https://你的域名.com",  // 结尾不要带斜杠
  ...
};
```

然后重新运行 `node build/generate.js`，canonical、og:url、sitemap.xml、robots.txt 会自动生成。

**留空也是合法的**——此时构建会跳过所有需要绝对地址的标签，并在控制台提示。这比输出一堆指向假域名的 canonical 要好，因为错误的 canonical 会让搜索引擎不收录你的页面。

## 部署

不需要 Node 运行时，纯静态文件随便放。

<details>
<summary><b>GitHub Pages</b>（免费二级域名）</summary>

1. 推到 GitHub 仓库
2. Settings → Pages → Source 选 `main` 分支 / `root`
3. 等一两分钟，访问 `https://你的用户名.github.io/stylemate/`

如果部署在子路径（`/stylemate/`），记得把所有 `href="/xxx"` 改成相对路径。
</details>

<details>
<summary><b>Vercel / Netlify / Cloudflare Pages</b></summary>

连 Git 仓库，**Build command 留空**，Output directory 填 `.`（或 `stylemate`，看你仓库结构）。

想自动构建的话，Build command 填 `node build/generate.js`。
</details>

## 设计约定

如果你要改这套代码，这几条约定请保留：

**对比度是真的。** 页面和构建产物用同一套 WCAG 2.1 公式计算。≥ 4.5:1 才标「通过」，3:1 只能标「仅大字号」（警示色）。不要为了让表格好看而放宽判定。

**一套变量名，多套值。** 切换风格时只改变量值，不改名。这是复制粘贴能直接用的前提。

**渐变文字限制在暗色段。** 中文笔画密集，渐变到高亮端会丢失笔画。`.grad-text` 刻意限制在 violet → mint 的中低亮度区间。

**色值文本禁止 `text-transform: uppercase`。** 会把 `rgba()` 变成 `RGBA()`，而且长值要换行不要省略号——被截断的颜色值比丑重要糟糕。

## 贡献

欢迎提 PR 加风格。提交前请确认：

- [ ] `node build/generate.js` 跑过，`styles/` 下的改动是生成结果
- [ ] 两个测试脚本都通过
- [ ] 详情页的 showcase 在浅色和深色背景下都能看清
- [ ] `rules` 写的是**可执行的约束**，不是「简洁大气」这类形容词

## License

[MIT](./LICENSE) — 随便用，包括商用，保留版权声明即可。

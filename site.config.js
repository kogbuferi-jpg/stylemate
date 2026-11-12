/* =========================================================
   StyleMate — site configuration
   ★ 上线前只需要改这一个文件
   ========================================================= */

module.exports = {
  /* 你的站点根地址，结尾不要带斜杠。
     - 还没买域名：留空字符串 ""，构建时会跳过 canonical / sitemap 里的绝对地址
     - 有域名后改成 "https://你的域名.com"
     - 部署到平台子域也填完整，例如 "https://stylemate.pages.dev" */
  siteUrl: "",

  /* 站点基础信息，会写进标题、OG 标签和 sitemap */
  siteName: "StyleMate",
  locale: "zh-CN",
  description:
    "12 套真实可用的网页设计风格预设：配色、圆角、字体、间距一次性给全。拖动滑块实时调参，一键导出 CSS 变量、Tailwind 配置和 AI 提示词。",

  /* 社交分享图（相对站点根目录）。
     留空则不输出 og:image —— 指向不存在的图片比没有更糟。 */
  ogImage: "",

  /* 生成详情页的输出目录 */
  stylesDir: "styles"
};

var configuration = require("./public/resource/configuration.json")

module.exports = {
  base: '/',
  title: 'AME',
  description: '使用VuePress生成的个人博客',
  port: 8080,
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'}],
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  serviceWorker: true,
  // base: '/', // 这是部署到github相关的配置 下面会讲
  markdown: {
    config: md => {
      md.set({ breaks: true })
    },
    anchor: {
      permalinkSymbol: '■'
    },
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    custom: true,
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: '上次更新', // 文档更新时间：每个文件git最后提交的时间
    serviceWorker: {
      updatePopup: {
        message: "发现新内容可用",
        buttonText: "刷新"
      }
    },
    nav: configuration.nav,
    sidebar: configuration.sidebar
  }
}

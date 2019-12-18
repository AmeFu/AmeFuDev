---
title: Vue首屏加载慢，白屏的解决方案
tags: vue, 前端
description: 本文介绍了Vue首屏加载慢，白屏的解决方案
---

## 路由懒加载

``` js
// 需要ES6支持
const HelloWorld = () => import('@/components/HelloWorld.vue')
export default new Router({
  routes: [
        { path: '/', name: 'HelloWorld', component: HelloWorld },
  ]
})
```

或

``` js
const HelloWorld = resolve => require(['@/components/HelloWorld.vue'], resolve)
export default new Router({
  routes: [
        { path: '/', name: 'HelloWorld', component: HelloWorld },
  ]
})
```

## 开启gzip压缩

``` js
// 以vue-cli脚手架为例  找到config下index.js文件
 
build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),
 
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
 
    /**
     * Source Maps
     */
 
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
 
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 设置生产环境gzip为true
    productionGzip: true,   
    productionGzipExtensions: ['js', 'css'],
 
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
```
## 使用webpack的externals属性把不需要打包的库文件分离出去，减少打包后文件的大小

``` js
// index.html中引入对应的文件或使用cdn
 
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
 
 
// 在webpack基础配置中添加以下代码
 
module.exports = {
  //...
  externals: {
    jquery: 'jQuery'
  }
};
```

## 使用vue的服务端渲染(ssr)

ssr优点是seo优化，以及加快首屏加载

关于ssr可以参考文档 [Nuxt.js](https://zh.nuxtjs.org/guide)


<br/>
作者：挥别了青春

[链接](https://blog.csdn.net/wang729506596/article/details/82874330)
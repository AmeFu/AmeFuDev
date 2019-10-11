---
title: window.location对象
tags: js, 前端
description: window.location
---

<!-- # window.location对象 -->

window.location 对象用于获得当前页面的地址 (URL)，并把浏览器重定向到新的页面。

window.location 对象在编写时可不使用 window 这个前缀。

``` js
console.log(location.href) // 返回当前url
console.log(location.origin) // 返回?前的url
console.log(location.hostname) // 返回web主机的域名
console.log(location.host) // 返回域名+端口
console.log(location.pathname) // 返回当前页面的路径和文件名
console.log(location.port) // 返回web主机的端口
console.log(location.protocol) // 返回所使用的 web 协议（http: 或 https:）
console.log(location.search) // 返回请求的参数
```

location.assign()-加载新的文档

<style>
    span.assign {
        display: inline-block;
        height: 36px;
        border: 1px dashed #46BD87;
        color: #46BD87;
        padding: 5px 10px;
        text-align: center;
        border-radius: 0px 20px;
        cursor: pointer;
    }
</style>

<div>
    <script>
        console.log('location.href', location.href)
        console.log('location.origin', location.origin)
        console.log('location.hostname', location.hostname)
        console.log('location.host', location.host)
        console.log('location.pathname', location.pathname)
        console.log('location.port', location.port)
        console.log('location.protocol', location.protocol)
        console.log('location.search', location.search)
        function newDoc(){
            window.location.assign(location.origin + "/note/js/f11_fullscreen.html")
        }
    </script>
    <span class="assign" onclick="newDoc()">加载新文档-f11</span>
</div>

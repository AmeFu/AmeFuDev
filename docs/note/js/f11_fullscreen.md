---
title: 网页全屏
tags: js, 前端
description: fullscreen
---

# F11效果浏览器窗口全屏

<style>
    #fsbtn {
        width: 100%;
        border: none;
        outline: none;
        background-color: #46BD87;
        color: #fff;
        padding: 20px;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    }
    #fsbtn:-webkit-full-screen {
        background-color: #339fff;
    }
    #fsbtn:-moz-full-screen {
        background-color: #339fff;
    }
    #fsbtn:-ms-fullscreen {
        background-color: #339fff;
    }
    #fsbtn:fullscreen {
        background-color: #339fff;
    }
</style>

<div>
    <script>
        function fullscreen() {
            var docElm = document.documentElement
            var isFullscreen = document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullScreen
            if(isFullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (docElm.requestFullscreen) {
                    docElm.requestFullscreen();
                } else if (docElm.mozRequestFullScreen) {
                    docElm.mozRequestFullScreen();
                } else if (docElm.webkitRequestFullScreen) {
                    docElm.webkitRequestFullScreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            }
        }
    </script>
    <button id="fsbtn" onclick="fullscreen()">TRY</button>
</div>

## 全屏

``` js
//全屏
var docElm = document.documentElement;
//W3C
if(docElm.requestFullscreen) {
    docElm.requestFullscreen();
}
//FireFox
else if(docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen();
}
//Chrome等
else if(docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen();
}
//IE11
else if(elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
}
```

## 退出全屏

``` js
//W3C
if (document.exitFullscreen) {
    document.exitFullscreen();
}
//FireFox
else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
}
//Chrome等
else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
}
//IE11
else if (document.msExitFullscreen) {
    document.msExitFullscreen();
}
```

## 各浏览器fullscreenchange 事件处理

``` js
document.addEventListener('fullscreenchange', function(){ /*code*/ });
document.addEventListener('webkitfullscreenchange', function(){ /*code*/});
document.addEventListener('mozfullscreenchange', function(){ /*code*/});
document.addEventListener('MSFullscreenChange', function(){ /*code*/});
```


## 各浏览器fullscreenerror 事件处理

``` js
document.addEventListener('fullscreenerror', function(){ /*code*/ });
document.addEventListener('webkitfullscreenerror', function(){ /*code*/});
document.addEventListener('mozfullscreenerror', function(){ /*code*/);
document.addEventListener('MSFullscreenError', function(){ /*code*/ });
```

## 跨浏览器全屏模式下样式代码

``` css
:-webkit-full-screen { }
:-moz-full-screen { }
:-ms-fullscreen { }
:fullscreen { }
```
---
title: background-clip的作用
tags: css, 前端
description: 本文介绍了background-clip在不同值下的现象
---

<!-- # css background-clip属性 -->

<style>
    p.bg-clip {
        border: .8em darkviolet;
        border-style: dotted double;
        margin: 1em 0;
        padding: 1.4em;
        background: linear-gradient(60deg, red, yellow, red, yellow, red);
        font: 900 1.2em sans-serif;
        text-decoration: underline;
    }

    .bg-clip.border-box { background-clip: border-box; }
    .bg-clip.padding-box { background-clip: padding-box; }
    .bg-clip.content-box { background-clip: content-box; }

    .bg-clip.text {
        background-clip: text;
        -webkit-background-clip: text;
        color: rgba(0,0,0,.2);
    }
</style>

css background-clip属性设置标签元素背景的绘制区域。

``` css
/* Keyword values */
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;

/* Global values */
background-clip: inherit;
background-clip: initial;
background-clip: unset;
```

1、border-box  背景延伸到边界的外边缘。边界下方有绘制背景。
2、padding-box 背景延伸到填充的外边缘。边界下方没有绘制背景。
3、content-box 背景被绘制在（剪切到）内容框中。
4、text 背景被绘制在（剪切到）前景文本中。

``` html
<p class="border-box">背景延伸到边界后面。</p>
<p class="padding-box">背景延伸到边框的内边缘。</p>
<p class="content-box">背景仅延伸到内容框的边缘。</p>
<p class="text">背景被剪切为前景文本。</p>
```

``` css
p {
  border: .8em darkviolet;
  border-style: dotted double;
  margin: 1em 0;
  padding: 1.4em;
  background: linear-gradient(60deg, red, yellow, red, yellow, red);
  font: 900 1.2em sans-serif;
  text-decoration: underline;
}

.border-box { background-clip: border-box; }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }

.text {
  background-clip: text;
  -webkit-background-clip: text;
  color: rgba(0,0,0,.2);
}
```

效果如下：

<p class="bg-clip border-box">背景延伸到边界后面。</p>
<p class="bg-clip padding-box">背景延伸到边框的内边缘。</p>
<p class="bg-clip content-box">背景仅延伸到内容框的边缘。</p>
<p class="bg-clip text">背景被剪切为前景文本。</p>

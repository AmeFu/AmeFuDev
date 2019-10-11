---
title: 文本溢出显示省略号
tags: css, 前端
description: 文本溢出显示省略号的不同写法
---

<!-- # 文本溢出显示省略号 -->

<style>
    .ellipsis-wrap {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        padding: 10px;
        width: 200px;
        border-radius: 5px;
    }
    p.ellipsis {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    p.ellipsis-webkit {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    p.ellipsis-mask {
        position: relative;
        line-height: 20px;
        max-height: 40px;
        overflow: hidden;
    }
    p.ellipsis-mask::after {
        content: "...";
        width: 1em;
        position: absolute;
        bottom: 0;
        right: 0;
        padding-left: 0.5em;
        background: #fff;
    }
</style>

``` html
<p style="width: 300px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">
```

如果是单行文本的溢出显示省略号可以用text-overflow:ellipsis属性来实现，当然还需要加宽度width属来兼容部分浏览。

``` css
p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```

效果如下：

<div class="ellipsis-wrap">
    <p class="ellipsis" title="宽度100%的p标签，文字超出宽度">宽度100%的p标签，文字超出宽度</p>
</div>

但是这个属性只支持单行文本的溢出显示省略号，如果我们要实现多行文本溢出显示省略号呢。

``` css
p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```

效果如下：

<div class="ellipsis-wrap">
    <p class="ellipsis-webkit" style="-webkit-box-orient:vertical;">好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字</p>
</div>


::: tip 注：
因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端
-webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示。
-webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式。
:::

也可以使用伪类模拟省略号的效果

``` css
p {
    position: relative; line-height: 20px; max-height: 40px;overflow: hidden;
}
p::after {
    content: "...";
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
}
```

效果如下：

<div class="ellipsis-wrap">
    <p class="ellipsis-mask">好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字好多好多行文字</p>
</div>
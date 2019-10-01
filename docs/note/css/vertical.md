---
tags: css, 前端
description: 各种居中
---

# 居中对齐

<style>
    * {
        box-sizing: border-box;
    }
    .wrap {
        border-radius:5px;
        padding:10px;
        box-shadow:0 0 5px rgba(0,0,0,0.5);
    }
</style>

## 水平居中对齐

文本居中对齐，可以使用text-align【行内元素及行内块元素居中对齐和文本相同】

``` css
div {
    text-align: center;
}
```

效果如下：

<div style="border-radius:5px;padding:10px;box-shadow:0 0 5px rgba(0,0,0,0.5);text-align:center;">
    文本居中对齐
    </br>
    <span>span居中对齐</span>
    </br>
    <button>button居中对齐</button>
    </br>
    <img src="https://placehold.it/100x100" />
</div>

块级元素居中对齐可以设置margin为auto

``` css
div.parent {
    width: 100%;
}
div.child {
    width: 200px;
    margin: 0 auto;
}
```

效果如下：

<div style="border-radius:5px;padding:10px;box-shadow:0 0 5px rgba(0,0,0,0.5);text-align:center;">
    parent
    <div style="background:#46BD87;width:200px;margin:0 auto;color:#fff;padding:10px;">child</div>
</div>

## 垂直居中对齐
高度固定时，可以设置间距来实现，高度不固定时，参考水平垂直居中使用position居中定位后偏移自身一半来对齐。

``` css
div.parent {
    box-sizing: border-box;
    height: 100px;
    padding-top: 25px;
}
div.child {
    height: 50px;
    width: 50px;
}
```

效果如下：

<div class="wrap" style="height:100px;padding:25px 0 0 0;position:relative;">
    <span style="position: absolute;top:2px;left:2px;">parent</span>
    <div style="background:#46BD87;width:50px;height:50px;color:#fff;padding:5px;text-align:center;">child</div>
</div>

文本垂直居中可以用line-height来实现

``` css
.parent {
    line-height: 100px;
    height: 100px;
    text-align: center;
}

/* 如果文本有多行，添加以下代码: */
.child {
    line-height: 1.5;
    display: inline-block;
    vertical-align: middle;
}
```

效果如下：

<div class="wrap" style="line-height:100px;height:100px;padding:0;text-align:center;">单行文本</div>

多行文本效果如下：

<div class="wrap" style="line-height:100px;height:100px;padding:0;text-align:center;">
    <p style="line-height:1.5;display:inline-block;width:200px;vertical-align:middle;">多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本</p>
</div>

## 水平垂直居中对齐

使用绝对定位来实现水平和垂直的居中，需要为父元素也加上position属性，relative、absolute、fixe都可以。子元素位于父元素顶部与左边50%的距离（原点位于左上角），再自偏移自身的宽高的一半。

``` css
.parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

效果如下：

<div class="wrap" style="padding: 20px;position: relative;height: 200px;">
    <p style="margin: 0;padding: 5px;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);">多行文本多行文本多行文本多行文本多行文本多行文本多行文本多行文本</p>
</div>

## flex布局

<a href="https://www.runoob.com/w3cnote/flex-grammar.html">菜鸟教程-flex布局</a>


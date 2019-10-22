---
title: css的回流与重绘及优化
tags: css, 前端
description: 本文介绍了css的回流与重绘及优化
---
<style>
    .highlight {
        color: red;
        background: rgba(255, 255, 255, .5);
    }
</style>
<!-- # web 的回流与重绘及优化 -->

“css 会影响 javascrip 执行时间导致 javascript 脚本变慢？”为什么？
----
****

浏览器渲染一个网页的时候会启用两条线程：

一条渲染javascript 脚本，另一条渲染 ui 即css 样式的渲染。

但这两条线程是互斥的，当javascript 线程运行的时候 ui 线程则会中止暂停，反之亦然。

原因是，当ui 线程运行对页面进行渲染的时候 js 脚本难免会涉及到页面视图上的一些样式的改变，为了使这个改变更加准确 js 脚本只好等待ui 线程渲染完成的时候才去执行。

所以当一个页面的元素样式改动频繁的时候ui 线程就会持续渲染，造成js 代码反应慢半拍，卡顿的情况。

那回流和重绘究竟是什么呢？为什么他们的威力会那么大呢？
----
****

回流：当render tree 的一部分或全部的元素因改变了自身的宽高，布局，显示或隐藏，或者元素内部的文字结构发生变化 导致需要重新构建页面的时候，回流就产生了

重绘：当一个元素自身的宽高，布局，及显示或隐藏没有改变，而只是改变了元素的外观风格的时候，就会产生重绘。

<span class="highlight">回流必定触发重绘，而重绘不一定触发回流</span>


触发回流的css 属性有这些：
----

盒子模型相关属性会触发重布局

定位属性及浮动也会触发重布局

改变节点内部文字结构也会触发重布局

```
width、height、padding、margin、display、
border、border-width、min-height、
top、bottom、left、right、position、
float、clear、text-align、font-weight、
overflow、overflow-y、font-family、
line-height、vertical-align、white-space、font-size
```

而触发重绘的有这些：
----

```
color、border-style、border-radius、
visibility、text-decoration、background、
background-image、background-position、
background-repeat、background-size、outline-color、
outline、outline-style、outline-width、box-shadow
```

现在我们知道了那些属性会触发回流，那如何避免回流呢？
----
****

其实有两个方法：

第一，不使用以上能触发图层回流的属性。

第二，建立一个图层，让回流在这些图层里面进行，限制回流和重绘的范围，减少浏览器的运算工作量。


先说说图层吧

css 中有一个重要的概念的就是 "划分图层"。

在页面加载完dom之后，浏览器会根据自身制定的一些特殊css 属性对页面进行划分为一个个图层。

例如：一些有着 position: absolute 属性的元素他们会被浏览器归纳到一个图层中，而另外一些 position: fixed 的元素也会被浏览器归纳到另外一个图层中，还有一些例如：transform: translateZ(0)....  

这些属性都是视浏览器厂商制定的


图层的优点就是：当一个元素在自己图层内发生变化的时候它的回流和重绘只会在图层内部发生，从而减少了浏览器对于重绘与回流的运算量。
 
那图层内部究竟干了什么呢？

首先，图层对图层里面的节点做回流和重布局运算，计算出他们的样式

然后，对它们生成图形和位置

紧跟着，将每个节点绘制填充到图层位图中

再然后，图层作为纹理发送到GPU 上

最后，将所有图层合并，显示在浏览器的页面上

图层虽好，但是如果滥用图层的话就会让页面因为进行了太多合并运算导致页面卡顿。

所以说，图层的用途应该让给那些经常要进行位置结构，布局变换的元素去使用。例如轮播图

那我们如创建一个图层呢？

就拿chrome 来说，创建一个图层要有以下其中一个条件：

1：一个dom 元素拥有 3d 或 透视变换的css 属性（persepective, transform）

2：video 标签

3：拥有3d 上下文或加速 2d 上下文的 canvas 节点

4：混合插件 flash

5：自己做的opacity 动画 或 使用一个动画 webkit 变换的元素

6：拥有 translate3d 或 translateZ 这两会使 GPU 加速的属性

7：一个包含复合层子节点的元素。（有点绕，可以这样想：其实本身整个网页页面就是一个图层，html 标签下包含着若干的标签 head, body,..... 这样便满足了这个条件了）

8：元素有一个其 z-index 比它低的兄弟节点。由于 z-index 控制的是元素上下层的关系，所以当上下层关系变换的时候就需要一个图层去渲染，因此满足这个条件的元素也会被创建一个图层

但是在我的实验中发现第7 和 8是没有被变成图层的，不知道为嘛.......

 

 

那如果我们使用属性又有那些可替换的属性可以优化回流与重绘呢，一共有一下9点：

1.用transform 代替 top，left ，margin-top， margin-left... 这些位移属性

2.用opacity 代替 visibility，但是要同时有translate3d 或 translateZ 这些可以创建的图层的属性存在才可以阻止回流

::: tip
:grinning:但是第二点如果不加 transform: translateZ(0) 配合opacity的话还是会产生回流的，而只用visibility 就只会产生重绘不会回流，而  opacity 加上 transform: translateZ/3d  这个属性之后便不会发生回流和重绘了
:::

3.不要使用 js 代码对dom 元素设置多条样式，选择用一个 className 代替之。

4.如果确实需要用 js 对 dom 设置多条样式那么可以将这个dom 先隐藏，然后再对其设置

5.不要在循环内获取dom 的样式例如：offsetWidth, offsetHeight, clientWidth, clientHeight... 这些。浏览器有一个回流的缓冲机制，即多个回流会保存在一个栈里面，当这个栈满了浏览器便会一次性触发所有样式的更改且刷新这个栈。但是如果你多次获取这些元素的实际样式，浏览器为了给你一个准确的答案便会不停刷新这个缓冲栈，导致页面回流增加。所以为了避免这个问题，应该用一个变量保存在循环体外。

6.不要使用table 布局，因为table 的每一个行甚至每一个单元格的样式更新都会导致整个table 重新布局

7.动画的速度按照业务按需决定

8.对于频繁变化的元素应该为其加一个 transform 属性，对于视频使用video 标签

9.必要时可以开启 GPU 加速，但是不能滥用
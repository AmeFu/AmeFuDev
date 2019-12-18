---
title: SVG动态图标
tags: svg, 前端
description: SVG动态图标
---

一、基本图形元素
----
****

　svg有一些预定义的形状元素：矩形&lt;rect&gt;，圆形&lt;circle&gt;，椭圆&lt;ellipse&gt;，直线&lt;line&gt;，折线&lt;polyline&gt;，多边形&lt;polygon&gt;，路径&lt;path&gt;和文本&lt;text&gt;。

``` html
<!-- viewBox定义画布大小 width/height定义实际大小 -->
 <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300" height="300" viewBox="0 0 300 300">
 
     <!-- 直线 (x1,y1)与(x2,y2)为两点坐标 -->
     <line x1="0" y1="0" x2="250" y2="30" />
 
     <!-- 多边形 通过多个点的坐标形成封闭图形 -->
     <polygon points="5,5 100,100 50,200" />
 
     <!-- 矩形 (x,y)为左上角起始点 -->
     <rect x="100" y="100" width="120" height="100" />
 
     <!-- 圆形 (cx,cy)圆心点 r半径 -->
     <circle cx="100" cy="50" r="40" stroke="black"/>
 
     <!-- 文本 (x,y)左下角坐标  -->
     <text x="0" y="20" style="font-size:16px;font-weight: bold">Try SVG</text>
 </svg>
```

二、样式与效果 
----
****

　svg元素的样式可以写成标签的属性，也可以写在style里面。下面是一些主要的样式属性：

```
stroke // 笔触颜色
stroke-width // 笔触宽度
stroke-opacity // 笔触的透明度
fill // 填充色，即background
fill-opacity // 填充色的透明度
transform // 图形变换，类似css3 transform
```

　svg还支持很多滤镜效果，能做渐变、阴影、模糊、图像混合等等。不需要了解那么多，例如要画几个彩色圆圈，用circle 配合fill 即可。

　注意：transform 默认以svg左上角为基点，而不是圆心或其他中心。左上角是svg坐标系原点

三、辅助元素
----
****

　svg有几个辅助元素：&lt;g&gt; &lt;defs&gt; &lt;symbol&gt; &lt;use&gt;。它们不代表具体形状，而是帮助进行图形元素的分组管理、重复使用等。

    　<g>元素通常用来对相关图形元素进行分组，以便统一操作，比如旋转，缩放或者添加相关样式等。
    　<use>实现SVG现有图形的重用，可以重用单个SVG图形元素，也可以重用<g><defs>定义的组元素。
    　<defs>内部定义的元素不会直接显示，可以不用事先定义样式，而是在使用<use>实例化的时候再定义。
    　<symbol>能够创建自己的视窗，兼具<g>的分组功能和<defs>初始不可见的特性。

　对于上面提到的transform基点问题，可以通过嵌套&lt;g&gt;标签并偏移&lt;g&gt;的位置，进而重设基点。如下画出几个水平排列的圆圈，并设置不同的缩放尺寸，得到

<svg class="lds-message" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="translate(20 50)">
        <circle cx="0" cy="0" r="7" fill="#e15b64" transform="scale(0.99275 0.99275)">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(40 50)">
        <circle cx="0" cy="0" r="7" fill="#f47e60" transform="scale(0.773605 0.773605)">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(60 50)">
        <circle cx="0" cy="0" r="7" fill="#f8b26a" transform="scale(0.42525 0.42525)">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(80 50)">
        <circle cx="0" cy="0" r="7" fill="#abbd81" transform="scale(0.113418 0.113418)">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
</svg>

``` html
<svg class="lds-message" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="translate(20 50)">
        <circle cx="0" cy="0" r="7" fill="#e15b64" transform="scale(0.99275 0.99275)">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(40 50)">
        <circle cx="0" cy="0" r="7" fill="#f47e60" transform="scale(0.773605 0.773605)">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(60 50)">
        <circle cx="0" cy="0" r="7" fill="#f8b26a" transform="scale(0.42525 0.42525)">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(80 50)">
        <circle cx="0" cy="0" r="7" fill="#abbd81" transform="scale(0.113418 0.113418)">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
</svg>
```

四、动画的实现
----
****

　svg的动画效果是基于动画标签元素实现的：

    　<animate>实现单属性的过渡效果，
    　<animateTransform>实现transform变换动画效果，
    　<animateMotion>实现路径动画效果。

　svg的写法很灵活，样式可以写成标签属性也可以写在style里面，动画标签可以通过xlink指定元素，也可以写在动画元素的内部。如下演示animateTransform的xlink写法：

``` html
<svg xmlns="http://www.w3.org/2000/svg">
    <rect id="animateObject" x="20" y="20" width="50" height="50" fill="blue"></rect>
    <animateTransform
        xlink:href="#animateObject" <!-- 指定动画元素 -->
        attributeName="transform"  <!-- 需要动画的属性名称 -->
        type="scale"  <!-- 指定transform属性 -->
        begin="0s"    <!-- 开始时间，即延迟 -->
        dur="3s"      <!-- 动画时间 -->
        from="1"      <!-- 开始值 -->
        to="2"        <!-- 结束值 -->
        repeatCount="indefinite"   <!-- 重复方式，indefinite无限重复  -->
    />
</svg>
```

　上例的动画是A到B的过渡，要形成顺畅的循环，至少要定义三个关键点。animateTransform支持更多更灵活的属性设置：

    　values：多个关键点的值，替代from和to，例如 values="0;1;0" 
    　keyTimes：跟values对应，各个点的时间点
    　calcMode：动画快慢方式。discrete | linear | paced | spline
    　keySplines：设置运动的贝塞尔控制点，calcMode为spline时有效

五、代码实例
----
****

　circle画圆，fill着色，用g标签包裹并定位，transform设置初始形变，animateTransform设置动画。

``` html
<svg class="lds-message" width="80px" height="80px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <g transform="translate(20 50)">
        <circle cx="0" cy="0" r="7" fill="#e15b64" transform="scale(0.99275 0.99275)">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(40 50)">
        <circle cx="0" cy="0" r="7" fill="#f47e60" transform="scale(0.773605 0.773605)">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(60 50)">
        <circle cx="0" cy="0" r="7" fill="#f8b26a" transform="scale(0.42525 0.42525)">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
    <g transform="translate(80 50)">
        <circle cx="0" cy="0" r="7" fill="#abbd81" transform="scale(0.113418 0.113418)">
            <animateTransform attributeName="transform" type="scale" begin="0s" calcMode="spline" keySplines="0.3 0 0.7 1;0.3 0 0.7 1" values="0;1;0" keyTimes="0;0.5;1" dur="1s" repeatCount="indefinite"></animateTransform>
        </circle>
    </g>
</svg>
```

也可以用js控制svg的属性，控制svg的动画过程，做成能响应点击等事件的图标按钮。

<br/>
作者：杨 小匠

[链接](https://www.cnblogs.com/yangshifu/p/9318434.html)
---
tags: js, 前端
description: design mode
---

# 设计模式

<style>
    span.markText {
        background: #F9F2F4;
        color: #C7254E;
    }
    span.bold {
        font-weight: bold;
    }
</style>

## 构造函数模式 —— Constructor

<span class="bold">核心：</span>

1.将属性绑定到 <span class="markText">this</span> 上

2.将方法绑定到 <span class="markText">prototype</span> 上

3.使用 <span class="markText">new</span> 来新增实例【创建不同的引用类型】

<span class="bold">案例：</span>

``` js
function People() {
    this.name = '人'
}

People.prototype.walk = function () {
    console.log('walk')
}

let xiaoming = new People()
```

## 工厂模式 —— Factory

<span class="bold">核心：</span>

1.<span class="markText">return</span> 一个对象

2.创建不同的引用类型

<span class="bold">案例：</span>

``` js
function createPerson() {
    // 定义工厂
    let person = {
        name: '人',
        walk: function () {
            console.log('walk')
        }
    }

    return person // 返回一个对象
}

let xiaoming = createPerson() // 工厂生产对象
```

## 单例模式 —— Singleton

<span class="bold">核心：</span>

1.产生一个类的唯一实例

2.好处就是节约内存

<span class="bold">案例：</span>

``` js
function createPeople() {
    let name
    return function (userName) {
        return name || (name = userName)
    }
}

let single = createPeople()
console.log(single('人')) // '人'
// 不管再传递任何值，也只会返回 '人'
console.log(single('马')) // '人'
```
## 混合模式 —— Mixin

<span class="bold">核心：</span>

1.在JS中，一般我们实现继承的过程就是混合模式

2.其概念就是提供能够被一个或者一组子类简单继承功能的类

<span class="bold">案例：</span>

``` js
function People(name, age) {
    this.name = name
    this.age = age
}

People.prototype.sayName = function () {
    console.log(this.name)
}

function Student(name, age, score) {
    People.call(this, name, age)
    this.score = score
}

function create(prototypeObj) {
    let empty = function () {}
    empty.prototype = prototypeObj
    return new empty()
    // return值如下
    // {
    //     __proto__:prototypeObj
    // }
}

Student.prototype = create(People.prototype)

Student.prototype.work = function () {
    console.log('work')
}
```

## 模块模式 —— Module

<span class="bold">核心：</span>

在js中，常常使用闭包的形式来实现

<span class="bold">案例：</span>

``` js
let Person = (function () {
    let name = '小明'
    function sayName() {
        console.log(name)
    }

    return {
        name: name,
        sayName: sayName
    }
})()
```

## 发布订阅模式 —— Publish/Subscribe

<span class="bold">核心：</span>

比如我【订阅者】现在订阅了一个公众号，公众号【发布者】向我发布消息

<span class="bold">案例：</span>

实现一个jQuery的发布订阅案例

``` js
// 订阅者
$('div').on('click',function () {})

// 发布者
$('header').on('click',function () {
    $('div').trigger('click')
})
```

代码

``` js
let EventCenter = (function () {
    let events = {}

    function on(evt, handler) {
        // 实现监听效果

        // 使用'或'是为了可以对同一个事件多次进行回调
        events[evt] = events[evt] || []
        events[evt].push({
            handler: handler
        })
    }

    function fire(evt, args) {
        if (!events[evt]) {
            // 如果未监听任何事件，直接中断
            return
        }
        for (let i = 0; i < events[evt].length; i++) {
            // 遍历，实现对同一个事件的多次回调
            events[evt][i].handler(args)
        }
    }

    function off(name) {
        delete events[name]
    }

    return {
        on: on, // 订阅者
        fire: fire, // 发布者
        off: off // 取消订阅
    }
})()

EventCenter.on('hello', function (num) {
    console.log(num)
})
EventCenter.on('hello', function (num) {
    console.log(num)
})

EventCenter.fire('hello', 1) // 1[出现两次]
```

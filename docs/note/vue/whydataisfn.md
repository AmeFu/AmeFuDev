---
title: Vue组件中的data(){return{}} 为什么是函数
tags: vue, 前端
description: 本文介绍了Vue组件中的data(){return{}}
---

在创建或注册模板的时候，传入一个data属性作为用来绑定的数据。但是在组件中，data必须是一个函数，而不能直接把一个对象赋值给它。

``` js
Vue.component('my-component', {
  template: '<div>OK</div>',
  data() {
    return {} // 返回一个唯一的对象，不要和其他组件共用一个对象进行返回
  },
})
```

类比引用数据类型

Object是引用数据类型,如果不用function 返回,每个组件的data 都是内存的同一个地址,一个数据改变了其他也改变了;

javascipt只有函数构成作用域(注意理解作用域,只有函数的{}构成作用域,对象的{}以及 if(){}都不构成作用域)，data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立,不会相互影响。

举个🌰

``` js
const MyComponent = function() {};
MyComponent.prototype.data = {
    a: 1,
    b: 2,
}
const component1 = new MyComponent();
const component2 = new MyComponent();

component1.data.a === component2.data.a; // true;
component1.data.b = 5;
component2.data.b // 5
```

如果两个实例同时引用一个对象,那么当你修改其中一个属性的时候,另外一个实例也会跟着改;

两个实例应该有自己各自的域才对,需要通过下面的方法来进行处理

``` js
const MyComponent = function() {
    this.data = this.data();
};
MyComponent.prototype.data = function() {
    return {
        a: 1,
        b: 2,
    }
};
```

这样每一个实例的data属性都是独立的,不会相互影响了。

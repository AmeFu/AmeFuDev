---
title: ES6 生成器函数（Generator）
tags: js, 前端, es6
description: Generator
---

# ES6 function* , yeild, Promise

生成器函数（Generator）的特点是定义函数的时候有个'*'，通过调用函数生成一个控制器，调用next()方法开始执行函数，遇到yield函数将暂停，保留当前的进度并返回yield后面的表达式，再次调用next()将继续执行函数。

## 语法及基本应用

### 生成器函数定义

``` js
function* test(){}
function * test(){}
function *test(){}
test = function* (){}
test = function *(){}
```

普通函数添加*号后则成为了成为了生成器函数了。

``` js
Object.prototype.toString.call(test) // 显示[object GeneratorFunction]
```

生成器函数的行为与普通函数并不相同，表现为如下3点：

1. 通过new运算符或函数调用的形式调用生成器函数，均会返回一个生成器实例；

2. 通过new运算符或函数调用的形式调用生成器函数，均不会马上执行函数体的代码；

3. 必须调用生成器实例的next方法才会执行生成器函数体的代码。

``` js

function *say(msg){
  console.log(msg)
}
var gen = say('hello world') // 没有显示hello world
console.log(Object.prototype.toString.call(gen)) // 显示[object Generator]
gen.next() // 显示hello world
```

### 关键字yield——迭代器生成器

用于马上退出代码块并保留现场，当执行迭代器的next函数时，则能从退出点恢复现场并继续执行下去。下面有2点需要注意：

1. yield后面的表达式将作为迭代器next函数的返回值；

2. 迭代器next函数的入参将作为yield的返回值（有点像运算符）。

### 迭代器(Generator)

迭代器是一个拥有 {value:{*}, done:{Boolean}} next([*])方法 和 {undefined} throw([*])方法 的对象，通过next函数不断执行以关键字yield分割的代码段，通过throw函数令yield分割的代码段抛出异常。

## 核心-迭代器

迭代器更多的是指迭代器模式，迭代器模式是指通过一个名为迭代器的对象按一定的规则遍历集合元素，调用者只需告诉迭代器获取下一个元素即可，而集合的类型、如何获取元素等因素均由具体的迭代器自行处理。（又一次地关注点分离！）并且由于迭代器模式可以做到 按需执行/延迟执行 的效果，因此能降低遍历无限序列时内存/栈溢出的问题，也能作为异步编程模式使用。

模式理解的注意点：

      1. 迭代器每次进访问集合的一个元素，并由调用者发起访问请求时迭代器才执行下一次访问操作

      2. “按一定的规则”，意味着不一定遍历集合中所有的元素，并且规则可以内聚到迭代器的具体实现上，也可通过策略模式外移到其他模块中；

      3. “集合”，集合可以是一开始就已经初始化好的有限序列集合（如[1,2,3,4,5,6,7]），也可以是按需生成的无限序列集合（如1到无限大）

      4. “集合元素”，可以是整数集合、字符串集合等数据集合，也可以是函数等指令+数据的集合；

若接触过C#、Java等服务端语句的朋友应该对迭代器有一定程度的了解，C#的IEnumrable、IEnumerator和Java的Iterable、Iterator就是跟迭代器相关的接口定义，继承上述接口的迭代器实现均可以通过foreach或for...in语句作循环操作。

那么这里有2点是要注意的：

      1. 迭代器是指设计模式，跟具体的语言无关，因此所有语言均可根据该模式实现具体的迭代器；

      2. foreach或for...in语句是语法层面的支持，跟迭代器模式没有必然联系。（若语法层面不支持，那函数式编程中的递归的效果是一样的，假如编译器/解析器支持尾递归则更好了，可以JS不支持）

``` js
// 迭代器构造函数
var RangeIterator = function(start,end,scan){
    this.start = arguments.length >= 2 ? start : 0
    this.end = end == undefined ? start : end
    this.scan = scan || 1
    this.idx = this.start
}
// 向迭代器发起访问下一个元素的请求
// FF和ES6下迭代器接口规范定义了迭代器必须通过名为next的函数发起访问下一个元素的请求
RangeIterator.prototype.next = function(){
    if (this.idx > this.end)
　　　　if (!!StopIteration) {
       　　throw StopIteration
       }else{
          return void 0
       }

    var ret = this.idx
    this.idx += this.scan
    return ret
}
// Python中的range函数
var range = function(start, end, scan){
   var iterator = new RangeIterator(start, end, scan)
   return {
       // FF下令for...in语句调用对象的迭代器的接口规范
        __iterator__: function(){
            return iterator
        },
       // 暴露迭代器的next函数
        next: function(){
            return iterator.next()
        },
        toString: function(){
            // 可能会导致栈溢出
            var array = []
            for (var i = this.next(); i != void 0; i = this.next())
                array.push(i)
            return array + ''
        }
    }
}
var r = range(1, 100000000000000000000)
// FF下
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Iterators_and_Generators#.E5.AE.9A.E4.B9.89.E8.87.AA.E5.AE.9A.E4.B9.89.E8.BF.AD.E4.BB.A3.E5.99.A8
for(var i in r)
  console.log(i) // 显示1到99999999999999999999
// 所有浏览器
for (var i = r.next(); i != void 0; i = r.next())
  console.log(i) // 显示1到99999999999999999999
```

## 核心-yield关键字

yield关键字就是以一种更直观、便捷的方式让我们创建用于遍历有限序列集合的迭代器，而yield则用于将生成器函数的代码切片作为有限序列集合的元素（元素的类型为指令+数据，而不仅仅是数据而已）。

``` js
// 定义生成器函数
function *enumerable(msg){
  console.log(msg)
  var msg1 = yield msg + '  after '
  console.log(msg1)
  var msg2 = yield msg1 + ' after'
  console.log(msg2 + ' over')
}
```

上述代码最终会被解析为下面的代码：

``` js
var enumerable = function(msg){
  var state = -1

  return {
    next: function(val){
      switch(++state){
         case 0:
                  console.log(msg + ' after')
                  break
         case 1:
                  var msg1 = val
                  console.log(msg1 + ' after')
                  break
         case 2:
                  var msg2 = val
                  console.log(msg2 + ' over')
                  break
      }
    }
  }
}
```

## 异步调用中的应用

由于迭代器模式实现 延迟执行/按需执行，因此可作为一种异步编程模式来应用。

``` js
var iterator = getArticles('dummy.json')
// 开始执行
iterator.next()
// 异步任务模型
function getData(src){
  setTimeout(function(){
    iterator.next({tpl: 'tpl.html', name: 'fsjohnhuang'})
  }, 1000)
}
function getTpl(tpl){
  setTimeout(function(){
    iterator.next('hello ${name}')
  }, 3000)
}
// 同步任务
function render(data, tpl){
  return tpl.replace(/\$\{(\w+)\}/, function(){
    return data[arguments[1]] ==  void 0 ? arguments[0] : data[arguments[1]]
  })
}

// 主逻辑
function *getAritcles(src){
  console.log('begin')
  var data = yield getData(src)
  var tpl = yield getTpl(data.tpl)
  var res = render(data, tpl)
  console.log(rest)
}
```

## 总结

Generator Function并不是为异步编程而生，但可以将它结合Promise来实现良好的异步编程模型。

let，其实就是块级作用域申明变量的var。
之前JS的var关键字是非块级作用域的，而是函数级的。
例如arr=[0,1,2]，我们经常写循环for(var i=0,len=arr.length; i < len; i++){}，其实循环后这个i是还可以访问的2。

这样就很容易污染环境变量。

如果用了let，for(let i=0,len=arr.length; i<len; i++){}，这时循环后的i就是undefined的了。

function*，申明构造函数，返回{value:v,done:true_or_false}。
构造函数可以调用next来获取下一个值，可以构造类似于随机数生成器。
yield和function*一起使用。在构造器函数中，yield可以暂停然后返回当前表达式的值。

例如：

``` js
function a(){yield 1;yield 2;};
var gen=a();
console.log(gen.next());
console.log(gen.next());
console.log(gen.next());
```

执行了构造a函数的第一行yield 1后，a函数退出并且保存上下文，当再次执行next时会恢复a函数上下文继续执行下一行b。

promise，这个非ECMA6特性，主要是为了解决多层嵌套的问题。将嵌套回调转化成链式调用。

### 概念
yield和yield*都是配合Generator进行使用的。

### yield
yield是关键字，其语法如下：

``` js
[rv] = yield [expression];
```

expression：是Generator函数返回的遍历器对象调用next方法是所得到的值；
rv：是遍历其对象调用next方法是传递给next方法的参数

这里要简单的说一下next方法，其语法如下：

``` js
gen.next(value)
```

value：传递给Generator函数的值，也就是上文中的rv

这里比较有意思的就是传递给next方法的值value，下面通过例子来看一下：

``` js
function* _testYieldExpression(){
    let value = '';
    value = yield 'yield value';
    console.info(`1 value is: ${value}`);//输出1

    value = yield 'yield value';
    console.info(`2 value is: ${value}`);//输出2
    return 'over';
}

let _testIterator = _testYieldExpression();
let _res = _testIterator.next();
console.info(`1:no params to next, result is: ${_res.value}`);//输出3

_res = _testIterator.next('params from next');
console.info(`2:params to next, result is: ${_res.value}`);//输出4

_res = _testIterator.next();
console.info(`3:params to next, result is: ${_res.value}`);//输出5
```

输出如下：

``` js
1:no params to next, result is: yield value
1 value is: params from next
2:params to next, result is: yield value
2 value is: undefined
3:params to next, result is: over
```

注释中标记了几个输出语句，输出1是在第二次调用next方法是执行，可以看到，此时的value值是传递给next方法的参数，但是在_testYieldExpression函数中可以看到value = yield 'yield value'，所以可以理解为，在第一次执行next函数的时候，语句yield 'yield value'没有返回值，并且没有赋值给value，而在第二次调用next时，才将next函数的参数赋值给value。虽然有些混乱，但是如果打断点来看的话会更加清晰。

### yield*

yield*是表达式，因此有返回值，其语法如下：

``` js
yield* [[expression]];
```

expression：是可遍历对象，可以是数组，也可以是另外一个Generator函数的执行表达式，等等

其实说简单点，就是将多个yield语句根据某种规则合并为一个，示例如下：

``` js
function* g3() {
  yield* [1, 2];
  yield* '34';
  yield* Array.from(arguments);
}

var iterator = g3(5, 6);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: "3", done: false}
console.log(iterator.next()); // {value: "4", done: false}
console.log(iterator.next()); // {value: 5, done: false}
console.log(iterator.next()); // {value: 6, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```
---
title: Vue中mixin的作用
tags: vue, 前端
description: 本文介绍了Vue中的mixin
---

常见场景
----
****

&nbsp;&nbsp;&nbsp;&nbsp;有两个非常相似的组件，他们的基本功能是一样的，但他们之间又存在着足够的差异性，此时的你就像是来到了一个分岔路口：我是把它拆分成两个不同的组件呢？还是保留为一个组件，然后通过props传值来创造差异性从而进行区分呢？

<br/>

&nbsp;&nbsp;&nbsp;&nbsp;两种解决方案都不够完美：如果拆分成两个组件，你就不得不冒着一旦功能变动就要在两个文件中更新代码的风险，这违背了 DRY 原则。反之，太多的props传值会很快变得混乱不堪，从而迫使维护者（即便这个人是你）在使用组件的时候必须理解一大段的上下文，拖慢写码速度。

<br/>

&nbsp;&nbsp;&nbsp;&nbsp;使用Mixin。Vue 中的Mixin对编写函数式风格的代码很有用，因为函数式编程就是通过减少移动的部分让代码更好理解（引自 Michael Feathers ）。Mixin允许你封装一块在应用的其他组件中都可以使用的函数。如果使用姿势得当，他们不会改变函数作用域外部的任何东西，因此哪怕执行多次，只要是同样的输入你总是能得到一样的值，真的很强大！

基础实例
----
****

&nbsp;&nbsp;&nbsp;&nbsp;我们有一对不同的组件，它们的作用是通过切换状态（Boolean类型）来展示或者隐藏模态框或提示框。这些提示框和模态框除了功能相似以外，没有其他共同点：它们看起来不一样，用法不一样，但是逻辑一样。

``` js
      // 模态框
      const Modal = {
        template: '#modal',
        data() {
          return {
            isShowing: false
          }
        },
        methods: {
          toggleShow() {
            this.isShowing = !this.isShowing;
          }
        },
        components: {
          appChild: Child
        }
      }

      // 提示框
      const Tooltip = {
        template: '#tooltip',
        data() {
          return {
            isShowing: false
          }
        },
        methods: {
          toggleShow() {
            this.isShowing = !this.isShowing;
          }
        },
        components: {
          appChild: Child
        }
      }
```

我们可以在这里提取逻辑并创建可以被重用的项：

``` js
       const toggle = {
         data() {
           return {
             isShowing: false
           }
         },
         methods: {
           toggleShow() {
             this.isShowing = !this.isShowing;
           }
         }
       }

       const Modal = {
         template: '#modal',
         mixins: [toggle],
         components: {
           appChild: Child
         }
       };

       const Tooltip = {
         template: '#tooltip',
         mixins: [toggle],
         components: {
           appChild: Child
         }
       };
```

用法
----
****

&nbsp;&nbsp;&nbsp;&nbsp;你可以按照你喜欢的任意方式设置你的目录结构，但为了结构规整我喜欢新建一个mixin目录。我们创建的这个文件含有.js扩展名（跟.vue相对，就像我们的其他文件），为了使用Mixin我们需要输出一个对象。

``` js
    // toggle.js
    export const toggle = {
        data() {
            return {
                isShowing: false
            }
        },
        methods: {
            toggleShow() {
                this.isShowing = !this.isShowing
            }
        }
    }
```

在Modal.vue使用这样的写法，来引入这个Mixin:

``` js
    // Modal.vue
    import Child from './Child'
    import { toggle } from './mixins/toggle'

    export default {
      name: 'modal',
      mixins: [toggle],
      components: {
        appChild: Child
      }
    }
```

&nbsp;&nbsp;&nbsp;&nbsp;即便我们使用的是一个对象而不是一个组件，生命周期函数对我们来说仍然是可用的，理解这点很重要。我们也可以这里使用mounted()钩子函数，它将被应用于组件的生命周期上。这种工作方式真的很灵活也很强大。

合并
----
****

&nbsp;&nbsp;&nbsp;&nbsp;在下面的这个例子，我们可以看到，我们不仅仅是实现了自己想要的功能，并且Mixin中的生命周期的钩子也同样是可用的。因此，当我们在组件上应用Mixin的时候，有可能组件与Mixin中都定义了相同的生命周期钩子，这时候钩子的执行顺序的问题凸显了出来。默认Mixin上会首先被注册，组件上的接着注册，这样我们就可以在组件中按需要重写Mixin中的语句。组件拥有最终发言权。当发生冲突并且这个组件就不得不“决定”哪个胜出的时候，这一点就显得特别重要，否则，所有的东西都被放在一个数组当中执行，Mixin将要被先推入数组，其次才是组件。

``` js
   //mixin
  const hi = {
    mounted() {
      console.log('hello from mixin!')
    }
  }

  //vue instance or component
  new Vue({
    el: '#app',
    mixins: [hi],
    mounted() {
      console.log('hello from Vue instance!')
    }
  });

  //Output in console
  > hello from mixin!
  > hello from Vue instance!
```

如果这两个冲突了，我们看看 Vue实例或组件是如何决定输赢的：

``` js
      //mixin
      const hi = {
        methods: {
          sayHello: function() {
            console.log('hello from mixin!')
          }
        },
        mounted() {
          this.sayHello()
        }
      }

      //vue instance or component
      new Vue({
        el: '#app',
        mixins: [hi],
        methods: {
          sayHello: function() {
            console.log('hello from Vue instance!')
          }
        },
        mounted() {
          this.sayHello()
        }
      })

      // Output in console
      > hello from Vue instance!
      > hello from Vue instance!
```

&nbsp;&nbsp;&nbsp;&nbsp;你可能已经注意到这有两个console.log而不是一个——这是因为第一个函数被调用时，没有被销毁，它只是被重写了。我们在这里调用了两次sayHello()函数。

结论
----
****

&nbsp;&nbsp;&nbsp;&nbsp;Mixin对于封装一小段想要复用的代码来讲是有用的。对你来说Mixin当然不是唯一可行的选择：比如说高阶组件就允许你组合相似函数，Mixin只是的一种实现方式。我喜欢Mixin，因为我不需要传递状态，但是这种模式当然也可能会被滥用，所以，仔细思考下哪种选择对你的应用最有意义吧！


<br/>
作者：前端雨

[链接](https://www.jianshu.com/p/1bfd582da93e)
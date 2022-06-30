## props $emit
一般是父子组件通讯使用
父向子传递数据用 props
子向父传递数据通过 $emit 触发父组件中的方法并传递数据

## 自定义事件
Vue2.x new vue()创建事件中心，通过 event.on() 监听事件 event.off() 关闭事件监听 event.emit() 触发事件
Vue3.x 引入第三方自定义事件，比如 event-emitter ...

关闭自定义事件的监听
Vue2.x 在 beforeDestroy() 中
Vue3.x 在 beforeUnmount() 中

使用频率比较多，用于没有关系的两个组件，比如 兄弟组件
支持一处触发事件，多处监听事件

## $attributes($attrs)
$listeners
Vue3.x 中移除了 $listeners（把 $listeners 合并到了 $attrs）
本质上是 props $emit 的候补，所以一般也用于父子之间，可以实现多层级的透传，但需要借助 v-bind = "$attrs" 层层透传(<son v-bind = "$attrs"/>)

父组件向子组件传递的数据和方法，子组件中需要用 props 和 emits 接收才能使用
如果没有用 props 和 emits 接收，那么
Vue3.x 通过 $attrs 可以拿到所有没有被 props 和 emits 接收的数据和方法
Vue2.x 通过 $attrs 拿数据 $listeners 拿方法

## $parent $refs
Vue2.x 中还有 $children 但在 Vue3.x 中建议都使用 $refs

$parent 用来获取父组件的属性 或 调用父组件的方法 this.$parent.xxx
$refs 用来获取子组件的属性 或 调用子组件的方法 this.$refs.son-ref-name

同样一般用于父子之间

## provide inject
完美的多层级通讯方式
顶层父组件通过 provide 传递数据
所有的下级组件都可以使用 inject 接收并使用数据

provide 传递数据：
以对象的方式传递自定义变量
以方法的方式传递响应式数据
provide() {
    return {
        info: computed(() => return this.data1)
    }
}

## VueX
专为 Vue 开发的状态管理模式+库，集中管理应用所有组件的状态，多个组件之间共享状态
适合 大型单页应用，需要在组件外部统一管理一些状态的情况

mutation VueX 中更改 store 中数据的唯一方式，原子操作，里面必须是同步代码
action 操作的是 mutation, 可以包含多个 mutation, 可以有异步代码


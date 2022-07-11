# Vue 生命周期
![](./img/vue-生命周期.png)

## vue 每个生命周期都做了什么
- beforeCreate  创建一个空的 Vue 实例，`data` `methods` 等尚未被初始化，无法调用。

- created  Vue 实例初始化完成，`data` `methods` 都已初始化完成，可调用。<br> 但尚未开始渲染模板。

- beforeMount 解析 template, 调用 render 方法，生成 vdom, 但还没有开始渲染 DOM

- mounted 渲染 DOM 完成，页面更新。组件创建完成，开始进入运行阶段。

- beforeUpdate  在数据发生改变后，DOM 被更新之前被调用。这里适合在现有 DOM 将要被更新之前访问它，比如移除手动添加的事件监听器。

- upDated 在数据更改导致的虚拟 DOM 重新渲染和更新完毕之后被调用。 注意，尽量不要在 `updated` 中继续修改数据，否则可能会触发死循环。

- beforeDestroy(Vue2.x) beforeUnmount(Vue3.x)  组件进入销毁阶段。卸载组件实例后调用，在这个阶段，实例仍然是完全正常的。<br>
移除、解绑一些全局事件、自定义事件，可以在此时操作。

- destroyed(Vue2.x) unmounted(Vue3.x) 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

keep-alive 组件
缓存组件，组件只被创建一遍，组件创建后再切换组件时，组件不销毁 不走 beforeUnmount、unmounted 生命周期，而是 走 onDeactivated

- onActivated 被 `keep-alive` 缓存的组件激活时调用。

- onDeactivated 被 `keep-alive` 缓存的组件停用时调用。


## 什么时候可以操作 dom
`mounted` 和 `updated` 都不会保证所有子组件都挂载完成，如果想等待所有视图都渲染完成，需要使用 `$nextTick`

```js
mounted() {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

## ajax 请求应该放在哪个生命周期
一般有两个选择：`created` 和 `mounted` ，建议选择后者 `mounted` 。

执行速度
- 从理论上来说，放在 `created` 确实会快一些
- 但 ajax 是网络请求，其时间是主要的影响因素。从 `created` 到 `mounted` 是 JS 执行，速度非常快。
- 所以，两者在执行速度上不会有肉眼可见的差距

代码的阅读和理解
- 放在 `created` 却会带来一些沟通和理解成本，从代码的执行上来看，它会一边执行组件渲染，一边触发网络请求，并行
- 放在 `mounted` 就是等待 DOM 渲染完成再执行网络请求，串行，好理解

所以，综合来看，更建议选择 `mounted` 。


## Vue3 Composition API 生命周期有何不同
```js
setup (props) {
  // 使用 `toRefs` 创建对 `props` 中的 `user` property 的响应式引用
  const { user } = toRefs(props)

  const repositories = ref([])
  const getUserRepositories = async () => {
    // 更新 `prop.user` 到 `user.value` 访问引用值
    repositories.value = await fetchUserRepositories(user.value)
  }

  onMounted(getUserRepositories)

  // 在 user prop 的响应式引用上设置一个侦听器
  watch(user, getUserRepositories)

  return {
    repositories,
    getUserRepositories
  }
}
```
setup 在组件创建之前被调用，里面可以注册生命周期钩子，名称和原来的一样但前面要加上 `on`，比如 `onMounted`, 这些函数接受一个回调，当钩子被组件调用时，该回调将被执行。mounted 钩子调用时 getUserRepositories 被调用

也就是说：
- `setup` 代替了 `beforeCreate` 和 `created`
- 生命周期换成了函数的形式，如 `mounted` -> `onMounted` 参考 https://v3.cn.vuejs.org/api/composition-api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90

```js
import { onUpdated, onMounted } from 'vue'

export default {
    setup() {
        onMounted(() => {
            console.log('mounted')
        })
        onUpdated(() => {
            console.log('updated')
        })
    } 
}
```
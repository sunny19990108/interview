## 实际工作中你做过哪些 vue 优化
回答这两个问题，如果有自己的实际经历多说一说，不要太生硬，别给人背诵面试题的感觉，没有经验的方面就简单提一下，不要多说。记得答出不要过度优化；

## 前端通用的优化策略

压缩资源，拆包，使用 CDN ，http 缓存等。本节这些先不讲。

### v-if v-show
组件的创建和销毁
组件的展示隐藏 类似于 css 中的 display
当然展示隐藏性能更好，但实际工作中也不需要太 过度优化，除非组件特别大，或者切换频率比较高需要注意一下

场景
- 一般情况下使用 `v-if` 即可，普通组件的销毁、渲染不会造成性能问题
- 如果组件创建时需要大量计算，或者大量渲染（如复杂的编辑器、表单、地图等），可以考虑 `v-show`

### SSR

## v-for 使用 key

`key` 可以优化内部的 diff 算法。注意，遍历数组时 `key` 不要使用 `index` 。

```html
<ul>
    <!-- 而且，key 不要用 index -->
    <li v-for="(id, name) in list" :key="id">{{name}}</li>
</ul>
```

## computed 缓存

`computed` 可以缓存计算结果，`data` 不变则缓存不失效。

```js
export default {
    data() {
        return {
            msgList: [ ... ] // 消息列表
        }
    },
    computed: {
        // 未读消息的数量
        unreadCount() {
            return this.msgList.filter(m => m.read === false).length
        }
    }
}
```

### keep-alive 缓存组件

场景
- 局部频繁切换的组件，如 tabs
- 不可乱用 `<keep-alive>` ，缓存太多会占用大量内存，而且出问题不好 debug

## 异步组件

对于体积大的组件（如编辑器、表单、地图等）可以使用异步组件
- 拆包，需要时异步加载，不需要时不加载
- 减少 main 包的体积，页面首次加载更快

vue3 使用 `defineAsyncComponent` 加载异步组件

## 路由懒加载

对于一些补偿访问的路由，或者组件体积比较大的路由，可以使用路由懒加载。

```js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 路由懒加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
```
## SSR

SSR 让网页访问速度更快，对 SEO 友好。

但 SSR 使用和调试成本高，不可乱用。例如，一个低代码项目（在线制作 H5 网页），toB 部分不可用 SSR ， toC 部分适合用 SSR 。

有时候优化体验不只是在于快慢，合理的使用一些 loading icon 骨架屏 都能使体验更好；

## 答案

- v-if 和 v-show
- v-for 使用 key
- computed 缓存
- keep-alive
- 异步组件
- 路由懒加载
- SSR


## 使用 vue 过程中遇到过哪些坑

真实一点描述多一点

### 内存泄漏 导致页面卡顿
全局事件（如 `window.resize`）不解除，则会继续监听，而且组件再次创建时会重复绑定
定时器
vue 自定义事件

记得销毁

### 单页应用中一个页面滚动到中间位置，点击详情跳转到其他页面，再回来 会发现上一个页面没有保留滚动的位置而是回到了最上面
路由切换时，页面会 scroll 到顶部。例如，在一个新闻列表页下滑到一定位置，点击进入详情页，在返回列表页，此时会 scroll 到顶部，并重新渲染列表页。所有的 SPA 都会有这个问题，并不仅仅是 Vue 。
方案一：
- 在列表页缓存数据和 `scrollTop`
- 返回列表页时（用 Vue-router [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)，判断 `from`），使用缓存数据渲染页面，然后 `scrollTo(scrollTop)`

终极解决方案：MPA + APP Webview

多页应用，因为单页应用切换路由类似于 组件 v-if 创建销毁，而多页是本来就创建了两个页面，路由切换上一个页面还在
app 中有一个 new Webview() 像一个栈一样，打开一个页面B实际是 new Webview() 叠在 A 页面上面，B 页面关闭 A 页面还在；

### Vue2.x 中，无法监听 data 属性的新增和删除
Vue2.x 中，无法监听 data 属性的新增和删除，以及数组的部分修改 —— Vue3 不会有这个问题
- 新增 data 属性，需要用 `Vue.set`
- 删除 data 属性，需要用 `Vue.delete`
- 修改数组某一元素，不能 `arr[index] = value` ，要使用 `arr.splice` API 方式

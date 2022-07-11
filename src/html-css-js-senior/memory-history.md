## Vue 路由三种模式
- Hash 模式
- WebHistory 模式
- MemoryHistory 模式 （Vue2.x 叫 abstract 模式）

## v4 的升级
Vue-router 升级 v4 （vue-router4.x 对应 Vue3.x）之后，`mode: 'xxx'` 替换为 API 的形式，但功能是一样的
- `mode: hash` 替换为 `createWebHashHistory()` 
- `mode: history` 替换为 `createWebHistory()`
- `mode: abstract` 替换为 `createMemoryHistory()` 

## hash

```js
// http://127.0.0.1:8881/hash.html?a=100&b=20#/aaa/bbb
location.protocol // 'http:'
location.hostname // '127.0.0.1'
location.host // '127.0.0.1:8881'
location.port // '8881'
location.pathname // '/hash.html'
location.search // '?a=100&b=20'
location.hash // '#/aaa/bbb' （window.location.hash）
```

hash 的特点
- 会触发页面跳转，可使用浏览器的“后退” “前进”
- 但不会刷新页面，支持 SPA 必须的特性
- hash 不会被提交到 server 端（因此刷新页面也会命中当前页面，让前端根据 hash 处理路由）

url 中的 hash ，是不会发送给 server 端的。前端 `onhashchange` 拿到自行处理。

```js
// 页面初次加载，获取 hash
document.addEventListener('DOMContentLoaded', () => {
    console.log('hash', location.hash)
})
// hash 变化，包括：
// a. JS 修改 url
// b. 手动修改 url 的 hash
// c. 浏览器前进、后退
window.onhashchange = (event) => {
    console.log('old url', event.oldURL)
    console.log('new url', event.newURL)

    console.log('hash', location.hash)
}
```

## H5 history API

常用的两个 API
- `history.pushState`
- `window.onpopstate`

页面刷新时，**服务端要做处理**，可参考[文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)。。即无论什么 url 访问 server ，都要返回该页面。

按照 url 规范，不同的 url 对应不同的资源，例如：
- `https://github.com/` server 返回首页
- `https://github.com/username/` server 返回用户页
- `https://github.com/username/project1/` server 返回项目页

但是用了 SPA 的前端路由，就改变了这一规则，假如 github 用了的话：
- `https://github.com/` server 返回首页
- `https://github.com/username/` server 返回首页，前端路由跳转到用户页
- `https://github.com/username/project1/` server 返回首页，前端路由跳转到项目页

所以，从开发者的实现角度来看，前端路由是一个违反规则的形式。
但是从不关心后端，只关心前端页面的用户，或者浏览器来看，更喜欢 `pushState` 这种方式。

history.pushState: 向当前浏览器会话的历史堆栈中添加一个状态
window.onpopstate = funRef: 调用 history.pushState() 或者 history.replaceState() 不会触发 popstate 事件。popstate 事件只会在浏览器某些行为下触发，比如点击后退按钮（或者在 JavaScript 中调用 history.back() 方法）。即，在同一文档的两个历史记录条目之间导航会触发该事件。

## memoryHistory
表现：浏览器 url 不会发生变化，也不能实现前进后退
路由地址在内存中，**但页面刷新会重新回到首页**。

## 三种模式的区别

- hash - 使用 url hash 变化记录路由地址
- history - 使用 H5 history API 来改 url 记录路由地址
- abstract - 不修改 url ，路由地址在内存中，**但页面刷新会重新回到首页**。


## 连环问：react-router 有几种模式？

react-router 有三种模式，设计上和 vue-router 一样
- [browser history](https://reactrouter.com/web/api/BrowserRouter)
- [hash history](https://reactrouter.com/web/api/HashRouter)
- [memory history](https://reactrouter.com/web/api/MemoryRouter)
将“URL”的历史记录保存在内存中（不读取或写入地址栏）。适用于测试和非浏览器环境，如React Native。





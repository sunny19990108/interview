## ajax fetch axios 有什么区别
都是用来做网络请求的
ajax: Async Javascript And XML 异步的 js 和 XML，是一种技术统称
fetch: 和 XMLHttpRequest 是一个级别的，是浏览器的原生 API，二者的区别在于 fetch 更加简单、易用，且支持 Promise
axios: 是一个第三方 lib (库), 随着 Vue 一起火爆起来，是目前最常用的网络请求 lib，其内部可以用 fetch 或者 XMLHttpRequest 这样的 API 实现

## lib 和 API 的区别
lib: 第三方库，需要用 API 来实现，lib 有很多，可以自己去贡献
API: 浏览器对外提供的 相同功能的只有一个

tips: 实际工作中使用 lib，尽量不要自己造轮子；练习技术可以通过造轮子的方式
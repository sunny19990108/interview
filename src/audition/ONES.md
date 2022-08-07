## 准备
虚拟列表怎么设计
比如线上报错了，你如何确认是哪些方面的原因

## 一面
1、项目经历
收获最多的一段项目经历，最复杂的一段项目经历

2、一个父组件，里面两个子组件
子组件1是一个地图很大，子组件2是一个按钮，按钮要等地图渲染完之后才能由 disable 状态变成 enable 状态。
我采用的方式是：父组件里面维护一个state,地图组件渲染完之后用一个回调函数改变父组件的state,把这个值变成true,父组件会把这个值传给子组件2，子组件2监听到这个值变化后改变状态。

这样写有什么不好的地方吗？
渲染方面，父组件的值变化，可能导致子组件又都执行一遍（hooks 可以优化）

怎么写比较好：
- context 传递
https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext
上层组件：<MyContext.Provider value={xxx}>
子组件：const value = useContext(MyContext);
const theme = value.theme;
// 使用 theme 渲染了页面

- 自定义事件 发布订阅传递

- redux

以上三种方式有什么区别，分别在什么场景适合用？

context 在哪些场景可能有性能问题？
调用了 useContext 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 通过使用 memoization 来优化。
https://github.com/facebook/react/issues/15156#issuecomment-474590693

3、纯 css 里面，var() 的作用
https://developer.mozilla.org/zh-CN/docs/Web/CSS/var
举了一个例子，一键换肤，换主题
功能类似于 less 里面的 let，但不一样。
var() 可以替换任何css属性的值的任何部分。
```js
:component {
    -component-bg-color: #080;
}

body {
    backgroundColor: var(-component-bg-color, blue); // 如果-component-bg-color 没定义就降级显示为 blue
}
```

var() 和 less 变量的区别
换肤的解决方案

4、攻击 XSS CSRF

5、一个登录页面，登录之后在二级页面中可能token 会失效，这时候前端请求接口返回错误码，要跳转到登录页面。
现在后端实现了自动登录的接口，希望在token失效之后自动登录，不要让用户感知到。前端需要怎么改造？

当token失效，接口返回某个状态码的时候，跳转到登录页面的逻辑肯定是在一起的。
需要在拿到token失效的状态码后去请求自动登录的接口，接口返回成功，就正常请求业务接口；
接口返回失败，再根据失败原因看跳转到登录页，还是再请求一次。

6、反问


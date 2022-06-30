# setState

## 题目

React 中以下代码会输出什么

```js
class Example extends React.Component {
    constructor() {
      super()
      this.state = { val: 0 }
    }
  
    componentDidMount() {
      // this.state.val 初始值是 0 

      this.setState({val: this.state.val + 1})
      console.log(this.state.val)
  
      this.setState({val: this.state.val + 1})
      console.log(this.state.val)
  
      setTimeout(() => {
        this.setState({val: this.state.val + 1})
        console.log(this.state.val)
  
        this.setState({val: this.state.val + 1})
        console.log(this.state.val)
      }, 0)
    }
  
    render() {
      return <p>{this.state.val}</p>
    }
}
```

## setState 默认异步更新

```js
componentDidMount() {
  this.setState({val: this.state.val + 1}, () => {
    // 回调函数可以拿到最新值
    console.log('callback', this.state.val)
  })
  console.log(this.state.val) // 拿不到最新值
}
```

## setState 默认会合并

多次执行，最后 render 结果还是 `1`

```js
componentDidMount() {
  this.setState({val: this.state.val + 1})
  this.setState({val: this.state.val + 1})
  this.setState({val: this.state.val + 1})
}
```
因为这里三个 setState 都是异步的，这里合并执行的意思是：
- 三个 setState 中拿到的 this.state.val 的值都是一样的
- 执行 setState 后者覆盖前者

## setState 有时同步更新

根据 `setState` 的**触发时机是否受 React 控制**

如果触发时机在 React 所控制的范围之内，则**异步更新**
- 生命周期内触发
- React JSX 事件内触发

如果触发时机不在 React 所控制的范围之内，则**同步更新**
- setTimeout setInterval
- 原生的 DOM 事件（不包括 react 合成事件）
- Promise then
- ajax 网络请求回调

## setState 有时不会合并

第一，同步更新，不会合并

第二，传入函数，不会合并 （对象可以 `Object.assign`，函数无法合并）

```js
this.setState((prevState, props) => {
  return { val: prevState.val + 1 }
})
```

## 答案

题目代码执行打印 `0 0 2 3`

## 重点

`setState` 是 React 最重要的 API ，三点：
- 使用不可变数据
- 合并 vs 不合并
- 异步更新 vs 同步更新


同步更新、异步更新 以及 合并执行、不合并执行 都是 react17 中的问题
react18 中，新的 ReactDOM.createRoot() API（替换 ReactDOM.render()）, 这里同步执行的内容也都会触发 batchUpdate 机制，变成异步执行的
https://juejin.cn/post/6973222013028532237

setState 的本质
我们日常说的‘异步’其实是不严谨的，其实 setState 是同步的，react 为了性能，把多次 state 更新，只进行一次 dom 渲染。
在微任务执行之前，state 的值就已经计算完了，并可以通过回调的形式拿到最新的值

```js
class Example extends React.Component {
    constructor() {
      super()
      this.state = { val: 0 }
    }

    handleClick() {
        console.log('start')

        this.setState({val: this.state.val + 1}, () => {
            console.log('state',this.state.val)  // 回调中拿到最新的 state 值
        }) 

        Promise.resolve().then(() => { console.log('promise') })
        console.log('end')
    }
  
    render() {
      return <p onClick={handleClick}>{this.state.val}</p>
    }
}
//结果
// start
// end
// state 1
// promise
```


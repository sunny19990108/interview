## 箭头函数的缺点
没有 arguments
不能使用 bind apply call 改变他的 this

## 什么时候不能使用箭头函数
以下场景场景，如果需要在函数中使用 this，是不能用箭头函数的
对象的方法
对象原型方法
构造函数
动态上下文中的回调方法 比如： btn.addEventListener('click', () => { this.innerHTML = 'clicked' })
vue 的 method、生命周期 因为 vue 组件本质上也是一个对象

## tips
react（非hooks）生命周期中 使用箭头函数，在函数内部能正确的拿到 this，因为 react(非 hooks) 本质上是一个 ES6 class

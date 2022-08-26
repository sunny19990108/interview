## 初面
聊项目亮点 说了三点
聊 react hooks 原理
聊 es6 新特性
js没有私有变量，怎么实现私有变量，也就是可以通过内部的get 访问变量，可以通过内部的set 修改变量的值，但不能直接在外面修改变量的值？
https://juejin.cn/post/7042244444782870558
es6 class 介绍 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor
ts 中 private 
https://juejin.cn/post/6844903827490127880
```ts
class Person {
    private love: string; // or  prot
    constructor(love: string) {
      this.love = love;
    }
    public sayLove() {
      console.log(`my love is ${this.love}`)
    }
    public setLove(str: string) {
        this.love = str;
    }
}

let me = new Person('TS');
me.setLove('123');
me.sayLove();
```
原型链继承和es6 class 继承
ts类和es6中的类 https://ts.xcatliu.com/advanced/class.html 
私有属性 private 底层实现：WeakMap


关于原型链
```js
class A {
    constructor() {
        let a = 123; 
     }
     getA() {
         console.log(this.a);
     }
}
class B extends A {
    constructor() {
       let b = 123; 
    }
    getB() {
        console.log(this.b);
    }
}
console.log(B.__proto__); // [class A]
console.log(B.__proto__.__proto__); // {}
console.log(B.__proto__.__proto__.__proto__); // [Object: null prototype] {}
console.log(B.__proto__.__proto__.__proto__.__proto__); // null


const a = {
    'name': 'li'
};
console.log(a.__proto__); // [Object: null prototype] {}
console.log(a.__proto__._proto__); // undefined


let c = [a,3,4];
console.log(c.__proto__); // Object(0) []
console.log(c.__proto__._proto__); // undefined
```


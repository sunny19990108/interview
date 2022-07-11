## for in 和 for of 区别

for...in 用于**可枚举**数据，比如：对象、数组、字符串，得到 key
for...of 用于**可迭代**数据，比如：数组、字符串、Map、Set、Generator，得到 value

## for await of
遍历多个 Promise
上传多张图片：
一次性上传
一张一张的上传： 可以用 for await of + await 保证顺序不乱

tips:
## 是否可枚举
enumerable 属性是否为true
const obj1 = { 'a': 123 };
Object.getOwnPropertyDescriptors(obj1) 得到的属性里面 enumerable 是否为 true

## 是否可迭代
是否有 Symbol.iterator 属性，比如：控制台打印 ['aaa','bb'][Symbol.iterator]()

## Generator
 function* foo() {
     yield 10
     yield 20
     yield 30
 }
 for (let n of foo()) {
     console.log(n)
 }

## for...of 遍历 Map
得到的是 键值数组 [key, value]

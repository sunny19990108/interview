## 严格模式

### 怎么开启
全局： 顶部第一行 'use strict'
局部： 作用域内第一行 ‘use strict’

### 严格模式的要求
1、全局变量必须声明
eg: n = 10; // 报错 -> let n = 10;

2、禁止使用 with
const obj = { x: 100, y: 200 };
with (obj) {
    console.log(x);
}

3、创建 eval 作用域
eval有自己的作用域 不会和外部相互污染
'use strict'
let i = 10;
eval(`let i = 20; console.log('in eval', i)`); // 实际非常不推荐用
console.log('out eval', i);

4、禁止 this 指向 window
function fn() {
    console.log('this', this)
}
fn(); // 非严格模式打印 window 严格模式打印 undefined

5、函数参数不能重复、Object key 不能重复
let obj = { a: 1, a: 1};

function fn(x, x, y) {
    console.log('this', this)
}
fn(10, 10, 20); // 非严格模式不报错 严格模式会报错

6、
'use strict';

let a;
delete a; // 报错 禁止 delete 变量

let obj = {};
obj.a = 1; // 报错 禁止用直接写入的方式扩展对象属性


var obj2 = { get x() { return 17; } };
obj2.x = 5; // 抛出 TypeError 错误 禁止给只读属性赋值



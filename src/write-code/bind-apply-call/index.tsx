/**
 * 手写 bind
 * call
 * apply
 */

// 手写 bind，借助 apply 实现
// @ts-ignore
Function.prototype.myBind = function (thisOrigin: any, ...bindArgs: any[]) {
    // thisOrigin 传入的 this
    // bindArgs 传入的参数
    const self = this; // 当前函数本身
    return function(...args: any[]) {
        const newArgs = bindArgs.concat(args)
        return self.apply(thisOrigin, newArgs)
    }
}

// // 功能测试
// function fn(this: any, a: any, b: any, c: any) {
//     console.info(this, a, b, c)
// }
// // @ts-ignore
// const fn1 = fn.myBind({x: 100}, 10)
// fn1(20, 30)

// 自己实现apply
// @ts-ignore
Function.prototype.myApply = function(thisOrigin: any, bindArgs: any[] = []) {
    let context = thisOrigin;
    if(thisOrigin == null) context = globalThis; // 如果没有传入 this ，this 指向 globalThis （window）
    if(typeof thisOrigin !== 'object') context = new Object(thisOrigin); //值类型 转换为 引用类型

    const key = Symbol();
    context[key] = this;
    const res =  context[key](...bindArgs);
    delete context[key]; // 清理掉 fn ，防止污染
    return res;

}

// 解析
// const obj = {x: 1, fn(){this.a = 'a';}}
// 执行 obj.fn() 这时候 fn内部的this 就指向 obj 了
// 可以借此来实现 this


// 自己实现call
// @ts-ignore
Function.prototype.myCall = function(thisOrigin: any, ...bindArgs: any[] = []) {
    let context = thisOrigin;
    if(thisOrigin == null) context = globalThis; // 如果没有传入 this ，this 指向 globalThis （window）
    if(typeof thisOrigin !== 'object') context = new Object(thisOrigin); //值类型 转换为 引用类型

    const key = Symbol();
    context[key] = this;
    const res =  context[key](...bindArgs);
    delete context[key]; // 清理掉 fn ，防止污染
    return res;

}
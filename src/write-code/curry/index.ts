/**
 * 函数柯里化 
 * 返回一个柯里化的函数
 * fn(1)(2)(3)
 * fn(1,2)(3)
 */

export function curry(fn: Function): Function {
    // 传入函数的参数长度
    const fnArgsLen = fn.length; 
    // 累积参数
    let curArgs: any[] = [];
    function curryFn(this: any, curryArgs: any[]) {
        curArgs = curArgs.concat(curryArgs);

        if(curArgs.length < fnArgsLen) {
            // 参数不够 继续累积参数
            return curryFn;
        }else {
            // 参数够了 执行方法
            return fn.apply(this, curArgs.slice(0, fnArgsLen))
        }
    }

    return curryFn;
}

function add(a: number, b: number, c: number): number {
    return a + b + c
}
// add(10, 20, 30) // 60

const curryAdd = curry(add)
const res = curryAdd(10)(20)(30) // 60
console.info(res)
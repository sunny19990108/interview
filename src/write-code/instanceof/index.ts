/**
 * 手写 instanceof
 */

export function myInstanceof(value: any, origin: any): boolean {
    // 值是 null undefined 返回false
    if(value == null) return false;
    // 值类型都返回false
    if(typeof value !== 'object' && typeof value !== 'function') return false;
    // 引用类型
    let tempConstructor = value.__proto__;
    while(tempConstructor) {
        if(tempConstructor === origin.prototype) {
            return true;
        }else {
            tempConstructor = tempConstructor.__proto__; // 顺着原型链向上找
        }
    }

    return false;
}

// 功能测试
// console.info( myInstanceof({}, Object) )
// console.info( myInstanceof([], Object) )
// console.info( myInstanceof([], Array) )
// console.info( myInstanceof({}, Array) )
// console.info( myInstanceof('abc', String) )
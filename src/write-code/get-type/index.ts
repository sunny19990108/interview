/**
 * @description 获取任意数据的数据类型
 */

export function getType(x: any): string {
    const originType = Object.prototype.toString.call(x); // '[object String]'
    const spaceIndex = originType.indexOf(' ');
    const type = originType.slice(spaceIndex + 1, -1) // 'String'

    return type.toLowerCase(); // string
}

// 获取类型的方式
// typeof 只能获取值类型，引用类型（Object Array 不行） typeof 'hi'
// instanceof 不能获取类型，可以判断是否是某个类型 'hi'y instanceof String
// Object.prototype.toString.call() 可以获取所有类型

// 功能测试
// console.info( getType(null) ) // 'null'
// console.info( getType(undefined) )
// console.info( getType(100) )
// console.info( getType('abc') )
// console.info( getType(true) )
// console.info( getType(Symbol()) )
// console.info( getType({}) )
// console.info( getType([]) )
// console.info( getType(() => {}) )
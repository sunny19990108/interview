/**
 * 深拷贝
 */

// 如果不涉及函数、Map、Set、循环引用 等使用 JSON.parse() JSON.stringify() 是一个很好的选择，性能也比较好
// 但 JSON.parse JSON.stringify 转换不了函数、Map、Set 遇到循环引用也会报错

// 因此要想写一个功能完整的深拷贝 还是要自己实现

export function cloneDeep(obj: any, map: WeakMap<any, any> = new WeakMap()): any {
    if(typeof obj !== 'object' || obj == null) return obj

    // 避免循环引用
    const objFromMap = map.get(obj)
    if(objFromMap) return objFromMap

    let target: any = {};
    map.set(obj, target)

    // Map
    if (obj instanceof Map) {
        target = new Map()
        obj.forEach((v, k) => {
            const k1 = cloneDeep(k, map)
            const v1 = cloneDeep(v, map)
            target.set(k , v)
        })
    }

    // Set
    if (obj instanceof Set) {
        target = new Set();
        obj.forEach((item) => {
            const v = cloneDeep(item, map)
            target.add(v)
        })
    }

    // Array
    if (obj instanceof Array) {
        target = obj.map((item) => cloneDeep(item, map))
    }

    // Object
    for(let key in obj) {
        target[key] = cloneDeep(obj[key], map)
    }
       
    return target

}
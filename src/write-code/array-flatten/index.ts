/**
 * @description 数组扁平化
 */

// push
export function flattenDeep1(arr: any[]): any[] {
    const res:any[] = [];
    const len = arr.length;

    if(!len) return res;

    for(let i = 0; i < len; i++) {
        if(Array.isArray(arr[i])) {
            const flattenItem = flattenDeep1(arr[i]);
            flattenItem.forEach(n => res.push(n))
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

// concat
export function flattenDeep2(arr: any[]): any[] {
    let res:any[] = [];
    const len = arr.length;

    if(!len) return res;

    for(let i = 0; i < len; i++) {
        if(Array.isArray(arr[i])) {
            const flattenItem = flattenDeep2(arr[i]);
            res = res.concat(flattenItem)
        } else {
            res = res.concat(arr[i])
        }
    }
    return res;
}

// toString 的方式最好不用
// 不符合鲁棒性，虽然看起来代码简洁，但数组里如果有 Object 或者 Set Map
// 转换完会丢失值 比如 对象转换完都会变成 [Object, Object]

// console.log(flattenDeep1([1,2,3,4,[4,5,[4,['a','b'],6,7],6],9]));
// console.log(flattenDeep2([1,2,3,4,[4,5,[4,['a','b'],6,7],6],9]));

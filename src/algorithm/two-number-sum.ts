
/**
 * @description 寻找和为 sum 的两个数
 * @param arr 有序数组
 * @param sum 和
 * @returns 两个数字组成的数组
 */

// 双重 for 循环 
 export function findTowNumbers1(arr: number[], n: number): number[] {
    const res: number[] = []

    const length = arr.length
    if (length === 0) return res

    // O(n^2)
    for (let i = 0; i < length - 1; i++) {
        const n1 = arr[i]
        let flag = false // 是否得到了结果

        for (let j = i + 1; j < length; j++) {
            const n2 = arr[j]

            if (n1 + n2 === n) {
                res.push(n1)
                res.push(n2)
                flag = true
                break
            }
        }

        if (flag) break // 多利用 break 尽量减少计算次数
    }

    return res
}

// map 思路
// 时间复杂度 O(n^2) 只比上面双重 for 循环快一点点
export function findTowNumbers2(arr: number[], sum: number): number[] {
    const res: number[] = [];
    const map: {[key: number]: number} = {};
    if(!arr.length) return res;

    for(let i = 0; i <= arr.length - 1; i++) {
        if(!map[arr[i]]) {
            map[arr[i]] = sum - arr[i];
            if(map[sum - arr[i]]) {
                res.push(sum - arr[i]);
                res.push(arr[i]);
                break;  
            }
        }
    }

    return res;
}

// 如果数组是有序的
// 双指针法
// 双指针解决 有序的循环嵌套问题
export function findTowNumbers3(arr: number[], sum: number): number[] {
    const res: number[] = [];
    const len = arr.length;
    if (len === 0) return res;

    let start = 0;
    let end = len - 1;
    
    while(start < end) {
        const i = arr[start];
        const j = arr[end];
        if(i + j > sum) {
            end--;
        }else if(i + j < sum) {
            start++;
        }else {
            res.push(i)
            res.push(j)
            break;
        }
    }

    return res;
}

// 性能测试
const arr = [1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2,1, 2, 4, 7, 11, 15];
console.time('findTowNumbers1')
for( let i = 0; i < 100*10000; i++) {
    findTowNumbers1(arr,15);
}
console.timeEnd('findTowNumbers1') // 350ms

console.time('findTowNumbers2')
for( let i = 0; i < 100*10000; i++) {
    findTowNumbers2(arr,15);
}
console.timeEnd('findTowNumbers2') // 188ms

console.time('findTowNumbers3')
for( let i = 0; i < 100*10000; i++) {
    findTowNumbers3(arr,15);
}
console.timeEnd('findTowNumbers3') // 43ms


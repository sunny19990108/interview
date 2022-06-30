/**
 * @description 二分查找
 * @params arr 有序数组 target 要查找的元素
 * @returns 下标
 */

// 循环方式实现
export function binarySearch1(arr: number[], target: number): number {
    const len = arr.length;
    if(!len) return -1;
    let start = 0; // 开始位置
    let end = len -1; // 结束为止

    while(start <= end) {
        const midIndex = Math.floor((start + end) / 2);
        const midValue = arr[midIndex];

        if(target > midValue) {
            start = midIndex + 1;
        }else if(target < midValue) {
            end = midIndex - 1;
        }else {
            return midIndex;
        }
    }

    return -1;
}

// 递归方式实现
export function binarySearch2(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
    const len = arr.length;
    if(!len) return -1;
    
    if(!startIndex) startIndex = 0;
    if(!endIndex && endIndex !== 0) endIndex = len - 1;

    if(startIndex > endIndex) return -1;

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];
    if(target > midValue) {
        return binarySearch2(arr, target, midIndex + 1, endIndex);
    }else if(target < midValue) {
        return binarySearch2(arr, target, startIndex, midIndex - 1);
    }else {
        return midIndex;
    }
}

// 通过 console.time() console.timeEnd() 测试两个方法 得出循环的方式是稍微快一些的
// 原因： 循环只调用一次函数，递归会频繁调用函数，频繁调用函数会有一定的开销

// 两个方法时间复杂度都是 O(logn) 递归代码逻辑更清晰，循环性能更好一些

// 凡有序 必二分；凡二分 时间复杂度必包含 O(logn)

// console.log(binarySearch1([1,3,5,9,30,40,90],30))
// console.log(binarySearch1([],30))
// console.log(binarySearch1([1,3,5,9,30,40,90],0))
// console.log(binarySearch2([1,3,5,9,30,40,90],30))
// console.log(binarySearch2([],30))
// console.log(binarySearch2([1,3,5,9,30,40,90],0))
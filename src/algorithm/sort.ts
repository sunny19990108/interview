/**
 * 快排和冒泡
 */

// 快排 O(nlogn)
export function quickSort(arr: number[]): number[] {
    const len = arr.length;
    if(len === 0) return arr;

    // 细节： 找一个支点值
    const midIndex = Math.floor(len / 2);
    const midValue = arr[midIndex];

    let left = []; // 存放比 midValue 小的值
    let right = []; // 存放比 midValue 大的值

    for(let i = 0; i < len; i++) {
        if(i !== midIndex) {  // 细节： 排除中间元素
            if(arr[i] < midValue) {
                left.push(arr[i]);
            }else {
                right.push(arr[i]);
            }
        }
    }
    return quickSort(left).concat(midValue, quickSort(right));
}

// 冒泡 O(n^2)
export function bubbleSort(arr: number[]): number[] {
    
    for(let i = 0; i < arr.length; i++) {
        for(let j = i; j < arr.length; j++) {
            if(arr[i] > arr[j]) {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}


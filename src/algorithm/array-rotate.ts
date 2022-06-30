/**
 * 旋转数组 k 步 - 使用 concat
 * @param arr arr
 * @param k k
 */
export function rotateArray(arr: number[] , k: number): number[] {
    const length = arr.length;
    if(!k || !Number(k) || length === 0 || k <= 0 ) {
        return arr;
    }
    return arr.slice(-k).concat(arr.slice(0 , -k ));
    // return arr.slice(-k).concat(arr.slice(0 ,length - k ));
    // return arr.splice(-k).concat(arr.splice(0 ,length - k ));
}

// 测试性能
console.time('rotate');
const arr = [];
for(let i = 0; i < 10 * 10000; i++) {
    arr.push(i);
}
rotateArray(arr, 9 * 10000);
console.timeEnd('rotate');

// 还有一种思路是 利用数组的pop 和 unshift方法，一个一个的将数组末尾的元素拿出来插入到最前面去
// 但非常不推荐，因为时间复杂度很高是 O(n^2) 
// 数组是有序的一块内存，数组的 unshift, shift, splice等会改变原数组涉及到插入的操作是很慢的，时间复杂度是 O(n)
// 所以这三个api要尽量少用

// 其他思路：将数组转换成字符串后再操作，也可以用for循环一个一个的翻转元素for循环里面将需要插入到数组前面的元素显拼接成字符串，后面再打成数组和原数组 concat
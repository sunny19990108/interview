/**
 * @description 将一个数组中的 0 移动到数组末尾，其他元素位置不变，且必须在原数组中操作
 * 
 */

// 不能用splice 因为splice时间复杂度 O(n)，还需要遍历数组 这样加起来时间复杂度就是 O(n^2)
// 数组是连续存储的结构 算法中要慎用 splice、shift、unshift
// 双指针思路 解决 嵌套循环问题！！！

export function moveZero(arr: number[]): void {
    if(!arr.length) return;
    let i,
    j = -1;
    for(i = 0; i < arr.length; i++) {
        if(arr[i] === 0 && j < 0) {
            j = i; // 第一个 0
        }
        if(arr[i] !== 0 && j >= 0) {
            // 交换
            // j 指向的一定是 0
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            j++;
        }
    }
    
}
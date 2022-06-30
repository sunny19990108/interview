/**
 * 求斐波那契的第 n 个数
 * 0 1 1 2 3 5 8 13 21 ... 
 */

// 递归
// 时间复杂度 O(2^n)
// 大量重复计算，不可取
// export function fibnacci(n: number): number {
//     if(n <= 0) return 0;
//     if(n === 1) return 1;
//     return fibnacci(n - 1) + fibnacci(n - 2)
// }

// 循环
export function fibnacci(n: number): number {
    if(n <= 0) return 0;
    if(n === 1) return 1;

    let n1 = 0; // 记录 n - 2 的值
    let n2 = 1; // 记录 n - 1 的值
    let res = n1 + n2;

    for(let i = 3; i <= n; i++) {
        n1 = n2;
        n2 = res;
        res = n1 + n2;
    }

    return res;
}
// console.log(fibnacci(9))
// console.log(fibnacci(-1))
// console.log(fibnacci(2))
// console.log(fibnacci(3))
// console.log(fibnacci(6))

// 引出概念： 动态规划
// 把一个大问题拆解成小问题，然后逐级向下拆解
// 用递归的思路分析问题，后面再改为循环的方式实现

// 算法三大思维： 贪心、二分、动态规划
// 贪心： 比如中序遍历二叉树，先找左子，如果左子还有左子，就继续向里找，直到没有左子
/**
 * 青蛙跳台阶 每次可以跳 1 节 或 2 节
 * @params n 台阶数量
 * @return 一共有几种方式可以到达终点
 */

// 时间复杂度 O(n)
// 空间复杂度 O(1)
export function jumpStep(n: number): number {
    if( n <= 0) return 0;
    if( n === 1) return 1;
    if( n === 2 ) return 2;
 
    let n1 = 1; // 记录 n - 2
    let n2 = 2; // 记录 n - 1
    let result = 0;
    for(let i = 3; i <= n; i++) {
        result = n1 + n2;
        n1 = n2;
        n2 = result;
    }
    return result;
}

// console.log(jumpStep(7))
// console.log(jumpStep(1))
// console.log(jumpStep(2))
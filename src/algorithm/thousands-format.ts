/**
 * 输入一个数字，输出千分位的字符串
 */

// 常规思路 1、正则 2、拆分字符串 3、转为数组 reverse 每 3 位拆分
// 算法题目中： 正则表达式 时间复杂度会比较高，不考虑，但工作中还是鼓励的

/**
 * 千分位格式化（使用数组）
 * @param n number
 */
 export function format1(n: number): string {
    n = Math.floor(n) // 只考虑整数

    const s = n.toString()
    const arr = s.split('').reverse()
    return arr.reduce((prev, val, index) => {
        if (index % 3 === 0) {
            if (prev) {
                return val + ',' + prev
            } else {
                return val
            }
        } else {
            return val + prev
        }
    }, '')
    
}

/**
 * 数字千分位格式化（字符串分析）
 * @param n number
 */
export function format2(n: number): string {
    n = Math.floor(n) // 只考虑整数

    let res = ''
    const s = n.toString()
    const length = s.length

    for (let i = length - 1; i >= 0; i--) {
        const j = length - i
        if (j % 3 === 0) {
            if (i === 0) {
                res = s[i] + res
            } else {
                res = ',' + s[i] + res
            }
        } else {
            res = s[i] + res
        }
    }

    return res
}

/**
 * 数字千分位格式化 （正则）
 * @param n number
 */
 export function format3(n: number): string {
    n = Math.floor(n) // 只考虑整数

    const s = n.toString()
    const reg = /(\d)(?=(?:\d{3})+$)/g;

    return s.replace(reg, '$1,');
}

// // 功能测试
// const n = 10201004050
// console.info('format1', format1(n))
// console.info('format2', format2(n))
// console.info('format3', format2(n))

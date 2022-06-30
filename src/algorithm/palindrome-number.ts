/**
 * @description 求对称数
 * @params num 是 1-10000 之间的数字
 * @return number[] num以内所有的对称数
 */

// 数字转换成字符串 再转数组 反转数组 再转字符串 和原来比较
export function palindromeNumber(num: number): number[] {
    const res: number[] = [];
    if(num <= 0) return res;

    for(let i = 1; i <= num; i++) {
        const str = i.toString();
        const reverseStr = str.split('').reverse().join('');

        if(str === reverseStr) {
            res.push(Number(str))
        }
    }
    return res;
}

// 操作字符串 比较首尾是否相等
export function palindromeNumber2(num: number): number[] {
    const res: number[] = [];
    if(num <= 0) return res;

    for(let i = 1; i <= num; i++) {
        const str = i.toString();

        let flag = true; // 标志首尾相等
        for(let j = 0; j < str.length; j++) {
            const head = str[j];
            const tail = str[str.length - 1 - j];
            if(j > str.length - 1 - j) {
                break;
            }
            if(head === tail) {
                continue;
            }
            if(head !== tail) {
                flag = false;
                break;
            }
        }

        if(flag) {
            res.push(i);
        }

    }
    return res;
}

// 操作数字 求出反转数 比较反转数和原来的数字是否相等
export function palindromeNumber3(num: number): number[] {
    const res: number[] = [];
    if(num <= 0) return res;

    for(let i = 1; i <= num; i++) {
        let rev = 0; // 反转数
        let temp = i;

        // 求反转数
        while(temp > 0) {
            rev = rev * 10 + temp % 10;
            temp = Math.floor(temp / 10);
        }

        if(rev === i) {
            // 相等 push
            res.push(i);
        }

    }
    return res;
}

// 思路四： 像括号匹配那样 利用栈实现，因为要用到数组结构，性能肯定没有上面的好

// 功能测试
// console.log(palindromeNumber(200));
// console.log(palindromeNumber2(200));
// console.log(palindromeNumber3(200));

// 性能测试
// console.time('findPalindromeNumbers1')
// palindromeNumber(100 * 10000)
// console.timeEnd('findPalindromeNumbers1') // 153ms

// console.time('findPalindromeNumbers2')
// palindromeNumber2(100 * 10000)
// console.timeEnd('findPalindromeNumbers2') // 22ms

// console.time('findPalindromeNumbers3')
// palindromeNumber3(100 * 10000)
// console.timeEnd('findPalindromeNumbers3') // 11ms

 // 算法性能： 操作数字最快，其次是字符串，尽量不要转换数据结构，尤其是不要转换成数组这种有序结构，因为操作数组相对操作数字和字符串会慢很多
 // 尽量用原始方式 ， 一些内置 API 比如 reverse 不好辨识复杂度

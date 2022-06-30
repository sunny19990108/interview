/**
 * @description 求字符串中连续次数最多的字符 以及 次数
 */

interface IRes {
    char: string;
    length: number;
}

/**
 * 双重 for 循环，因为有跳步 和 break 内外层循环的次数都大大减少 时间复杂度 O(n)  空间复杂度 O(1)
 * @param str 字符串
 * @returns 连续次数最多的字符 以及 字符的次数
 */
export function continueChar(str: string): IRes {
    const res: IRes = {
        char: '',
        length: 0
    }
    if(!str?.length) return res;

    let tempLength = 0 // 临时记录当前连续字符的长度
    for(let i = 0; i < str.length; i++) {
        tempLength = 0; // 重置

        for(let j = i; j < str.length; j++) {
            if(str[i] === str[j]) {
                tempLength++;
            }
            if (str[i] !== str[j] || j === str.length - 1) {
                // 不相等，或者已经到了最后一个元素。要去判断最大值
                if (tempLength > res.length) {
                    res.char = str[i]
                    res.length = tempLength
                }

                if (i < str.length - 1) {
                    i = j - 1 // 跳步
                }

                break
            }
        }
    }
    return res
    
}

/**
 * map 记录 连续字符出现次数的方式
 * 时间复杂度 O(n)  空间复杂度 O(n)
 */
export function continueChar2(str: string): IRes {
    const res: IRes = {
        char: '',
        length: 0
    }
    if(!str?.length) return res;

    let maxLength = 0 // 临时记录最大连续字符的长度
    let resMap: {[key: string]: number} = {};
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(char !== str[i+1]) {
            resMap[char] = 1;
        }
        if(char === str[i+1]) {
            resMap[char] = (resMap[char]|| 1) + 1;
        }
        if(resMap[char] > maxLength) {
            res.char = char;
            res.length = resMap[char];
            maxLength = res.length;
        }
    }
    return res 
}

/**
 * 双指针 优化 双重 for 循环
 * 时间复杂度 O(n) 空间复杂度 O(1)
 */
 export function continueChar3(str: string): IRes {
    const res: IRes = {
        char: '',
        length: 0
    }
    if(!str?.length) return res;

    let maxLength = 0 // 临时记录最大连续字符的长度
    let j = 0;
    for(let i = 0; i < str.length; i++) {
        // i 和 j 对应的值相等，累加 maxlength
        if(str[j] === str[i]) {
            maxLength++;
        }
        // 不相等 或者 i 到末尾了 操作
       if(str[j] !== str[i] || i === str.length - 1) {
            if(maxLength > res.length) {
                res.char = str[j];
                res.length = maxLength;
            }

            maxLength = 0; // 重置 length

            if(i < str.length - 1) {
                j = i; // 让 j 追上 i
                i--; // 细节
            }
        }
    }
    return res 
}

// 综合三种方法的时间复杂度 和 空间复杂度
// map 的方式 不推荐！！！， 徒增空间复杂度
// 还有正则表达式的方式 可以实现，但非常不推荐 因为正则表达式内部实现类似一个小的编译器 效率非常低！！！
// ps: 算法题尽量使用“低级” 代码，慎用各种 API 以及 语法糖

// 划重点
// 注意实际的复杂度，而不要被表面迷惑，比如 双重 for 循环内的跳步
// 双指针 常用来解决 双重 for 循环的问题 ！！！
// 算法题慎用正则表达式（实际工作可以用）


// 功能测试
// console.info(continueChar('aaaaaaa'));
// console.info(continueChar('abcddcddee'));
// console.info(continueChar('abcddcddeeiiiiorpu'));
// console.info(continueChar('abcdiorpu'));
// console.info('continueChar3',continueChar3('aaaaaaa'));
// console.info('continueChar3',continueChar3('abcddcddee'));
// console.info('continueChar3',continueChar3('abcddcddeeiiiiorpu'));
// console.info('continueChar3',continueChar3('abcdiorpu'));

// 性能测试
// let str = '';
// for (let i = 0; i < 100 * 10000; i++) {
//     str += i.toString()
// }

// console.time('findContinuousChar1')
// continueChar(str)
// console.timeEnd('findContinuousChar1') // 133ms

// console.time('findContinuousChar2')
// continueChar2(str)
// console.timeEnd('findContinuousChar2') // 103ms

// console.time('findContinuousChar2')
// continueChar3(str)
// console.timeEnd('findContinuousChar2') // 139ms

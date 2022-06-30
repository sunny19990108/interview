

/**
 * 判断括号是否匹配
 * @param leftBracket 左括号
 * @param rightBracket 右括号
 */
function isMatch(leftBracket: string, rightBracket: string): boolean {
    if(leftBracket === '{' && rightBracket === '}') return true;
    if(leftBracket === '[' && rightBracket === ']') return true;
    if(leftBracket === '(' && rightBracket === ')') return true;
    return false;
}

/**
 * 字符串括号是否匹配
 * 时间复杂度 O(n)
 * 空间复杂度 O(n)
 */
export function matchBracket(str: string): boolean {
    const length = str.length;
    const leftBracket = '{[(';
    const rightBracket = '}])';
    const stack = [];
    for(let i = 0; i < length; i++) {
        if(leftBracket.includes(str[i])) {
            stack.push(str[i]);
        }else if(rightBracket.includes(str[i])){
            if(isMatch(stack[stack.length - 1] ,str[i])) {
                stack.pop(); 
            }else {
                return false;
            }
        }
    }
    return stack.length === 0;
}


// 栈 VS 数组
// 二者没有任何联系，栈是一个逻辑上的概念，理论模型，可以用数组实现，也可以用其他的比如链表实现
// 数组是一个物理概念，受编程语言的限制，有固定的api
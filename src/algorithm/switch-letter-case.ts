/**
 * @description 字符串字母大写变小写，小写变大些
 */

// 正则
export function switchLetterCase(str: string): string {

    let resultStr = '';
    if (str.length === 0) return resultStr;

    const reg1 = /[a-z]/;
    const reg2 = /[A-Z]/;

    for(let i = 0; i < str.length; i++) {
        if(reg1.test(str[i])) {
            resultStr = resultStr + str[i].toUpperCase();
        } else if(reg2.test(str[i])) {
            resultStr = resultStr + str[i].toLowerCase();
        } else {
            resultStr = resultStr + str[i];
        }
    }
    return resultStr;
}

// 字符ASCII码
export function switchLetterCase2(str: string): string {
    let resultStr = '';
    if (str.length === 0) return resultStr;

    for(let i = 0; i < str.length; i++) {
        const c = str[i]
        const code = c.charCodeAt(0) // 浏览器 'a'.charCodeAt(0) 可以查看字符的ASCII码

        if (code >= 65 && code <= 90) {
            resultStr += c.toLowerCase()
        } else if (code >= 97 && code <= 122) {
            resultStr += c.toUpperCase()
        } else {
            resultStr += c
        }
    }
    return resultStr;
}

// 正则的效率依然是比 charCodeAt 要低很多
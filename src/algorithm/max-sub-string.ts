
// 求最长不重复子串
function maxStr(str: String) {
    if(typeof str !== 'string' || str.length <= 0) new Error('输入不合法');

    let startIndex = 0;
    let subStr = '';
    let tempStr = '';
    let odd = new Set();

    for(let i = 0; i < str.length; i++) {
        if(!odd.has(str[i])) {
            odd.add(str[i]);
            subStr = subStr + str[i];
        } else {
            startIndex = i;
            if(odd.size > tempStr.length) {
                odd.clear();
                odd.add(str[i]);
                tempStr = subStr;
                subStr = str[i];
            }
        }
        console.log(startIndex, i, subStr, tempStr, odd);

    }

    return subStr.length > tempStr.length ? subStr : tempStr;

}

// 求最长不重复子串长度
function maxLength(str: String) {
    if(typeof str !== 'string' || str.length <= 0) new Error('输入不合法');

    let startIndex = 0;
    let maxLength = 0;
    let odd = new Set();

    for(let i = 0; i < str.length; i++) {
        if(!odd.has(str[i])) {
            odd.add(str[i]);
        } else {
            startIndex = i;
            if(odd.size > maxLength) {
                maxLength = odd.size;
                odd.clear();
                odd.add(str[i]);
            }
        }
        console.log(startIndex, i, odd, maxLength);
    }

    return maxLength;

}
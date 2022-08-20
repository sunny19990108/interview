// 题目1 写一个方法，求解 x 的 n 次方，要求时间复杂度小于 log(n)

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
let myPow = function(x, n) {
    let b = n;
    if(b === 0) return 1;
    if(b < 0) {
        x = 1/x;
        b = -b;
    }
    let res = 1;
    while(b>0) {
        if(b&1) {
            res *= x;
        }
        x = x * x;
        b>>>=1;
    }
    return res;
};

let myPow2 = function(x, n) {
    let b = n;
    if(b === 0) return 1;
    if(b < 0) {
        x = 1/x;
        b = -b;
    }
    let res = 1;
    while(b>0) {
        if(b % 2 === 1) {
            res *= x;
        }
        x = x * x;
        b = Math.floor(b/2);
    }
    return res;
};


// 题目二： 求 x 的平方根, 结果保留整数
/**
 * @param {number} x
 * @return {number}
 */
let mySqrt = function(x) {
    if(x === 0 || x === 1) return x;

    let left = 0;
    let right = x;
    while(right - left > 1) {
        let mid = Math.ceil((left + right) / 2);
        if(mid * mid === x) {
            return mid;
        }else if(mid * mid > x) {
            right = mid;
        }else {
            left = mid;
        }
    }
    return left;

};
/**
 * 判断是不是素数 
 * 在大于 1 的自然数中，只有 1 和 他本身两个因数叫素数也叫质数
 * 在大于 1 的自然数中，除了 1 和 他本身外还有其他因数的叫合数
 * 0 和 1 即不是素数也不是合数
 * @param {*} num 
 * @returns 
 */
 function isPrimeNum(num) {
    for(let i = 2; i * i <= num; i++) {
        if(num % i === 0) return false;
    }
    return true;
}
// const promise = new Promise((resolve, reject) => {
//     console.log(1);

const { template } = require("@babel/core")

//     setTimeout(() => {
//         console.log('timeStart');
//         resolve('success');
//         console.log('timerEnd');
//     },0);
//     console.log(2);
// });

// promise.then((res) => {
//     console.log(res);
// }).then((res) => {
//     console.log(res);
// }).then((res) => {
//     console.log(res);
// })
// console.log(4);

// 1
// 2
// 4
// timeStart
// timerEnd
// success
// undefined
// undefined

// function maxStr(str) {
//     if(typeof str !== 'string' || str.length <= 0) new Error('输入不合法');

//     let startIndex = 0;
//     let subStr = '';
//     let tempStr = '';
//     let odd = new Set();

//     for(let i = 0; i < str.length; i++) {
//         if(!odd.has(str[i])) {
//             odd.add(str[i]);
//             subStr = subStr + str[i];
//         } else {
//             startIndex = i;
//             if(odd.size > tempStr.length) {
//                 odd.clear();
//                 odd.add(str[i]);
//                 tempStr = subStr;
//                 subStr = str[i];
//             }
//         }
//         console.log(startIndex, i, subStr, tempStr, odd);

//     }

//     return subStr.length > tempStr.length ? subStr : tempStr;

// }

// function maxLength(str) {
//     if(typeof str !== 'string' || str.length <= 0) new Error('输入不合法');

//     let startIndex = 0;
//     let maxLength = 0;
//     let odd = new Set();

//     for(let i = 0; i < str.length; i++) {
//         if(!odd.has(str[i])) {
//             odd.add(str[i]);
//         } else {
//             startIndex = i;
//             if(odd.size > maxLength) {
//                 maxLength = odd.size;
//                 odd.clear();
//                 odd.add(str[i]);
//             }
//         }
//         console.log(startIndex, i,odd , maxLength);

//     }

//     return maxLength;

// }

// console.log(maxLength('abcabcda'));

async function async1() {
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}

async function async2() {
    console.log('async2')
}

console.log('script start')

setTimeout(function() {
    console.log('setTimeOut')
}, 0)

async1()

new Promise(function(resolve) {
    console.log('promise1')
    resolve()
}).then(function() {
    console.log('promise2')
})

console.log('script end')
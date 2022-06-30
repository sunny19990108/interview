/**
 * @description 对称数 test
 * @author 双越老师
 */

 import { palindromeNumber, palindromeNumber2, palindromeNumber3 } from './palindrome-number'

 describe('对称数 palindromeNumber', () => {
    it('正常情况', () => {
        const numbers = palindromeNumber(200)
        expect(numbers.length).toBe(28)
    })
    it('max 小于等于 0', () => {
        const numbers = palindromeNumber(0)
        expect(numbers).toEqual([])
    })
})

describe('对称数 palindromeNumber2', () => {
    it('正常情况', () => {
        const numbers = palindromeNumber2(200)
        expect(numbers.length).toBe(28)
    })
    it('max 小于等于 0', () => {
        const numbers = palindromeNumber2(0)
        expect(numbers).toEqual([])
    })
})

 describe('对称数 palindromeNumber3', () => {
     it('正常情况', () => {
         const numbers = palindromeNumber3(200)
         expect(numbers.length).toBe(28)
     })
     it('max 小于等于 0', () => {
         const numbers = palindromeNumber3(0)
         expect(numbers).toEqual([])
     })
 })
 
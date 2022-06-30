/**
 * @description 自定义 call apply
 */

 import '.'
 describe('自定义 bind', () => {
    it('绑定 this', () => {
        function fn(this: any) {
            return this
        }
        // @ts-ignore
        const fn1 = fn.myBind({x: 100})
        expect(fn1()).toEqual({x: 100})
    })
    it('绑定参数', () => {
        function fn(a: number, b: number, c: number) {
            return a + b + c
        }
        // @ts-ignore
        const fn1 = fn.myBind(null, 10, 20)
        expect(fn1(30)).toBe(60)
    })
})
 describe('自定义 call', () => {
     it('绑定 this - 对象', () => {
         function fn(this: any) {
             return this
         }
         // @ts-ignore
         const res = fn.myCall({x: 100})
         expect(res).toEqual({x: 100})
     })
     it('绑定 this - 值类型', () => {
         function fn(this: any) {
             return this
         }
         // @ts-ignore
         const res1 = fn.myCall('abc')
         expect(res1.toString()).toBe('abc')
 
         // @ts-ignore
         const res1 = fn.myCall(null)
         expect(res1).not.toBeNull()
     })
     it('绑定参数', () => {
         function fn(a: number, b: number) {
             return a + b
         }
         // @ts-ignore
         const res = fn.myCall(null, 10, 20)
         expect(res).toBe(30)
     })
 })
 
 describe('自定义 apply', () => {
     it('绑定 this - 对象', () => {
         function fn(this: any) {
             return this
         }
         // @ts-ignore
         const res = fn.myApply({x: 100})
         expect(res).toEqual({x: 100})
     })
     it('绑定 this - 值类型', () => {
         function fn(this: any) {
             return this
         }
         // @ts-ignore
         const res1 = fn.myApply('abc')
         expect(res1.toString()).toBe('abc')
 
         // @ts-ignore
         const res1 = fn.myApply(null)
         expect(res1).not.toBeNull()
     })
     it('绑定参数', () => {
         function fn(a: number, b: number) {
             return a + b
         }
         // @ts-ignore
         const res = fn.myApply(null, [10, 20])
         expect(res).toBe(30)
     })
 })
 
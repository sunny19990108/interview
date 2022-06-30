import { rotateArray } from "./array-rotate";

describe('数组旋转', () => {
    it('正常情况', () => {
        const arr = [1,2,3,4,5,6,7];
        const k = 3;
        const result = rotateArray(arr, k);
        expect(result).toEqual([5,6,7,1,2,3,4]); // 引用类型的断言用 toEqual() 值类型的断言用 toBe()
    })

    it('数组为空', () => {
        const result = rotateArray([], 3);
        expect(result).toEqual([]); // 断言
    })

    it('k 是负数', () => {
        const arr = [1,2,3,4,5,6,7];
        const result = rotateArray(arr, -3);
        expect(result).toEqual(arr); // 断言
    })

    it('k 不是数字', () => {
        const arr = [1,2,3,4,5,6,7];
        // @ts-ignore
        const result = rotateArray(arr, 'abc');
        expect(result).toEqual(arr); // 断言
    })

    it('test', () => {
        const arr = [3,2,1];
        // @ts-ignore
        const result = rotateArray(arr, 3);
        expect(result).toEqual(arr); // 断言
    })
})
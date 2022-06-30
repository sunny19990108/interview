import { flattenDeep1, flattenDeep2 } from ".";
/**
 * @description 单测
 */

describe('数组扁平化', () => {
    it('空数组', () => {
        const arr:any[] = [];
        expect(flattenDeep1(arr)).toEqual([]);
    })
    it('正常数组', () => {
        const arr:any[] = [1, 2, 3, 6];
        expect(flattenDeep1(arr)).toEqual([1,2,3,6]);
    })
    it('多层数组', () => {
        const arr:any[] = [1,2,3,4,[4,5,[4,['a','b'],6,7],6],9];
        expect(flattenDeep1(arr)).toEqual([1,2,3,4,4,5,4,'a','b',6,7,6,9]);
    })
    it('对象数组', () => {
        const arr:any[] = [1,2,3,4,[4,{a: 100},[4,['a','b'],6,7],6],9];
        expect(flattenDeep1(arr)).toEqual([1,2,3,4,4,{a: 100},4,'a','b',6,7,6,9]);
    })
})

describe('数组扁平化2', () => {
    it('空数组', () => {
        const arr:any[] = [];
        expect(flattenDeep2(arr)).toEqual([]);
    })
    it('正常数组', () => {
        const arr:any[] = [1, 2, 3, 6];
        expect(flattenDeep2(arr)).toEqual([1,2,3,6]);
    })
    it('多层数组', () => {
        const arr:any[] = [1,2,3,4,[4,5,[4,['a','b'],6,7],6],9];
        expect(flattenDeep2(arr)).toEqual([1,2,3,4,4,5,4,'a','b',6,7,6,9]);
    })
    it('对象数组', () => {
        const arr:any[] = [1,2,3,4,[4,{a: 100},[4,['a','b'],6,7],6],9];
        expect(flattenDeep2(arr)).toEqual([1,2,3,4,4,{a: 100},4,'a','b',6,7,6,9]);
    })
})

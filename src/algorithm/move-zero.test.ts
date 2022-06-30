/**
 * moveZero test
 */
import { moveZero } from "./move-zero";

describe('把 0 移动到数组末尾', () => {
    it('正常情况', () => {
        const arr = [0,2,3,40,0,0,9,0];
        moveZero(arr);
        expect(arr).toEqual([2,3,40,9,0,0,0,0])
    })
    it('数组为空', () => {
        const arr: number[] = [];
        moveZero(arr);
        expect(arr).toEqual([]);
    })
    it('没有 0', () => {
        const arr = [1, 3, 4, 11]
        moveZero(arr)
        expect(arr).toEqual([1, 3, 4, 11])
    })
    it('全是 0', () => {
        const arr = [0, 0, 0, 0, 0]
        moveZero(arr)
        expect(arr).toEqual([0, 0, 0, 0, 0])
    })
})
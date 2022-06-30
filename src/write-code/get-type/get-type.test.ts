import { getType } from ".";

describe('判断类型', () => {
    it('字符串', () => {
        expect(getType('arr')).toBe('string');
    })
    it('数组', () => {
        expect(getType([1])).toBe('array');
    })
    it('对象', () => {
        expect(getType({a: 1})).toBe('object');
    })
    it('空对象', () => {
        expect(getType({})).toBe('object');
    })
    it('set', () => {
        expect(getType(new Set())).toBe('set');
    })
    it('weakset', () => {
        expect(getType(new WeakSet())).toBe('weakset');
    })
    it('map', () => {
        expect(getType(new Map())).toBe('map');
    })
    it('weakmap', () => {
        expect(getType(new WeakMap())).toBe('weakmap');
    })
    it('promise', () => {
        expect(getType(Promise.resolve())).toBe('promise');
    })
    it('symbol', () => {
        expect(getType(Symbol())).toBe('symbol');
    })
    it('date', () => {
        expect(getType(new Date())).toBe('date')
    })
    it('regexp', () => {
        expect(getType(new RegExp(''))).toBe('regexp')
    })
    it('error', () => {
        expect(getType(new Error())).toBe('error')
    })
})
import { matchBracket } from "./match-bracket";

describe('括号匹配', () => {
    it('正常情况', () => {
        const str = '12([34])56';
        const result = matchBracket(str);
        expect(result).toEqual(true); // 断言
    })

    it('正常情况', () => {
        const str = '12([34h{h}h])56';
        const result = matchBracket(str);
        expect(result).toEqual(true); // 断言
    })

    it('多了', () => {
        const str = '12([34h{h}h}])56';
        const result = matchBracket(str);
        expect(result).toEqual(false); // 断言
    })

    it('缺失', () => {
        const str = '12([34]56';
        const result = matchBracket(str);
        expect(result).toEqual(false); // 断言
    })

    it('顺序不对', () => {
        const str = '12([34)5]6';
        const result = matchBracket(str);
        expect(result).toEqual(false); // 断言
    })

    it('不匹配', () => {
        const str = '12([345]6}';
        const result = matchBracket(str);
        expect(result).toEqual(false); // 断言
    })

    it('不匹配', () => {
        const str = '12([345]6})';
        const result = matchBracket(str);
        expect(result).toEqual(false); // 断言
    })
})
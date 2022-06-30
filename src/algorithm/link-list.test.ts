import { myLinkList, reverseLinkList } from "./link-list";

describe('反转单向链表', () => {
    it('一个node', () => {
        const arr = [1];
        const linkList = myLinkList(arr);
        expect(reverseLinkList(linkList)).toEqual({
            value: 1
        })
    })

    it('多个node', () => {
        const arr = [1, 2, 3];
        const linkList = myLinkList(arr);
        expect(reverseLinkList(linkList)).toEqual({
            value: 3,
            next: {
                value: 2,
                next: {
                    value: 1
                }
            }
        })
    })
})
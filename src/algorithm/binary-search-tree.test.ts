/**
 * @description 二叉搜索树 test
 * 便于搜素 左 < 根 < 右
 * 完全二叉搜索树 查找时间复杂度 O(logn)
 */
import { getKthValue , ITreeNode } from './binary-search-tree';

const bst: ITreeNode = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 2,
            left: null,
            right: null
        },
        right: {
            value: 4,
            left: null,
            right: null,
        }
    },
    right: {
        value: 7,
        left: {
            value: 6,
            left: null,
            right: null
        },
        right: {
            value: 8,
            left: null,
            right: null
        }
    }
}

describe('bst', () => {
    it('nomal', () => {
        expect(getKthValue(bst, 3)).toBe(4);
    })

    it('null', () => {
        expect(getKthValue(bst, 3000)).toBeNull();
    })

})
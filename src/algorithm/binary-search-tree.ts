/**
 * @description 二叉搜索树
 * 便于搜素 左 < 根 < 右
 * 完全二叉搜索树BBST 查找时间复杂度 O(logn)
 */
export interface ITreeNode {
    value: number;
    left?: ITreeNode | null;
    right?: ITreeNode | null;
}

const arr: number[] = [];
/**
 * 二叉树先序遍历
 */
function preOrderTraverse(node?: ITreeNode | null) {
    if(!node) return;
    // console.log(node.value);
    arr.push(node.value);
    preOrderTraverse(node.left)
    preOrderTraverse(node.right)

}

/**
 * 二叉中序遍历
 */
 function inOrderTraverse(node?: ITreeNode | null) {
    if(!node) return;
    inOrderTraverse(node.left)
    // console.log(node.value);
    arr.push(node.value);
    inOrderTraverse(node.right)

}

/**
 * 二叉树后序遍历
 */
 function postOrderTraverse(node?: ITreeNode | null) {
    if(!node) return;
    postOrderTraverse(node.left)
    postOrderTraverse(node.right)
    // console.log(node.value);
    arr.push(node.value);

}

/**
 * 寻找 BST 里的第 K 小值
 * 排序 二叉树中序遍历
 * @param node tree node
 * @param k 第几个值
 */
 export function getKthValue(node: ITreeNode, k: number): number | null {
    inOrderTraverse(node) // 中序遍历 从小到大排序
    return arr[k - 1] || null
}

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

// preOrderTraverse(bst);
// inOrderTraverse(bst);
// postOrderTraverse(bst);

// 1、为什么是二叉树 不是三叉树、四叉树
// 因为二分 性能好

// 2、二叉树性能好体现在哪里
// 对比数组和链表的增删改查的时间复杂度，数组和链表都有各自的短板，而平衡二叉树（BBST）增删改查的时间复杂度都是 O(logn) 性能更好更稳定
// 但注意是二叉树应尽量平衡，如果不平衡了，极端情况二叉树就会退化为链表，二分效果就丢失了

// 3、二叉树的变种
// 红黑树： 自平衡二叉树，通过红色、黑色两种颜色高效的维持平衡
// B树： 物理上是多叉树、逻辑上是二叉树，一般高效I/O，关系型数据库(比如：mysql)常用B树来组织数据
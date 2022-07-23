/**
 * 数组和树之间的相互转换
 */

interface ArrayItem {
    id: number;
    name: string;
    parentId: number;
}

interface TreeNode {
    id: number;
    name: string;
    children?: TreeNode[];
}

export function convertToTree(arr: ArrayItem[]): TreeNode|null {
    const length = arr.length;
    let root = null; // 根节点
    if (!length) return root;

    // id 和 node 的映射，用于快速找到某个节点添加子节点
    let arrToTreeMap = new Map();

    for(let i = 0; i < length; i++) {
        // 创建 node 加入 map
        const { id, name, parentId } = arr[i]
        let node = {id, name}
        arrToTreeMap.set(id, node)

        const parent = arrToTreeMap.get(parentId);
        if(parent) {
            if(!parent.children) parent.children = []
            parent.children.push(node)
        }

        if(parentId === 0) {
            root = node;
        }

    }

    return root;
}

export function convertToArray(root: TreeNode): ArrayItem[] {
    // 广度优先遍历数组
    let myQueue = [{parentId: 0, node: root}];
    const resArray = [];
    while(myQueue.length) {
        const tailNode = myQueue.pop();
        if(!tailNode) break;

        const {node: curNode, parentId} = tailNode;
        resArray.push({id: curNode.id, name: curNode.name, parentId });
        // 记住下面子节点的 parentId
        curNode.children?.forEach(item => {
            myQueue.unshift({parentId: curNode.id, node: item});
        })
    }
    return resArray;
}

const arr = [
    { id: 1, name: '部门A', parentId: 0 }, // 0 代表顶级节点，无父节点
    { id: 2, name: '部门B', parentId: 1 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 2 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
]
const tree = convertToTree(arr)
// console.info(tree)


const obj = {
    id: 1,
    name: '部门A',
    children: [
        {
            id: 2,
            name: '部门B',
            children: [
                { id: 4, name: '部门D' },
                { id: 5, name: '部门E' }
            ]
        },
        {
            id: 3,
            name: '部门C',
            children: [
                { id: 6, name: '部门F' }
            ]
        }
    ]
}
const arr1 = convertToArray(obj)
// console.info(arr1)

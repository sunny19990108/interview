/**
 * 遍历 dom 树
 */

// 访问节点
function traverseNode(node: Node) {
    if(node instanceof Comment) {
        // 注释
        console.info('Comment node ---', node.textContent)
    } else if(node instanceof Text) {
        // 文本
        if(node.textContent?.trim()) {
            console.info('Text node ---', node.textContent?.trim())
        }
    }else if (node instanceof HTMLElement) {
        console.info('Element node ---', `<${node.tagName?.toLowerCase()}>`)
    }
}

// 深度优先
export function depthFirstTraverse(root: Node) {
    traverseNode(root);
    const childNodes = root.childNodes; // .childNodes 和 .children 不一样
    if(childNodes.length) {
        childNodes.forEach((child) => {
            depthFirstTraverse(child);
        })  
    }
}

// 深度优先
// 所有的递归都可以用栈来实现
export function depthFirstTraverse2(root: Node) {
    let nodeStack: Node[] = []; // 栈
    nodeStack.push(root);  // 根节点入栈

    while(nodeStack.length) {
        const curNode = nodeStack.pop();
        if(!curNode) break;
        traverseNode(curNode);

        const childNodes = root.childNodes; // .childNodes 和 .children 不一样
        if(childNodes.length) {
            // 子节点反序入栈
            Array.from(childNodes).reverse().forEach((child) => {
                nodeStack.push(child)
            })  
        }
    }
}

// 广度优先 
// 借助队列实现
export function breathFirstTraverse(root: Node) {
    let nodeQueue: Node[] = []; // 队列
    nodeQueue.unshift(root);  // 根节点 入队

    while(nodeQueue.length > 0) {
        const curNode = nodeQueue.pop();
        if(!curNode) break;
        traverseNode(curNode);

        const childNode = curNode.childNodes;
        if(childNode.length) {
            childNode.forEach(child => {
                nodeQueue.unshift(child);
            })
        }
    }

}

// const box = document.getElementById('box')
// if (box == null) throw new Error('box is null')
// depthFirstTraverse(box)
// 数组 VS 链表
// 数组是连续的内存空间 链表是零散的内存空间，因此数组查询快 O(1) 删除、新增慢（除非在数组末尾操作）O(1); 链表查询慢(单向链表一般我们只拿到头部，双向链表拿头和尾) O(n) 新增、删除快 O(1)
// 数组和链表都是 有序结构
// 链表应用 react Fiber

// 扩展
// 对象、Map 的本质区别  对象：无序结构；Map 有序结构
// https://blog.fundebug.com/2019/05/28/es6-map-set/

interface ILinkList {
    value: number;
    next?: ILinkList;
}

/**
 * 数组变链表
 * @param arr 数字数组
 * @returns 链表
 */
export function myLinkList(arr: number[]): ILinkList {
    if (arr.length === 0) throw new Error('array is empty');

    let curNode: ILinkList = {
        value: arr[arr.length - 1]
    }

    if(arr.length === 1) return curNode;

    for(let i = arr.length - 2; i >= 0 ; i-- ) {
        curNode = {
            value: arr[i],
            next: curNode,
        }

    }
    return curNode;
}

/**
 * 反转单向链表
 * @param link list head node
 * @param ILinkList 反转之后的 head node
 */
export function reverseLinkList(link: ILinkList): ILinkList {

    let preNode: ILinkList | undefined;
    let curNode: ILinkList | undefined;
    let nextNode: ILinkList | undefined = link;

    // 以 nextNode 为主反转链表
    while(nextNode) {
        // 如果是第一个元素，删除next 防止循环引用
        if(curNode && !preNode) {
            delete curNode.next;
        }
        // 反转指针
        if(preNode && curNode) {
            curNode!.next = preNode;
        }
        // 整体向后移动
        preNode = curNode;
        curNode = nextNode;
        nextNode = nextNode?.next;

    }

    // 最后一步，原链表最后一个节点的 next 指针反转
    if(preNode) {
        curNode!.next = preNode;
    }

    return curNode!;

}


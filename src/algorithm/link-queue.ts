/**
 * @description 单向链表实现队列
 */

// 链表实现队列 VS 数组实现队列
// 数组实现队列 add时间复杂度 O(1) delete时间复杂度 O(n) length时间复杂度 O(1) 空间复杂度 O(n)
// 链表实现队列 add时间复杂度 O(1) delete时间复杂度 O(1) length时间复杂度 O(1) 空间复杂度 O(n)

interface LinkNode {
    value: number;
    next?: LinkNode;
}

export class MyQueue{
    private head: LinkNode | undefined;
    private tail: LinkNode | undefined;
    private queueLength = 0;
    // 从 tail 入队
    add(n: number) {
        const calNode = {
            value: n,
        }
        // 处理队头
        if(!this.head) {
            this.head = calNode;
        }

        // 处理队尾
        if(this.tail) {
            this.tail.next = calNode;
        } 
        this.tail = calNode;
 
        // 记录队长
        this.queueLength++;
    }
    // 从 head 出队
    delete(): number | null {
        const curNode = this.head;
        if(!curNode || this.queueLength <= 0) return null;
    
        if (this.head?.next) {
            this.head = this.head.next;
        }
        delete curNode.next;

        this.queueLength--;

        return curNode.value || null;
    }
    // 获取队长
    get length(): number {
        // 单独存储队列的长度
        return this.queueLength;
    }
}
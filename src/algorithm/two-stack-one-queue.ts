/**
 * 两个栈实现一个队列
 */

export class MyQueue{
    private stack1: number[] = [];
    private stack2: number[] = [];
    // 入队
    add(n: number) {
        this.stack1.push(n);
        return this.stack1;
    }
    // 出队
    delete(): number | null {
        const stack1 = this.stack1;
        const stack2 = this.stack2;

        // 将 stack1 的元素给 stack2
        while(stack1.length) {
            const n = stack1.pop();
            if( n !== undefined ) {
                stack2.push(n);
            }
        }

        // 在 stack2 中出栈
        const res = stack2.pop();

        // 把 stack2 的元素还给 stack1
        while(stack2.length) {
            const n = stack2.pop();
            if( n !== undefined ) {
                stack1.push(n);
            }
        }
        return res || null;
    }
    // 获取队长
    get length(): number {
        return this.stack1.length;
    }
}
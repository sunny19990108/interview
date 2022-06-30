import { MyQueue } from "./link-queue";

describe('用链表实现队列', () => {
    it('add and length', () => {
        const queue = new MyQueue();
        expect(queue.length).toBe(0);

        queue.add(2);
        queue.add(3);
        queue.add(4);
        expect(queue.length).toBe(3);
    })

    it('delete', () => {
        const queue = new MyQueue();
        expect(queue.delete()).toBeNull();

        queue.add(2);
        queue.add(3);
        queue.add(4);
        expect(queue.delete()).toBe(2);
        expect(queue.delete()).toBe(3);
        expect(queue.delete()).toBe(4);
        expect(queue.delete()).toBeNull();
    })
})
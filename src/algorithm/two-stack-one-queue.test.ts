/**
 * 单测
 * 两个栈 实现 一个队列
 */

import { MyQueue } from "./two-stack-one-queue";

describe('两个栈，一个队列', () => {
    it('入队', () => {
        const queue = new MyQueue();
        expect(queue.length).toBe(0);
        queue.add(1);
        queue.add(100);
        queue.add(4);
        queue.add(9);
        expect(queue.length).toBe(4);
    })

    it('出队', () => {
        const queue = new MyQueue();
        expect(queue.delete()).toBeNull();
        queue.add(1);
        queue.add(100);
        queue.add(4);
        queue.add(9);
        expect(queue.delete()).toBe(1);
        expect(queue.delete()).toBe(100);
        expect(queue.length).toBe(2);
    })
})
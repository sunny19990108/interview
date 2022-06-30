/**
 * lazyMan
 * example.eat('苹果').eat('香蕉').sleep(5).eat('橘子')
 */

class LazyMan {
    private name = '';
    private eventPool: Function[] = []; // 任务列表

    constructor(name: string) {
        this.name = name;
        setTimeout(() => {
             // 保证执行的时候任务列表里已经有任务了
            this.next();
        })
    }

    private next() {
        if(this.eventPool.length) {
            const event =  this.eventPool.shift();
            if(event) {
                event();
            }
        }
    }

    eat(food: string = '') {
        const eatTask = () => {
            console.log('吃'+ food);
            this.next();  // this.next 必须在方法里面 才能保证执行顺序
        }
        this.eventPool.push(eatTask);
        return this; // 链式调用
    }

    sleep(time: number = 0) {
        const sleepTask = () => {
            console.log('开始睡觉')
            setTimeout(() => {
                console.log('睡了'+time+'秒')
                this.next(); // this.next 必须在方法里面 才能保证执行顺序
            }, time * 1000) 
        }
        this.eventPool.push(sleepTask);
        return this; // 链式调用
    }
} 
const me = new LazyMan('li')
me.eat('苹果').eat('香蕉').sleep(2).eat('葡萄').eat('西瓜').sleep(2).eat('橘子')
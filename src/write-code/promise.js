// 手写 promise
// https://juejin.cn/post/6994594642280857630
class MyPromise {
    constructor(executor) {
        this.initValue();
        this.initBind();
        try {
            executor(this.resolve, this.reject);
        }catch(e) {
            this.reject(e);
        }
    }

    initValue() {
        // 初始化结果和初始状态
        this.PromiseResult = null;
        this.PromiseState = 'pending';
    }

    initBind() {
        // 初始化 this
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this)
    }

    resolve(value) {
        if(this.PromiseState !== 'pending') return;
        this.PromiseState = 'fulfilled';
        this.PromiseResult = value;
    }

    reject(reason) {
        if(this.PromiseState !== 'pending') return;
        this.PromiseState = 'rejected';
        this.PromiseResult = reason;
    }

    then(onFulFilled, onRejected) {
        if(typeof onFulFilled !== 'function') {
            onFulFilled = (onFulFilled) => onFulFilled;
        }
        if(typeof onRejected !== 'function') {
            onRejected = (onRejected) => { throw onRejected };
        }

        if(this.PromiseState === 'fulfilled') {
            onFulFilled(this.PromiseResult);
        } else if(this.PromiseState === 'rejected') {
            onRejected(this.PromiseResult);
        }
    }

    static all(promises) {
        const result = [];
        return new MyPromise((resolve, reject) => {
            const addResult = (value, index) => {
                result[index] = value;
                if(index === promises.length) {
                    resolve(result);
                }
            }
            promises.forEach((item, index) => {
                if(item instanceof MyPromise) {
                    item.then((res) => {
                        addResult(res, index);
                    }, (rej) => {
                        reject(rej);
                    })
                }
            })

        })
    }

}
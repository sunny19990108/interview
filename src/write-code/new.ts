class Foo {
    // 属性
    name: string
    city: string
    n: number

    constructor(name: string, n: number) {
        this.name = name
        this.city = '北京'
        this.n = n
    }

    getName() {
        return this.name
    }
}

export function customNew<T>(constructor:Function, ...args: any[]): T {
    // 1.创建一个空对象 继承自 constructor 的原型
    const obj = Object.create(constructor.prototype);
    // 2、将 obj 作为 this, 执行 constructor
    constructor.apply(obj, args);
    // 3、返回 obj
    return obj;
}
// const f = new Foo('双越', 100)
// const f = customNew<Foo>(Foo, '双约', 100)
// console.info(f)
// console.info(f.getName())

// Object.create 和 {} 的区别

// `Object.create` 可以指定原型，创建一个空对象。<br>
// {} this 指向 Object.prototype
// `{}` 就相当于 `Object.create(Object.prototype)` ，即根据 `Object` 原型的空对象。
## js GC 算法

- 什么是 GC ?
函数执行完，用不到的数据都被销毁（回收内存）

- 变量销毁不了，一定就是内存泄漏吗？
不一定 
正常情况下方法执行完，内部变量都被销毁，但是一些还被外部引用的变量无法销毁，比如：变量绑定到了 window 上，闭包
但这些都是在预期之内的，不算内存泄漏，只有非预期的没有被回收的变量无法销毁，才造成内存泄漏，比如 IE6-7 由于循环引用导致的内存泄漏 bug 
（关于闭包算不算内存泄漏，说法不一，不较真）

- GC 算法
### 引用计数 （旧）
早期的垃圾回收算法，以“数据是否被引用”来判断要不要回收。
有缺陷，循环引用场景 不好办

### 标记清除 （现）
基于上面的问题，现代浏览器使用“标记-清除”算法。根据“是否可获得”来判断是否回收。
定期从根（即全局变量）向下查找，能找到的保留，找不到的清除。循环引用不再是问题。

## 检测内存变化
可使用 Chrome devTools Performance 来检测内存变化
- 刷新页面，点击“GC”按钮
- 点击“Record”按钮开始记录，然后操作页面
- 操作结束，点击“GC”按钮，点击“结束”按钮，看分析结果

观察 JS Heap 图像看有没有内存泄漏，正常应该是梯形上升，直线下降的图像，如果是一直上升 就是占用的内存一直在增加

代码参考 `memory-change.html`


## 内存泄漏的场景

拿 Vue 来举例说明。

1、组件中有全局变量、函数的引用。组件销毁时要记得清空。

```js
export default {
    data() {
        return {
            nums: [10, 20, 30]
        }
    },
    mounted() {
        window.printNums = () => {
            console.log(this.nums)
        }
    },
    // beforeUnmount() {
    //     window.printNums = null
    // },
}
```

2、组件有全局定时器。组件销毁时要记得清除。

```js
export default {
    data() {
        return {
            // intervalId: 0,
            nums: [10, 20, 30]
        }
    },
    // methods: {
    //     printNums() {
    //         console.log(this.nums)
    //     }
    // },
    mounted() {
        setInterval(() => {
            console.log(this.nums)
        }, 200)
        
        // this.intervalId = setInterval(this.printNums, 200)
    },
    beforeUnmount() {
        // clearInterval(this.intervalId)
    },
}
```

3、组件中有全局事件的引用。组件销毁时记得解绑。

```js
export default {
    data() {
        return {
            nums: [10, 20, 30]
        }
    },
    // methods: {
    //     printNums() {
    //         console.log(this.nums)
    //     }
    // },
    mounted() {
        window.addEventListener('resize', () => {
            console.log(this.nums)
        })
        // window.addEventListener('reisze', this.printNums)
    },
    beforeUnmount() {
        // window.removeEventListener('reisze', this.printNums)
    },
}
```

4、组件中使用了自定义事件，销毁时要记得解绑。

```js
export default {
    data() {
        return {
            nums: [10, 20, 30]
        }
    },
    // methods: {
    //     printNums() {
    //         console.log(this.nums)
    //     }
    // },
    mounted() {
        event.on('event-key', () => {
            console.log(this.nums)
        })

        // event.on('event-key', this.printNums)
    },
    beforeUnmount() {
        // event.off('event-key', this.printNums)
    },
}
```

## 闭包是内存泄漏吗

上述代码 `genDataFns()` 就是一个很典型的闭包，闭包的变量是无法被垃圾回收的。

但闭包不是内存泄漏，因为它是符合开发者预期的，即本身就这么设计的。而内存泄漏是非预期的。

【注意】这一说法没有定论，有些面试官可能会说“不可被垃圾回收就是内存泄漏”，不可较真。

## 答案

- 可使用 Chrome devTools Performance 检测内存变化
- 内存泄漏的场景
    - 全局变量，函数
    - 全局事件
    - 全局定时器
    - 自定义事件
    - 闭包（无定论）

## 划重点

前端之前不太关注内存泄漏，因为不会像服务单一样 7*24 运行。<br>
而随着现在富客户端系统不断普及，内存泄漏也在慢慢的被重视。

## 扩展

WeakMap WeakSet 弱引用，不会影响垃圾回收。

```js
// 函数执行完，obj 会被销毁，因为外面的 WeakMap 是“弱引用”，不算在内
const wMap = new WeakMap()
function fn() {
    const obj = {
        name: 'zhangsan'
    }
    // 注意，WeakMap 专门做弱引用的，因此 WeakMap 只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。其他的无意义
    wMap.set(obj, 100) 
    
    // weakMap 和 Map 所有的属性，方法不一样，由于 weakMap 无法保证内部属性是否被回收，因此也不知道自己的长度（没有 size 属性，也没有forEach），访问属性 只能通过 weakMap.get() 看一个 key 在不在
}
fn()
// 代码执行完毕之后，obj 会被销毁，wMap 中也不再存在。但我们无法第一时间看到效果。因为：
// 内存的垃圾回收机制，不是实时的，而且是 JS 代码控制不了的，因此这里不一定能直接看到效果。
```

```js
// 函数执行完，obj 会被销毁，因为外面的 WeakSet 是“弱引用”，不算在内
const wSet = new WeakSet()
function fn() {
    const obj = {
        name: 'zhangsan'
    }
    wSet.add(obj) // 注意，WeakSet 就是为了做弱引用的，因此不能 add 值类型！！！无意义
}
fn()
```




/**
 * 手写 事件总线
 */

export class EventBus {
    private eventList: Map<string, Function[]> = new Map();
    private onceEventList: Map<string, Function[]> = new Map();

    on(key: string, fn: Function) {
        const eventList = this.eventList
        if(!eventList.has(key)) {
            eventList?.set(key, [])
        }

        eventList.get(key)?.push(fn)
    }

    once(key: string, fn: Function) {
        const onceEventList = this.onceEventList

        if(!onceEventList.has(key)) {
            onceEventList?.set(key, [])
        }

        onceEventList.get(key)?.push(fn)
    }

    off(key: string, fn?: Function) {
        const eventList = this.eventList
        const onceEventList = this.onceEventList

        if (!fn) {
            eventList.delete(key)
            onceEventList.delete(key)
        } else {
            const newValueList = eventList.get(key)?.filter((fun) => {
                return fun !== fn
            })
            eventList.set(key, newValueList || [])
            
            const newOnceValueList = onceEventList.get(key)?.filter((fun) => {
                return fun !== fn
            })
            onceEventList.set(key, newOnceValueList || [])
        }
    }

    emit(key: string, ...args: any[]) {
        const eventList = this.eventList
        const onceEventList = this.onceEventList

        eventList.get(key)?.forEach(fun => {
            fun(...args);
        })

        onceEventList.get(key)?.forEach(fun => {
            fun(...args);
        })
        onceEventList.delete(key)
    }
}

const e = new EventBus()

function fn1(a: any, b: any) { console.log('fn1', a, b) }
function fn2(a: any, b: any) { console.log('fn2', a, b) }
function fn3(a: any, b: any) { console.log('fn3', a, b) }

// e.on('key1', fn1)
// e.on('key1', fn2)
// e.once('key1', fn3)
// e.on('xxxxxx', fn3)

// e.emit('key1', 10, 20) // 触发 fn1 fn2 fn3

// e.off('key1', fn1)

// e.emit('key1', 100, 200) // 触发 fn2
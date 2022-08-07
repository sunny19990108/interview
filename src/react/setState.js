// setState 原理 
// https://juejin.cn/post/6997601527162470407

// 批量更新队列
let updateQueue = {
    isBatchingUpdate: false,
    updaters: [],
    addUpdaters(updater) {
        this.updaters.push(updater);
    },
    batchUpdate() {
        let updater;
        while(updater = this.updaters.shift()) {
            updater.updateComponent();
        }
        this.isBatchingUpdate = false;
    }

}

// 组件更新器
class Updater {
    constructor(instance) {
        this.instance = instance;
        this.pendingState = [];
    }

    addState(privateState) {
        this.pendingState.push(privateState);
        updateQueue.isBatchingUpdate ? updateQueue.addUpdaters(this) : this.updateComponent();
    }

    updateComponent() {
        const {instance, pendingState} = this;
        if(pendingState.length > 0) {
            instance.state = this.getState();
            instance.forceUpdate();
            this.pendingState = [];
        }
    }

    getState() {
        const {instance, pendingState} = this;
        let { state } = instance;
        let nextState = state;
        pendingState.forEach((item) => {
            if(typeof item === 'function') {
                nextState = item(state);
            }else {
                nextState = {...nextState, ...item};
            }
        })

        return nextState;
    }
}

// 组件基类
class ComponentFather {
    constructor() {
        this.state = {};
        this.$updater = new Updater(this);
    }

    setState(privateState) {
        this.$updater.addState(privateState);
    }

    forceUpdate() {
        // 新旧VDom 做 diff 对比出差异
        // 更新视图
    }
}

// useState 原理
// https://zhuanlan.zhihu.com/p/265662126
// https://cloud.tencent.com/developer/article/1784501

let currentStateBox = [];
let stateIndex = 0;
function useState(init) {
    let state = currentStateBox[stateIndex] || init;
    let setState = (newState) => {
        if(typeof newState === 'function') {
            currentStateBox[stateIndex] = newState();
        }else {
            currentStateBox[stateIndex] = newState;
        }
        // 更新 state 或 批量更新
        // 更新视图 render()
        // 在 render 函数中 重置stateIndex  stateIndex = 0;
    }
    stateIndex++;

    return [state, setState];
}

// useEffect 原理
let effectDepsBox = [];
let effectCallbackReturnBox = [];
let effectIndex = 0;
function useEffect(callback, deps) {
    let change = true;

    if(Object.prototype.toString.call(callback) !== '[object Function]') throw new Error('第一个参数必须是方法');
    if(deps) {
        if(Object.prototype.toString.call(deps) !== '[object Array]') throw new Error('第二个参数必须是数组');
        if(effectIndex > 0) {
            let lastDeps = effectDepsBox[effectIndex - 1];
            change = deps.every((dep, index) => dep === lastDeps[index]);
        } 
    }

    if(change) {
        if(effectIndex > 0 && typeof effectCallbackReturnBox[effectIndex - 1] === 'function') {
            effectCallbackReturnBox[effectIndex - 1]();
        }
        effectCallbackReturnBox[effectIndex] = callback();
    }

    effectIndex++;
    // 在 render 函数中重置 effectIndex 的值  effectIndex = 0;
}

// useEffect 和 useLayoutEffect 
// https://zhuanlan.zhihu.com/p/348701319

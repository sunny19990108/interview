## 前端开发环境必备 高级js语法转换为低级js语法，满足浏览器的兼容性

### 基础
babel 实际是一个空壳，它通过 plugin 指定通过什么插件转换什么语法
但是如果每个语法转换都需要写一遍会非常多，所以一般有个预设 presets，是 plugin 的集合
比如 preset-env 包含了es6,7 中大部分功能降级转换的 Plugin； preset-react 包含转换JSX 在内的很多plugin ,如果是 react 项目，一般使用这个 babel


```js
{
    "presets": ["@babel/preset-env"], // 预设
    "plugins": [] // 扩展配置一些plugin
}
```

- babel-polyfill
polyfill: 补丁 兼容
babel 7.4 之后就弃用了babel-polyfill，推荐直接使用 core-js 和 regenerator (这个库支持 generator 的 polyfill，core-js 支持其他语法的 polyfill)

generator:  * yeild 处理异步函数，在 async/await 出现之后不常用了

为什么需要 polyfill？ babel只处理语法的降级转换 比如箭头函数转换为普通函数，
一些新增的API 比如Promise  [1,2,3].includes() 是符合es5语法规范的，但是有的浏览器不能兼容，这时候配置 polyfill，做一些兼容性工作
```js
{
    "presets": [
        "@babel/preset-env",
        {
            "useBuiltIns": "usage", // 按需引入，因为整个 core-js 非常大，我们只引入我们需要的polyfill即可
            "core-js": 3, // core-js 版本
        }
    ], // 预设
    "plugins": [] // 扩展配置一些plugin
}
```

- babel-runtime
polyfill 可能会污染全局环境，比如在兼容Promise API 的时候
Promise -> window.Promise = ....
[].includes -> Array.prototype.includes = ...

这样在一个独立的 web 系统中是没问题的，但如果是做一个第三方 lib, 我们不知道用户会怎么使用 也许用户自己需要定义 window.promise
这时候我们就不能采用上面的方式兼容，必须是一个不影响用户使用的情况，比如：
Promise -> window.Promise1 = ....
[].includes -> Array.prototype.includes1 = ...

这种情况就需要使用 babel-runtime
```js
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
```






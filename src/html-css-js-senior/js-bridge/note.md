## js-bridge 原理

h5 实际运行在 WebView 中，浏览器比如 chrome 浏览器，里面也有一个 WebView,因为他使用的能力大部分是 WebView 的能力，他们的层级关系是： 最外层是 os 里面是各种 App , App 中有 WebView

## 微信 jssdk

微信中的 h5 通过 [jssdk](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html) 提供的 API 可以调用微信 app 的某些功能。

JS 无法直接调用 app 的 API ，需要通过一种方式 —— 通称 js-bridge ，它也是一些 JS 代码。<br>
当然，前提是 app 得开发支持，控制权在 app 端。就像跨域，server 不开放支持，客户端再折腾也没用。
![](../img/js-bridge.png)

## 方式一： 向Webview中注入JS API

App将Native的相关接口注入到JS的Context（window）的对象中，一般来说这个对象内的方法名与Native相关方法名是相同的，Web端就可以直接在全局window下使用这个暴露的全局JS对象，进而调用原生端的方法。

例如增加一个 `window.getVersion` API ，前端 JS 即可调用它来获取 app 版本号。

```js
const v = window.getVersion()
```

但这是一个同步过程，如果要实现一些异步操作，还需要支持 callback，如何支持callback?
我们在一端调用的时候在参数中加一个callbackId标记对应的回调，对端接收到调用请求后，进行实际操作，如果带有callbackId，对端再进行一次调用，将结果、callbackId回传回来，这端根据callbackId匹配相应的回调，将结果传入执行就可以了。

``` javascript
<script>
  let id = 1;
  // 根据id保存callback
  const callbackMap = {};
  // 使用JSSDK封装调用与Native通信的事件，避免过多的污染全局环境
  window.JSSDK = {
    // 获取Native端输入框value，带有回调
    getNativeEditTextValue(callback) {
      const callbackId = id++;
      callbackMap[callbackId] = callback;
      // 调用JSB方法，并将callbackId传入
      window.NativeBridge.getNativeEditTextValue(callbackId);
    },
    // 接收Native端传来的callbackId
    receiveMessage(callbackId, value) {
      if (callbackMap[callbackId]) {
        // 根据ID匹配callback，并执行
        callbackMap[callbackId](value);
      }
    }
  };

	const showBtn = document.querySelector('#showBtn');
  // 绑定按钮事件
  showBtn.addEventListener('click', e => {
    // 通过JSSDK调用，将回调函数传入
    window.JSSDK.getNativeEditTextValue(value => window.alert('Natvie输入值：' + value));
  });
</script>
```

这种方式从早期就存在，兼容性很好，但是由于是基于URL的方式，长度受到限制而且不太直观，数据格式有限制，而且建立请求有时间耗时。

## 方式二 - 劫持 url scheme

一个 iframe 请求 url ，返回的是一个网页。天然支持异步。

```js
const iframe1 = document.getElementById('iframe1')
iframe1.onload = () => {
    console.log(iframe1.contentWindow.document.body.innerHTML)
}
iframe1.src = 'http://127.0.0.1:8881/size-unit.html'
```

上述 url 使用的是标准的 http 协议，如果要改成 `'my-app-name://api/getVersion'` 呢？—— 默认会报错，`'my-app-name'` 是一个未识别的协议名称。<br>
既然未识别的协议，那就可以为我所用：app 监听所有的网络请求，遇到 `my-app-name:` 协议，就分析 path ，并返回响应的内容。

```js
const iframe1 = document.getElementById('iframe1')
iframe1.onload = () => {
    console.log(iframe1.contentWindow.document.body.innerHTML) // '{ version: '1.0.1' }'
}
iframe1.src = 'my-app-name://api/getVersion'
```

这种自定义协议的方式，就叫做“url scheme”。微信的 scheme 以 `'weixin://'` 开头，可搜索“微信 scheme”。

chrome 也有自己的 scheme
- `chrome://version` 查看版本信息
- `chrome://dino` 恐龙小游戏
其他可参考 https://mp.weixin.qq.com/s/T1Qkt8DTZvpsm8CKtEpNxA

## 封装 sdk

scheme 的调用方式非常复杂，不能每个 API 都写重复的代码，所以一般要封装 sdk ，就像微信提供的 jssdk 。

```js
const sdk = {
    invoke(url, data, success, err) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)

        iframe.onload = () => {
            const content = iframe.contentWindow.document.body.innerHTML
            success(JSON.parse(content))
            iframe.remove()
        }
        iframe.onerror = () => {
            err()
            iframe.remove()
        }
        iframe.src = `my-app-name://${url}?data=${JSON.string(data)}`
    }

    fn1(data, success, err) {
        invoke('api/fn1', data, success, err)
    }

    fn2(data, success, err) {
        invoke('api/fn2', data, success, err)
    }
}

// 使用
sdk.fn1(
    {a: 10},
    (data) => { console.log('success', data) },
    () => { console.log('err') }
)
```

## 答案

Native调用Web端是直接在JS的Context直接执行JS代码，Web端调用Native端有两种方法，一种是基于URL Schema的拦截操作，另一种是向JS的Context（window）注入Api，其中注入Api是目前最好的选择。完整的调用是双向通信，需要一个回调函数，技术实现上就是使用了两次单向通信
其次，相对于造轮子，更推荐使用目前已经开源的JSBridge：DSBridge、jsBridge。


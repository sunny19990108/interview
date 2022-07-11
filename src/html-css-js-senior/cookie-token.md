# cookie 和 token 区别

## cookie
http 请求是无状态的，即每次请求之后都会断开链接。<br>
所以，每次请求时，都可以携带一段信息发送到服务端，以表明客户端的用户身份。服务端也也可以通过 `set-cookie` 向客户端设置 cookie 内容。<br>
由于每次请求都携带 cookie ，所以 cookie 大小限制 4kb 以内。

![](./img/cookie.png)

## cookie 作为本地存储

前些年大家还常用 cookie 作为本地存储，这并不完全合适。<br>
所以后来 html5 增加了 `localStorage` 和 `sessionStorage` 作为本地存储。

## cookie 跨域限制

- 不跨域共享
cookie 是按照域名区分的，在浏览器无法通过 JS `document.cookie` 获取到其他域名的 cookie 。
比如一个网站 a.b.com:8000 网页里面有个 iframe iframe对应的src 是： a.b.com:8001浏览器存储
（也可开启跨域共享，需要特殊设置）

- 不跨域传递
http 请求传递 cookie 默认有跨域限制。如果想要开启，需要客户端和服务器同时设置允许
- 客户端：使用 fetch 和 XMLHttpRequest 或者 axios 需要配置 `withCredentials`
- 服务端：需要配置 header `Access-Control-Allow-Credentials`

## 浏览器默认禁止第三方 cookie

https://www.ruanyifeng.com/blog/2019/09/cookie-samesite.html

set-cookie 属性 SameSite: Strict | Lax (默认) ｜ none;
Lax: 大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。这是浏览器中的默认值。
Strict: Cookies 只会在第一方上下文中发送，不会与第三方网站发起的请求一起发送。
None: Cookie 将在所有上下文中发送，即允许跨站发送。

第三方 cookie 指的是 第三方网站诱导把本网站 cookie 信息一并发送到第三方网站的服务器，可以用于 CSRF 攻击，用户信息获取；
比如：
Facebook 在第三方网站插入一张看不见的图片。

<img src="facebook.com" style="visibility:hidden;">

浏览器加载上面代码时，就会向 Facebook 发出带有 Cookie 的请求，从而 Facebook 就会知道你是谁，访问了什么网站。

现代浏览器中： 这种行为默认是不会给第三方网站发送 cookie，当然是可以修改的；

## cookie 和 session

cookie 用途非常广泛，最常见的就是登录。

使用 cookie 做登录校验
- 用户输入用户名密码传给后端
- 后端校验信息，返回信息时 set-cookie
- 后续所有请求中，自动携带 cookie,（浏览器的默认行为， http 协议的规定）

什么是 session ？
- cookie 只存储 userId ，不去暴露用户信息
- 用户信息存储在 session 中 (在服务端) —— session 就是服务端的一个 hash 表，一是为了减少 cookie 体积，二是为了安全，cookie被中间拦截了也没事，里面只有id，没有更多敏感的信息；

## token
localStorage sessionStorage
token 也是一段用于客户端身份验证的字符串，随着 http 请求发送
- cookie 是http协议规范内的，在请求接口时会默认传输。而 token 是自定义的，可以用任何方式传输（如 header body query-string 等）
- cookie 大小有限制，仅 4kb
- cookie 是会默认存储在浏览器中，token 存储的话需要手动写入
- cookie 有跨域限制，禁止跨域共享，禁止跨域传输， token 传输方面没有跨域限制，但也是禁止跨域共享的。

所以，token 很适合做跨域或者第三方的身份验证。

## token 和 JWT
JWT: JSON Web Token
和 cookie session 配合使用一样可以用于登录验证
- 用户输入用户名密码传给后端
- 后端校验信息，并返回 加密的 token 字符串 （里面有用户信息，这时候就不需要 session 了）
- 前端把 token 存起来
- 以后访问接口，都带上这段 token

![](./img/token.png)

## 答案
cookie: 是 http 规范内的；不允许跨域传输； 大小只有4kb，比较小；可以配合 session 用于登录验证，默认存储在浏览器中，前端发送请求时也会自动带上cookie;
token:  没有什么规范； 可以跨域传输；可用于 JWT 登录；如果需要存储，需要自己写在localStorage 或者 sessionStorage 中，不会自动发给服务端；

## 连环问：session 和 JWT 比较，你更推荐哪个？

要结合session 和 JWT 的特点，看具体什么场景推荐；

cookie 和 session
- 优点：
1、cookie 比较小 传输起来速度更快； 
2、cookie 中只有 id，没有很多用户敏感信息，更安全；
3、用户信息存储在服务端，可以快速封禁某个登录的用户 —— 有这方强需求的人，一定选择 Session
- 缺点：
1、session 里面存储这登录用户的用户画像，体积会比较大，而且 session 在内存中，会比较占服务端内存，有硬件成本
2、有跨域限制，多进程、多服务器时，不好同步 —— 一般使用第三方 redis 存储 ，成本高了
3、跨域传递 cookie ，需要特殊配置

JWT
- 优点：没有跨域限制、不占用服务器内存、多进程、多服务器，不受影响
- 缺点：
1、token 中有用户信息，虽然加密了，但相对不安全 （不重要）
2、token 体积较大，每次请求都带着，相对慢一丢丢（不重要）
3、用户信息在客户端，不能很快封禁某个登录的用户 （要想封禁，可能服务端要有一个黑名单，token 过来了要和黑名单比对）

总结：如果没有“快速封禁登录用户”的需求，建议使用 JWT 方式，成本低。

## 连环问：单点登录 SSO

一个网站登录了，相关联的也登录，比如登录了百度账号，百度图片、百度贴吧也都登录了；

实现方案：

### 基于 cookie
适合主域名相同的的单点登录，比如（www.baidu.com 和 image.baidu.com）
如果业务系统都在同一主域名下，可以直接把 cookie domain 设置为主域名 `baidu.com` ，百度也就是这么干的。

### SSO
滴滴这么潮的公司，同时拥有 `didichuxing.com` `xiaojukeji.com` `didiglobal.com` 等域名，种 cookie 是完全绕不开的。
需要使用 SSO 技术方案

用一个第三方，统一进行登录验证管理

![](./img/sso.png)

### OAuth2
利用一个受信任的第三方做登录校验

上述 SSO 是 oauth 的实际案例，其他常见的还有微信登录、github 登录等。即，当设计到第三方用户登录校验时，都会使用 OAuth2.0 标准。
流程参考 [RFC 6749](https://tools.ietf.org/html/rfc6749)







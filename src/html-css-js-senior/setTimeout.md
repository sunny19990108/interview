https://juejin.cn/post/6844903805063004167

## 有时候 setTimeout明明写的延时3秒，实际却5，6秒才执行函数，这又是因为什么？
答：setTimeout 并不能保证执行的时间，是否及时执行取决于 JavaScript 线程是拥挤还是空闲。
浏览器的JS引擎遇到setTimeout，拿走之后不会立即放入异步队列，同步任务执行之后，timer模块会到设置时间之后放到异步队列中。js引擎发现同步队列中没有要执行的东西了，即运行栈空了就从异步队列中读取，然后放到运行栈中执行。所以setTimeout可能会多了等待线程的时间。

```js
for (var i = 0; i < 4; i++) {
    setTimeout(function () {
        console.log(i);
    }, 1000);
}
```
// 复制代码输出结果为，隔1s后一起输出：4 4 4 4
## for循环是一个同步任务，为什么连续输出四个4？
答：因为有队列插入的时间，即使执行时间从1000改成0，还是输出四个4。
那么这个问题是如何产生和解决的呢？请接着阅读
异步队列执行的时间
执行到异步任务的时候，会直接放到异步队列中吗？
答案是不一定的。
因为浏览器有个定时器（timer）模块，定时器到了执行时间才会把异步任务放到异步队列。
for循环体执行的过程中并没有把setTimeout放到异步队列中，只是交给定时器模块了。4个循环体执行速度非常快（不到1毫秒）。定时器到了设置的时间才会把setTimeout语句放到异步队列中。

即使setTimeout设置的执行时间为0毫秒，也按4毫秒算。

这就解释了上题为什么会连续输出四个4的原因。

> HTML5 标准规定了setTimeout()的第二个参数的最小值，即最短间隔，不得低于4毫秒。如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。

```js
var output = function (i) {
    setTimeout(function () {
        console.log(i);

    }, 1000 * i)
}
for (let i = 0; i < 4; i++) {
    output(i);
}
```
// 复制代码执行后，会隔1s输出一个值，分别是：0 1 2 3
> 实现原理：传过去的i值被复制了。

## for 和 forEach 哪个更快

for 和 forEach 分别遍历一个百万级数据，`console.time() console.timeEnd()`分别打印时间
会发现 for 更快，这是为什么？

for 直接在当前函数中执行，forEach 每次都要新创建一个函数。
函数有单独的作用域和上下文（可回顾“堆栈模型”），这些都需要额外的开销，所以耗时更久。

## 扩展

开发中不仅要考虑性能，还要考虑代码的可读性，forEach 可读性更好。
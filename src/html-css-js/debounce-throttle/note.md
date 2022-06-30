## 防抖和节流 分别是什么

两个都是防止方法被频繁调用的
防抖：debounce（防止抖动，什么时候不抖动了什么时候执行操作）什么时候不触发了，或者超过一定的时间间隔没有触发才去真正执行方法
节流：throttle 不管触发多少次，始终隔一定时间真正执行一次方法

## 应用场景
防抖: 输入框输入内容实时搜索、鼠标滑动得出对应的 x、y 坐标 
节流：实时监听元素尺寸变化 计算元素的宽高

## 工作中
使用 lodash 提供的，别自己写...
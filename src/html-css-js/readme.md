# 前端基础知识 基础篇
# 题目

## ajax fetch axios 有什么区别
- lib 和 API 的区别

## 箭头函数的缺点、什么时候不能用箭头函数

## 防抖、节流
- 应用场景

## for in 、 for of 区别
- for await of 
- 怎么判断是否可枚举，是否可迭代

## Node 和 Element
- HTMLCollection NodeList
- xxx.children  xxx.childNode 获取某元素的子元素

## 跨域及解决方案
- CORS 跨域请求时为何会有 options 请求

## css 单位

## 严格模式
- 特点

## tcp 和 http
- tcp 三次握手 四次挥手
- tcp 怎么保证传输可靠性
滑动窗口保证不丢包，（慢开始、指数增加到阀值，再线性增长到出现拥塞，拥塞避免，再重新开始且阈值降低为原来的二分之一。出现丢包客户端收到三次相同的期待收到XX包后开始快重传、快恢复，也就是从上次阈值的二分之一直接开始线性增长）
- 为什么两次tcp 握手不能建立连接

## 盒模型（box-sizing）
- client、scroll、offset 
没有滚动条的情况下 offsetWidth 和 clientWidth 一样都是: 实际内容宽度+padding

## vue computed 和 watch
- computed 和 method

## vue 通讯方式
props $emit
$attrs (vue2 $attrs、$listener)
$parent $refs (vue2 $children)

eventBus 自定义事件
provide、inject

VueX



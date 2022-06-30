## computed 和 watch
二者其实没有什么联系
computed: 基于现有的 data 计算产生一个新的数据
watch: 监听现有的属性

## computed 和 method
computed: 基于现有的 data 计算产生一个新的数据，是有缓存的，依赖的 data 数据不变，computed 计算产生的新数据就不变
method: 没有缓存，每次调用都会重新计算
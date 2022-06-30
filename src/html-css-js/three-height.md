## 盒模型
width、height、padding、border、margin
box-sizing
content-box: 默认，宽高以内容的宽高为准 width = 内容的宽度
border-box: 宽高以 border 的宽高为准 width = 内容的宽度 + padding + border

## client 
clientHeight clientWidth: 内容宽高 + padding
clientTop: border


## offset
offsetHeight offsetWidth: 内容宽高 + padding + border
offsetTop: 当前元素border 到离他最近的父级 offsetParent 顶部 padding 的距离
offsetParent: 一个只读属性，返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素或者最近的 table,td,th,body元素。

## scroll
scrollHeight scrollWidth: （全部的实际宽高，包括超出可视区域的）+ padding，没有滚动条的情况下和 clientHeight 相同
scrollTop: 这个元素的内容顶部（卷起来的）到它的视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它 scrollTop 值为0。

以上关于 client、offset、scroll 的属性中 scrollTop、scrollLeft 是可读 可写的，其他都是只读的

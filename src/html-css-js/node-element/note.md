## Node VS Element
Node是所有Dom节点的基类，包括 Element、Document、CharacterData（文本和注释）等
Element是其他HTML元素的基类，比如 HTMLDivElement

## HTMLCollection VS NodeList
HTMLCollection 是 Element 的集合
NodeList 是 Node 的集合

## 获取当前元素子元素的属性

// div.children
const ele = document.getElementById('ref').children 获取当前元素所有的 Element 子元素
ele instanceOf HTMLCollection  // true
ele instanceOf NodeList  // false

// div.childNode
const ele = document.getElementById('ref').childNode 获取当前元素所有的子元素，可能包含 Text(文本)、Comment(注释)
ele instanceOf HTMLCollection  // false
ele instanceOf NodeList  // true


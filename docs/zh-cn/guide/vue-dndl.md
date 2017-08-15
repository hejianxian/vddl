## vue-drag-and-drop-list

> Vue directives that allow you to build sortable lists with the native HTML5 drag & drop API. Supports nested lists for building trees and other fancy structures.

### ⚠️ 只支持 VueJs 1.0

### 例子

* [Nested Containers](https://hejx.herokuapp.com/vue-dndl/#!/)
* [Simple Lists](https://hejx.herokuapp.com/vue-dndl/#!/simple)
* [Typed Lists](https://hejx.herokuapp.com/vue-dndl/#!/item-types)
* [Drag Handler](https://hejx.herokuapp.com/vue-dndl/#!/handler)
* [Horizontal Items](https://hejx.herokuapp.com/vue-dndl/#!/horizontal)

### 安装

```bash
npm install vue-drag-and-drop-list --save
// Or
yarn add vue-drag-and-drop-list
```
### 使用

```js
import Vue from 'vue';
import vueDragAndDropList from 'vue-drag-and-drop-list';

Vue.use(vueDragAndDropList);
```

### 必须的 CSS 样式

`dnd-list` 和它的子元素都需要相对定位，因此指令可以确定鼠标相对于列表的位置，从而计算正确的放置位置。

```css
ul[dnd-list], ul[dnd-list] > li {
    position: relative;
}
```

### Wiki

你应该先阅读 [Vue 指令文档](http://vuejs.org/guide/custom-directive.html)

* [dnd-draggable](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-draggable)
* [dnd-list](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-list)
* [dnd-nodrag](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-nodrag)
* [dnd-handle](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-handle)

### License

MIT

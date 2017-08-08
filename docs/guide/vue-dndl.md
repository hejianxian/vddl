## vue-drag-and-drop-list

> Vue directives that allow you to build sortable lists with the native HTML5 drag & drop API. Supports nested lists for building trees and other fancy structures.

### ⚠️ Just support VueJs 1.0

### Demo
* [Nested Containers](https://hejx.herokuapp.com/vue-dndl/#!/)
* [Simple Lists](https://hejx.herokuapp.com/vue-dndl/#!/simple)
* [Typed Lists](https://hejx.herokuapp.com/vue-dndl/#!/item-types)
* [Drag Handler](https://hejx.herokuapp.com/vue-dndl/#!/handler)
* [Horizontal Items](https://hejx.herokuapp.com/vue-dndl/#!/horizontal)

### Installation

```bash
npm install vue-drag-and-drop-list --save
// Or
yarn add vue-drag-and-drop-list
```
### Usage

```js
import Vue from 'vue';
import vueDragAndDropList from 'vue-drag-and-drop-list';

Vue.use(vueDragAndDropList);
```

or include as an inline script.

### Required CSS styles
Both the dnd-list and it's children require relative positioning, so that the directive can determine the mouse position relative to the list and thus calculate the correct drop position.

```css
ul[dnd-list], ul[dnd-list] > li {
    position: relative;
}
```

### Wiki

you should read the [Vue directive doc](http://vuejs.org/guide/custom-directive.html) first.

* [dnd-draggable](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-draggable)
* [dnd-list](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-list)
* [dnd-nodrag](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-nodrag)
* [dnd-handle](https://github.com/hejianxian/vue-drag-and-drop-list/wiki/dnd-handle)

### License

MIT

## 快速开始

如果你已经正确地安装和引入`vddl`到项目中，那我们就可以开始制作一个简单的拖动列表。

[Simple Demo](http://hejx.space/vddl-demo/#/simple)

#### 准备数据

首先，我们应该有一组数据如下：

```json
"lists": {
  "A": [
    {
      "id": 1,
      "label": "Item A1"
    },
    {
      "id": 2,
      "label": "Item A2"
    },
    //...
  ],
  "B": [
    //...
  ]
}
```

#### 编写模板

假设我们现在创建了一个叫`simple.vue`的文件。我们需要清楚地知道，制作一个拖动列表，需要同时使用 `vddl-list` 和 `vddl-draggable` 这两个组件。因为在调用`Vue.use(vddl)`时，组件已经被添加到全局的 components 上，所以无需再引入`vddl-list` 和 `vddl-draggable`组件。

```html
<div v-for="(list, listName) in lists" class="v-col--auto">
  <div class="panel">
      <div class="panel__heading">
        <h3>List {{listName}}</h3>
      </div>
      <div class="panel__body">
        <vddl-list class="panel__body--list" :list="list" :horizontal="false">
            <vddl-draggable class="panel__body--item" v-for="(item, index) in list" :key="item.id"
              :draggable="item"
              :index="index"
              :wrapper="list"
              effect-allowed="move">
              {{item.label}}
            </vddl-draggable>
            <vddl-placeholder class="red">Custom placeholder</vddl-placeholder>
        </vddl-list>
      </div>
  </div>
</div>
```

在上面的代码中，要注意`vddl-list`的 list 属性和`vddl-draggable`的 draggable，index 和 wrapper 属性，这些都是必须属性。并且只有正确地传值，`vddl` 才能知道如何处理列表数据。

> `vddl-placeholder` 并不是必须的，在上面的 demo 里只是为了演示创建自定义的 placeholder。默认情况下，在拖动元素时，`vddl` 会自动创建一个 placeholder 元素，并且会带有 `vddl-placeholder` 类名。

#### 样式

> `vddl` 中的任意组件都会带有和组件名一致的 className.

为了正确定位 placeholder 元素，“vddl-list”及其子元素必须具有 position：relative。 否则，我们无法确定鼠标指针是否在我们拖动的元素的上半部分或下半部分。 在其他浏览器中，我们可以为此使用 event.offsetY。

```css
.vddl-list, .vddl-draggable {
  position: relative;
}
```

`vddl-list`应该始终有一个最小高度，否则在它为空时，我们无法拖动元素进去。

```css
.vddl-list {
  min-height: 44px;
}
```

`vddl-dragging`和`vddl-dragging-source`类名将被添加到拖动的源元素。将其隐藏，主要是给用户一种在移动它的感觉。

```css
.vddl-dragging{
  opacity: 0.7;
}

.vddl-dragging-source {
  display: none;
}
```

#### ⚠️注意

```html
<!-- error -->
<ul>
  <li v-for="(item, index) in list" :key="index">{{item.title}}</li>
</ul>
```

在 Vue2.0 中，像上面的代码那样，我们使用`v-for`指令进行遍历，key 属性请不要使用 `index`。因为 `vddl` 内部对数据是会进行2次裁剪，如果使用了 `index`, 那在第一次裁剪后，Vue 会重新计算并排序，这样会导致第二次的运算出错，这样就会在拖动时，出现数据错乱的情况。

所以，最好的做法是给数据添加唯一值，例如 uuid。

```html
<!-- correct  -->
<ul>
  <li v-for="(item, index) in list" :key="item.id">{{item.title}}</li>
</ul>
```


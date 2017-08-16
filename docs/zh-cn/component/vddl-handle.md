## vddl-handle

在`vddl-nodrag`元素中使用`vddl-handle`组件，以便允许拖动该元素。 因此，通过组合`vddl-nodrag`和`vddl-handle`，您能制定自定义的句柄元素（handle）拖动`vddl-draggable`元素。

#### 基本用法

```html
<vddl-draggable v-for="(item, index) in list" :key="item.id"
  :draggable="item"
  :index="index"
  :wrapper="list"
  effect-allowed="move">
    <vddl-nodrag class="nodrag">
      <vddl-handle
        :handle-left="20"
        :handle-top="20"
        class="handle">
      </vddl-handle>
      <div>{{item.label}}</div>
    </vddl-nodrag>
</vddl-draggable>
```

#### 属性

使用`handle-left`或`handle-top`属性可以帮助你自定义拖动项的位置。

> Internet Explorer 将把 handle 元素显示为拖动图像而不是`vddl-draggable`元素。 您可以通过在拖动时对句柄元素进行不同的样式设计来解决此问题。 使用CSS选择器`.vddl-dragging：not（.vddl-dragging-source）.vddl-handle`。

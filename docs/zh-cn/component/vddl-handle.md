## vddl-handle

Use the `vddl-handle` component within a `vddl-nodrag` element in order to allow dragging of that element after all. Therefore, by combining `vddl-nodrag` and `vddl-handle` you can allow `vddl-draggable` elements to only be dragged via specific **handle** elements.

#### Base Usage

```html
<vddl-draggable v-for="(item, index) in list" :key="item.label"
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

#### Attributes

Use the `handle-left` or `handle-top` attributes can help you custom position of the drag item.

> Internet Explorer will show the handle element as drag image instead of the `vddl-draggable` element. You can work around this by styling the handle element differently when it is being dragged. Use the CSS selector `.vddl-dragging:not(.vddl-dragging-source) .vddl-handle` for that.

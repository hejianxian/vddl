## vddl-draggable

使用`vddl-draggable`组件使您的元素可以拖动。

#### 基本用法

```html
<vddl-draggable v-for="(item, index) in list" :key="item.id"
  :draggable="item"
  :index="index"
  :wrapper="list"
  effect-allowed="move">
  {{item.label}}
</vddl-draggable>
```

#### 属性

* `draggable` 必需属性。该值可以理解为拖动元素所携带的数据。在拖放操作的情况下，该值会被插入到新的列表数据或者被删除。
* `index` 必需属性。通过该属性告知 vddl 这拖动元素的 $index 值。
* `wrapper` 必需属性。要与第一级父级`vddl-list`组件的 list 传入值一致。
* `effect-allowed` 使用此属性限制拖动的行为。 包括：
    * `move` 移动元素，这是默认值。
    * `copy` 复制元素，将有一个复制光标。 不需要指定 index 和 wrapper。
    * `copyMove` 可以通过按 ctrl 或 shift 键在复制和移动之间进行选择。
        * *IE 不支持* 在 Internet Explorer 中，此选项与 copy 相同。
        * *Windows 中的 Chrome 不完全支持* 在 window 版的 chrome 中，总会是显示移动的光标，按着 ctrl 键并放下元素时，就会变成了 copy。
    * HTML5 还指定了'link`选项，但是 vddl 并没有支持它。
* `type` 如果您的应用程序中有不同类型的元素，并且您想限制哪些元素可以拖放到哪些列表中，请结合列表中的允许类型来使用此属性。 此属性应该为一个字符串。
* `disable-if` 您可以使用此属性来动态地禁用元素的可拖动性。 如果您有某些列表项不希望被拖动，或者如果您想要完全禁用拖放功能而不使用两个不同的代码分支（例如仅允许管理员），则此功能非常有用。 *注意*：如果您的元素不可拖动，用户可能可以选择其中的文字或图像。 由于选择总是可拖动的，所以会打破您的UI。 您最有可能希望通过CSS禁用用户选择，请参阅 [user-select](http://stackoverflow.com/a/4407335)。

#### 回调方法

* `moved` 移动元素时调用的回调。
* `copied` 与 'moved' 相同，只是当元素被复制而不是移动时被调用。
* `cancelled` 如果元素被拖动而被调用，但是操作被取消并且该元素没有被放下，则触发该回调。
* `dragstart` 拖动元素时调用的回调。
* `dragend` 拖动操作结束时调用的回调函数。
* `selected` 当单击元素但未拖动时调用的回调。

#### CSS 类名

* `vddl-dragging` 当元素被拖动时，该类将被添加到元素中。它会影响拖动时看到的元素和保持在其位置的源元素。不要尝试用这个类隐藏 source 元素，因为这将中止拖动操作。

* `vddl-dragging-source` 拖动操作开始之后，这个类将被添加到元素中，这意味着它只影响原始元素，它仍然是在原位置，而不影响用户拖动的“元素”。


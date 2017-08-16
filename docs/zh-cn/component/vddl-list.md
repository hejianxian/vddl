## vddl-list

使用`vddl-list`组件使您的列表元素成为一个 dropzone。 通常，您会使用'v-for'指令生成一系列的元素， 如果您希望您的列表可排序，可以将`vddl-draggable`组件添加到您的子元素中。`vddl-list`和它的直接的子元素都必须设置相对定位 *position: relative*，否则定位算法将无法在所有浏览器中确定正确的占位符（placeholder）位置。

#### 基本用法

```html
<vddl-list :list="list" :horizontal="false">
  <vddl-draggable ... >itmes</vdd-draggable>
</vddl-list>
```

#### 属性

* `list` 必需属性。该值必须是数组，拖放元素时会对其进行裁剪。
* `allowed-types` 允许拖放的类型，必须是数组。 使用时，只有具有匹配的`vddl-draggable`类型属性的元素才能拖放到该列表。
* `disable-if` 当值为真时，列表将不能拖放元素。 请注意，就将会导致整个列表内的元素都无法拖动。
* `horizontal` 当值为真时，定位算法将使用列表元素的左半部分，而不是上半部分和下半部分。
* `external-sources` 当值为真时，该列表接受来自当前浏览器标签之外的元素的拖放。 这允许拖放不同来自不同的的浏览器的选项卡。请注意，这将允许将任意文本放入列表中，因此强烈建议您执行`drop`回调来检查输入元素是否合理。 此外，外部源的“类型”无法确定，因此不能依赖于‘allowed-types’的限制。另请注意，此功能在 Internet Explorer 中无法正常工作。


#### 回调方法

* `dragover` 当将元素拖动到列表上时触发。 如果设置了该回调方法，但不返回 true，则不允许元素被删除。返回以下属性
    * `event` 浏览器原始拖动事件 event 对象；
    * `index` 列表中将被放下的元素的位置；
    * `type` `vddl-draggable`元素设置的 type 属性 , 如果没设置，则为：undefined；
    * `external` 元素是否从外部源拖进。详情查看`external-sources`属性说明。
* `drop` 在列表中放下元素时调用，返回以下属性：
    * `event` 浏览器原始拖动事件 event 对象；
    * `index` 列表中将被放下的元素的位置；
    * `item` 在`vddl-draggable`元素中 draggable 的值；
    * `type` `vddl-draggable`元素设置的 type 属性 , 如果没设置，则为：undefined；
    * `external` 元素是否从外部源拖进。详情查看`external-sources`属性说明。
* `inserted` 如果元素确实是插入到列表中，则在 drop 之后调用，返回的属性与 drop 回调一样。请注意，对于同一列表中的重新排序，旧元素仍将在列表中，因为`vddl-draggable`的`moved`尚未被调用。

#### CSS 类名

* `vddl-placeholder` 当元素拖动到列表中时，将添加一个新的占位符子元素。 该元素的类型为`div`，并且自带有'vddl-placeholder'类名。您也可以通过使用 `vddl-placeholder` 组件来创建一个自定义的占位符。
* `vddl-dragover` 当元素被拖动到列表中时，这个类将被添加到列表中。

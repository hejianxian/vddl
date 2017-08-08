## vddl-list

Use the `vddl-list` component to make your list element a dropzone. Usually you will add a single div element as child with the 'v-for' directive. If you don't do that, we will not be able to position the dropped element correctly. If you want your list to be sortable, also add the `vddl-draggable` component to your children element(s). Both the `vddl-list` and it's direct children must have position: relative CSS style, otherwise the positioning algorithm will not be able to determine the correct placeholder position in all browsers.

#### Usage

```html
<vddl-list :list="list" :horizontal="false">
  <vddl-draggable ... >itmes</vdd-draggable>
</vddl-list>
```


#### Attributes

* `list` Required attribute. The value has to be the array in which the data of the dropped element should be inserted.
* `allowed-types` Optional array of allowed item types. When used, only items that had a matching `vddl-draggable` type attribute will be dropable.
* `disable-if` Optional boolean expression. When it evaluates to true, no dropping into the list is possible. Note that this also disables rearranging items inside the list.
* `horizontal` Optional boolean expression. When it evaluates to true, the positioning algorithm will use the left and right halfs of the list items instead of the upper and lower halfs.
* `external-sources` Optional boolean expression. When it evaluates to true, the list accepts drops from sources outside of the current browser tab. This allows to drag and drop accross different browser tabs. Note that this will allow to drop arbitrary text into the list, thus it is highly recommended to implement the `drop` callback to check the incoming element for sanity. Furthermore, the `type` of external sources can not be determined, therefore do not rely on restrictions of `allowed-types`. Also note that this feature does not work very well in Internet Explorer.

#### Callbacks

* `dragover` Optional expression that is invoked when an element is dragged over the list. If the expression is set, but does not return true, the element is not allowed to be dropped. The following variables will be available:
    * `event` The original dragover event sent by the browser.
    * `index` The position in the list at which the element would be dropped.
    * `type` The `type` set on the `vddl-draggable`, or undefined if unset.
    * `external` Whether the element was dragged from an external source. See `external-sources`.
* `drop` Optional expression that is invoked when an element is dropped on the list.
    * The following variables will be available:
       * `event` The original drop event sent by the browser.
       * `index` The position in the list at which the element would be dropped.
       * `item` The transferred object.
       * `type` The `type` set on the `vddl-draggable`, or undefined if unset.
       * `external` Whether the element was dragged from an external source. See `external-sources`.
    * The return value determines the further handling of the drop:
      * `false` The drop will be canceled and the element won't be inserted.
      * `true` Signalises that the drop is allowed, but the `drop` callback will take care of inserting the element.
      * Otherwise: All other return values will be treated as the object to insert into the array. In most cases you simply want to return the `item` parameter, but there are no restrictions on what you can return.
* `inserted` Optional expression that is invoked after a drop if the element was actually inserted into the list. The same local variables as for `drop` will be available. Note that for reorderings inside the same list the old element will still be in the list due to the fact that `moved` was not called yet.

**CSS classes**
* `vddl-placeholder` When an element is dragged over the list, a new placeholder child element will be added. This element is of type `div` and has the class `vddl-placeholder` set. Alternatively, you can define your own placeholder by creating a child element with `vddl-placeholder` class.
* `vddl-dragover` This class will be added to the list while an element is being dragged over the list.

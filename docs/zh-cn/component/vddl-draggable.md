## vddl-draggable

Use the `vddl-draggable` component to make your element draggable.

#### Base Usage

```html
<vddl-draggable v-for="(item, index) in list" :key="item.id"
  :draggable="item"
  :index="index"
  :wrapper="list"
  effect-allowed="move">
  {{item.label}}
</vddl-draggable>
```

#### Attributes

* `draggable` Required attribute. The value has to be an object that represents the data of the element. In case of a drag and drop operation the object will be serialized and unserialized on the receiving end.
* `index` Required attribute. Use this attribute to tell the directive what '$index' is it.
* `wrapper` Required attribute. Same of the recent 'vddl-list' list prop.
* `effect-allowed` Use this attribute to limit the operations that can be performed. Options are:
    * `move` The drag operation will move the element. This is the default
    * `copy` The drag operation will copy the element. There will be a copy cursor. Don't need 'index' or 'wrapper'.
    * `copyMove` The user can choose between copy and move by pressing the ctrl or shift key.
        * *Not supported in IE:* In Internet Explorer this option will be the same as `copy`.
        * *Not fully supported in Chrome on Windows:* In the Windows version of Chrome the cursor will always be the move cursor. However, when the user drops an element and has the ctrl key pressed, we will perform a copy anyways.
    * HTML5 also specifies the `link` option, but this library does not actively support it yet, so use it at your own risk.
* `type` Use this attribute if you have different kinds of items in your application and you want to limit which items can be dropped into which lists. Combine with `allowed-types` on the `list(s)`. This attribute should evaluate to a string, although this restriction is not enforced (at the moment).
* `disable-if` You can use this attribute to dynamically disable the draggability of the element. This is useful if you have certain list items that you don't want to be draggable, or if you want to disable drag & drop completely without having two different code branches (e.g. only allow for admins). *Note*: If your element is not draggable, the user is probably able to select text or images inside of it. Since a selection is always draggable, this breaks your UI. You most likely want to disable user selection via CSS (see [user-select](http://stackoverflow.com/a/4407335)).

#### Callbacks

* `moved` Callback that is invoked when the element was moved.
* `copied` Same as dnd-moved, just that it is called when the element was copied instead of moved.
* `canceled` Callback that is invoked if the element was dragged, but the operation was canceled and the element was not dropped.
* `dragstart` Callback that is invoked when the element was dragged.
* `dragend` Callback that is invoked when the drag operation ended.
* `selected` Callback that is invoked when the element was clicked but not dragged.

#### CSS classes

* `vddl-dragging` This class will be added to the element while the element is being dragged. It will affect both the element you see while dragging and the source element that stays at it's position. Do not try to hide the source element with this class, because that will abort the drag operation.
* `vddl-dragging-source` This class will be added to the element after the drag operation was started, meaning it only affects the original element that is still at it's source position, and not the "element" that the user is dragging with his mouse pointer



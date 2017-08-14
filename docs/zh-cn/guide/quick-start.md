## Quick start

Assuming you have successfully installed `vddl` and imported the file correctly, then let's start by making a simple draggable list.

[Simple Demo](http://hejx.space/vddl-demo/#/simple)

#### Prepare data

First, we will have a list of data as follows:

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

#### Write template

We need to be aware that to make a draggable list, you need to use the `vddl-list` and `vddl-draggable` components at the same time.

Suppose we now create a file called `simple.vue`. Because the components have been installed at `Vue.use (vddl)`, we do not need to re-introduce `vddl-list` and `vddl-draggable`, we can start directly.

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

In the above code, pay attention to the list attribute of `vddl-list` and the draggable, index and wrapper attributes of `vddl-draggable`, all of which are required. Only by correctly passing in the value, `vddl` knows how to handle the list data when dragging.

> `vddl-placeholder` is not required, the example is only to create a custom placeholder, by default, `vddl` will automatically create the placeholder element, and the element with `vddl-placeholder` class name.

#### Style

> Each component in `vddl` will have a class name with the same name as the component name.

For the correct positioning of the placeholder element, the `vddl-list` and it's children must have position: relative. Otherwise we can not determine whether the mouse pointer is in the upper or lower half of the element we are dragging over. In other browsers we can use event.offsetY for this.

```css
.vddl-list, .vddl-draggable {
  position: relative;
}
```

The `vddl-list` should always have a min-height, otherwise you can't drop to it once it's empty.

```css
.vddl-list {
  min-height: 44px;
}
```

The `vddl-dragging` and `vddl-dragging-source` class will be applied to the source element of a drag operation. It makes sense to hide it to give the user the feeling that he's actually moving it.

```css
.vddl-dragging{
  opacity: 0.7;
}

.vddl-dragging-source {
  display: none;
}
```

#### Note

```html
<!-- error -->
<ul>
  <li v-for="(item, index) in list" :key="index">{{item.title}}</li>
</ul>
```

In vue2.0, the above way uses the `v-for` directive, key attribute can not directly use `index`, which will lead to `vddl` reset list and vue some of the internal mechanism of conflict, resulting in drag problems.


So, you should set a unique address for the key attribute, such as uuid. This needs to be clear when setting the list data.

```html
<!-- correct  -->
<ul>
  <li v-for="(item, index) in list" :key="item.id">{{item.title}}</li>
</ul>
```


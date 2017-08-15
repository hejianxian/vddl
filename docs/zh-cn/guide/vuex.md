## 使用 Vuex

`Vddl`并不是完全为了配合`Vuex`而设计的。在其中的两个核心组件`vddl-list`和`vddl-draggable`里，提供了2个回调事件供使用者来控制列表数据。

* vddl-list: `drop`-插入数据
* vddl-draggable: `moved`-删除数据

当`drop`被添加到`vddl-list`组件上时，在拖动元素并且准备放置到某个位置时，`vddl`将会取消内部对列表数据的默认处理，而是触发`drop`事件，并返回对应的数据。同样，如果在`vddl-draggable`组件上添加`moved`事件，`vddl`同样也不会处理数据，而是将数据返回。

也就是说，只能在这2个事件中，通过触发 actions 来修改 store 的 state。

[Vuex demo](http://hejx.space/vddl-demo/#/vuex)

#### 编写模版

代码如下，给`vddl-list`组件添加`drop`事件，并给`vddl-draggable`组件添加`moved`事件。

```html
<vddl-list class="panel__body--list"
  :list="lists"
  :drop="handleDrop"
  :horizontal="false">
  <vddl-draggable class="panel__body--item" v-for="(item, index) in lists" :key="item.label"
    :draggable="item"
    :index="index"
    :wrapper="lists"
    effect-allowed="move"

    :moved="handleMoved">
    {{index}}: {{item.label}}
  </vddl-draggable>
  <vddl-placeholder class="red">Custom placeholder</vddl-placeholder>
</vddl-list>
```

####  添加 Mutations

简单地添加一些代码

```js
// actions
import {
  INSERT_ITEM,
  DELETE_ITEM
} from './mutation-types.js';

export const inserItem = ({ commit }, draggable) => {
  commit(INSERT_ITEM, draggable);
};

export const delItem = ({ commit }, index) => {
  commit(DELETE_ITEM, index);
};

// mutations
const mutations = {
  [INSERT_ITEM] (state, { index, item }) {
    state.lists.splice(index, 0, item);
  },
  [DELETE_ITEM] (state, index) {
    state.lists.splice(index, 1);
  },
};
```

#### 触发 Actions

这里使用的是 Vuex 2.0版本，写法和1.0略有不同，需要手动绑定 actions 和 getters。然后在事件方法中，dispatch actions。

```js
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters({
    lists: 'mockLists'
  }),
  methods: {
    ...mapActions([
      'inserItem',
      'delItem'
    ]),
    handleMoved(index) {
      this.$store.dispatch('delItem', index);
    },
    handleDrop(draggable) {
      this.$store.dispatch('inserItem', draggable);
    }
  },
}
```

#### 注意

我们都知道，从 Vuex store 中获取的数据，只能通过触发 actions 来 dispatch mutations，从而改变 state。所以，上面的简单例子是可以正常运行的。但是例子中只是对单一的数组进行处理，如果像 [nested demo](http://hejx.space/vddl-demo/#/nested) 那样，存在多层嵌套的数组，那又应该怎样去确定每一次拖动应该对哪个数组进行操作呢？

也许一个比较好的解决方法是，给数据添加唯一的 id，并且确定父子之间的关系，例如在 draggable 数据中，标明来自那个父数据，这样做之后，在 drop 和 moved 事件中，可以获取到准确的数据位置，那也就可以正常地处理数据。

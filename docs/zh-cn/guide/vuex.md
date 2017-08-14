## With Vuex

`Vddl` is not fully compatible with `Vuex` design, in the two main components `vddl-list` and `vddl-draggable` components, provides two callback method allows the user to control.

* vddl-list: `drop` callback
* vddl-draggable: `moved` callback

When `drop` added to the `vddl-list` component, when you drag an item and are ready to drop somewhere in the list, `vddl` will cancel its own cut of the list data and invoke the drop method, and return the relevant data. Similarly, the `moved` method returns the dragged draggable data.

In other words, vuex can only call the action in the two callback method to modify the state.

[Vuex demo](http://hejx.space/vddl-demo/#/vuex)

#### Write template

Look at the code below, while adding the vddl-list `drop` and vddl-draggable `moved` method.

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

####  Add mutations

In `Vuex`, we simply add some code:

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

#### Dispatch actions

Then in the component mapping actions and props, and in the callback to add the appropriate action method:

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

#### Note

We all know that the data obtained from the store, must pass the action to dispatch the mutation to change state. So the above simple demo is normal operation.

But we only operate on a single array, if there is something like nested demo, there are multiple nested data, it is difficult to find the location of the data should be interception. Perhaps adding a unique value to each layer of data is a good solution, from the draggable data is marked from what list of data, and then in the move and drop methods to retrieve the correct list of data to cut the data.

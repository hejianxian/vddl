<template>
  <div class="demo-content simple">
    <v-title>Vuex</v-title>
    <div class="v-row">
      <div class="v-col--auto">
        <div class="panel">
            <div class="panel__heading">
              <h3>List</h3>
            </div>
            <div class="panel__body">
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
            </div>
        </div>
      </div>
      <div class="v-col--auto mutations">
        <h3>Mutations:</h3>
        <p v-if="mutations.length === 0">No mutation.</p>
        <p v-for="mt in mutations" :key="mt.id">{{mt.id}}: mutation < {{mt.type}} > index: {{mt.index}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      id: 1,
      mutations: [],
    };
  },
  computed: mapGetters({
    lists: 'mockLists'
  }),
  methods: {
    ...mapActions([
      'inserItem',
      'delItem'
    ]),
    handleMoved({ index }) {
      this.$store.dispatch('delItem', index);
      this.mutations.push({ id: this.id++, type: 'DELETE_ITEM', index: index - 1});
    },
    handleDrop(draggable) {
      this.$store.dispatch('inserItem', draggable);
      this.mutations.push({ id: this.id++, type: 'INSERT_ITEM', index: draggable.index});
    }

  },
}
</script>

<style lang="less">
@import '../styles/_var.less';

.simple .vddl-placeholder {
  line-height: @item-height;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding-left: 15px;
}

.red {
  color: red;
}

.mutations {
  text-align: center;
  h3 {
    font-size: 16px;
    margin: 0;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: #666;
  }
}
</style>

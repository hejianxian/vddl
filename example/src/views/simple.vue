<template>
  <div>
    <vddl-list :dnd-list="list"
          :dnd-horizontal-list="false">
      <vddl-draggable v-for="(item, index) in list" :key="item.id"
        :dnd-draggable="item"
        :dnd-wrapper="list"
        :dnd-index="index"
        dnd-effect-allowed="move"

        :dnd-dragstart="dndDragstart"
        :dnd-selected="dndSelected"
        :dnd-dragend="dndDragend"
        :dnd-copied="dndCopied"
        :dnd-canceled="dndCanceled"
      >
        {{item.id}}:{{item.title}}
      </vddl-draggable>
      <div class="dndPlaceholder red">Custom placeholder</div>
    </vddl-list>
  </div>
</template>

<script>
export default {
  name: 'vddl-simple-demo',
  data () {
    return {
      list: [{
        id: 1,
        title: 'item1'
      },{
        id: 2,
        title: 'item2'
      },{
        id: 3,
        title: 'item3'
      },{
        id: 4,
        title: 'item4'
      },{
        id: 5,
        title: 'item5'
      },{
        id: 6,
        title: 'item6'
      }]
    }
  },
  methods: {
    dndDragstart() {
      console.log('dndDragstart');
    },
    dndSelected() {
      console.log('dndSelected');
    },
    dndDragend() {
      console.log('dndDragend');
    },
    dndMoved() {
      console.log('dndMoved');
    },
    dndCopied() {
      console.log('dndCopied');
    },
    dndCanceled() {
      console.log('dndCanceled');
    },
    dndInserted() {
      console.log('dndInserted');
    },
    dndDrop() {
      console.log('dndDrop');
    }
  },
}
</script>

<style lang="" scoped>
.dndDragging{
    opacity: 0.7;
}

.dndDraggingSource {
    display: none;
}
</style>

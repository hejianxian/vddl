<template>
  <div class="demo-content simple">
    <v-title>Simple</v-title>
    <div class="v-row">
      <div v-for="(list, listName) in lists" class="v-col--auto">
        <div class="panel">
            <div class="panel__heading">
              <h3>List {{listName}}</h3>
            </div>
            <div class="panel__body">
              <vddl-list class="panel__body--list"
                  :list="list"
                  :inserted="handleInserted"
                  :dragover="handleDragover"
                  :drop="handleDrop"
                  :horizontal="false">
                  <vddl-draggable class="panel__body--item" v-for="(item, index) in list" :key="item.id"
                    :draggable="item"
                    :index="index"
                    :wrapper="list"
                    effect-allowed="move"

                    :selected="selectedEvent"
                    :dragstart="handleDragstart"
                    :dragend="handleDragend"
                    :canceled="handleCanceled"
                    :moved="handleMoved"
                    v-bind:class="{'selected': selected === item}">
                    {{item.label}}
                  </vddl-draggable>
                  <vddl-placeholder class="red">Custom placeholder</vddl-placeholder>
              </vddl-list>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      "selected": null,
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
          {
            "id": 3,
            "label": "Item A3"
          },
          {
            "id": 4,
            "label": "Item A4"
          },
          {
            "id": 5,
            "label": "Item A5"
          }
        ],
        "B": [
          {
            "id": 6,
            "label": "Item B1"
          },
          {
            "id": 7,
            "label": "Item B2"
          },
          {
            "id": 8,
            "label": "Item B3"
          },
          {
            "id": 9,
            "label": "Item B4"
          },
          {
            "id": 10,
            "label": "Item B5"
          }
        ],
        "C": [
          {
            "id": 11,
            "label": "Item C1"
          },
          {
            "id": 12,
            "label": "Item C2"
          },
          {
            "id": 13,
            "label": "Item C3"
          },
          {
            "id": 14,
            "label": "Item C4"
          },
          {
            "id": 15,
            "label": "Item C5"
          }
        ]
      }
    }
  },
  methods: {
    selectedEvent: function(item){
      this.selected = item;
    },
    handleDragstart() {
      console.log(':v-draggable: dragstart');
    },
    handleDragend() {
      console.log(':v-draggable: dragend');
    },
    handleCanceled() {
      console.log(':v-draggable: canceled');
    },
    handleInserted() {
      console.log(':v-list: inserted');
    },
    handleDrop(data) {
      console.log(':v-list: drop');
      console.log(data);
      const { index, list, item } = data;
      // change the id
      item.id = new Date().getTime();
      list.splice(index, 0, item);
    },
    handleMoved(item) {
      console.log(':v-draggable: moved');
      console.log(item);
      const { index, list } = item;
      list.splice(index, 1);
    },
    handleDragover() {
      console.log(':v-list: handleDragover');
    },
  },
};
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
</style>

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
              <vddl-list class="panel__body--list" :list="list" :horizontal="false">
                  <vddl-draggable class="panel__body--item" v-for="(item, index) in list" :key="item.label"
                    :draggable="item"
                    :index="index"
                    :wrapper="list"
                    effect-allowed="move"

                    :selected="selectedEvent"
                    :dragstart="handleDragstart"
                    :dragend="handleDragend"
                    :canceled="handleCanceled"
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
            "label": "Item A1"
          },
          {
            "label": "Item A2"
          },
          {
            "label": "Item A3"
          },
          {
            "label": "Item A4"
          }
        ],
        "B": [
          {
            "label": "Item B1"
          },
          {
            "label": "Item B2"
          },
          {
            "label": "Item B3"
          },
          {
            "label": "Item B4"
          }
        ],
        "C": [
          {
            "label": "Item C1"
          },
          {
            "label": "Item C2"
          },
          {
            "label": "Item C3"
          },
          {
            "label": "Item C4"
          }
        ]
      }
    }
  },
  methods: {
    selectedEvent: function(item){
      this.selected = item;
    },
    handleDragstart: function() {
      console.log('handleDragstart');
    },
    handleDragend: function() {
      console.log('handleDragend');
    },
    handleCanceled: function() {
      console.log('handleCanceled');
    }
  }
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
</style>

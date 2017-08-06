<template>
  <div class="demo-content">
    <v-title>Handle</v-title>
    <div class="v-row handleDemo">
      <div v-for="(list, listName) in lists" class="v-col--auto">
        <div class="panel">
            <div class="panel__heading">
              <h3>List {{listName}}</h3>
            </div>
            <div class="panel__body">
              <vddl-list class="panel__body--list" :list="list" :horizontal="false">
                  <vddl-draggable class="panel__body--item no-padding-left" v-for="(item, index) in list" :key="item.label"
                    :draggable="item"
                    :index="index"
                    :wrapper="list"
                    effect-allowed="move">
                      <vddl-nodrag class="nodrag">
                        <vddl-handle
                          :handle-left="20"
                          :handle-top="20"
                          class="handle">
                        </vddl-handle>
                        <div>{{item.label}}</div>
                      </vddl-nodrag>
                  </vddl-draggable>
              </vddl-list>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vddl-handle-demo',
  data(){
    return {
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
          },
          {
            "label": "Item A5"
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
          },
          {
            "label": "Item B5"
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
          },
          {
            "label": "Item C5"
          }
        ]
      }
    }
  }
}
</script>

<style lang="less">
@import '../styles/_var.less';

.handleDemo .vddl-placeholder {
  width: 100%;
  height: @item-height;
  background: @placeholder-bg;
  border-bottom: 1px solid @placeholder-bg;
}
.handleDemo .vddl-dragging.vddl-dragging-source {
  display: none;
}

.handleDemo .vddl-list div {
  display: flex;

  /* Disable text selection if item is not draggable */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/**
 * Handle
 */
.handleDemo .handle {
  cursor: move;
  width: 40px;
  height: 40px;
  background: url("../assets/handle.png") center center no-repeat;
  background-size: 20px 20px;
}

.handleDemo .name {
  line-height: 40px;
}

.nodrag{
  flex: 1;
  display: flex;
}
</style>

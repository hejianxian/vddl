<template>
  <div class="demo-content">
    <h3>Handle</h3>
    <div class="v-row handleDemo">
      <div v-for="(list, listName) in lists" class="v-col--auto">
        <div class="panel">
            <div class="panel__heading">
                <h3>List {{listName}}</h3>
            </div>
            <div class="panel__body">
              <vddl-list class="panel__body--list" :list="list" :dnd-horizontal-list="false">
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
  }
}
</script>

<style lang="less">

@import '../styles/_var.less';

/**
 * For the correct positioning of the placeholder element, the vddl-list and
 * it's children must have position: relative
 */
.handleDemo .vddl-list,
.handleDemo .vddl-list > div {
  position: relative;
  min-height: @item-height;
}

/**
 * The vddl-list should always have a min-height,
 * otherwise you can't drop to it once it's empty
 */
.handleDemo .vddl-list {
  padding-left: 0px;
  min-height: @item-height;
}

/**
 * The vddl-dragging-source class will be applied to
 * the source element of a drag operation. It makes
 * sense to hide it to give the user the feeling
 * that he's actually moving it.
 */
.handleDemo .vddl-list .vddl-dragging-source {
  display: none;
}

/**
 * An element with .vddl-placeholder class will be
 * added to the vddl-list while the user is dragging
 * over it.
 */
.handleDemo .vddl-placeholder {
  display: block;
  width: 100%;
  height: @item-height;
  background: @placeholder-bg;
}

/**
 * The vddl-lists's child elements currently MUST have
 * position: relative. Otherwise we can not determine
 * whether the mouse pointer is in the upper or lower
 * half of the element we are dragging over. In other
 * browsers we can use event.offsetY for this.
 */
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

<template>
  <div class="row handleDemo">
    <div v-for="(list, listName) in lists" class="col-md-4">
        <div class="panel panel-vue">
            <div class="panel-heading">
                <h3 class="panel-title">List {{listName}}</h3>
            </div>
            <div class="panel-body">
              <vddl-list class="vddl-list" :dnd-list="list" :dnd-horizontal-list="false">
                  <vddl-draggable v-for="(item, index) in list" :key="item.label"
                      :dnd-draggable="item"
                      :dnd-index="index"
                      :dnd-wrapper="list"
                      dnd-effect-allowed="move"
                      >
                      <vddl-nodrag class="nodrag">
                        <vddl-handle
                          :dnd-handle-left="20"
                          :dnd-handle-top="20"
                          class="handle">
                        </vddl-handle>
                        <div class="name">
                            {{item.label}}
                        </div>
                      </vddl-nodrag>
                  </vddl-draggable>
              </vddl-list>
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

<style>
/**
 * For the correct positioning of the placeholder element, the dnd-list and
 * it's children must have position: relative
 */
.handleDemo .vddl-list,
.handleDemo .vddl-list > div {
  position: relative;
  min-height: 41px;
}

/**
 * The dnd-list should always have a min-height,
 * otherwise you can't drop to it once it's empty
 */
.handleDemo .vddl-list {
  padding-left: 0px;
  min-height: 40px;
}

/**
 * The dndDraggingSource class will be applied to
 * the source element of a drag operation. It makes
 * sense to hide it to give the user the feeling
 * that he's actually moving it.
 */
.handleDemo .vddl-list .dndDraggingSource {
  display: none;
}

/**
 * An element with .dndPlaceholder class will be
 * added to the dnd-list while the user is dragging
 * over it.
 */
.handleDemo .vddl-list .dndPlaceholder {
  display: block;
  background-color: #eee;
  text-align: center;
  min-height: 41px;
}

/**
 * The dnd-lists's child elements currently MUST have
 * position: relative. Otherwise we can not determine
 * whether the mouse pointer is in the upper or lower
 * half of the element we are dragging over. In other
 * browsers we can use event.offsetY for this.
 */
.handleDemo .vddl-list div {
  background-color: #fff;
  border-bottom: 1px solid #41B883;
  display: flex;

  /* Disable text selection if item is not draggable */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.handleDemo .vddl-list div:last-child{
    border-bottom: none;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
}

/**
 * Handle
 */
.handleDemo .handle {
  cursor: move;
  width: 40px;
  height: 40px;
  background: url("../assets/logo.png") center center no-repeat;
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

<template lang="html">
  <div class="demo-content horizontal">
    <v-title>Horizontal</v-title>
    <div class="v-row">
      <div v-for="(container, zone) in lists" class="v-col--auto">
        <div class="panel">
          <div class="panel__heading">
            <h3>Dropzone {{zone+1}}</h3>
          </div>
          <vddl-list class="panel__body horizontal__container"
            :list="container"
            :allowed-types="['containerType']"
            :external-sources="true">
            <vddl-draggable class="panel"
              v-for="(list, index) in container"
              :key="index"
              :draggable="list"
              :index="index"
              :wrapper="container"
              :type="'containerType'"
              effect-allowed="copyMove">
              <div class="panel__heading">
                <h3>Container {{index+1}}</h3>
              </div>
              <div class="panel__body">
                <vddl-list class="panel__body--list padding"
                  :list="list"
                  :horizontal="true"
                  :allowed-types="['itemType']"
                  :external-sources="true">
                  <vddl-draggable v-for="(item, number) in list" :key="item.id" class="panel__body--item horizontal-item"
                    :draggable="item"
                    :type="'itemType'"
                    effect-allowed="copyMove"
                    :index="number"
                    :wrapper="list">
                    {{item.label}}
                  </vddl-draggable >
                </vddl-list>
              </div>
            </vddl-draggable>
          </vddl-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let lists = [];
    let id = 10;
    for(var i = 0; i < 3; i++) {
      lists.push([]);
      for(var j = 0; j < 2; j++) {
        lists[i].push([]);
        for(var k = 0; k < 7; k++) {
          lists[i][j].push({
            "label": "Item " + id++,
            "id": id++
            });
        }
      }
    }
    return {
      "lists": lists
    };
  },
  computed: {},
  ready() {},
  attached() {},
  methods: {},
  components: {}
};
</script>

<style lang="less">
@import '../styles/_var.less';

@padding: 7px;

.panel__body--list.padding {
  padding: @padding;
  &:after{
    content: '';
    clear: both;
    display: block;
    width: 100%;
    height: 0;
    visibility: hidden;
  }
}

.item {
  color: #fff;
  width: @item-height;
  height: @item-height;
  margin: @padding;
  background: @base-color;
  text-align: center;
  line-height: 16px;
  padding: 2px;
  float: left;
  border-radius: 4px;
  font-size: 13px;
  box-sizing: border-box;
}

.horizontal-item {
  .item;
}

.horizontal .vddl-placeholder {
  .item;
  background: @placeholder-bg;
}

@container-height: 166px;
.horizontal .horizontal__container {
  min-height: @container-height;
  > .vddl-placeholder {
    width: 100%;
    height: @container-height;
    margin: 10px 0;
    border-radius: 0;
    padding: 0;
  }
}

</style>

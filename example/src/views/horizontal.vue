<template lang="html">
  <div class="demo-content horizontal">
    <v-title>Horizontal</v-title>
    <div class="v-row">
      <div v-for="(co, zone) in lists" class="v-col--auto">
        <div class="panel">
          <div class="panel__heading">
            <h3>Dropzone {{co.id}}</h3>
          </div>
          <vddl-list class="panel__body horizontal__container"
            :list="co.container"
            :allowed-types="['containerType']"
            :external-sources="true">
            <vddl-draggable class="panel"
              v-for="(container, index) in co.container"
              :key="container.id"
              :draggable="container"
              :index="index"
              :wrapper="co.container"
              :type="'containerType'"
              effect-allowed="copyMove">
              <div class="panel__heading">
                <h3>Container {{container.id}}</h3>
              </div>
              <div class="panel__body">
                <vddl-list class="panel__body--list padding"
                  :list="container.list"
                  :horizontal="true"
                  :allowed-types="['itemType']"
                  :external-sources="true">
                  <vddl-draggable v-for="(item, number) in container.list" :key="item.id" class="panel__body--item horizontal-item"
                    :draggable="item"
                    :type="'itemType'"
                    effect-allowed="copyMove"
                    :index="number"
                    :wrapper="container.list">
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
    let cid = 1, lid = 1, iid = 1;
    for(var i = 0; i < 3; i++) {
      lists.push({
        id: cid++,
        container: []
      });
      for(var j = 0; j < 2; j++) {
        lists[i].container.push({
          id: lid++,
          list: []
        });
        for(var k = 0; k < 7; k++) {
          lists[i].container[j].list.push({
            "label": "Item " + iid++,
            "id": iid
          });
        }
      }
    }
    console.log(lists);
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

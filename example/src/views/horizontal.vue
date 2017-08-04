<template lang="html">
  <div class="row horizontal">
    <div v-for="(container, zone) in lists" class="col-md-4">
      <div class="panel panel-vue">
        <div class="panel-heading">
            <h3 class="panel-title">Dropzone {{zone+1}}</h3>
        </div>
        <vddl-list class="panel-body container-list"
            :dnd-list="container"
            :dnd-allowed-types="['containerType']"
            :dnd-external-sources="true">
          <vddl-draggable class="panel panel-vue padding"
              v-for="(list, index) in container"
              :key="index"
              :dnd-draggable="list"
              :dnd-index="index"
              :dnd-wrapper="container"
              :dnd-type="'containerType'"
              dnd-effect-allowed="copyMove">
              <div class="panel-heading">
                  <h3 class="panel-title">container {{index+1}}</h3>
              </div>
              <div class="panel-body">
                <vddl-list class="item-list"
                    :dnd-list="list"
                    :dnd-horizontal-list="true"
                    :dnd-allowed-types="['itemType']"
                    :dnd-external-sources="true">
                  <vddl-draggable  v-for="(item, number) in list" :key="item.id" class="item"
                      :dnd-draggable="item"
                      :dnd-type="'itemType'"
                      dnd-effect-allowed="copyMove"
                      :dnd-index="number"
                      :dnd-wrapper="list">
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

<style>

</style>

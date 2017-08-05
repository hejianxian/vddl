<template lang="html">
  <vddl-draggable class="panel__body--item"
    :draggable="item"
    :index="index"
    :disable-if="disable"
    :selected="selectedEvent"
    :wrapper="list"
    v-bind:class="{'selected': selectedItem === item}">
    <div class="panel padding" v-if="item.type === 'container'">
      <div class="panel__heading">
        <h3>Container {{item.id}}</h3>
      </div>
      <vddl-list class="panel__body"
        :list="item.columns"
        :disable-if="disable"
        :external-sources="true">
        <list v-for="(col, number) in item.columns"
          :key="col.id" :item="col"
          :list="item.columns"
          :index="number"
          :selected="selectedEvent"
          :selected-item="selectedItem"
          :disable="disable">
        </list>
      </vddl-list>
    </div>
    <p v-else>
      {{item.type}} {{item.id}}
    </p>
  </vddl-draggable>
</template>

<script>
export default {
  name: 'list',
  props: ['item', 'list', 'index', 'selected', 'selectedItem', 'disable'],
  methods: {
    selectedEvent(item){
      if (typeof(this.selected) === 'function') {
        this.selected(item);
      }
    }
  }
};
</script>

<style lang="css">
</style>

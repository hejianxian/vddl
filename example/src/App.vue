<template>
  <div id="app">
    <header>Vddl</header>
    <div class="container">
      <hr>
      <ItemTypes></ItemTypes>
      <hr>
      <Handle></Handle>
    </div>
    <footer>Footer</footer>
  </div>
</template>

<script>
import ItemTypes from './views/itemTypes.vue';
import Handle from './views/handle.vue';

export default {
  name: 'app',
  data() {
    return {};
  },
  mounted() {},
  components: {
    ItemTypes,
    Handle,
  }
}
</script>

<style lang="less">
@import './styles/index.less';
</style>

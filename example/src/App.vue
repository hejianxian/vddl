<template>
  <div id="app">
    <v-header></v-header>
    <div class="container main">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHeader from './components/header.vue';
import vFooter from './components/footer.vue';

export default {
  name: 'app',
  data() {
    return {};
  },
  mounted() {},
  components: {
    vHeader,
    vFooter,
  }
}
</script>

<style lang="less">
@import './styles/index.less';

.main {
  min-height: 380px;
}
</style>


<template>
  <div class="menus">
    <div class="menus__item" v-for="link in links">
      <router-link :to="link.name">{{link.name}}</router-link>
    </div>
  </div>
</template>

<script>
import routes from '../routes.js';

export default {
  name: 'v-menus',
  data() {
    return {
      links: routes.splice(1, routes.length)
    };
  },
};
</script>

<style lang="less">
.menus {
  display: flex;
  &__item {
    padding: 0 10px;
  }
}
</style>

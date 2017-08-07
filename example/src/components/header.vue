<template>
  <header class="header">
    <div class="header__container">
      <a href="/" title="vddl">
        <img src="../assets/vddl.png" width="200" alt="vddl-logo">
      </a>
      <h3>Vue components for modifying lists with the </h3>
      <h3>HTML5 drag & drop API.</h3>
      <div class="v-row buttons">
        <div class="v-col--auto button"><a href="http://hejx.space/vddl" title="docs">Documentation</a></div>
        <div class="v-col--auto button"><a href="https://github.com/hejianxian/vddl" title="github">Github</a></div>
      </div>
      <v-menus></v-menus>
    </div>
  </header>
</template>

<script>
import vMenus from './menus.vue';

export default {
  name: 'v-header',
  components: {
    vMenus,
  },
};
</script>

<style lang="less">
@import '../styles/_var.less';

.header {
  width: 100%;
  height: 420px;
  border-bottom: 1px solid #f5f5f5;
  margin-bottom: 30px;
  padding-bottom: 50px;
  box-sizing: border-box;
  &__container {
    max-width: @max-width;
    min-width: @min-width;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    a {
      margin-bottom: 20px;
    }
    h3 {
      margin: 5px 0;
      font-size: 18px;
      font-weight: normal;
    }
    .buttons {
      width: 200px;
      margin: 20px 0;
      text-align: center;
    }
  }
}
</style>

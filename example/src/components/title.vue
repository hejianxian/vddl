<template>
  <h3 class="demo__title">
    <span># </span><slot></slot>
  </h3>
</template>

<script>
export default {
  name: 'v-title',
};
</script>

<style lang="less">
@import '../styles/_var.less';

.demo__title {
  span {
    color: @base-color;
  }
}
</style>

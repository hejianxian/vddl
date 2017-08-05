<template>
  <div class="footer">
    <div class="container">
      <p>
        Designed and built by <a href="https://github.com/hejianxian" target="_blank">Hejx</a>.
      </p>
      <p>
        Code on <a href="https://github.com/hejianxian/vddl" target="_blank">Github</a> and licensed under <a href="https://github.com/hejianxian/vddl/blob/master/LICENSE" target="_blank">The MIT License</a>.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-footer',
};
</script>

<style lang="less">
@import '../styles/_var.less';

.footer {
  border-top: 1px solid #f5f5f5;
  text-align: center;
  font-size: 14px;
}
</style>

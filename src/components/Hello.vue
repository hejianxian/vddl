<template>
<h1 id="greetings">Hello! {{ name }}</h1>
</template>


<script>
import upper from 'lodash/startCase';

export default {
  computed: {
    name() {
      return upper('John Doe');
    },
  },
};
</script>

<style lang="less">
#greetings {
  color: chocolate;
}
</style>
<template>
  <div id="app">
    <h1>Simple</h1>
    <div>
      <Simple></Simple>
    </div>
    <hr>
    <h1>ItemTypes</h1>
    <div>
      <ItemTypes></ItemTypes>
    </div>
    <hr>
    <h1>Handle</h1>
    <div>
      <Handle></Handle>
    </div>
    <hr>
    <h1>Horizontal</h1>
    <div>
      <Horizontal></Horizontal>
    </div>
  </div>
</template>

<script>
import Simple from './views/simple.vue';
import ItemTypes from './views/itemTypes.vue';
import Handle from './views/handle.vue';
import Horizontal from './views/horizontal.vue';

export default {
  name: 'app',
  data() {
    return {};
  },
  mounted() {},
  components: {
    Simple,
    ItemTypes,
    Handle,
    Horizontal
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

</style>

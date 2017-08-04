<template>
  <div class="vddl-handle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-handle',
  props: {
    handleLeft: Number,
    handleTop: Number,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handle(event) {
      event = event.originalEvent || event;
      event._dndHandle = true;
      event._dndHandleLeft = this.handleLeft || 0;
      event._dndHandleTop = this.handleTop || 0;
    },
  },
  mounted() {
    this.$el.setAttribute('draggable', true);

    this.$el.addEventListener('dragstart', this.handle, false);
    this.$el.addEventListener('dragend', this.handle, false);
  },
  beforeDestroy() {
    this.$el.removeEventListener('dragstart', this.handle, false);
    this.$el.removeEventListener('dragend', this.handle, false);
  },
};
</script>

<style lang="less">
.ddl-handle {
  color: #222;
}
</style>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-handle',
  props: {
    dndHandleLeft: Number,
    dndHandletop: Number,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handle(event) {
      event = event.originalEvent || event;
      event._dndHandle = true;
      event._dndHandleLeft = this.dndHandleLeft || 0;
      event._dndHandleTop = this.dndHandleTop || 0;
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

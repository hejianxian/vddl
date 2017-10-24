<template>
  <div class="vddl-handle"
    @dragstart="handle"
    @dragend="handle">
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
      event._dndHandle = true;
      event._dndHandleLeft = this.handleLeft || 0;
      event._dndHandleTop = this.handleTop || 0;
    },
    init() {
      this.$el.setAttribute('draggable', true);
    },
  },
  ready() {
    this.init();
  },
  mounted() {
    this.init();
  },
};
</script>

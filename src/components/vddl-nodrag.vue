<template>
  <div class="vddl-nodrag"
    @dragstart="handleDragstart"
    @dragend="handleDragend">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-nodrag',
  props: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleDragstart(event) {
      if (!event._dndHandle) {
        // If a child element already reacted to dragstart and set a dataTransfer object, we will
        // allow that. For example, this is the case for user selections inside of input elements.
        if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
          event.preventDefault();
        }
        event.stopPropagation();
      }
    },
    handleDragend(event) {
      if (!event._dndHandle) {
        event.stopPropagation();
      }
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

<template>
  <div class="vddl-nodrag">
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
      event = event.originalEvent || event;

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
      event = event.originalEvent || event;
      if (!event._dndHandle) {
        event.stopPropagation();
      }
    },
    init() {
      this.$el.setAttribute('draggable', true);

      this.$el.addEventListener('dragstart', this.handleDragstart, false);
      this.$el.addEventListener('dragend', this.handleDragend, false);
    },
  },
  ready() {
    this.init();
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.$el.removeEventListener('dragstart', this.handleDragstart, false);
    this.$el.removeEventListener('dragend', this.handleDragend, false);
  },
};
</script>

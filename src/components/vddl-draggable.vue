<template>
  <div class="vddl-draggable"
    :is="tag"
    @dragstart.stop="handleDragstart"
    @dragend.stop="handleDragend"
    @click.stop="handleClick"
    @selectstart="handleSelected">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-draggable',
  // css: vddl-dragging, vddl-dragging-source
  props: {
    draggable: [ Object, Array ],
    wrapper: Array,
    index: Number,
    tag: {
      type: String,
      default: 'div'
    },

    effectAllowed: String,
    type: String,

    // diable
    disableIf: Boolean,

    // callback fn
    dragstart: Function,
    selected: Function,
    dragend: Function,
    moved: Function,
    copied: Function,
    canceled: Function,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleDragstart(event) {
      var draggable = JSON.stringify(this.draggable);
      // Check whether the element is draggable, since dragstart might be triggered on a child.
      if (draggable == 'false' || this.disableIf) return true;

      // Serialize the data associated with this element. IE only supports the Text drag type
      event.dataTransfer.setData("Text", draggable);

      // Add CSS classes. IE9 not support 'classList'
      this.$el.className = this.$el.className.trim() + " vddl-dragging";
      setTimeout(() => {
        this.$el.className = this.$el.className.trim() + " vddl-dragging-source";
      }, 0);

      // Workarounds for stupid browsers, see description below
      this.vddlDropEffectWorkaround.dropEffect = this.effectAllowed || "move";
      this.vddlDragTypeWorkaround.isDragging = true;

      // Save type of item in global state. Usually, this would go into the dataTransfer
      // typename, but we have to use "Text" there to support IE
      this.vddlDragTypeWorkaround.dragType = this.type || undefined;

      // Try setting a proper drag image if triggered on a vddl-handle (won't work in IE).
      if (event._dndHandle && event.dataTransfer.setDragImage) {
        event.dataTransfer.setDragImage(this.$el, event._dndHandleLeft, event._dndHandleTop);
      }

      // Invoke callback
      if (typeof(this.dragstart) === 'function') {
        this.dragstart.call(this, event.target);
      }
    },

    handleDragend(event) {
      var dropEffect = this.vddlDropEffectWorkaround.dropEffect;
      switch (dropEffect) {
        case "move":
          if (typeof(this.moved) === 'function') {
            this.$nextTick(() => {
              this.moved({
                index: this.index,
                list: this.wrapper,
                event: event.target,
                draggable: this.draggable,
              });
            });
          } else {
            this.$nextTick(() => {
              this.wrapper.splice(this.index, 1);
            });
          }
          break;
        case "copy":
          if (typeof(this.copied) === 'function') {
            this.copied(this.draggable, event.target);
          }
          break;
        case "none":
          if (typeof(this.canceled) === 'function') {
            this.canceled(event.target);
          }
          break;
      }
      if (typeof(this.dragend) === 'function') {
        this.dragend(dropEffect, event.target);
      }

      // Clean up
      this.$el.className = this.$el.className.replace("vddl-dragging", "").trim();
      setTimeout(() => {
        if (this.$el) this.$el.className = this.$el.className.replace("vddl-dragging-source", "").trim();
      }, 0);
      this.vddlDragTypeWorkaround.isDragging = false;
    },

    handleClick(event) {
      if (!this.selected) return;

      if (typeof(this.selected) === 'function') {
        this.selected(this.wrapper[this.index], event.target);
      }
    },

    /**
     * Workaround to make element draggable in IE9
     * http://stackoverflow.com/questions/5500615/internet-explorer-9-drag-and-drop-dnd
     */
    handleSelected() {
      if (this.dragDrop) this.dragDrop();
      return false;
    },

    // init
    init() {
      let status = true;
      if (this.disableIf) status = false;
      this.$el.setAttribute('draggable', status);
    },
  },
  watch: {
    disableIf(val) {
      this.$el.setAttribute('draggable', !val);
    },
  },
  // For Vue 1.0
  ready() {
    this.init();
  },
  mounted() {
    this.init();
  },
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-draggable',
  // css: dragging, draggingSource
  props: {
    dndDraggable: [ Object, Array ],
    dndWrapper: Array,
    dndIndex: Number,

    dndEffectAllowed: String,
    dndType: String,

    // diable
    dndDisableIf: Boolean,

    // callback fn
    dndDragstart: Function,
    dndSelected: Function,
    dndDragend: Function,
    dndMoved: Function,
    dndCopied: Function,
    dndCanceled: Function,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleDragstart(event) {
      event = event.originalEvent || event;

      var dndDraggable = JSON.stringify(this.dndDraggable);
      // Check whether the element is draggable, since dragstart might be triggered on a child.
      if (dndDraggable == 'false' || this.dndDisableIf) return true;

      // Serialize the data associated with this element. IE only supports the Text drag type
      event.dataTransfer.setData("Text", dndDraggable);

      // Only allow actions specified in dnd-effect-allowed attribute
      event.dataTransfer.effectAllowed = this.dndEffectAllowed || "move";

      // Add CSS classes. IE9 not support 'classList'
      this.$el.className = this.$el.className.trim() + " dndDragging";
      setTimeout(function() { this.$el.className = this.$el.className.trim() + " dndDraggingSource"; }.bind(this), 0);

      // Workarounds for stupid browsers, see description below
      this.dndDropEffectWorkaround.dropEffect = "none";
      this.dndDragTypeWorkaround.isDragging = true;

      // Save type of item in global state. Usually, this would go into the dataTransfer
      // typename, but we have to use "Text" there to support IE
      this.dndDragTypeWorkaround.dragType = this.dndType || undefined;

      // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
      if (event._dndHandle && event.dataTransfer.setDragImage) {
        event.dataTransfer.setDragImage(this.$el, event._dndHandleLeft, event._dndHandleTop);
      }

      // Invoke callback
      if (typeof(this.dndDragstart) === 'function') {
        this.dndDragstart.call(this, event.target);
      }

      event.stopPropagation();
    },

    handleDragend(event) {
      event = event.originalEvent || event;

      var dropEffect = this.dndDropEffectWorkaround.dropEffect;
      switch (dropEffect) {
        case "move":
          if (typeof(this.dndMoved) === 'function') {
            this.dndMoved(this.dndWrapper, this.dndIndex, event.target);
          } else {
            this.dndWrapper.splice(this.dndIndex, 1);
          }
          break;
        case "copy":
          if (typeof(this.dndCopied) === 'function') {
            this.dndCopied.call(this, this.dndDraggable, event.target);
          }
          break;
        case "none":
          if (typeof(this.dndCanceled) === 'function') {
            this.dndCanceled.call(this, event.target);
          }
          break;
      }
      if (typeof(this.dndDragend) === 'function') {
        this.dndDragend.call(this, dropEffect, event.target);
      }

      // Clean up
      this.$el.className = this.$el.className.replace("dndDragging", "").trim();
      var _el = this.$el;
      setTimeout(function(){
        // here this.$el will be null
        _el.className = _el.className.replace("dndDraggingSource", "").trim();
      }, 0);
      this.dndDragTypeWorkaround.isDragging = false;
      event.stopPropagation();
    },

    handleClick(event) {
      if (!this.dndSelected) return;

      event = event.originalEvent || event;
      if (typeof(this.dndSelected) === 'function') {
        this.dndSelected.call(this, this.dndWrapper[this.dndIndex], event.target);
      }
      event.stopPropagation();
    },

    /**
     * Workaround to make element draggable in IE9
     * http://stackoverflow.com/questions/5500615/internet-explorer-9-drag-and-drop-dnd
     */
    handleSelected() {
      if (this.dragDrop) this.dragDrop();
      return false;
    },
  },
  mounted() {
    let status = true;
    if (this.dndDisableIf) status = false;
    this.$el.setAttribute('draggable', status);

    this.$el.addEventListener('dragstart', this.handleDragstart, false);
    this.$el.addEventListener('dragend', this.handleDragend, false);
    this.$el.addEventListener('click', this.handleClick, false);
    this.$el.addEventListener('selectstart', this.handleSelected, false);
  },
  beforeDestroy() {
    this.$el.removeEventListener('dragstart', this.handleDragstart, false);
    this.$el.removeEventListener('dragend', this.handleDragend, false);
    this.$el.removeEventListener('click', this.handleClick, false);
    this.$el.removeEventListener('selectstart', this.handleSelected, false);
  },
};
</script>

<style lang="less">
.ddl-draggable {
  color: #222;
}
</style>

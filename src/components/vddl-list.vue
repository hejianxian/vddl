<template>
  <div class="vddl-list"
    :is="tag"
    @dragenter.prevent="handleDragenter"
    @dragover.stop.prevent="handleDragover"
    @drop.stop.prevent="handleDrop"
    @dragleave="handleDragleave">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'vddl-list',
  // css: placeholder, dragover
  props: {
    list: Array,
    tag: {
      type: String,
      default: 'div'
    },

    allowedTypes: Array,
    disableIf: Boolean,
    horizontal: Boolean,
    externalSources: Boolean,

    dragover: Function,
    inserted: Function,
    drop: Function,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleDragenter(event) {
      if (!this.isDropAllowed(event)) return true;
    },

    handleDragover(event) {
      if (!this.isDropAllowed(event)) return true;

      if (this.placeholderNode.parentNode != this.listNode) {
        this.listNode.appendChild(this.placeholderNode);
      }

      if (event.target !== this.listNode) {
        // Try to find the node direct directly below the list node.
        var listItemNode = event.target;
        while (listItemNode.parentNode !== this.listNode && listItemNode.parentNode) {
          listItemNode = listItemNode.parentNode;
        }
        if (listItemNode.parentNode === this.listNode && listItemNode !== this.placeholderNode) {
          // If the mouse pointer is in the upper half of the child element,
          // we place it before the child element, otherwise below it.
          if (this.isMouseInFirstHalf(event, listItemNode)) {
            this.listNode.insertBefore(this.placeholderNode, listItemNode);
          } else {
            this.listNode.insertBefore(this.placeholderNode, listItemNode.nextSibling);
          }
        }
      } else {
        // This branch is reached when we are dragging directly over the list element.
        // Usually we wouldn't need to do anything here, but the IE does not fire it's
        // events for the child element, only for the list directly. Therefore, we repeat
        // the positioning algorithm for IE here.
        if (this.isMouseInFirstHalf(event, this.placeholderNode, true)) {
          // Check if we should move the placeholder element one spot towards the top.
          // Note that display none elements will have offsetTop and offsetHeight set to
          // zero, therefore we need a special check for them.
          while (this.placeholderNode.previousElementSibling
                && (this.isMouseInFirstHalf(event, this.placeholderNode.previousElementSibling, true)
                || this.placeholderNode.previousElementSibling.offsetHeight === 0)) {
            this.listNode.insertBefore(this.placeholderNode, this.placeholderNode.previousElementSibling);
          }
        } else {
          // Check if we should move the placeholder element one spot towards the bottom
          while (this.placeholderNode.nextElementSibling &&
                !this.isMouseInFirstHalf(event, this.placeholderNode.nextElementSibling, true)) {
            this.listNode.insertBefore(this.placeholderNode,
                this.placeholderNode.nextElementSibling.nextElementSibling);
          }
        }
      }

      // At this point we invoke the callback, which still can disallow the drop.
      // We can't do this earlier because we want to pass the index of the placeholder.
      if (this.dragover && !this.invokeCallback('dragover', event, this.getPlaceholderIndex())) {
        return this.stopDragover(event);
      }

      if (this.$el.className.indexOf("vddl-dragover") < 0) this.$el.className = this.$el.className.trim() + " vddl-dragover";
      return false;
    },
    handleDrop(event) {
      if (!this.isDropAllowed(event)) return true;

      // The default behavior in Firefox is to interpret the dropped element as URL and
      // forward to it. We want to prevent that even if our drop is aborted.

      // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
      // the "Text" drag type will be converted to text/plain, but IE does not do that.
      var data = event.dataTransfer.getData("Text") || event.dataTransfer.getData("text/plain");
      var transferredObject;
      try {
        transferredObject = JSON.parse(data);
      } catch(e) {
        return this.stopDragover();
      }

      // Invoke the callback, which can transform the transferredObject and even abort the drop.
      var index = this.getPlaceholderIndex();
      if (this.drop) {
        transferredObject = this.invokeCallback('drop', event, index, transferredObject);
        if (!transferredObject) {
          return this.stopDragover();
        }
      }

      // Insert the object into the array, unless drop took care of that (returned true).
      if (transferredObject !== true) {
        this.list.splice(index, 0, transferredObject);
      }
      this.invokeCallback('inserted', event, index, transferredObject);

      // As effectAllowed & dropEffect event properties wired behavior
      // We have to determine the actual effect manually from the `vddlDropEffectWorkaround.dropEffect`
      // Which is set in `handleDragstart` method
      var dropEffect = this.vddlDropEffectWorkaround.dropEffect;
      if (dropEffect !== "copy" && dropEffect !== "move") {
        this.vddlDropEffectWorkaround.dropEffect = event.ctrlKey ? "copy" : "move";
      }

      // Clean up
      this.stopDragover();
      return false;
    },
    handleDragleave(event) {
      this.$el.className = this.$el.className.replace("vddl-dragover", "").trim();
      setTimeout(() => {
        if (this.$el.className.indexOf("vddl-dragover") < 0) {
          this.placeholderNode.parentNode && this.placeholderNode.parentNode.removeChild(this.placeholderNode);
        }
      }, 100);
    },

    // Checks whether the mouse pointer is in the first half of the given target element.
    isMouseInFirstHalf(event, targetNode, relativeToParent) {
      var mousePointer = this.horizontal ? (event.offsetX || event.layerX)
                                    : (event.offsetY || event.layerY);
      var targetSize = this.horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
      var targetPosition = this.horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
      targetPosition = relativeToParent ? targetPosition : 0;
      return mousePointer < targetPosition + targetSize / 2;
    },

    /**
     * Tries to find a child element that has the 'vddl-placeholder' class set. If none was found, a
     * new div element is created.
     */
    getPlaceholderElement() {
      var placeholder,
          oldPlaceholder = this.$el.parentNode.querySelectorAll('.vddl-placeholder');
      if (oldPlaceholder.length > 0) {
        placeholder = oldPlaceholder[0];
        return placeholder;
      }
      var newPlaceholder = document.createElement('div');
      newPlaceholder.setAttribute('class', 'vddl-placeholder');
      return newPlaceholder;
    },

    getPlaceholderIndex() {
      return Array.prototype.indexOf.call(this.listNode.children, this.placeholderNode);
    },

    /**
     * Checks various conditions that must be fulfilled for a drop to be allowed
     */
    isDropAllowed(event) {
      // Disallow drop from external source unless it's allowed explicitly.
      if (!this.vddlDragTypeWorkaround.isDragging && !this.externalSources) return false;

      // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
      // support that.
      if (!this.hasTextMimetype(event.dataTransfer.types)) return false;

      // Now check the allowed-types against the type of the incoming element. For drops from
      // external sources we don't know the type, so it will need to be checked via drop.
      if (this.allowedTypes && this.vddlDragTypeWorkaround.isDragging) {
        var allowed = this.allowedTypes;
        if (Array.isArray(allowed) && allowed.indexOf(this.vddlDragTypeWorkaround.dragType) === -1) {
          return false;
        }
      }

      // Check whether droping is disabled completely
      if (this.disableIf) return false;

      return true;
    },

    /**
     * Small helper function that cleans up if we aborted a drop.
     */
    stopDragover() {
      this.placeholderNode.parentNode && this.placeholderNode.parentNode.removeChild(this.placeholderNode);
      this.$el.className = this.$el.className.replace("vddl-dragover", "").trim();
      return true;
    },

    /**
     * Invokes a callback with some interesting parameters and returns the callbacks return value.
     */
    invokeCallback(expression, event, index, item) {
      var fn = this[expression];
      if (fn) {
        fn({
          event: event,
          index: index,
          item: item || undefined,
          list: this.list,
          external: !this.vddlDragTypeWorkaround.isDragging,
          type: this.vddlDragTypeWorkaround.isDragging ? this.vddlDragTypeWorkaround.dragType : undefined
        });
      }
      return fn ? true : false;
    },

    /**
     * Check if the dataTransfer object contains a drag type that we can handle. In old versions
     * of IE the types collection will not even be there, so we just assume a drop is possible.
     */
    hasTextMimetype(types) {
      if (!types) return true;
        for (var i = 0; i < types.length; i += 1) {
          if (types[i] === "Text" || types[i] === "text/plain") return true;
        }

      return false;
    },
    init() {
      this.placeholderNode = this.getPlaceholderElement();
      this.listNode = this.$el;
      this.placeholderNode.parentNode && this.placeholderNode.parentNode.removeChild(this.placeholderNode);
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

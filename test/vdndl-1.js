/*!
 * Vue-drag-and-drop-list.js v1.0.0
 * (c) 2017 Hejx
 * Released under the MIT License.
 * https://github.com/hejianxian/vue-drag-and-drop-list#readme
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.DragAndDropList = factory());
}(this, (function () { 'use strict';

var DragAndDropList = {};

DragAndDropList.install = function(Vue) {
  // save status
  var dndDropEffectWorkaround = {}, dndDragTypeWorkaround = {};

  Vue.directive('dnd-draggable', {
    params: ['dnd-draggable', 'dnd-effect-allowed', 'dnd-type', 'dnd-dragstart', 'dnd-selected', 'dnd-dragend', 'dnd-disable-if', 'dnd-moved', 'dnd-copied', 'dnd-canceled', 'dnd-data', 'dnd-index'],
    // css: dragging, draggingSource
    paramWatchers: {
      dndDisableIf: function (val, oldVal) {
        this.el.setAttribute('draggable', !val);
      }
    },
    bind: function () {

      this.handleDragstart = function (event) {
        event = event.originalEvent || event;

        var dndDraggable = JSON.stringify(this.params.dndDraggable);
        // Check whether the element is draggable, since dragstart might be triggered on a child.
        if (dndDraggable == 'false' || this.params.dndDisableIf) return true;

        // Serialize the data associated with this element. IE only supports the Text drag type
        event.dataTransfer.setData("Text", dndDraggable);

        // Only allow actions specified in dnd-effect-allowed attribute
        event.dataTransfer.effectAllowed = this.params.dndEffectAllowed || "move";

        // Add CSS classes. IE9 not support 'classList'
        this.el.className = this.el.className.trim() + " dndDragging";
        setTimeout(function() { this.el.className = this.el.className.trim() + " dndDraggingSource"; }.bind(this), 0);

        // Workarounds for stupid browsers, see description below
        dndDropEffectWorkaround.dropEffect = "none";
        dndDragTypeWorkaround.isDragging = true;

        // Save type of item in global state. Usually, this would go into the dataTransfer
        // typename, but we have to use "Text" there to support IE
        dndDragTypeWorkaround.dragType = this.params.dndType || undefined;

        // Try setting a proper drag image if triggered on a dnd-handle (won't work in IE).
        if (event._dndHandle && event.dataTransfer.setDragImage) {
          event.dataTransfer.setDragImage(this.el, event._dndHandleLeft, event._dndHandleTop);
        }

        // Invoke callback
        if (typeof(this.vm[this.params.dndDragstart]) === 'function') {
          this.vm[this.params.dndDragstart].call(this, event.target);
        }

        event.stopPropagation();
      }.bind(this);

      this.handleDragend = function (event) {
        event = event.originalEvent || event;

        var dropEffect = dndDropEffectWorkaround.dropEffect;
        switch (dropEffect) {
          case "move":
            if (typeof(this.vm[this.params.dndMoved]) === 'function') {
              this.vm[this.params.dndMoved].call(this, this.params.dndData, this.params.dndIndex, event.target);
            } else {
              this.params.dndData.splice(this.params.dndIndex, 1);
            }
            break;
          case "copy":
            if (typeof(this.vm[this.params.dndCopied]) === 'function') {
              this.vm[this.params.dndCopied].call(this, this.params.dndDraggable, event.target);
            }
            break;
          case "none":
            if (typeof(this.vm[this.params.dndCanceled]) === 'function') {
              this.vm[this.params.dndCanceled].call(this, event.target);
            }
            break;
        }
        if (typeof(this.vm[this.params.dndDragend]) === 'function') {
          this.vm[this.params.dndDragend].call(this, dropEffect, event.target);
        }

        // Clean up
        this.el.className = this.el.className.replace("dndDragging", "").trim();
        var _el = this.el;
        setTimeout(function(){
          // here this.el will be null
          _el.className = _el.className.replace("dndDraggingSource", "").trim();
        }, 0);
        dndDragTypeWorkaround.isDragging = false;
        event.stopPropagation();
      }.bind(this);

      this.handleClick = function (event) {
        if (!this.params.dndSelected) return;

        event = event.originalEvent || event;
        if (typeof(this.vm[this.params.dndSelected]) === 'function') {
          this.vm[this.params.dndSelected].call(this, this.params.dndData[this.params.dndIndex], event.target);
        }
        event.stopPropagation();
      }.bind(this);

      /**
       * Workaround to make element draggable in IE9
       * http://stackoverflow.com/questions/5500615/internet-explorer-9-drag-and-drop-dnd
       */
      this.handleSelected = function () {
        if (this.dragDrop) this.dragDrop();
        return false;
      }

      var status = true;
      if (this.params.dndDisableIf) status = false;
      this.el.setAttribute('draggable', status);
      this.el.addEventListener('dragstart', this.handleDragstart, false);
      this.el.addEventListener('dragend', this.handleDragend, false);
      this.el.addEventListener('click', this.handleClick, false);
      this.el.addEventListener('selectstart', this.handleSelected, false);
    },
    update: function (newValue, oldValue) {},
    unbind: function () {
      this.el.removeEventListener('dragstart', this.handleDragstart, false);
      this.el.removeEventListener('dragend', this.handleDragend, false);
      this.el.removeEventListener('click', this.handleClick, false);
      this.el.removeEventListener('selectstart', this.handleSelected, false);
    }
  });

  Vue.directive('dnd-list', {
    params: ['dnd-list', 'dnd-allowed-types', 'dnd-disable-if', 'dnd-horizontal-list', 'dnd-external-sources', 'dnd-inserted', 'dnd-drop'],
    // css: placeholder, dragover
    bind: function () {

      var placeholderNode = getPlaceholderElement.call(this);
      var listNode = this.el;
      placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);

      var horizontal = this.params.dndHorizontalList;
      var externalSources = this.params.dndExternalSources;

      this.handleDragenter = function (event) {
        event = event.originalEvent || event;
        if (!isDropAllowed.call(this, event)) return true;
        event.preventDefault();
      }.bind(this);

      this.handleDragover = function (event) {

        event = event.originalEvent || event;

        if (!isDropAllowed.call(this, event)) return true;

        if (placeholderNode.parentNode != listNode) {
          listNode.appendChild(placeholderNode);
        }

        if (event.target !== listNode) {
          // Try to find the node direct directly below the list node.
          var listItemNode = event.target;
          while (listItemNode.parentNode !== listNode && listItemNode.parentNode) {
            listItemNode = listItemNode.parentNode;
          }
          if (listItemNode.parentNode === listNode && listItemNode !== placeholderNode) {
            // If the mouse pointer is in the upper half of the child element,
            // we place it before the child element, otherwise below it.
            if (isMouseInFirstHalf(event, listItemNode)) {
              listNode.insertBefore(placeholderNode, listItemNode);
            } else {
              listNode.insertBefore(placeholderNode, listItemNode.nextSibling);
            }
          }
        } else {
          // This branch is reached when we are dragging directly over the list element.
          // Usually we wouldn't need to do anything here, but the IE does not fire it's
          // events for the child element, only for the list directly. Therefore, we repeat
          // the positioning algorithm for IE here.
          if (isMouseInFirstHalf(event, placeholderNode, true)) {
            // Check if we should move the placeholder element one spot towards the top.
            // Note that display none elements will have offsetTop and offsetHeight set to
            // zero, therefore we need a special check for them.
            while (placeholderNode.previousElementSibling
                 && (isMouseInFirstHalf(event, placeholderNode.previousElementSibling, true)
                 || placeholderNode.previousElementSibling.offsetHeight === 0)) {
              listNode.insertBefore(placeholderNode, placeholderNode.previousElementSibling);
            }
          } else {
            // Check if we should move the placeholder element one spot towards the bottom
            while (placeholderNode.nextElementSibling &&
                 !isMouseInFirstHalf(event, placeholderNode.nextElementSibling, true)) {
              listNode.insertBefore(placeholderNode,
                  placeholderNode.nextElementSibling.nextElementSibling);
            }
          }
        }

        // At this point we invoke the callback, which still can disallow the drop.
        // We can't do this earlier because we want to pass the index of the placeholder.
        if (this.params.dndDragover && !invokeCallback.call(this, 'dndDragover', event, getPlaceholderIndex())) {
          return stopDragover.call(this, event);
        }

        if (this.el.className.indexOf("dndDragover") < 0) this.el.className = this.el.className.trim() + " dndDragover";

        event.preventDefault();
        event.stopPropagation();
        return false;
      }.bind(this);

      this.handleDrop = function (event) {
        event = event.originalEvent || event;

        if (!isDropAllowed.call(this, event)) return true;

        // The default behavior in Firefox is to interpret the dropped element as URL and
        // forward to it. We want to prevent that even if our drop is aborted.
        event.preventDefault();

        // Unserialize the data that was serialized in dragstart. According to the HTML5 specs,
        // the "Text" drag type will be converted to text/plain, but IE does not do that.
        var data = event.dataTransfer.getData("Text") || event.dataTransfer.getData("text/plain");
        var transferredObject;
        try {
          transferredObject = JSON.parse(data);
        } catch(e) {
          return stopDragover.call(this);
        }

        // Invoke the callback, which can transform the transferredObject and even abort the drop.
        var index = getPlaceholderIndex();
        if (this.params.dndDrop) {
          transferredObject = invokeCallback.call(this, 'dndDrop', event, index, transferredObject);
          if (!transferredObject) {
            return stopDragover.call(this);
          }
        }

        // Insert the object into the array, unless dnd-drop took care of that (returned true).
        if (transferredObject !== true) {
          this.params.dndList.splice(index, 0, transferredObject);
        }
        invokeCallback.call(this, 'dndInserted', event, index, transferredObject);

        // In Chrome on Windows the dropEffect will always be none...
        // We have to determine the actual effect manually from the allowed effects
        if (event.dataTransfer.dropEffect === "none") {
          if (event.dataTransfer.effectAllowed === "copy" ||
              event.dataTransfer.effectAllowed === "move") {
            dndDropEffectWorkaround.dropEffect = event.dataTransfer.effectAllowed;
          } else {
            dndDropEffectWorkaround.dropEffect = event.ctrlKey ? "copy" : "move";
          }
        } else {
          dndDropEffectWorkaround.dropEffect = event.dataTransfer.dropEffect;
        }

        // Clean up
        stopDragover.call(this);
        event.stopPropagation();
        return false;
      }.bind(this);

      // drag leave
      this.handleDragleave = function (event) {
        event = event.originalEvent || event;
        this.el.className = this.el.className.replace("dndDragover", "").trim();
        setTimeout(function() {
          if (this.el.className.indexOf("dndDragover") < 0) {
            placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);
          }
        }.bind(this), 100);
      }.bind(this);

      // bind events
      this.el.addEventListener('dragenter', this.handleDragenter, false);
      this.el.addEventListener('dragover', this.handleDragover, false);
      this.el.addEventListener('drop', this.handleDrop, false);
      this.el.addEventListener('dragleave', this.handleDragleave, false);

      // Checks whether the mouse pointer is in the first half of the given target element.
      function isMouseInFirstHalf(event, targetNode, relativeToParent) {
        var mousePointer = horizontal ? (event.offsetX || event.layerX)
                                      : (event.offsetY || event.layerY);
        var targetSize = horizontal ? targetNode.offsetWidth : targetNode.offsetHeight;
        var targetPosition = horizontal ? targetNode.offsetLeft : targetNode.offsetTop;
        targetPosition = relativeToParent ? targetPosition : 0;
        return mousePointer < targetPosition + targetSize / 2;
      };

      /**
       * Tries to find a child element that has the dndPlaceholder class set. If none was found, a
       * new li element is created.
       */
      function getPlaceholderElement() {
        var placeholder,
            oldLi = this.el.parentNode.querySelectorAll('.dndPlaceholder');
        if (oldLi.length > 0) {
          placeholder = oldLi[0];
          return placeholder;
        }
        var newLi = document.createElement('li');
        newLi.setAttribute('class', 'dndPlaceholder');
        return newLi;
      };

      function getPlaceholderIndex() {
        return Array.prototype.indexOf.call(listNode.children, placeholderNode);
      };

      /**
       * Checks various conditions that must be fulfilled for a drop to be allowed
       */
      function isDropAllowed(event) {
        // Disallow drop from external source unless it's allowed explicitly.
        if (!dndDragTypeWorkaround.isDragging && !externalSources) return false;

        // Check mimetype. Usually we would use a custom drag type instead of Text, but IE doesn't
        // support that.
        if (!hasTextMimetype(event.dataTransfer.types)) return false;

        // Now check the dnd-allowed-types against the type of the incoming element. For drops from
        // external sources we don't know the type, so it will need to be checked via dnd-drop.
        if (this.params.dndAllowedTypes && dndDragTypeWorkaround.isDragging) {
          var allowed = this.params.dndAllowedTypes;
          if (Array.isArray(allowed) && allowed.indexOf(dndDragTypeWorkaround.dragType) === -1) {
            return false;
          }
        }

        // Check whether droping is disabled completely
        if (this.params.dndDisableIf) return false;

        return true;
      }

      /**
       * Small helper function that cleans up if we aborted a drop.
       */
      function stopDragover() {
        placeholderNode.parentNode && placeholderNode.parentNode.removeChild(placeholderNode);
        this.el.className = this.el.className.replace("dndDragover", "").trim();
        return true;
      }

      /**
       * Invokes a callback with some interesting parameters and returns the callbacks return value.
       */
      function invokeCallback(expression, event, index, item) {
        return this.params[expression] && this.vm[this.params[expression]]({
          event: event,
          index: index,
          item: item || undefined,
          external: !dndDragTypeWorkaround.isDragging,
          type: dndDragTypeWorkaround.isDragging ? dndDragTypeWorkaround.dragType : undefined
        });
      }

      /**
       * Check if the dataTransfer object contains a drag type that we can handle. In old versions
       * of IE the types collection will not even be there, so we just assume a drop is possible.
       */
      function hasTextMimetype(types) {
        if (!types) return true;
        for (var i = 0; i < types.length; i++) {
          if (types[i] === "Text" || types[i] === "text/plain") return true;
        }

        return false;
      }

    },
    update: function (newValue, oldValue) {},
    unbind: function () {
      this.el.removeEventListener('dragenter', this.handleDragenter, false);
      this.el.removeEventListener('dragover', this.handleDragover, false);
      this.el.removeEventListener('drop', this.handleDrop, false);
      this.el.removeEventListener('dragleave', this.handleDragleave, false);
    }
  });

  Vue.directive('dnd-nodrag', {
    bind: function () {

      this.handleDragstart = function (event) {
        event = event.originalEvent || event;

        if (!event._dndHandle) {
          // If a child element already reacted to dragstart and set a dataTransfer object, we will
          // allow that. For example, this is the case for user selections inside of input elements.
          if (!(event.dataTransfer.types && event.dataTransfer.types.length)) {
            event.preventDefault();
          }
          event.stopPropagation();
        }
      }.bind(this);

      this.handleDragend = function (event) {
        event = event.originalEvent || event;
        if (!event._dndHandle) {
          event.stopPropagation();
        }
      }.bind(this);

      this.el.setAttribute('draggable', true);
      this.el.addEventListener('dragstart', this.handleDragstart, false);
      this.el.addEventListener('dragend', this.handleDragend, false);
    },
    update: function (newValue, oldValue) {},
    unbind: function () {
      this.el.removeEventListener('dragstart', this.handleDragstart, false);
      this.el.removeEventListener('dragend', this.handleDragend, false);
    }
  });

  Vue.directive('dnd-handle', {
    params: ['dnd-handle-left', 'dnd-handle-top'],
    bind: function () {

      this.handle = function(event){
        event = event.originalEvent || event;
        event._dndHandle = true;
        event._dndHandleLeft = this.params.dndHandleLeft || 0;
        event._dndHandleTop = this.params.dndHandleTop || 0;
      }.bind(this);

      this.el.setAttribute('draggable', true);
      this.el.addEventListener('dragstart', this.handle, false);
      this.el.addEventListener('dragend', this.handle, false);
    },
    update: function (newValue, oldValue) {},
    unbind: function () {
      this.el.removeEventListener('dragstart', this.handle, false);
      this.el.removeEventListener('dragend', this.handle, false);
    }
  });

};

return DragAndDropList;

})));

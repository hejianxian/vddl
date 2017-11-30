import Draggable from './components/vddl-draggable.vue';
import List from './components/vddl-list.vue';
import Handle from './components/vddl-handle.vue';
import Nodrag from './components/vddl-nodrag.vue';
import Placeholder from './components/vddl-placeholder.vue';

const install = (Vue) => {
  /* eslint no-param-reassign: 0 */
  Vue.prototype.vddlDropEffectWorkaround = {};
  Vue.prototype.vddlDragTypeWorkaround = {};

  Vue.component(Draggable.name, Draggable);
  Vue.component(List.name, List);
  Vue.component(Handle.name, Handle);
  Vue.component(Nodrag.name, Nodrag);
  Vue.component(Placeholder.name, Placeholder);
};

/* eslint no-undef:0 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };


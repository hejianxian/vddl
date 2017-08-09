import each from 'lodash/each';
import components from './main';

export default {
  install(Vue) {
    /* eslint no-param-reassign: 0 */
    Vue.prototype.vddlDropEffectWorkaround = {};
    Vue.prototype.vddlDragTypeWorkaround = {};

    each(components, (component) => {
      /* eslint no-undef: 0 */
      Vue.component(component.name, component);
    });
  },
};

import each from 'lodash/each';
import components from './main';

each(components, (component, name) => {
  /* eslint no-undef: 0 */
  Vue.component(name, component);
});

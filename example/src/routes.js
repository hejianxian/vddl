import Simple from './views/simple.vue';
import ItemTypes from './views/itemTypes.vue';
import Handle from './views/handle.vue';
import Horizontal from './views/horizontal.vue';
import Nested from './views/nested.vue';

const routes = [
  { path: '/', redirect: { name: 'nested' }},
  { name: 'nested', path: '/nested', component: Nested },
  { name: 'horizontal', path: '/horizontal', component: Horizontal },
  { name: 'handle', path: '/handle', component: Handle },
  { name: 'item-types', path: '/item-types', component: ItemTypes },
  { name: 'simple', path: '/simple', component: Simple },
];

export default routes;

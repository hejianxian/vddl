import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Vddl from '../../'
import routes from './routes.js'
import store from './store'

import vTitle from './components/title.vue'

Vue.use(Vddl)
Vue.use(VueRouter)

Vue.component(vTitle.name, vTitle);

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

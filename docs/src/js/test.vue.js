import 'test/vue.scss'

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'

import App from './App.vue'
import { state, mutations } from './mutations'
import routes from './routes'

Vue.use(Vuex)
Vue.use(VueRouter)

const store = new Vuex.Store({
  state,
  mutations
})

const router = new VueRouter({
  routes
})

sync(store, router)

module.exports = new Vue({
  el: '#vue',
  store,
  router,
  render: h => h(App)
})

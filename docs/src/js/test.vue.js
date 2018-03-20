import 'test/vue.scss'

import Vue from 'vue'

import App from './App.vue'

const vueApp = new Vue({
  el: '#vue',
  template: '<App/>',
  components: {
    App
  }
})

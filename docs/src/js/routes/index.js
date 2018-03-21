import Home from 'Home.vue'

const About = () => import(/* webpackChunkName: "vue-about" */'About.vue')

export default [
  { path: '/', component: Home },
  { path: '/about', component: About }
]

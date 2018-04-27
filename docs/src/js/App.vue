<template>
  <div>
    <Header/>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>

    <hr>
    <router-view/>
    <hr>
    <Static/>
  </div>
</template>

<script>
import Header from 'Header.vue'

const Static = () => import(/* webpackChunkName: "vue-static" */'Static.vue')

export default {
  components: { Header, Static }
}
</script>

<style lang="scss" scoped>
.app {
    color: #333;
}
</style>

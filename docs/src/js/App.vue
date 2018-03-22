<template>
  <div>
    <Header/>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
    </ul>

    <hr>
    <router-view/>
  </div>
</template>

<script>
import Header from 'Header.vue'

export default {
  components: { Header }
}
</script>

<style lang="scss" scoped>
.app {
    color: #333;
}
</style>

<template>
  <h2
    class="hello"
    @click="changeName({name})"
  >
    Hello, {{ name }} !
  </h2>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    name () {
      return this.$store.state.name
    }
  },
  methods: mapMutations([
    'changeName'
  ])
}
</script>

<style lang="scss" scoped>
.hello {
  color: #333;
}
</style>

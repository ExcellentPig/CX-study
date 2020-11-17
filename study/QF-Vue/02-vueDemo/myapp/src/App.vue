<template>
  <div id="app">
    <tabbar></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
export default {
  name: 'App',
  components: {
    Tabbar
  }
}

</script>

<style lang="scss">

</style>

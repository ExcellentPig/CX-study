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
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
li {
  list-style: none;
}
</style>

<template>
  <div id="app">
    <tabbar v-show="isTabbarShow"></tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar.vue'
import { mapState } from 'vuex'
// import bus from './bus/index.js'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  // computed: {
  //   isShow () {
  //     // return this.$store.state.isTabbarShow
  //   }
  // },
  // computed: mapState(['isTabbarShow']),
  computed: {
    ...mapState(['isTabbarShow'])
  },
  components: {
    Tabbar
  }
  // beforeMount () {
  //   bus.$on('maizuo', (data) => {
  //     // console.log('bus maizuo', data)
  //     this.isShow = data
  //   })
  // }
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

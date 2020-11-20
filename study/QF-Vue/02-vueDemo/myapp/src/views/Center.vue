<template>
  <div class="center">
    <v-touch @swipeleft="onSwipeLeft">
      <div style="background: red; height: 100px;">center</div>
    </v-touch>
    <mt-swipe :auto="4000">
      <mt-swipe-item>1</mt-swipe-item>
      <mt-swipe-item>2</mt-swipe-item>
      <mt-swipe-item>3</mt-swipe-item>
    </mt-swipe>
    <el-button type="danger" :loading="true">按钮</el-button>
    <mt-badge size="small">30</mt-badge>
    <mt-badge size="normal">10</mt-badge>
    <mt-badge size="large">10</mt-badge>
  </div>
</template>

<script>
import Vue from 'vue'
var VueTouch = require('vue-touch')
Vue.use(VueTouch, { name: 'v-touch' })
export default {
  beforeRouteEnter (to, from, next) {
    // 没有this 没有组件实例 没被创建
    // const a = false
    // if (a) {
    //   next()
    // } else {
    //   next('/login')
    next()
  },
  methods: {
    onSwipeLeft () {
      console.log('left')
    }
  }
}
</script>

<style>
.mint-swipe {
  height: 200px;
}
</style>

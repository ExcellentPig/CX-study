<template>
  <div class="center">
    <el-button type="danger" :loading="true">按钮</el-button>
    <mt-badge size="small">30</mt-badge>
    <mt-badge size="normal">10</mt-badge>
    <mt-badge size="large">10</mt-badge>
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // 没有this 没有组件实例 没被创建
    // const a = false
    // if (a) {
    //   next()
    // } else {
    //   next('/login')
    next()
  }
}
</script>

<style>
</style>

<template>
  <div class="center">
    center
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // 没有this 没有组件实例 没被创建
    const a = false
    if (a) {
      next()
    } else {
      next('/login')
    }
  }
}
</script>

<style>
</style>

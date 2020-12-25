<template>
  <div>
  	<h2>register</h2>
    <el-button type="primary">按钮</el-button>
    
  </div>
</template>

<script>
export default {
  beforeRouteLeave(to, from, next) {
    let bl = window.confirm('是否离开')
    next(bl)
  },
  head() {
    return this.$seo('reg', 'reg component', [{}])
  }
}
</script>

<style>
</style>

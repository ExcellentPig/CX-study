<template>
  <div>
    <h3>详情页</h3>
  </div>
</template>

<script>
  export default {
    name: 'goods-detail',
    validate({ params, query }) {
      return typeof params.id === 'number'
    },
    // 约定组件内部动画名称
    transition: 'test'
  }
</script>

<style scoped="scoped">
  /* 写到其他文件 */
/* .test-enter-active,
.test-leave-active {
  transition: .5s ease all;
}
.test-enter,
.test-leave {
  margin-left: -1000px;
} */
</style>

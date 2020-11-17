<template>
  <div>
    detail--- {{ id }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: ''
    }
  },
  mounted () {
    console.log(this.$route)
    this.id = this.$route.params.id
  }
}
</script>

<style>
</style>

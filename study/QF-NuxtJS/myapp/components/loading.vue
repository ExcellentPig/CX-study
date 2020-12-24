<template>
  <div v-if="loading">
    loading...
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false
      }
    },
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
  }
</script>

<style>
</style>

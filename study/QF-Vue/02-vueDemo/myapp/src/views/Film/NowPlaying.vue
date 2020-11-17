<template>
  <div>
    nowplaying
    <ul>
    <li v-for="(data,index) in datalist" :key="index" @click="handleChangePage(index)">
        {{ data }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      datalist: [1, 2, 3, 4, 5, 6, 7, 8]
    }
  },
  methods: {
    handleChangePage (index) {
      console.log(index)
      // 编程式导航
      // this.$router.push(`/detail/${index}`)
      this.$router.push({ name: 'Detail', params: { id: index } })
    }
  }
}
</script>

<style>
</style>

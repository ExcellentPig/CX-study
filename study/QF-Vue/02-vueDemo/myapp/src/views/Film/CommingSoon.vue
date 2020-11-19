<template>
  <div>
    <ul>
    <li
     v-for="data in $store.getters.comingListGetter"
     :key="data.filmId"
     @click="handleChangePage(data.filmId)"
     >
        <img :src="data.poster" />
        <h3>{{ data.name }}</h3>
        <p>观众评分: {{ data.grade }}</p>
        <p>主演: {{ data.actors | actorsFilter }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.filter('actorsFilter', (data) => {
  // console.log(data)
  var newlist = data.map(item => item.name).join(' ')
  return newlist
})
export default {
  mounted () {
    if (this.$store.state.comingList.length === 0) {
      this.$store.dispatch('getComingListAction')
    } else {
      console.log('使用缓存数据')
    }
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      // 编程式导航
      // this.$router.push(`/detail/${index}`)
      this.$router.push({ name: 'Detail', params: { id: id } })
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  li {
    padding: 10px;
    overflow: hidden;
    img {
      float: left;
      width: 100px;
    }
  }
}
</style>

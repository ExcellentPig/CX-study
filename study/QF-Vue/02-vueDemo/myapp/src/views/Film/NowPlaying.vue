<template>
  <div>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="0"
     >
    <li
     v-for="data in datalist"
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
  data () {
    return {
      datalist: [],
      loading: false,
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.$axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4271989',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },
  beforeDestroy () {
    window.onscroll = null
  },
  methods: {
    handleChangePage (id) {
      // console.log(id)
      // 编程式导航
      // this.$router.push(`/detail/${index}`)
      this.$router.push({ name: 'Detail', params: { id: id } })
    },
    loadMore () {
      console.log('到底了')
      this.loading = true
      this.current++
      console.log(this.total)
      if (this.datalist.length === this.total) {
        this.isShow = false
        return
      }
      this.$axios({
        url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${this.current}&pageSize=10&type=1&k=4271989`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data)
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
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

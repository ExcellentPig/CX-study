<template>
  <div>
    nowplaying
    <ul>
    	<li v-for="data in datalist" :key="data.filmId" @click="handleClick(data.filmId)">
        <p>{{ data.name }}</p>
        <img :src="data.poster" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  asyncData (data) {
    console.log(data)
   return axios({
      url:"https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=6341699",
      headers:{
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data)
      return {
        datalist: res.data.data.films
      }
    })
  },
  methods: {
    handleClick (id) {
      this.$router.push(`/detail/${ id }`)
    }
  }
}
</script>

<style>
</style>

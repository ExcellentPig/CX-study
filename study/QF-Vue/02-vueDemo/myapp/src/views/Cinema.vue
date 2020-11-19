<template>
  <div class="cinema" :style="mystyle">
    <ul>
    <li v-for="data in datalist" :key="data.cinemaId">
        {{ data.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      datalist: [],
      mystyle: {
        height: '0px'
      }
    }
  },
  mounted () {
    // console.log(document.documentElement.clientHeight)
    this.mystyle.height = document.documentElement.clientHeight - 70 + 'px'
    // console.log(this.mystyle)
    this.$axios({
      url: 'https://m.maizuo.com/gateway?cityId=110100&ticketFlag=1&k=4595405',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      // console.log(res.data)
      this.datalist = res.data.data.cinemas
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new BScroll('.cinema')
      })
    })
  }
}
</script>

<style scoped="scoped" lang="scss">
li {
  height: 50px;
}
.cinema {
  overflow: hidden;
  position: relative;
}
</style>

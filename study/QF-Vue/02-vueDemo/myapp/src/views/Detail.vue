<template>
  <div v-if="filmnfo">
    <img :src="filmnfo.poster" class="poster" />
    <h2>{{ filmnfo.name }}</h2>
    <h3>演职人员</h3>
    <detail-swiper perview="4" myclassname="actorswiper">
      <div class="swiper-slide" v-for="data in filmnfo.actors" :key="data.name">
        <img class="swiper-img" :src="data.avatarAddress" />
        <p>{{ data.name }}</p>
      </div>
    </detail-swiper>
    <h3>导演</h3>
    <detail-swiper perview="3" myclassname="photoswiper">
      <div class="swiper-slide" v-for="(data,index) in filmnfo.photos" :key="index">
        <img class="swiper-img" :src="data" />
      </div>
    </detail-swiper>
  </div>
</template>

<script>
import DetailSwiper from './Detail/DetailSwiper.vue'
// import bus from '../bus/index.js'
export default {
  data () {
    return {
      filmnfo: null
    }
  },
  components: {
    DetailSwiper
  },
  beforeMount () {
    // bus.$emit('maizuo', false)
    // this.$store.state.isTabbarShow = false
    this.$store.commit('hideMaiZuoTbbar', false)
  },
  mounted () {
    // console.log(this.$route)
    this.id = this.$route.params.id
    this.$axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=4649637`,
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      // console.log(res)
      this.filmnfo = res.data.data.film
    })
  },
  beforeDestroy () {
    // bus.$emit('maizuo', true)
    // this.$store.state.isTabbarShow = true
    this.$store.commit('showMaiZuoTbbar', true)
  }
}
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 200px;
}
.swiper-slide {
  width: 50px;
  padding: 10px;
}
</style>

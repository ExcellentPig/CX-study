<template>
  <div class="film">
    <swiper :key="imglist.length" ref="myswiper">
      <div class="swiper-slide" v-for="(item,index) in imglist" :key="index">
        <img :src="item" />
      </div>
    </swiper>
    <film-header :class="isFixed?'fixed':''"></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import Swiper from './Film/Swiper.vue'
import FilmHeader from '@/views/Film/FilmHeader'
export default {
  components: {
    Swiper,
    FilmHeader
  },
  data () {
    return {
      imglist: [
        'https://pic.maizuo.com/usr/movie/0b4e01c33b555e533cf8aca71b67df1a.jpg',
        'https://pic.maizuo.com/usr/movie/7d0d896dbc7d3e40dd548405d50073f0.jpg',
        'https://pic.maizuo.com/usr/movie/7d0d896dbc7d3e40dd548405d50073f0.jpg'
      ],
      isFixed: false
    }
  },
  mounted () {
    this.$axios({
      url: 'https://m.maizuo.com/gateway?type=2&cityId=110100&k=5553387',
      headers: {
        'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        'X-Host': 'mall.cfg.common-banner'
      }
    }).then(res => {
      // console.log(res)
    })
    window.onscroll = this.handleScroll
  },
  methods: {
    handleScroll () {
      // console.log(this.$refs.myswiper.$el.offsetHeight)
      var height = this.$refs.myswiper.$el.offsetHeight
      if (document.documentElement.scrollTop >= height) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  }
}
</script>

<style>
</style>

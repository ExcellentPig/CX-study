<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMappage">{{ cityName }}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <div class="swiper">
      <swiper
       class="swiper-container"
       indicator-dots="true"
       autoplay="true"
       interval="3000"
       circular="true"
       duration="500"
       >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="channel">
      <div v-for="(item, index) in channel" :key="index">
        <img :src="item.icon_url" :alt="item.name" @click="categoryList(item.id)">
        <p>{{ item.name }}</p>
      </div>
    </div>
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商之自供
      </div>
      <div class="content">
        <div v-for="(item, index) in brandList" :key="index" @click="branddetail(item.id)">
          <div>
            <p>{{ item.name }}</p>
            <p>{{ item.floor_price }}元起</p>
          </div>
          <img :src="item.new_pic_url" :alt="item.name">
        </div>
      </div>
    </div>
    <div class="newgoods">
      <div class="newgoods-top">
        <div class="top" @click="goodsList('new')">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
        	<scroll-view
           class="scroll-view"
           :scroll-x="true">
            <li v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" :alt="item.name">
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>￥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newgoods hotgoods">
      <div class="newgoods-top">
        <div class="top" @click="goodsList('hot')">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
        	<scroll-view
           class="scroll-view"
           :scroll-x="true">
            <li v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" :alt="item.name">
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>￥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import amapFile from '@/utils/amap-wx.js'
import { mapState, mapMutations } from 'vuex'
import { get } from '@/utils'
export default {
  data () {
    return {
      banner: [],
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: []
    }
  },
  computed: {
    ...mapState(['cityName'])
  },
  mounted () { // mpvue 中尽量不要把请求方法放在created中
    this.getData()
    this.getCityName() // 一开始 就进行定位
  },
  methods: {
    ...mapMutations(['update']),
    toMappage () {
      // 通过 wx.getSetting 先查询一下用户是否授权 “scoped.record”
      let _this = this
      wx.getSetting({
        success: (res) => {
          // 如果没有同意授权，打开设置
          // console.log(res)
          if (!res.authSetting['scope.userLocation']) {
            wx.openSetting({
              success: res => {
                // 获取授权位置信息
                _this.getCityName()
              }
            })
          } else {
            // console.log('go')
            wx.navigateTo({
              url: '/pages/mappage/main',
              fail: (err) => {
                // console.log(err)
              },
            });
          }
        },
        fail: (err) => {
          // console.log(err)
        },
        complete: () => {}
      });
    },
    getCityName () {
      // console.log('getCityName')
      let _this = this
      var myAmapFun = new amapFile.AMapWX({key:'5d96e687e8f74c23a2335d70be795968'});
      // console.log('getCityName')
      myAmapFun.getRegeo({
        success: function (data) {
          // 成功回调
          // console.log(data,'-------')
        },
        fail: function (err) {
          // 失败的回调
          // console.log(err)
          // _this.cityName = '北京'
          // vuex中获取
          _this.update({cityName: '北京'})
        }
      })
    },
    async getData () {
      // 用小程序 引用接口的作法 没有用到 axios等
      const data = await get('/index/index')
      // console.log(data.banner)
      // console.log(data)
      this.banner = data.banner
      this.channel = data.channel
      this.brandList = data.brandList
      this.newGoods = data.newGoods
      this.hotGoods = data.hotGoods
    },
    categoryList (id) {
      // console.log(id)
      wx.navigateTo({
        url: `/pages/categorylist/main?id=${id}`
      })
    },
    tobrandList () {
      wx.navigateTo({
        url: '/pages/brandlist/main'
      })
    },
    branddetail (id) {
      wx.navigateTo({
        url: `/pages/branddetail/main?id=${id}`
      })
    },
    goodsList (info) {
      if (info === 'hot') {
        wx.navigateTo({
          url: '/pages/newgoods/main?isHot=' + 1
        })
      } else {
        wx.navigateTo({
          url: '/pages/newgoods/main?isNew=' + 1
        })
      }
    },
    toSearch () {
      wx.navigateTo({
        url: '/pages/search/main'
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "./style.less";
</style>

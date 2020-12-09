<template>
  <div class="mappage">
    <div class="section">
      <input
       type="text"
       placeholder="搜索"
       focus="true"
       v-model="keywords"
       @input="bindInput"
       >
    </div>
    <scroll-view :scroll-y="true" class="addcount" style="height: 500rpx">
      <div
       class="result"
       v-for="(item, index) in tips"
       :key="index"
       @touchstart="bindSearch(item.name)"
       >
        {{ item.name }}
      </div>
    </scroll-view>
    <div class="map_container">
      <div class="title">显示当前位置:</div>
      <map
        class="map"
        id="map"
        scale="16"
        :longitude="longitude"
        :latitude="latitude"
        :markers="markers"
        ></map>
    </div>
  </div>
</template>

<script>
import amapFile from '@/utils/amap-wx.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      tips: [],
      longitude: 0,
      latitude: 0,
      markers: [],
      keywords: ''
    }
  },
  mounted () {
    this.getMapaddress()
  },
  methods: {
    ...mapMutations(['update']),
    getMapaddress () {
      let _this = this
      var myAmapFunc = new amapFile.AMapWX({
        key:'5d96e687e8f74c23a2335d70be795968'
      })
      myAmapFunc.getRegeo({
        // 尝试之后 发现 需要iconPathSelected 然后后面也要传入marker之中
        iconPathSelected: "/static/images/marker.png",
        iconPath: "/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: function (data) {
          // console.log(data)
          let marker = [
            {
              id: data[0].id,
              longitude: data[0].longitude,
              latitude: data[0].latitude,
              width: data[0].width,
              height: data[0].height,
              iconPath: data[0].iconPath,
            }
          ]
          _this.markers = marker
          _this.longitude = data[0].longitude
          _this.latitude = data[0].latitude
        },
        fail: function (err) {
          console.log(err)
        }
      })
    },
    bindInput (e) {
     // console.log(e)
     let _this = this
     let keywords = _this.keywords
     var myAmapFunc = new amapFile.AMapWX({
       key:'5d96e687e8f74c23a2335d70be795968'
     })
     myAmapFunc.getInputtips({ // 搜索补全 地图 内容输入提示词
       keywords: keywords,
       location: '',
       success: function (data) {
         // console.log(data)
         if (data && data.tips) {
           _this.tips = data.tips
         }
       }
     })
    },
    bindSearch (cityName) {
      this.update({cityName: cityName})
      wx.navigateBack({
        delta: 1  // 1 代表返回上一个页面 2 上两个页面
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

<template>
  <div class="my">
    <div class="myinfo">
      <img :src="avator" :alt="userInfo.nickName">
      <div>
        <p>{{ userInfo.nickName }}</p>
        <p v-if="!userInfo.nickName">点击登录</p>
        <p v-else>微信用户</p>
      </div>
    </div>
    <div class="iconlist">
      <div @click="goTo(item.url)" v-for="(item, index) in listData" :key="index">
        <span class="iconfont" :class="item.icon"></span>
        <span>{{ item.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get, login, toLogin } from '@/utils'
export default {
  data () {
    return {
      listData: [ // 列表数据
        {
          title: "我的订单",
          icon: "icon-unie64a",
          url: ""
        },
        {
          title: "优惠券",
          icon: "icon-youhuiquan",
          url: ""
        },
        {
          title: "我的足迹",
          icon: "icon-zuji",
          url: ""
        },
        {
          title: "我的收藏",
          icon: "icon-shoucang",
          url: ""
        },
        {
          title: "地址管理",
          icon: "icon-dizhiguanli",
          url: "/pages/addressselect/main"
        },
        {
          title: "联系客服",
          icon: "icon-lianxikefu",
          url: ""
        },
        {
          title: "帮助中心",
          icon: "icon-bangzhuzhongxin",
          url: ""
        },
        {
          title: "意见反馈",
          icon: "icon-yijianfankui",
          url: ""
        }
      ],
      avator: 'http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png', // 默认头像
      allcheck: false,
      userInfo: {},
      Listids: [],
    }
  },
  onShow () {
    if (login()) {
      this.userInfo = login()
      // console.log(this.userInfo)
      this.avator = this.userInfo.avatarUrl
    }
  },
  methods: {
    goTo (url) { // 点击跳转到对应页面 页面路径在data中定义
     // console.log(url)
     if (!url) {
       return false
     }
     wx.navigateTo({
       url: url
     })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

<template>
  <div class="categoryList">
    <scroll-view
      scroll-x="true"
      class="head"
      :scroll-left="scrollLeft"
     >
      <div
       v-for="(item, index) in navData"
       :key="index" :class="[nowIndex === index ? 'active' : '']"
       @click="changeTab(index, item.id)"
       >
        {{ item.name }}
      </div>
    </scroll-view>
    <div class="info">
      <p>{{ currentNav.name }}</p>
      <p>{{ currentNav.front_name }}</p>
    </div>
    <div class="list" v-if="goodsList.length !== 0">
      <div class="item"
        v-for="(item, index) in goodsList"
        :key="index"
        @click="goodsDetail(item.id)"
        >
        <img :src="item.list_pic_url" :alt="item.name">
        <p class="name">{{ item.name }}</p>
        <div class="price">￥{{ item.retail_price }}</div>
      </div>
    </div>
    <div class="none" v-else>数据库暂无数据</div>
  </div>
</template>

<script>
import { get } from '@/utils'
export default {
  data () {
    return {
      navData: [], // 导航栏数据
      catogoryId:'', // 首页传过来的类别id
      currentNav: [], // 具体导航的内容
      nowIndex: 0, // 现在的下标 用于导航active
      goodsList: [], // 商品结合
      scrollLeft: 0 // 导航栏的位置
    }
  },
  mounted () {
    // 获取页面传递的参数 id
    this.categoryId = this.$root.$mp.query.id
    this.getAllData()
  },
  methods: {
    async getAllData () {
      const data = await get('/category/categpryNav',{ // 请求到导航栏数据
        id: this.categoryId
      })
      // console.log(data)
      this.navData = data.navData
      this.currentNav = data.currentNav
      for (let i=0;i<this.navData.length;i++) { // 处理active类名
        const id = this.navData[i].id
        if (id == this.currentNav.id) {
          this.nowIndex = i
        }
      }

      // 获取对应的商品
      const listData = await get('/goods/goodsList', {
        categoryId: this.categoryId
      })
      // console.log(listData)
      this.goodsList = listData.data
    },
    async changeTab (index, id) { // 点击导航切换
      this.nowIndex = index
      // console.log(id)
      const listData = await get('/goods/goodsList', {
        categoryId: id
      })
      // console.log(listData)
      this.goodsList = listData.data
      this.currentNav = listData.currentNav

      // 让导航看滚动到可视区域
      if (this.nowIndex > 4) {
        this.scrollLeft = this.nowIndex * 60
      } else {
        this.scrollLeft = 0
      }
    },
    goodsDetail(id) { // 根据id跳转到对应的详情页
      wx.navigateTo({
        url: `/pages/goods/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

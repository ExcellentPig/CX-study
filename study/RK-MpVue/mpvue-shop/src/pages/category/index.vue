<template>
  <div class="category">
    <div class="search" @click="toSearch">
      <div class="ser">
        <span class="icon"></span>
        <span>商品搜索，共239款好物</span>
      </div>
    </div>
    <div class="content">
      <scroll-view class="left" scroll-y="true">
        <div
          class="iconText"
          v-for="(item, index) in listData"
          :key="index"
          :class="[index === nowIndex ? 'active': '']"
          @click="selectItem(item.id, index)"
        >
          {{ item.name }}
        </div>
      </scroll-view>
      <scroll-view class="right" scroll-y="true">
        <div class="banner">
          <img :src="detailData.banner_url" :alt="detailData.name">
        </div>
        <div class="title">
          <span>-</span>
          <span>{{ detailData.name }}分类</span>
          <span>-</span>
        </div>
        <div class="bottom">
          <div
            class="item"
            v-for="(item, index) in detailData.subList"
            :key="index"
            @click="categoryList(item.id)"
           >
            <img :src="item.wap_banner_url" :alt="item.name">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils'
export default {
  data () {
    return {
      listData: [], // 菜单数据
      nowIndex: 0, // 当前选择的菜单的下标
      id: '1005000', // 菜单id
      detailData: {}, // 详细数据
    }
  },
  mounted () {
    this.getListData()
    this.selectItem(this.id, this.nowIndex) // 需要先执行一次
  },
  methods: {
    toSearch () { // 点击前往搜索界面
      wx.navigateTo({
        url: '/pages/search/main'
      })
    },
    async getListData () { // 获取分类数据
      const data = await get('/category/indexAction')
      // console.log(data)
      this.listData = data.categoryList
    },
    async selectItem (id, index) { // 获取对应菜单下面的数据
      this.nowIndex = index
      const data = await get('/category/currentAction', {
        id: id
      })
      // console.log(data)
      this.detailData = data.data.currentOne
    },
    categoryList (id) {
      // 跳转到商品详细
      wx.navigateTo({
        url: `/pages/categorylist/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import  './style.less';
</style>

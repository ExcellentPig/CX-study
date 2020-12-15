<template>
  <div class="topic">
    <div class="list">
      <li v-for="(item, index) in topicList" :key="index" @click="topicDetail(item.id)">
        <div class="t-img">
          <img :src="item.scene_pic_url" :alt="item.title">
        </div>
        <div class="info">
          <p>{{ item.title }}</p>
          <p>{{ item.subtitle }}</p>
          <p>{{ item.price_info }}元起</p>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils'
export default {
	data () {
		return {
      page: 1, // 第几页
      topicList: [], // 话题数据集合
      total: '', // 总页数
    }
	},
  mounted () {
    this.getListData(true)
  },
  onPullDownRefresh () { // 下拉刷新 小程序方法
    // console.log(123)
    this.page = 1
    this.getListData(true)
    wx.stopPullDownRefresh() // 关闭刷新
  },
  onReachBottom () { // 页面到底部 加载更多 小程序
    // console.log('bottom')
    this.page = this.page + 1
    if (this.page > this.total) {
      return false
    }
    this.getListData()
  },
  methods: {
    async getListData (first) { // 获取话题数据
      const data = await get('/topic/listAction', { // 分页处理 上拉加载更多
        page: this.page
      })
      this.total = data.total
      // console.log(data)
      if (first) { // 第一次加载的情况
        this.topicList = data.data
      } else { // 下拉刷新的情况
        this.topicList = this.topicList.concat(data.data)
      }
    },
    topicDetail (id) {
      // 去话题的详情页
      wx.navigateTo({
        url: `/pages/topicdetail/main?id=${id}`
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

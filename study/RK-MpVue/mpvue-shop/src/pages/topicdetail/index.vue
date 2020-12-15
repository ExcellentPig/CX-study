<template>
  <div class="topicdetail">
    <div class="content">
      <div class="detail" v-if="goods_desc">
        <wxParse :content="goods_desc" />
      </div>
      <div class="list">
        <p class="title">专题推荐</p>
        <div class="item" v-for="(item, index) in recommendList" :key="index">
          <img :src="item.scene_pic_url" :alt="item.title">
          <p>{{ item.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils'
import wxParse from 'mpvue-wxparse'
export default {
  data () {
    return {
      goods_desc: '',
      id: '',
      recommendList: []
    }
  },
  components: {
    wxParse
  },
  mounted () {
    this.id = this.$root.$mp.query.id  // 获取伴随过来的id
    this.getListData()
  },
  methods: {
    async getListData () {
      const data = await get('/topic/detailAction', {
        id: this.id
      })
      // console.log(data)
      this.goods_desc = data.data.content
      this.recommendList = data.recommendList
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

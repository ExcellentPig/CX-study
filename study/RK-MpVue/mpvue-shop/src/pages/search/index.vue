<template>
  <div class="search">
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <!-- confirm-type="search" 手机键盘弹出的时候 手机键盘上有搜索按钮 需要type为text
         @focus 再次聚焦 不会删除原内容
         @input 展示提示信息
         @confirm 点击搜索执行
         -->
        <input
         type="text"
         confirm-type="search"
         focus="true"
         placeholder="请输入搜索内容"
         v-model="words"
         @focus="inputFocus"
         @input="tipseach"
         @confirm="searchWords"
         />
        <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
      </div>
      <div @click="cancel">取消</div>
    </div>
    <div class="searchtips" v-if="words">
      <div>
        牙刷
      </div>
      <div class="nogoods">
        数据库暂无此类商品！
      </div>
    </div>
    <div class="history">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div>中餐</div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div class="active">中餐</div>
        <div>中餐</div>
        <div>中餐</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/utils'
export default {
  data () {
    return {
      words: '',
      openid: '',
      hotData: [], // 热门搜索数据
      historyData: [] // 历史搜索数据
    }
  },
  mounted () {
    // 这里通过方法并且在App.vue中全局调用 获取openid  openid被存入Storage中
    this.openid = wx.getStorageSync('OPENID') || '' // 从本地存储取出openid
    // console.log(this.openid)
    // this.getHotData()  // 这里是模拟 实际应该在 searchWords 中调用
  },
  methods: {
    clearInput() {
      this.words = ''
    },
    cancel() {},
    clearHistory () {},
    inputFocus () {},
    tipseach () {},
    async searchWords (e) {
      // console.log(e)
      let value = e.target.value
      //let value = e.currentTarget.dataset.value
      // console.log(e.target.value)
      this.words = value || this.words
      // console.log(this.words)
      // 存入历史
      const data = await post('/search/addhistoryaction', {
        openid: this.openid, // 这是自己定义的 和openid不一样
        keyword: value || this.words
      })
      // console.log(data)
      // 获取历史数据(同时获取热门搜索)
      this.getHotData() // 在输入的时候就判断 是否已经搜索过了 没有就添加到数据库
    },
    async getHotData (first) {
      const data = await get('/search/indexaction?openId=' + this.openid)
      this.historyData = data.historyData
      this.hotData = data.hotData
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>

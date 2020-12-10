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
      <!-- vue中v-if 和 v-for 不能放在同一个DOM上 -->
      <div v-if="tipsData.length !== 0">
        <div
          v-for="(item, index) in tipsData"
          :key="index"
          @click="searchWords"
          :data-value="item.name"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="nogoods" v-else>
        数据库暂无此类商品！
      </div>
    </div>
    <div class="history" v-if="historyData.length !== 0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <!-- :data-value="item.keyword" 拿到数据 在 e.currentTarget.dataset.value -->
        <div
        v-for="(item ,index) in historyData"
        :key="index"
        @click="searchWords"
        :data-value="item.keyword"
        >{{ item.keyword }}</div>
      </div>
    </div>
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
          <div
           v-for="(item, index) in hotData"
           :key="index"
           :class="{ active: item.is_hot === 1 }"
           @click="searchWords"
           :data-value="item.keyword"
           >
            {{ item.keyword }}
          </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="goodsList" v-if="listData.length !== 0">
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0 === nowIndex ? 'active' : '']">综合</div>
        <div @click="changeTab(1)" :class="[1 === nowIndex ? 'active' : '']" class="price">价格</div>
        <div @click="changeTab(2)" :class="[2 === nowIndex ? 'active' : '']">分类</div>
      </div>
      <div class="sortlist">
        <div
         class="item"
         v-for="(item, index) in listData"
         :key="index"
         @click="goodsDeatil(item.id)"
         >
          <img :src="item.list_pic_url" :alt="item.name">
          <p class="name">{{ item.name }}</p>
          <p class="price">￥{{ item.retail_price }}</p>
        </div>
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
      historyData: [], // 历史搜索数据
      tipsData: [], // 提示数据
      order: '',  // 控制排序
      listData: [], // 商品列表
      nowIndex: 0 // 当前nav的下标
    }
  },
  mounted () {
    // 这里通过方法并且在App.vue中全局调用 获取openid  openid被存入Storage中
    this.openid = wx.getStorageSync('OPENID') || '' // 从本地存储取出openid
    // console.log(this.openid)
    this.getHotData() // 这里 需要进行调用 取出数据
  },
  methods: {
    clearInput() {
      this.words = ''
      this.listData = []
    },
    cancel() {
      // 返回上一层页面
      wx.navigateBack({
        delta: 1
      })
    },
    async clearHistory () {
      // 点击 icon清除数据库的历史记录
      const data = await post('/search/clearHistoryAction', {
        openId: this.openid // 清除对应openid的记录
      })
      // console.log(data)
      // 后端清除历史数据后 前端这样处理
      if (data) { // data 为true 是 返回清除成功的情况
        this.historyData = []
      }
    },
    inputFocus () {
      // 聚焦是
      this.listData = [] // 商品页面消失
      this.tipseach()   // 展示 tips
    },
    async tipseach () {
      // 取到input的值 然后请求接口 进行实时搜索提示
      const data = await get('/search/helperAction', {
        keyword: this.words
      })
      console.log(data)
      this.tipsData = data.keywords
    },
    async searchWords (e) {
      // console.log(e)
      // let value = e.target.value
      let value = e.currentTarget.dataset.value
      /*
      target是事件触发的真实元素
      currentTarget是事件绑定的元素
      事件处理函数中的this指向是中为currentTarget
      currentTarget和target，有时候是同一个元素，有时候不是同一个元素 （因为事件冒泡）
      当事件是子元素触发时，currentTarget为绑定事件的元素，target为子元素
      当事件是元素自身触发时，currentTarget和target为同一个元素。

      */
      // console.log(e.target.value)
      this.words = value || this.words
      // console.log(this.words)
      // 存入历史
      const data = await post('/search/addhistoryaction', {
        openId: this.openid,
        keyword: value || this.words
      })
      // console.log(data)
      // 获取历史数据(同时获取热门搜索)
      this.getHotData() // 在输入的时候就判断 是否已经搜索过了 没有就添加到数据库
      // this.tipseach() // 点击历史记录或者热门时  也发送tip请求 这里的需求是直接出现商品
      this.getListData() // 输入内容 获取商品列表数据
    },
    async getHotData (first) {
      const data = await get('/search/indexaction?openId=' + this.openid)
      this.historyData = data.historyData
      this.hotData = data.hotKeywordList
      // console.log(data)
    },
    async getListData () {
      // 获取商品列表 与tip接口共用一张表格
      const data = await get('/search/helperAction',{
        keyword: this.words,
        order: this.order
      })
      // console.log(data)
      this.listData = data.keywords
      this.tipsData = []  // 商品被搜索出 就不需要tips了
    },
    changeTab (index) {
      // 点击切换tab状态
      this.nowIndex = index
      if (index === 1) {
        this.order = this.order === 'asc' ? 'desc' : 'asc'
      } else {
        this.order = ''
      }
      this.getListData() // 需要重新请求
    },
    goodsDeatil (id) {
      wx.navigateTo({
        url: '/pages/goods/main?id=' + id
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "./style.less";
</style>

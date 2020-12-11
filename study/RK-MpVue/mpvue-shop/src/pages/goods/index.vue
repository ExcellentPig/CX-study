<template>
  <div class="goods">
    <div class="swiper">
      <swiper
       class="swiper-container"
       indicator-dots="true"
       autoplay="true"
       interval="3000"
       duration="1000"
       >
        <block v-for="(item, index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.img_url" :alt="item.img_desc" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <!-- hover-class 手指触摸高亮类名
        open-type 小程序规定分享 需要添加
       -->
      <button
        class="share"
        hover-class="none"
        open-type="share"
        value=""
        >
          分享商品
        </button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{ info.name }}</p>
        <p>{{ info.goods_brief }}</p>
        <p>￥{{ info.retail_price }}</p>
        <p class="brand" v-if="brand.name">
          <p>{{ brand.name }}</p>
        </p>
      </div>
    </div>
    <div class="section-nav" @click="showType">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <div class="attribute">
      <div class="head">
        商品参数
      </div>
      <div class="item" v-for="(item, index) in attribute" :key="index">
        <div>{{ item.name }}</div>
        <div>{{ item.value }}</div>
      </div>
    </div>
    <!--
      wxParse mpvue为微信小程序自带的图片展示标签 提供点击查看的功能
    -->
    <div class="detail" v-if="goods_desc">
      <wxParse :content="goods_desc" />
    </div>
    <div class="common-problem">
      <div class="h">
        <text class="title">常见问题</text>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{ item.question }}</text>
          </div>
          <div class="answer">
            {{ item.answer }}
          </div>
        </div>
      </div>
    </div>
    <div class="common-problem">
      <div class="h">
        <text class="title">大家都在看</text>
      </div>
      <div class="sublist">
        <div v-for="(item, index) in productList" :key="index">
          <img :src="item.list_pic_url" :alt="item.name">
          <p>{{ item.name }}</p>
          <p>￥{{ item.retail_price }}</p>
        </div>
      </div>
    </div>
    <!-- 底部栏 -->
    <div class="bottom-fixed">
      <div class="collect-box" @click="collect">
        <div :class="collectFlag ? 'collect active' : 'collect'"></div>
      </div>
      <div class="cart-box" @click="toCart">
      	<div class="cart">
          <span v-show="allnumber > 0">{{ allnumber }}</span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="购物车">
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>
    <!-- 选择规格的弹出层
      pop 遮罩层
     -->
    <div class="pop" v-show="showpop" @click="showType"></div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : '']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" :alt="info.name">
        </div>
        <div class="right">
          <div>
            <p>价格￥{{ info.retail_price }}</p>
            <p>请选择数量</p>
          </div>
        </div>
        <div class="close" @click="showType">✖️</div>
      </div>
      <div class="b">
        <p>数量</p>
        <div class="count">
          <div class="cut" @click="reduce">-</div>
          <input type="text" class="number" v-model="number" disabled="false">
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '@/utils'
/**
 * 22课之前用到的wxParse其实就根据它的提示修改就好，我就根据它的提示改好了。
 * 在node_modules文件下的mpvue-wxparse文件下的src下的wxPrase.vue中第12行的:key值改为:key=“index”，就不报警告了。
 *
 */
import wxParse from 'mpvue-wxparse' // i
export default {
  data () {
    return {
      gallery: [], // banenr图
      id: '', // 商品ID
      openId: '', // 自己的openid
      info: {}, // 商品数据  后端取出[0]的数据 前端只需用对象拿出
      brand: [],  // 品牌 有些有 有些无
      showpop: false, // 是否弹出弹框
      number: 0, // 默认的选择数量
      attribute: [], // 商品规格数据
      goods_desc: '', // 图片信息
      issueList: [], // 常见问题的数据
      productList: [], // 大家都看的商品列表
      collectFlag: false, // 是否收藏的字段
      goodsId: '', // 商品ID
      allnumber: 0,  //购物车数量
      allPrice: 0, // 总价格
    }
  },
  components: {
      wxParse //注册为组件
  },
  onShareAppMessage() { // 小程序的 app分享方法
    // console.log(this.info.name)
    return {
      title: this.info.name, // 标题
      path: '/pages/goods/main?id' + this.info.id,  // 那个页面当做 跳转的页面
      imageUrl: this.gallery[0].img_url  // 分享页图片 不设置会自动截屏
    }
  },
  mounted () {
    this.openId = wx.getStorageSync('OPENID') || '' // 拿到已存入的openid
    // 拿到 详情页跳转时 伴随的id
    // this.id = this.$root.query.id  // 原生小程序获取 路由参数的方法
    this.id = this.$root.$mp.query.id // mpvue 获取路由参数的方法
    // console.log(this.id)
    // 这里注意顺序问题 this.id的赋值应该在goodsDetail 之前 否者拿不到伴随的商品id
    this.goodsDetail()
  },
  methods: {
    async goodsDetail () {
      const data = await get('/goods/detailAction', {
        id: this.id,
        openId: this.openId
      })
      // console.log(data)
      this.gallery = data.gallery
      this.info = data.info
      this.attribute = data.attribute
      this.goods_desc = data.info.goods_desc
      this.issueList = data.issueList
      this.productList = data.productList
      this.goodsId = data.info.id
      this.collectFlag = data.collected // 从后端取出 是否已经收藏 为页面初始化时显示
      this.allnumber = data.allnumber
      this.allPrice = data.info.retail_price // 总价  先保存为单价
    },
    showType () {
      // 控制 是否显示弹框
      this.showpop = !this.showpop
    },
    add () {
      this.number++
    },
    reduce () {
      this.number --
      if (this.number < 0) {
        this.number = 0
      }
    },
    async collect () {
      // 控制收藏按钮 五角星 需要将状态存入后端
      this.collectFlag = !this.collectFlag // 这里在后端 goods接口中 传入了是否收藏的字段 以此判断 是否已经收藏
      const data = await post('/collect/addCollect', {
        openId: this.openId, // 传入每个人的openId
        goodsId: this.goodsId // info中拿到的id
      })
      // console.log(data)
    },
    toCart () {
      wx.switchTab({ // 跳导航页面需要使用switchTab 而不是navigateTo
        url: '/pages/cart/main'
      })
    },
    async buy () {
      // 判断 选择数量弹窗是否显示 没显示就显示 显示了就可以购买
      if (this.showpop) {
        // console.log(1)
        if (this.number === 0) { // 购买的数量为0
        // console.log(2)
          wx.showToast({ // 提示
            title: '请选择商品数量',
            duration: 2000,
            icon: 'none',
            mask: true, // 显示遮罩层
            success: res => {}
          })
          return false // 结束 不走下面的逻辑了
        }
        // 可以点击立即购买
        const data = await post('/order/submitAction', {
          goodsId: this.goodsId,
          openId: this.openId,
          allPrice: this.allPrice
        })
        console.log(data)
        if (data) { // 成功 就跳转到支付页面
          wx.navigateTo({
            url: '/pages/order/main'
          })
        }
      } else {
        this.showpop = true
      }
    },
    async addCart () { // 点击加入购物车
      if (this.showpop) {
        if (this.number === 0) { // 购买的数量为0
        // console.log(2)
          wx.showToast({ // 提示
            title: '请选择商品数量',
            duration: 2000,
            icon: 'none',
            mask: true, // 显示遮罩层
            success: res => {}
          })
          return false // 结束 不走下面的逻辑了
        }
        // number不为0
        const data = await post('/cart/addCart', {
          openId: this.openId,
          goodsId: this.goodsId,
          number: this.number
        })
        // console.log(data)
        if (data) {
          this.allnumber = this.allnumber + this.number
          wx.showToast({ // 提示
            title: '添加购物车成功',
            duration: 1500,
            icon: 'success'
          })
        }
      } else {
        this.showpop = true
      }
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import  './style.less';
@import url("~mpvue-wxparse/src/wxParse.css"); // 引入wxParse的样式
</style>

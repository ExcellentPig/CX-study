<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退款</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item, index) in cartList" :key="index">
        <div class="con">
          <div class="left">
            <div class="icon"
              @click="changeColor(index, item.goods_id)"
              :class="[listIds[index] ? 'active': '']"
            ></div>
            <div class="img">
              <img :src="item.list_pic_url" :alt="item.goods_id">
            </div>
            <div class="info">
              <p>{{ item.goods_name }}</p>
              <p>￥{{ item.retail_price }}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">x{{ item.number }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="left" @click="allCheck" :class="{active: allcheck}">
        全选({{ isCheckedNumber }})
      </div>
      <div class="right">
        <div>￥{{ allPrice }}</div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenId } from '@/utils'
export default {
  data () {
    return {
      openId: '',
      cartList: [], // 购物车商品数据
      listIds: [], // 商品id集合
      allcheck: false, // 全选字段
    }
  },
  computed: {
    isCheckedNumber () { // 计算属性 的到选中的数据个数
      let number = 0
      for (let i=0;i<this.listIds.length;i++) {
        if (this.listIds[i]) {
          number++
        }
      }
      if (number == this.cartList.length && number !== 0) { // 全部被勾选
        this.allcheck = true
      } else {
        this.allcheck = false
      }
      return number
    },
    allPrice () { // 计算总价
      let price = 0
      for(let i=0;i<this.listIds.length;i++) { // 注意这里是循环id列表 然后通过下标拿到元数据的数据
        if (this.listIds[i]) {
          price += this.cartList[i].retail_price * this.cartList[i].number
        }
      }
      return price
    }
  },
  onShow () {
    //this.openId = wx.getStorageSync('OPENID')
    this.openId = getStorageOpenId()
    // console.log(this.openId)
    this.getListData()
  },
  methods: {
    async getListData () { // 获取购物车商品数据
      const data = await get('/cart/cartList',{
        openId: this.openId
      })
      // console.log(data)
      this.cartList = data.data
    },
    changeColor (index, id) {
      // 商品勾选 index为 index  id为goods_id
      if (this.listIds[index]) { // 已经被添加上 就添加false 也就是不选
        this.$set(this.listIds, index, false) // vue提供的修改数据源的方法
      } else { // 未被添加上
        this.$set(this.listIds, index, id)
      }
    },
    allCheck () {// 全选
      // this.allcheck = !this.allcheck
      // 先清空上面单个的选择状态
      this.listIds = []
      if (this.allcheck) {
        this.allcheck = false
      } else {
        this.allcheck = true
        // 全部选中
        for (let i=0;i<this.cartList.length;i++) {
          const element = this.cartList[i].goods_id // 将goods_id push到listIds
          this.listIds.push(element)
        }
      }
    },
    async orderDown () { // 下单操作
      // 一件商品都没选 就 不能下单
      if (this.listIds.length === 0) { // 没有选择商品
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 1500
        })
        return false
      }
      //  存放已经选择的商品的数据 去除数组中的false
      let newGoodsId = []
      for (let i=0;i<this.listIds.length;i++) {
        const element = this.listIds[i]
        if (element) {
          newGoodsId.push(element)
        }
      }
      // 传入id 请求接口
      let goodsId = newGoodsId.join(',')
      const data = await post('/order/submitAction',{ // 和购买共用一个接口
        openId: this.openId,
        goodsId: goodsId,
        allPrice: this.allPrice
      })
      // console.log(data)
      if (data) {
        wx.navigateTo({
          url: `/pages/order/main`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

<template>
  <div class="order">
	  <div class="address" v-if="address.name" @click="toAddressList">
		  <div class="item">
			  <div class="list">
				  <div class="addresslist">
            <div>
              <span>{{ address.name }}</span>
              <div class="moren">默认</div>
            </div>
            <div class="info">
              <p>{{ address.mobile }}</p>
              <p>{{ address.address + address.address_detail }}</p>
            </div>
            <div></div>
          </div>
			  </div>
		  </div>
	  </div>
    <div class="seladdress" v-else @click="toAdd">
      请选择默认地址
    </div>
    <div class="orderbox">
      <div class="item">
        <div>商品合计</div>
        <div>￥{{ allPrice }}</div>
      </div>
      <div class="item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item, index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="img">
              <img :src="item.list_pic_url" :alt="item.goods_name">
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
    <div class="bottom">
      <div>实付: ￥{{ allPrice }}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
import { get, post, getStorageOpenId } from '@/utils'
export default {
  data () {
    return {
      openId: '', // 自己的openid
      address: {}, // 地址列表
      allPrice: '', // 价格合计
      price: '', // 单价
      addressId: '', // storage中的addressId
      listData: [] // 商品数据
    }
  },
  onShow () { // 小程序生命周期  替代mounted
    // this.opendId = wx.getStorageSync('OPENID')
    if (wx.getStorageSync('addressId')) {
      this.addressId = getStorageOpenId
    }
    this.openId = getStorageOpenId() // 封住的从内存中获取openid的方法 同上
    this.getDetail()
    // console.log(this.openId)
  },
  methods: {
    toAdd () {
      // 点击添加收货地址 address为空
      // 去选择地址的页面
      wx.navigateTo({
        url: '/pages/addaddress/main'
      })
    },
    toAddressList () {
      // 点击进入选择地址 address 不为空
      // 去地址列表页面
      wx.navigateTo({
        url: '/pages/addressselect/main'
      })
    },
    async getDetail () {
      // 获取待付款商品的数据
      const data = await get('/order/detailAction', {
        openId: this.openId,
        addressId: this.addressId
      })
      // console.log(data)
      if (data) {
        this.listData = data.goodsList
        this.address = data.address
      }
      this.listData.map(item => {
        this.allPrice += item.retail_price * item.number // 计算总价
      })
    },
    pay () {
      // 点击支付按钮 显示提示框
      wx.showToast({
        title: '支付功能暂未开发',
        icon: 'none',
        durarion: 1500,
        mask: false,
        success: res=> {}
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import  './style.less';
</style>

<template>
  <div class="address">
    <scroll-view
      scroll-y="true"
      class="addcont"
      style="height: 100%;"
       v-if="listData.length !== 0"
      >
      <div class="item">
        <div class="list" v-for="(item, index) in listData" :key="index">
          <div class="addresslist">
            <div>
              <span>{{item.name }}</span>
              <div class="moren" v-if="item.is_default === 1">默认</div>
            </div>
            <div class="info" @click="selAddress(item.id)">
              <p>{{ item.mobile }}</p>
              <p>{{ item.address + item.address_detail }}</p>
            </div>
            <div @click="toDetail(item.id)"></div>
          </div>
        </div>
      </div>
    </scroll-view>
    <!-- 无地址的情况 -->
    <div class="center" v-else>
      <p>收货地址为空~</p>
    </div>
    <div class="bottom">
      <div @click="wxaddress(1)">+新建地址</div>
      <div @click="wxaddress">一键导入微信地址</div>
    </div>
  </div>
</template>

<script>
import { get, getStorageOpenId } from '@/utils'
export default {
  data () {
    return {
      listData: [], // 地址数据
      openId: '',
    }
  },
  onShow () { // 小程序的生命周期
    this.openId = getStorageOpenId()
    this.getAddress()
  },
  methods: {
    toDetail (id) {
      console.log(id)
      // 点击进入 地址编辑
      wx.navigateTo({
        url: '/pages/addaddress/main?id=' + id
      })
    },
    wxaddress (index) {
      // 下方两个按钮的事件
      if (index === 1) { // 新建按钮
        wx.navigateTo({
          url: '/pages/addaddress/main'
        })
      } else { // 导入微信地址
        wx.chooseAddress({ // 获取微信地址的方法 小程序
          success: function (res) {
            // console.log(res)
           let result = encodeURIComponent(JSON.stringify(res)); // 需要处理一下格式 进行编码 放入url后面
            // console.log(res)
            wx.navigateTo({ // 跳转至地址编辑页面
              url: '/pages/addaddress/main?res=' + result
            })
          }
        })
      }
    },
    async getAddress () {
      // 获取地址信息
      let _this = this // 无意义的操作
      const data = await get('/address/getListAction',{
        openId: _this.openId
      })
      console.log(data)
      _this.listData = data.data
    },
    selAddress (id) {
      // 点击info 跳转到支付页面  需要带地址数据
      wx.setStorageSync('addressId', id) // 存储地址Id
      wx.navigateBack({
        delta: 1
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

<template>
  <div class="addaddress">
    <div class="item">
      <input type="text" placeholder="姓名" v-model="userName">
    </div>
    <div class="item">
      <input type="text" placeholder="手机号码" v-model="telNumber">
    </div>
    <div class="item">
      <!-- 小程序的联级选择器
      region 省市区
      custom-item 顶部自定义项
      -->
      <picker
       mode="region"
       @change="bindRegionChange"
       :value="region"
       :custom-item="customItem"
       >
        <input type="text" placeholder="省份|城市|区县" v-model="address">
      </picker>
    </div>
    <div class="item">
      <input type="text" placeholder="详细地址|楼道|楼盘号等" v-model="detailaddress">
    </div>
    <div class="item itemend">
      <checkbox-group @click="checkboxChange">
        <label class="checkbox">
          <checkbox
           class="box"
           value="true"
           :checked="checked"
           color="#b4282d" />
           设置为默认地址
        </label>
      </checkbox-group>
      <div @click="wxaddress">一键导入微信</div>
    </div>
    <div class="bottom" @click="saveAddress">保存</div>
  </div>
</template>

<script>
import { get, post, getStorageOpenId } from '@/utils'
export default {
  data () {
    return {
      userName: '', // 姓名
      telNumber: '', // 电话
      detailaddress: '', //地址详细信息
      region: [], // 地区
      address: '',  // 地址数据
      customItem: '全部', // 选择器 第一个选项的文字
      checked: false, // 控制是否被选中
      openId: '',
      res: '', // 上一个页面拿过来的数据
    }
  },
  mounted () {
    this.openId = getStorageOpenId()
    if (this.$root.$mp.query.res) { // 微信地址 点击过来的
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res)) // 解码
      // console.log(this.res)
      this.userName = this.res.userName
      this.telNumber = this.res.telNumber
      this.address = `${this.res.provinceName} ${this.res.cityName} ${this.res.countyName}`
      this.detailaddress = this.res.detailInfo
    }
    if (this.$root.$mp.query.id) { // 从编辑地址按钮点过来
      this.id = this.$root.$mp.query.id
      this.getDetail()
    }
  },
  methods: {
    checkboxChange () {
      // 多选框被点击
    },
    wxaddress () {
      // 导入微信地址
    },
    saveAddress () {
      // 保存地址
    },
    async getDetail () {
      // 根据id获取地址信息
      const data = await get('/address/detailAction', {
        id: this.id
      })
      // console.log(data)
      let detail = data.data // 根据id获取地址信息的数据集合
      this.userName = detail.name
      this.telNumber = detail.mobile
      this.address = detail.address
      this.detailaddress = detail.address_detail
      this.checked = detail.is_default === 1 ? true : false
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import './style.less';
</style>

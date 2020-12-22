<template>
	<view>
		<view @click="callPhone"> 点击调用拨打电话API {{ phone }}</view>
		 <map 
		  class="map" 
		  :longitude="longitude"
		  :latitude="latitude"
		  :markers="markers"
		 ></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '001-222-158952',
				latitude: 30.547052,
				longitude: 104.067552,
				scale: 13,
				markers: [
					{
						latitude: 30.547052,
						longitude: 104.067552,
						iconPath: '../../static/icon/aui-icon-location.png',
						width: 80,
						height: 80
					}
				]
			}
		},
		filters: {
			// 使用 {{ xxx | formateDate(item.time) }}
			formateDate (date) {
				const newDate = new Date(date)
				const year = newDate.getFullYear()
				const month = newDate.getMonth().toString().padStart(2, 0)
				const day = newDate.getDay().toString().padStart(2, 0) // 是否满足两位 不满足就在前面加0
			}
		},
		methods: {
			callPhone () {
				uni.makePhoneCall({
					phoneNumber: this.phone,
					success(res) {
						console.log(res)
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.map {
	width: 100%;
	height: 750rpx;
}
</style>

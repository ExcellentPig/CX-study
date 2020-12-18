<template>
	<view>
		<button @click="upload" type="primary">上传图片</button>
		<image 
		  v-for="(item, index) in imgArr" 
		  :key="index" 
		  :src="item"
		  @click="previewImage(index)"
		></image>
		<!-- #ifdef H5 -->
		<view>只在H5页面中看见</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view>只在微信小程序页面中看见</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgArr: []
			}
		},
		onLoad() {
			// #ifdef H5
			console.log('只在H5页面中看见')
			// #endif
			// #ifdef MP-WEIXIN
			console.log('只在微信小程序页面中看见')
			// #endif
		},
		methods: {
			upload() {
				uni.chooseImage({
					count: 5, //上传数量
					success: res => {
						console.log(res)
						this.imgArr = res.tempFilePaths
					}
				})
			},
			previewImage(index) {
				uni.previewImage({
					current: index,
					urls: this.imgArr
					// loop: true, // 5+App
					// indicator: 'number' // 5+App
				})
			}
		}
	}
</script>

<style scoped>
/* #ifdef H5 */
view {
	color: red;
}
/* #endif */
/* #ifdef MP-WEIXIN */
view {
	color: #0000FF;
}
/* #endif */
</style>

<template>
	<view>
		首页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: []
			}
		},
		onLoad() {
			this.getSwipers()
		},
		methods: {
			// 获取轮播图的数据
			getSwipers () {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success: res => {
						console.log(res)
						if (res.data.meta.status !== 200) {
							uni.showToast({
								title: '获取数据失败！'
							})
						}
						this.swipers = res.data.message
					}
				})
			}
		}
	}
</script>

<style>
	
</style>

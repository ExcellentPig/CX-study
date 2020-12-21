<template>
	<view>
		<view>导航跳转</view>
		<navigator  url="/pages/detail/detail">跳转到详情页</navigator>
		<navigator  url="/pages/detail/detail?id=80&name=zs">跳转到详情页带参数</navigator>
		<!-- open-type="switchTab" 跳转tab页需要添加 -->
		<navigator  url="/pages/message/message" open-type="switchTab">跳转到信息页</navigator>
		<!-- open-type="redirect" 把当前页面关闭 不能返回 -->
		<navigator  url="/pages/detail/detail" open-type="redirect">跳转到详情页</navigator>
		<button @click="goDtail">跳转到详情页</button>
		<button @click="goMessage">跳转到详情页</button>
		<button type="primary" @click="goDtail2">跳转到详情页并关闭当前页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onUnload() {
			console.log('销毁了')
		},
		methods: {
			goDtail() {
				uni.navigateTo({
					url: '/pages/detail/detail'
				})
			},
			goMessage () {
				uni.switchTab({ // 跳转到tabbar页面 会卸载其他页面
					url: '/pages/message/message'
				})
			},
			goDtail2 () {
				uni.redirectTo({
					url: '/pages/detail/detail'
				})
			}
		}
	}
</script>

<style>

</style>

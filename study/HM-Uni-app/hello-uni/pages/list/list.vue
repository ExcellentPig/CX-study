<template>
	<view>
		<button @click="getDate">发送请求</button>
		<button @click="setStorage">储存数据</button>
		<button @click="getStorage">获取数据</button>
		<button @click="removeStorage">移除数据</button>
		<view class="list" v-for="(item, index) in list" :key="index">
			{{ item }}
		</view>
		<button @click="clickHandler">下拉刷新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					'math',
					'english',
					'chinese',
					'math',
					'english',
					'chinese',
					'math',
					'english',
					'chinese'
				]
			}
		},
		onPullDownRefresh () {
			this.list.push('PE')
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 2000)
		},
		onReachBottom() {
			console.log('bottom')
			this.list = this.list.concat(this.list)
		},
		methods: {
			clickHandler () {
				uni.startPullDownRefresh()
			},
			getDate () {
				uni.request({
					url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
					success(res) {
						console.log(res)
					}
				})
			},
			setStorage () {
				// uni.setStorage({ // 异步
				// 	key: 'id',
				// 	data: 80,
				// 	success() {
				// 		console.log('success')
				// 	}
				// })
				uni.setStorageSync('id', 80) // 异步
			},
			getStorage () {
				// uni.getStorage({
				// 	key: 'id',
				// 	success(res) {
				// 		console.log('success',res)
				// 	}
				// })
				const data = uni.getStorageSync('id')
				console.log(data)
			},
			removeStorage () {
				// uni.removeStorage({
				// 	key: 'id',
				// 	success() {
				// 		console.log('success')
				// 	}
				// })
				uni.removeStorageSync('id')
				
				// uni.clearStorageSync() // 清除本地所有数据
				
			}
		}
	}
</script>

<style scoped="scoped">
.list {
	height: 100px;
	line-height: 100px;
}
</style>

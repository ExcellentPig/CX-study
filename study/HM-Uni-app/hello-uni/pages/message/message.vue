<template>
	<view>
		message
		<view>{{ msg }}</view>
		<view>{{ 1+'你好' }}</view>
		<view>{{ flag ? 'true': 'false' }}</view>
		<image :src="imgUrl"></image>
		<view>
			<block v-for="(item, index) in list" :key="index">
				{{ item }}
			</block>
		</view>
		<button type="primary" @click="clickHandler($event ,20)">事件按钮</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msg: 'hello',
			flag: true,
			imgUrl: 'http://temp.im/100x100',
			list: [1, 2, 3, 4]
		}
	},
	onLoad(options) {
		console.log(options)
		console.log('页面加载了')
	},
	onShow() {
		console.log('页面显示了')
	},
	onReady() {
		console.log('页面初次渲染完成')
	},
	onHide() {
		console.log('页面隐藏了')
	},
	methods: {
		clickHandler(e, num) {
			console.log(e, num)
		}
	}
}
</script>

<style>

</style>

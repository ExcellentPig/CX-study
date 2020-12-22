<template>
	<view class="pics">
		<scroll-view 
		 class="left" 
		 scroll-y="true"
		>
			<view class="active">家居生活</view>
			<!-- <view :class="active == index ? 'active' : ''">家居生活</view> -->
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
			<view>家居生活</view>
		</scroll-view>
		<!-- 解析HTML标签 类似于v-html -->
		<!-- <rich-text :node="detail.content"></rich-text> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: 0
			}
		},
		methods: {
			getPicsCate () {
				
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.pics {
	height: 100%;
	.left {
		width: 200rpx;
		height: 100%;
		border-right: 1px solid #eee;
		view {
			height: 60px;
			line-height: 60px;
			text-align: center;
			color: #333;
			font-size: 30rpx;
			border-top: 1px solid #eee;
		}
		.active {
			background: $shop-color;
			color: #fff;
		}
	}
}
</style>

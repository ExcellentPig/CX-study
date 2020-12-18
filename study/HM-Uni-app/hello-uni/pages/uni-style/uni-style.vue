<template>
	<view>
		<view>
			样式的学习
		</view>
		<view class="box1">
			测试字体
			<text>sass</text>
		</view>
		<view>
			<span class="iconfont icon-guanyuwomen"></span>
			<span class="iconfont icon-shipin"></span>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped="scoped" lang="scss">
@import url("./a.css");
.box1 {
	width: 375rpx;
	height: 375rpx;
	background: #0000FF;
	font-size: 30rpx;
	text {
		color: $uni-color-primary;
	}
}
</style>

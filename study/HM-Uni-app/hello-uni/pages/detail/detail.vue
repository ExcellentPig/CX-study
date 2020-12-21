<template>
	<view>
		<view>text组价</view>
		<view>
			<text>khan|rose|jack</text>
			<view>
				<text selectable="true">可以选中的</text>
			</view>
			<view>
				<text space="emsp">space       space</text><br>
				<text space="ensp">space       space</text><br>
				<text space="nbsp">space       space</text>
			</view>
			<view>
				<text decode>&amp;</text>
			</view>
		</view>
		<view>
			<view>view组件</view>
			<view 
			  class="box2" 
			  hover-class="box2-avtive"
			  :hover-start-time="2000"
			 >
				<view
				 class="box" 
				 hover-class="box-active"
			     hover-stop-propagation
			     :hover-stay-time="2000"
				>我是view</view>
			</view>
		</view>
		<view>
			<view>button组件</view>
			<button>按钮</button>
			<button size="mini">按钮</button>
			<button type="primary">按钮</button>
			<button type="warn" plain>按钮</button>
			<button type="default" disabled>按钮</button>
			<button loading>按钮</button>
		</view>
		<view>
			<view>
				<view>image组件</view>
				<image src="../../static/logo.png"></image>
				<image src="../../static/logo.png" mode="aspectFit"></image>
				<image src="../../static/logo.png" mode="aspectFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(optons) {
			console.log(optons)
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.box {
	width: 100px;
	height: 100px;
	background-color: #DD524D;
}
.box-active {
	background-color: red;
}
.box2 {
	width: 200px;
	height: 200px;
	background-color: blue;
}
.box2-avtive {
	background: pink;
}
</style>

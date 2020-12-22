<template>
	<view>
		<view class="nav">
			<uni-goods-nav
			  :fill="true" 
			  :options="options" 
			  :buttonGroup="buttonGroup" 
			  @click="onClick" 
			  @buttonClick="buttonClick" 
			 />
		</view>
	</view>
</template>

<script>
import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue';
export default {
	data() {
		return {
			options: [
				{
					icon: 'headphones',
					text: '客服'
				},
				{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 2
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	methods: {
		onClick(e) {
			uni.showToast({
				title: `点击${e.content.text}`,
				icon: 'none'
			});
		},
		buttonClick(e) {
			console.log(e);
			this.options[2].info++;
		}
	},
	components: { uniGoodsNav }
};
</script>

<style scoped lang="scss">
.nav {
	position: fixed;
	bottom: 0;
	z-index: 99;
	width: 100%;
}
</style>

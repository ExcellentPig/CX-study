<template>
	<view class="home">
		<swiper 
		 indicator-dots="true" 
		 circular="true"
		>
			<swiper-item 
			 v-for="(item, index) in swipers"
			 :key="item.goods_id"
			>
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view 
			 class="nav_item" 
			 v-for="(item, index) in tabList"
			 :key="index"
			>
				<view>
					<image :src="item.image_src"></image>
				</view>
			</view>
		</view>
		<view class="hot_goods">
			<view class="title">推荐商品</view>
			<view class="goods_list" v-for="(item, index) in goodsList" :key="index" >
				<view 
				 class="goods_item" 
				 v-for="(goods, idx) in item.product_list" 
				 :key="idx"
				>
					<image :src="goods.image_src"></image>
					<view class="price">
						<text>￥2199</text>
						<text>￥2499</text>
					</view>
					<view class="name">
						{{ goods.name }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swipers: [],
				tabList: [],
				goodsList: []
			}
		},
		onLoad() {
			this.getSwipers() // 获取轮播图
			this.getTabs() // 获取tab数据
			this.getGoodsList()
		},
		methods: {
			// 获取轮播图的数据
			// getSwipers () {
			// 	uni.request({
			// 		url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			// 		success: res => {
			// 			console.log(res)
			// 			if (res.data.meta.status !== 200) {
			// 				uni.showToast({
			// 					title: '获取数据失败！'
			// 				})
			// 			}
			// 			this.swipers = res.data.message
			// 		}
			// 	})
			// }
			
			// async getSwipers () {
			// 	const res = await uni.request({
			// 		url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'
			// 	})
			// 	console.log(res)
			// }
			
			async getSwipers () {
				const res = await this.$myRequest({ // 全局调用自己的请求方法
					url: '/home/swiperdata'
				})
				// console.log(res)
				this.swipers = res.data.message
				// console.log(this.swipers)
			},
			async getTabs () {
				const res = await this.$myRequest({
					url: '/home/catitems'
				})
				// console.log(res)
				this.tabList = res.data.message
			},
			async getGoodsList () {
				const res = await this.$myRequest({
					url: '/home/floordata'
				})
				console.log(res)
				this.goodsList = res.data.message
			}
		}
	}
</script>

<style lang="scss" scoped>
.home {
	swiper {
		width: 750rpx;
		height: 380rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.nav {
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nav_item {
			margin: 20rpx 0rpx;
			image {
				width: 150rpx;
				height: 150rpx;
			}
		}
	}
	.hot_goods {
		background: #eee;
		overflow: hidden;
		.title {
			height: 50px;
			line-height: 50px;
			color: $shop-color;
			text-align: center;
			letter-spacing: 20px;
			background-color: #fff;
			margin: 7rpx 0;
		}
		.goods_list {
			padding: 0 15rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.goods_item {
				background: #fff;
				width: 355rpx;
				margin: 10rpx 0;
				padding: 15rpx;
				box-sizing: border-box;
				image {
					width: 80%;
					height: 150px;
					display: block;
					margin: 0 auto;
				}
				.price {
					color: $shop-color;
					font-size: 36rpx;
					margin: 20rpx 0 0 0;
					text:nth-child(2) {
						color: #ccc;
						font-size: 28rpx;
						text-decoration: line-through;
						margin-left: 17rpx;
					}
				}
				.name {
					font-size: 28rpx;
					line-height: 50rpx;
					padding: 10rpx 0 15rpx 0;
				}
			}
		}
	}
}
</style>

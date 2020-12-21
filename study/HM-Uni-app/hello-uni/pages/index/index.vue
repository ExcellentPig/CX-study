<template>
	<view id="myVue">
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
		<test :title="title" @sendNum="sendNum"></test>
		<A></A>
		<B></B>
		 <uni-calendar 
		    :insert="true"
		    :lunar="true" 
		    :start-date="'2019-3-2'"
		    :end-date="'2019-5-20'"
		    @change="change"
		     ></uni-calendar>
	</view>
</template>

<script>
	import test from '../../components/test.vue'
	import A from '../../components/a.vue'
	import B from '../../components/b.vue'
	import uniCalendar from '../../components/uni-calendar/uni-calendar.vue'
	export default {
		data() {
			return {
				imgArr: [],
				num: 3,
				title: '父传子的title'
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
		beforeCreate() {
			console.log('实例已经开始初始化了~')
			console.log(this.num) // undefined
		},
		created() {
			console.log('组件已经创建完成了')
			console.log(this.num)
		},
		beforeMount() {
			console.log('组件挂载之前')
			// console.log(this.num, document.getElementById('myVue')) // 小程序中不能
		},
		beforeDestroy() {
			console.log('组件销毁了')
		},
		components: {
			test,
			A,
			B,
			uniCalendar
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
			},
			sendNum (data) {
				console.log(data)
			},
			change (e) {
				console.log('change', e)
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

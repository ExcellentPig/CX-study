<template>
	<div>
		<!-- <p>{{ state.age }}</p> -->
		<p>{{ state.time }}</p>
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { reactive } from 'vue'
export default {
	name: 'App',
	setup() {
		//创建一个响应式数据
		//本质：将传入的数据包装成一个Proxy对象
		// let state = reactive(123);
		// let state = reactive({
		// 	age: 123
		// });
		
		//let state = reactive([1,3,5])
		
		
		let state = reactive({
			time: new Date
		})
		
		function myFn() {
			//state = 666 // 没有传递对象所以无法实现响应式
			//state.age = 888
			//state[0] = 666
			
			//界面不会更新
			// state.time.setDate(state.time.getDate()+1)
			
			//重新赋值
			const newTime = new Date(state.time.getTime())
			newTime.setDate(state.time.getDate()+1)
			state.time = newTime
			console.log(state.time)
		}
		return { state, myFn }
	}
};

</script>

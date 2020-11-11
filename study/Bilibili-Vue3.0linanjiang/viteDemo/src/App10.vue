<template>
	<div>
		<!-- <p>{{age}}</p>
		<button @click="myFn">按钮</button> -->
		<ul>
			<li v-for="item in state" :key="item.id">
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>

<script>
import { ref,customRef } from 'vue'

function myRef(value) {
	return customRef((track,trigger) => {
		fetch(value)
			.then((res)=>{
				return res.json()
			})
			.then((data)=>{
				console.log(data)
				value = data
				trigger();
			})
			.catch((err)=>{
				console.log(err)
			})
		return {
			get() {
				track(); //告诉vue这个数据是需要追踪变化的
				console.log('get',value);	
				
				// 不能在get方法中发送网络请求
				//死循环
				// fetch('../public/data.json')
				// 	.then((res)=>{
				// 		return res.json()
				// 	})
				// 	.then((data)=>{
				// 		console.log(data)
				// 		value = data
				// 		trigger();
				// 	})
				// 	.catch((err)=>{
				// 		console.log(err)
				// 	})
				
				return value;
			},
			set(newValue) {
				console.log('set',newValue)
				value = newValue
				trigger(); //告诉vue 触发更新
			}
		}
	});
}

export default {
	name: 'App',
	setup() {
		
		// let age = ref(18)
		
		// let age = myRef(28)
		
		
		// function myFn() {
		// 	age.value+=1
		// }
		
		// return { age,myFn }
		
		
		//let state = ref([]);
		
		// fetch('../public/data.json')
		// 	.then((res)=>{
		// 		return res.json()
		// 	})
		// 	.then((data)=>{
		// 		console.log(data)
		// 		state.value = data
		// 	})
		// 	.catch((err)=>{
		// 		console.log(err)
		// 	})
		
		
		let state = myRef('../public/data.json')
		//console.log(state)
		
		return { state }
		
	}
};

</script>

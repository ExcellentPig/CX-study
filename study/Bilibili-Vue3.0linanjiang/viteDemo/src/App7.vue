<template>
	<div>
		<p>{{state}}</p>
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { ref,reactive,toRaw,markRaw } from 'vue'
export default {
	name: 'App',
	setup() {
		let obj = {
			name: 'khan',
			age: 20
		}
		
		/*
		ref的本质是reactive
		
		*/
		
		let state = ref(obj)
		
		/*
		ref reactive数据类型的特点
			每次修改都会更新UI界面，非常消耗性能
			如果有些操作不需要追踪，不需要更新UI界面，
			toRow拿到原始数据，对原始数据进行修改 可以提高性能
		*/
		
		// 如果通过toRaw拿到ref的原始数据 那么必须明确的告诉toRaw方法
		//要获取的是.value的值
		//因为经过vue处理之后，.value中保存的才是当初创建时传入的那个原始数据
		
		let obj2 = toRaw(state.value)
		
		// let obj2 = toRaw(state)
		//console.log(obj === obj2) //true
		
		// console.log(obj === state) //false
		//state和obj是引用关系 state的本质是一个Proxy对象 在Proxy中引用了obj
		
		function myFn() {
			// state.name = 'zs'
			
			//直接修改obj 无法直接触发界面的更新
			//只有通过包装之后的对象来修改 才会触发界面的更新
			// obj2.name = 'zs'
			// console.log(obj2)
			// console.log(state.name)
			
		}
		
		return { state,myFn }
	}
};

</script>

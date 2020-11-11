<template>
	<div>
		<p>{{state}}</p>
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { ref,toRef,toRefs } from 'vue'
export default {
	name: 'App',
	setup() {
		let obj = { name: 'khan',age: 18 }
		
		//ref->复制 修改响应式数据不会影响以前的数据
		//let state = ref(obj.name)
		
		//toRef->引用
		// let state = toRef(obj,'name')
		// console.log(state)
		
		let state = toRefs(obj)
		
		function myFn() {
			//state.value = 'zs'
			/*
			如果利用ref将某一个对象中的属性变成响应式的数据，
			修改响应式的数据是不会修改原始的数据的
			*/
		   
		   /*
		   如果利用toRef将某一个对象中的属性变成响应式数据
		   我们修改响应式的数据是会影响到原始数据的
		   但是如果响应式的数据是通过toRef创建的修改了数据并不会
		   触发UI界面的更新
		   */
		   
		   state.name.value = 'zs'
		   state.age.value = 110
		   
		   console.log(state)
		   console.log(obj)
		   
		}
		return { state,myFn }
	}
};

</script>

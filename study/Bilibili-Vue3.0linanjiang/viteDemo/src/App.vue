<template>
	<div>
		<p>{{ state.name }}</p>
		<p>{{ state.attr.age }}</p>
		<p>{{ state.attr.height }}</p>
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { ref, readonly, isReadonly,shallowReadonly } from 'vue'

export default {
	name: 'App',
	setup() {
		
		//let state = readonly({name: 'khan',attr:{age:18,height:1.66}})
		
		// shallowReadonly 不是递归只读
		let state = shallowReadonly({name: 'khan',attr:{age:18,height:1.66}})
		
		//const value = 123; //也是只读
		
		const value = { name: 'zs', age: 123 }
		
		
		function myFn() {
			state.name = 'aaa'  //只读 不能修改
			
			state.attr.age = 23
			console.log(state)
			
			console.log(isReadonly(state)) //判断是否是只读
			
			value.name = 'ls'
			console.log(value)
			
		}
		
		return { state,myFn }
	}
};

</script>

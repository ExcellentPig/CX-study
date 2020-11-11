<template>
	<div>
		<p>{{state}}</p>
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { ref,reactive,markRaw } from 'vue'
export default {
	name: 'App',
	setup() {
		let obj = { name:'khan',age: 18 }
		obj = markRaw(obj)
		let state = reactive(obj)
		function myFn() {
			state.name = 'zs'
		}
		return { state,myFn }
	}
};

</script>

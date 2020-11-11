<template>
	<div>
		<p>{{ name }}</p>
		<button @click="myFn1">按钮</button>
		<p>{{ age }}</p>
		<button @click="myFn2">按钮</button>
	</div>
</template>

<script>
import { ref } from 'vue'
export default {
	name: 'App',
	data() {
		return {
			name: 'khan'
		}
	},
	methods: {
		myFn1() {
			alert('abc')
		}
	},
	setup() {
		let age = ref(18)
		function myFn2() {
			alert('aaa')
		}
		return { age,myFn2 }
	}
};

</script>

<template>
	<div>
		<p ref="box">ppp</p>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
	name: 'App',
	setup() {
		//console.log(this.$refs.box) //error
		
		let box = ref(null);
		// console.log(box.value)
		
		onMounted(()=>{
			console.log('onMounted',box.value)
		})
		
		return { box }
		
	}
};

</script>

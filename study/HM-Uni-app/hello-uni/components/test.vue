<template>
	<view>
		this is test components
		{{ title }}
		<button @click="sendNum">子传父</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 2
			};
		},
		props: ['title'],
		methods: {
			sendNum () {
				this.$emit('sendNum', this.num)
			}
		}
	}
</script>

<style>

</style>

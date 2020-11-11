<template>
	<div>
		<!-- 通过ref创建的数据 在template中使用的时候不用用过.value来获取 vue会自动添加 -->
		<!-- <p>{{ state }}</p> -->
		
		<p>{{ state.a }}</p>
		<p>{{ state.gf.b }}</p>
		<p>{{ state.gf.f.c }}</p>
		<p>{{ state.gf.f.s.d }}</p>
		
		<button @click="myFn">按钮</button>
	</div>
</template>

<script>
import { ref,reactive } from 'vue'
import { isRef, isReactive} from 'vue'

//非递归监听
import { shallowReactive, shallowRef,triggerRef } from 'vue'

export default {
	name: 'App',
	setup() {
		//let state = ref(17)
		
		// let state = reactive({
		// 	a: 'a',
		// 	gf: {
		// 		b: 'b',
		// 		f: {
		// 			c: 'c',
		// 			s: {
		// 				d: 'd'
		// 			}
		// 		}
		// 	}
		// })
		
		// let state = ref({
		// 	a: 'a',
		// 	gf: {
		// 		b: 'b',
		// 		f: {
		// 			c: 'c',
		// 			s: {
		// 				d: 'd'
		// 			}
		// 		}
		// 	}
		// })
		
		let state = shallowRef({
			a: 'a',
			gf: {
				b: 'b',
				f: {
					c: 'c',
					s: {
						d: 'd'
					}
				}
			}
		})
		
		function myFn() {
			// console.log(isRef(state))
			// console.log(isReactive(state))
			// state.value = 666  //本质还是reactive
			
			// state.a = '1'
			// state.gf.b = '2'
			// state.gf.f.c = '3'
			// state.gf.f.s.d = '4'
			
			// state.value.a = '1'
			// state.value.gf.b = '2'
			// state.value.gf.f.c = '3'
			// state.value.gf.f.s.d = '4'
			
			
			//非递归监听
			// state.value = {
			// 	a: 'aa',
			// 	gf: {
			// 		b: 'bb',
			// 		f: {
			// 			c: 'cc',
			// 			s: {
			// 				d: 'dd'
			// 			}
			// 		}
			// 	}
			// }
			
			
			state.value.gf.f.s.d = '4'
			triggerRef(state)
			
			
			
		}
		
		return { state,myFn }
	}
};

</script>

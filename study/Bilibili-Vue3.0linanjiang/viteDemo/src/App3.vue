<template>
	<div>
		<form>
			 <input type="text" v-model="state2.stu.id">
			 <input type="text" v-model="state2.stu.name">
			 <input type="text" v-model="state2.stu.age">
			 <input type="submit" @click="addStu">
		</form>
		<ul>
			<li 
			v-for="(stu,index) in state.stus" 
			:key="stu.id"
			@click="renStu(index)"
			>
				{{ stu.name }} -- {{ stu.age }}
			</li>
		</ul>
	</div>
</template>

<script>
// import { ref, reactive } from 'vue';
import useRemoveStudent from './remve.js'
import useAddStudent from './add.js'
export default {
	name: 'App',
	setup() {
		//组合API的入口函数
		//ref 函数只能监听简单类型的变化 不能监听复杂类型的变化 对象数组
		// let state = reactive({
		// 	stus: [{ id: 1, name: 'zs', age: 10 }, { id: 2, name: 'ls', age: 20 }, { id: 3, name: 'ww', age: 30 }]
		// });
		
		// function renStu(index) {
		// 	state.stus = state.stus.filter((stu,idx)=>idx!==index) 
		// }
		// return { state,renStu };
		
		let { state,renStu } = useRemoveStudent()
		let { state2,addStu } = useAddStudent(state)
		
		
		return { state,renStu,state2,addStu };
		
	}
};
// 也可以定义到外部
// function useAddStudent(state) {
// 	let state2 = reactive({
// 		stu: {
// 			id:'',
// 			name: '',
// 			age: ''
// 		}
// 	})
	
// 	function addStu(e) {
// 		e.preventDefault()
// 		const stu = Object.assign({},state2.stu)
// 		state.stus.push(stu)
// 		//console.log(state)
// 		state2.stu.id = '';
// 		state2.stu.name = ''
// 		state2.stu.age = ''
// 	}
// 	return { state2, addStu }
// }


// function useRemoveStudent() {
// 	let state = reactive({
// 		stus: [{ id: 1, name: 'zs', age: 10 }, { id: 2, name: 'ls', age: 20 }, { id: 3, name: 'ww', age: 30 }]
// 	});
	
// 	function renStu(index) {
// 		state.stus = state.stus.filter((stu,idx)=>idx!==index) 
// 	}
	
	
	
// 	return { state,renStu }
// }

</script>

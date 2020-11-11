<template>
  <div>
	 <form>
		 <input type="text" v-model="stu.id">
		 <input type="text" v-model="stu.name">
		 <input type="text" v-model="stu.age">
		 <input type="submit" @click="addStu">
	 </form>
	  <ul>
	  	<li v-for="(stu,index) in stus" :key="stu.id" @click="remStu(index)">
			{{ stu.name }} -- {{ stu.age }}
		</li>
	  </ul>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
	  return {
		 stus: [
			 {id:1,name:'zs',age:10},
			 {id:2,name:'ls',age:20},
			 {id:3,name:'ww',age:30},
		 ],
		 stu: {
			 id: '',
			 name: '',
			 age: ''
		 },
	  }
  },
  methods: {
	  remStu(index) {
		  this.stus = this.stus.filter((stu,idx)=>idx!==index)
	  },
	  addStu(e) {
		  e.preventDefault()
		  const stu = Object.assign({},this.stu)
		  this.stus.push(stu)
		  this.stu.id = '';
		  this.stu.name = ''
		  this.stu.age = ''
	  }
  }
}
</script>

<style>
	
</style>

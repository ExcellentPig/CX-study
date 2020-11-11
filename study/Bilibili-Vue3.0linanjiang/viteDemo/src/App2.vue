<template>
  <div>
	 <p>{{ count }}</p>
	 <button @click="myFn">按钮</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'App',
  setup() { //组合API的入口函数
	  let count = ref(0) //定义了一个名称为count的变量 初始值是0 变化后vue会自动更新UI
	  
	  function myFn() {
		  //console.log(count)
		  count.value+=1
	  }
	  
	  //组合API中定义的 在外界使用必须
	  return { count, myFn }
  }
}
</script>

<template>
  <div>
     <input 
       type="text" 
       placeholder="请输入内容"
       v-model="value"
      >
     <button @click="add(value)">添加</button>
     <h3>未完成的项目</h3>
     <div 
         v-for="(item, index) in inputValue" 
        :key="index"
      >
       <p v-if="!item.isOk">{{ item.value }} --- <span @click="del(item)">点击完成该项目</span></p>
     </div>
     <h3>已完成的项目</h3>
     <div
         v-for="(item, index) in isok" 
        :key="index"
      >
       <p>{{ item.value }}</p>
     </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
       value: ''
	}
  },
  computed: { 
    ...mapState({
       inputValue: 'inputValue'
	}),
    ...mapGetters(['isok'])
  },
  methods: {
    add (value) {
       this.value = ''
       this.addItem(value)
       console.log(value)
    },
	...mapActions(['addItem']),
    del (item) {
       this.$store.dispatch('toDel', item)
    }
  }
}
</script>
<style lang="stylus">
.line {
  text-decoration line-through
}
</style>

<template>
  <div class="header">
    <div class="header-content">
      TodoList
      <input
      class="header-input"
      data-test="header-input"
      type="text"
      :value="inputValue"
      @input = "e => changeInputValue(e.target.value)"
      @keyup.enter="addTodoItem"
      placeholder="请输入TodoItem"
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Header',
  props: {},
  // data () {
  //   return {
  //     inputValue: ''
  //   }
  // },
  computed: {
    ...mapState({
      inputValue: state => state.inputValue
    })
  },
  methods: {
    addTodoItem () {
      if (this.inputValue) {
        this.$emit('add', this.inputValue)
        // this.inputValue = ''
        this.changeInputValue('')
      }
    },
    ...mapMutations({
      changeInputValue: 'changeInputValue'
    })
  }
}
</script>

<style scoped lang="stylus">
.header {
  background #333
  line-height 60px
}
.header-content {
  width: 600px;
  margin 0 auto
  color #fff
  font-size 24px
}
.header-input {
  float right
  width: 360px;
  margin: 16px;
  line-height 24px
  outline none
  color #333
  text-indent 10px
}
</style>

<template>
  <div class="undolist">
    <div class="title">
      正在进行
    <span data-test="count" class="count">{{ list.length }}</span>
    </div>
    <ul class="list">
    <li
      class="item"
     v-for="(item, index) in list"
     :key="index"
     data-test="item"
     @click="() => changeStatus(index)"
     >
     <input
         type="text"
         class="input"
         v-if="item.status === 'input'"
         data-test="input"
         :value="item.value"
         @blur="handleInputBlur"
         @change="(e) => handleInputChange(e.target.value, index)"
     >
        <span v-else>{{ item.value }}</span>
        <span class="delete" data-test="delete-button" @click="() => {handleDelete(index)}">-</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UndoList',
  props: ['list'],
  methods: {
    handleDelete (index) {
      this.$emit('delete', index)
    },
    changeStatus (index) {
      this.$emit('status', index)
    },
    handleInputBlur () {
      this.$emit('reset')
    },
    handleInputChange (value, index) {
      this.$emit('change', {
        value,
        index
      })
    }
  }
}
</script>

<style scoped="scoped" lang="stylus">
.undolist {
  width: 600px;
  margin 0 auto
}
.title {
  line-height 30px
  font-size 24px
  font-weight blod
  margin 10px 0
}
.count {
  float right
  display block
  width: 20px
  height 20px
  line-height 20px
  text-align center
  background-color #e6e6e6
  border-radius 10px
  color #000000
  margin-top 5px
  font-size 12px
}
.list {
  list-style-type none
}
.item {
  line-height 32px
  font-size 14px
  background-color #fff
  border-left 5px solid #629a9a
  border-radius 3px
  margin-bottom 10px
  text-indent 10px
}
.delete {
  float right
  display block
  width: 20px
  height 20px
  line-height 20px
  text-align center
  background-color #e6e6e6
  border-radius 10px
  color #000000
  margin-top 5px
  font-size 12px
  text-indent 0px
  margin-right 10px
  cursor pointer
}
.input {
  height: 22px;
  text-indent: 10px;
  width: 460px;
}
</style>

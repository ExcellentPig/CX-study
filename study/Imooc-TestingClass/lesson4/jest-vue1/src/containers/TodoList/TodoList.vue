<template>
  <div>
    <Header @add="addUndoItem" />
 <!--   <ul>
    <li
    v-for="(item,index) in undoList"
    :key="index"
    >{{item}}
    </li>
    </ul> -->
    <UndoList
    :list="undoList"
    @delete="handleItemDelete"
    @status="changeStatus"
    @reset="resetStatus"
    @change="changeItemValue"
     />
  </div>
</template>

<script>
import axios from 'axios'
import Header from './components/Header.vue'
import UndoList from './components/UndoList.vue'

export default {
  name: 'TodoList',
  components: {
    Header,
    UndoList
  },
  props: {},
  data () {
    return {
      undoList: []
    }
  },
  mounted () {
    // axios.get('/getUndoList.json').then((res) => {
    //   this.undoList = res.data
    // }).catch((e) => {
    //   console.log(e)
    // })

    setTimeout(() => (
      axios.get('/getUndoList.json').then((res) => {
        this.undoList = res.data
      }).catch((e) => {
        console.log(e)
      })
    ), 5000)
  },
  methods: {
    addUndoItem (inputValue) {
      this.undoList.push({
        status: 'div',
        value: inputValue
      })
    },
    handleItemDelete (index) {
      this.undoList.splice(index, 1)
    },
    changeStatus (index) {
      const newList = []
      this.undoList.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          newList.push({
            status: 'input',
            value: item.value
          })
        } else {
          newList.push({ status: 'div', value: item.value })
        }
        this.undoList = newList
      })
    },
    resetStatus () {
      const newList = []
      this.undoList.forEach((item, itenIndex) => {
        newList.push({ status: 'div', value: item.value })
      })
      this.undoList = newList
    },
    changeItemValue (obj) {
      this.undoList[obj.index].value = obj.value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>

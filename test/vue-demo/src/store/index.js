import { createStore } from 'vuex'

export default createStore({
  state: {
     inputValue: [
       { value: 'test0', isOk: false },
       { value: 'test1', isOk: true },
       { value: 'test3', isOk: false },
       { value: 'test4', isOk: true },
     ]
  },
  mutations: {
     add (state, payload) {
       let item = JSON.parse(payload)
       state.inputValue.push(item)
     },
     del (state, item) {
      state.inputValue.splice(item, 1)
     }
  },
  actions: {
     addItem ({ commit }, payload) {
       let todoItem = {
         value: payload,
         isOk: false
       }
       todoItem = JSON.stringify(todoItem)
       commit('add', todoItem)
       console.log(todoItem)
    },
     toDel ({ commit, state }, item) {
      let currentIndex = null
      state.inputValue.map((i, index) => {
        if (i.value === item.value) {
           currentIndex = index
         }
      })
      commit('del', currentIndex)
    },
  },
  getters: {
   isok(state) {
       return state.inputValue.filter((item) => {
          return item.isOk !== false
       })
   } 
  }
})

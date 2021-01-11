import {
  shallowMount
} from '@vue/test-utils'
import App from '../../../../App.vue'
import TodoList from '../../TodoList.vue'

describe('APP组件',()=>{
  it('存在TodoList组件',()=>{
    const wrapper = shallowMount(App)
    const todoList = wrapper.findComponent(TodoList)
    //console.log(todoList)
    expect(todoList).toBeTruthy()
  })
})

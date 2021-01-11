import {
  shallowMount
} from '@vue/test-utils'

import TodoList from '../../TodoList'
import Header from '../../components/Header'
import UndoList from '../../components/UndoList.vue'

describe('TodoList组件',()=>{
  it('初始化时 undoList应该为空',()=>{
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.vm.undoList
    expect(undoList).toEqual([])
  })

  // it('TodList 监听到Header的add事件时，会增加一个内容',()=>{
    // const wrapper = shallowMount(TodoList)
    // wrapper.vm.addUndoItem('dee khan')
    // const undoList = wrapper.vm.undoList
    // expect(undoList).toEqual(['dee khan'])

    //集成测试
    // const content = "dee khan";
    // const wrapper = shallowMount(TodoList)
    // const header = wrapper.findComponent(Header)
    // header.vm.$emit('add',content)
    // const undoList = wrapper.vm.undoList
    // expect(undoList).toEqual([content])
  it('addUndoItem执行后，内容会加一项',()=>{
    //单元测试
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]
    })
    wrapper.vm.addUndoItem(4)
    expect(wrapper.vm.undoList).toEqual([
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      {status: 'div',value: 4},
      ])
      
  })

  it('调用UndoList应该传递list参数',()=>{
    const wrapper = shallowMount(TodoList)
    const undoList = wrapper.findComponent(UndoList)
    const list = undoList.props('list')
    expect(list).toBeTruthy()
  })

  it('handleDelete方法被调用时，UndoList列表内容会减少一个',()=>{
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]
    })
    wrapper.vm.handleItemDelete(1)
    expect(wrapper.vm.undoList).toEqual([
      {status: 'div',value: 1},
      {status: 'div',value: 3},
      ])
  })

  it('changeStatus方法执行时，UndoList内容变化',()=>{
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]
    })
    wrapper.vm.changeStatus(1)
    expect(wrapper.vm.undoList).toEqual([
      {status: 'div',value: 1},
      {status: 'input',value: 2},
      {status: 'div',value: 3},
      ])
  })

  it('resetStatus方法执行时，UndoList内容发生变化',()=>{
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
      {status: 'div',value: 1},
      {status: 'input',value: 2},
      {status: 'div',value: 3},
      ]
    })
    wrapper.vm.resetStatus(1)
    expect(wrapper.vm.undoList).toEqual([
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ])
  })

  it('changeItemValue方法执行时，UndoList内容变化',()=>{
    const wrapper = shallowMount(TodoList)
    wrapper.setData({
      undoList: [
      {status: 'div',value: 1},
      {status: 'input',value: 2},
      {status: 'div',value: 3},
      ]
    })
    wrapper.vm.changeItemValue({
      index: 1,
      value: '444'
    })
    expect(wrapper.vm.undoList).toEqual([
      {status: 'div',value: 1},
      {status: 'input',value: '444'},
      {status: 'div',value: 3},
      ])
  })

})

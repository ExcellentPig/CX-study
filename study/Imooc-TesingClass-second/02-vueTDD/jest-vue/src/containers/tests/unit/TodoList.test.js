import { shallowMount } from '@vue/test-utils'
import TodoList from '@/containers/TodoList/TodoList.vue'
import Header from '../../TodoList/components/Header.vue'
import UndoList from '../../TodoList/components/UndoList.vue'

it(`TodoList初始化时， undoList 应该为空`, () => {
	const wrapper = shallowMount(TodoList)
	const undoList = wrapper.vm.undoList
	expect(undoList).toEqual([])
})

it(`TodoList执行 监听到add事件的时候，会增加一个内容`, () => {
	const wrapper = shallowMount(TodoList)
  const header = wrapper.findComponent(Header)
	header.vm.$emit('add', 'abc')
  const undoList = wrapper.vm.undoList
  expect(undoList).toEqual(['abc'])
})

it(`TodoList 调用UndoList 应该传递list 参数`, () => {
	const wrapper = shallowMount(TodoList)
  const undoList = wrapper.findComponent(UndoList)
  const list = undoList.props('list')
  expect(list).toBeTruthy()
})

it(`TodoList 中 handleDeleteItem被调用时， UndoList列表内容会减少一个`, () => {
	const wrapper = shallowMount(TodoList)
  wrapper.setData({
    undoList: []
  })
  wrapper.vm.handleItemDelete(1)
  expect(wrapper.vm.undoList).toEqual([1,3])
})

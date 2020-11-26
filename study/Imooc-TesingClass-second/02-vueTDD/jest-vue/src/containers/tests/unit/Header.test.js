import { shallowMount } from '@vue/test-utils'
import TodoList from '@/containers/TodoList/components/Header.vue'

import { findTestWrapper } from '../../../utils/testUtils.js'

it(`Header 包含 input 框`, () => {
  const wrapper = shallowMount(TodoList)
  const input = wrapper.find('[data-test="input"]')
  expect(input.exists()).toBe(true)
})

it(`Header input 框初始内容为空`, () => {
  const wrapper = shallowMount(TodoList)
  const inputValue = wrapper.vm.inputValue;
  expect(inputValue).toBe('')
})

it(`Header input数据发生变化，数据应该跟着变`, async () => {
  const wrapper = shallowMount(TodoList)
  const input = findTestWrapper(wrapper, 'input')
  await input.setValue('set khan value')
  const inputValue = wrapper.vm.inputValue;
  expect(inputValue).toBe('set khan value')
})

it(`Header input输入回车无内容时，无反应`, () => {
  const wrapper = shallowMount(TodoList)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeFalsy()
})

it(`Header input输入回车有内容时，向外触发事件, 同时清空inputValue`, () => {
  const wrapper = shallowMount(TodoList)
  const input = findTestWrapper(wrapper, 'input')
  input.setValue('have content')
  input.trigger('keyup.enter')
  expect(wrapper.emitted().add).toBeTruthy()
  expect(wrapper.vm.inputValue).toBe('')
})

it(`Header 样式发生改变作提示`, () => {
  const wrapper = shallowMount(TodoList)
  expect(wrapper).toMatchSnapshot()
})

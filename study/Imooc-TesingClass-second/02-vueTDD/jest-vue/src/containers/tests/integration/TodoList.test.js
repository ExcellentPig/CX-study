import { mount } from '@vue/test-utils'
import { findTestWrapper } from '../../../utils/testUtils.js'
import TodoList from '../../TodoList/TodoList.vue'

import store from '../../store.js'

jest.useFakeTimers()

it(`
  1、用户会在header输入框输入内容
  2、用户会点击回车按钮
  3、列表项应该增加用户输入内容的列表项
`, async () => {
  const wrapper = mount(TodoList, { store })
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)
  const content = 'khan'
  await inputElem.setValue(content)
  inputElem.trigger('change')
  inputElem.trigger('keyup.enter')
  const listItems = findTestWrapper(wraooer, 'list-item')
  expect(listItems.length).toBe(1)
  expect(listItems.at(0).text()).toBe(content)
})

it(`当store 接收changeInputValue 的commit时， inputValue发生变化`, () => {
  const value = '123'
  store.commit('changeInputValue', value)
  expect(store.state.inputValue).toBe(value)
})


it(`
  1、用户进入页面时，请求远程数据
  2、列表应该展示远程返回的数据
`,() => {
  const wrapper = mount(TodoList, { store })
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(listItems.length).toBe(1)
  })
})

it(`
  1、用户进入页面时，等待5s 请求远程数据
  2、列表应该展示远程返回的数据
`,(done) => {
  const wrapper = mount(TodoList, { store })

  expect(setTimeout).toHaveBeenCalledTime(1)
   
  jest.runAllTimers()

  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(listItems.length).toBe(1)

  // setTimeout(() => {
  //   const listItems = findTestWrapper(wrapper, 'list-item')
  //   expect(listItems.length).toBe(1)
  //   done()
  // }, 5500)
})

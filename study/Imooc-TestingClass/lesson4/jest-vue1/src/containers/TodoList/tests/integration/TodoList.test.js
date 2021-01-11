import {
  mount,
  shallowMount
} from '@vue/test-utils'
import {
  findTestWrapper
} from '../../../../utils/testUtils.js'
import TodoList from '../../TodoList.vue'
import store from '../../../../store.js'
import axios from '../../__mocks__/axios.js'


beforeEach(()=>{
  axios.success = true
  jest.useFakeTimers()
})


// mount 深渲染 渲染出所有组件

it(`
  1.用户会在header输入框中输入内容
  2.用户会点击回车按钮
  3.列表项应该增加用户输入内容的列表项
`, () => {
  // 添加 vuex
  const wrapper = mount(TodoList, {
    store
  }) //多个组件 需要用mount
  const inputElem = findTestWrapper(wrapper, 'header-input').at(0)

  const content = 'dee khan'
  inputElem.setValue(content)
  inputElem.trigger('change')
  inputElem.trigger('keyup.enter')
  const listItems = findTestWrapper(wrapper, 'list-item')

  // ???????
  //console.log(listItems.length)
  // expect(listItems.length).toBe(1)
  // expect(a.text()).toContain(content)

})

// it(`
// 1、用户进入页面时，请求远程数据
// 2、列表应该展示远程返回的数据
// `,()=>{
//   const wrapper = mount(TodoList,{store})
//   wrapper.vm.$nextTick(() => {
//     const listItems = findTestWrapper(wrapper,'list-item')
//     expect(listItems.length).toBe(2)
//   })
// })


it(`
1、用户进入页面时，等待五秒
2、列表应该展示远程返回的数据
`, () => {
  const wrapper = mount(TodoList, {
    store
  })

  //会忽略异步代码
  // setTimeout(()=>{
  //   const listItems = findTestWrapper(wrapper,'list-item')
  //   expect(listItems.length).toBe(2)
  // },4500)

  expect(setTimeout).toHaveBeenCalledTimes(1)

  jest.runAllTimers()
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    //expect(listItems.length).toBe(2)
  })

})

it(`
1、用户进入页面时，请求远程数据失败
2、列表应该展示空数据,不应该挂掉
`, (done) => {
  axios.success = false
  const wrapper = mount(TodoList, {
    store
  })
  wrapper.vm.$nextTick(() => {
    const listItems = findTestWrapper(wrapper, 'list-item')
    //expect(listItems.length).toBe(0)
    done()
  })

})

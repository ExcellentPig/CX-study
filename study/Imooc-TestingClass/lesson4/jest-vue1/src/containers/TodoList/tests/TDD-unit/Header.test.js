import {
  shallowMount
} from '@vue/test-utils'

import Header from '../../components/Header.vue'
import { findTestWrapper } from '../../../../utils/testUtils.js'

describe('Header组件',()=>{
  it('样式发生改变 做提示',()=>{
    const wrapper = shallowMount(Header)
    expect(wrapper).toMatchSnapshot() //通过快照 当页面有改变时 就会提示快照改变
  })


  it('包含input框',()=>{
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper,'input')
    expect(input.exists()).toBe(true)
  })

  it('input框的初始内容为空',()=>{
    const wrapper = shallowMount(Header)
    const inputValue = wrapper.vm.inputValue
    expect(inputValue).toBe('')
  })

  it('input框值发生变化，数据应该跟着变',()=>{
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper,'input')
    input.setValue('dee khan')
    const inputValue = wrapper.vm.inputValue
    expect(inputValue).toBe('dee khan')
  })

  it('input框输入回车，无内容时，无反应',()=>{
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper,'input')
    input.setValue('')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeFalsy()
  })

  it('input框输入回车，有内容时，向外触发事件,同时清空inputValue',()=>{
    const wrapper = shallowMount(Header)
    const input = findTestWrapper(wrapper,'input').at(0)
    input.setValue('dee khan')
    input.trigger('keyup.enter')
    expect(wrapper.emitted().add).toBeTruthy()
    expect(wrapper.vm.inputValue).toBe('')
  })

})

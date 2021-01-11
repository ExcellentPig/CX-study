import {
  shallowMount
} from '@vue/test-utils'
import UndoList from '../../components/UndoList.vue'
import { findTestWrapper } from '../../../../utils/testUtils.js'


describe('UndoList组件',()=>{
  it('list参数为空数组[],count的值应该为0，且列表无内容',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: []}
    })
    const countElem = findTestWrapper(wrapper,'count')
    const listItems = findTestWrapper(wrapper,'item')
    expect(countElem.at(0).text()).toEqual('0')
    expect(listItems.length).toEqual(0)
  })

  it('list参数为[1，2，3],count的值应该为3，列表有内容，且存在删除按钮',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]}
    })
    const countElem = findTestWrapper(wrapper,'count')
    const listItems = findTestWrapper(wrapper,'item')
    const deleteButtons = findTestWrapper(wrapper,'delete-button')
    expect(countElem.at(0).text()).toEqual('3')
    expect(listItems.length).toEqual(3)
    expect(deleteButtons.length).toEqual(3)
  })

  it('删除按钮被点击时向外触发删除事件',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]}
    })
    const deleteButton = findTestWrapper(wrapper,'delete-button').at(1)
    deleteButton.trigger("click")
    //console.log(wrapper.emitted().delete)
    expect(wrapper.emitted().delete).toBeTruthy()
    expect(wrapper.emitted().delete[0][0]).toBe(1) //第一个按钮的值应该是1
  })

  it('列表项目被点击，向外触发status事件',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'div',value: 2},
      {status: 'div',value: 3},
      ]}
    })
    const deleteButton = findTestWrapper(wrapper,'item').at(1)
    deleteButton.trigger("click")
    expect(wrapper.emitted().status).toBeTruthy()
    expect(wrapper.emitted().status[0][0]).toBe(1) //第一个按钮的值应该是1
  })

  it('列表项显示一个输入框，两个正常列表内容',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'input',value: 2},
      {status: 'div',value: 3},
      ]}
    })
    const input = findTestWrapper(wrapper,'input')
    expect(input.at(0).element.value).toBe("2")
    expect(input.length).toBe(1)
  })

  it('input框 失去焦点时向外出触发reset事件',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'input',value: 2},
      {status: 'div',value: 3},
      ]}
    })
    const inputElem = findTestWrapper(wrapper,'input').at(0)
    inputElem.trigger('blur')
    expect(wrapper.emitted().reset).toBeTruthy()
  })

  it('输入框变化时，向外触发change事件',()=>{
    const wrapper = shallowMount(UndoList,{
      propsData: {list: [
      {status: 'div',value: 1},
      {status: 'input',value: 123},
      {status: 'div',value: 3},
      ]}
    })
    const inputElem = findTestWrapper(wrapper,'input').at(0)
    inputElem.trigger('change')
    //console.log(wrapper.emitted().change)
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().change[0][0]).toEqual({
      value: "123",
      index: 1
    })
  })

})

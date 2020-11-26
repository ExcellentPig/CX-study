import { createApp, } from 'vue'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import App from '@/App.vue'

describe('HelloWorld.vue', () => {
  // it('renders props.msg when passed',  async () => {
  //   const msg = 'new message'
  //   const wrapper = shallowMount(HelloWorld, {
  //     props: { msg }
  //   })
  //   // console.log(wrapper.props('msg'))
  //   // expect(wrapper.props('msg')).toEqual(msg)
  //   // expect(wrapper.text()).toMatch(msg)
  //   // expect(wrapper.findAll('.h1').length).toBe(1)

  //   await wrapper.setProps({ msg: 'hello' })
  //   // console.log(wrapper.props('msg'))
  //   expect(wrapper.props('msg')).toEqual('hello')

  // })

  it(`组件渲染正常`, () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: {
        msg
      }
    })
    console.log(wrapper.props('msg'))
    expect(wrapper).toMatchSnapshot()
  })
})


// describe(`HelloWorld.vue`, () => {
//   it(`测试HelloWorld.vue`, () => {
//     const root = document.createElement('div')
//     root.className = 'root'
//     document.body.appendChild(root)
//     // console.log(document.body)
//     createApp(App,{
//       msg: 'khan'
//     }).mount('.root')
//     console.log(document.body.innerHTML)
//     expect(document.getElementsByClassName('hello').length).toBe(1)
//   })
// })

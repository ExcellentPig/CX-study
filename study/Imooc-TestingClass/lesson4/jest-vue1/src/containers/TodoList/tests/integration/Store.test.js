import store from '../../../../store.js'

it(`当store接收changeInputValue的commit时，inputValue发生变化`,()=>{
  const value = '123'
  store.commit('changeInputValue',value)
  expect(store.state.inputValue).toBe(value)
})
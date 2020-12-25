function direc1(el, binding, vnode) {
  console.log('全局指令1', el, binding, vnode)
}

export default {
  bind(el, binding, vnode) {
    direc1(el, binding, vnode)
  }
}

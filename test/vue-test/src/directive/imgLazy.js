/*
  vue图片懒加载指令
    IntersectionOnserver对象的observe()方法向IntersectionOnserve对象的目标集合添加一个元素。
    一个监听者有一组阈值和一个根，但是可以监视多个目标元素，以查看这些目标元素可见区域的变化
*/
// 引入默认图片
import baseImg from '@/assets/logo.png'
// 为下面的防抖做准备
let timer = null
// 创建一个监听器
const observer = new IntersectionObserver((entries) => {
  // entries 是所有被监听对象的集合
  entries.forEach(entry => {
    if (entry.isInterecting || entry.intersectionRatio > 0) {
      // 当被监听元素到临界值且未加载图片时触发
      !entry.target.isLoaded && showImage(entry.target, entry.target.data_src)
    }
  })
})
function showImage (el, imgSrc) {
  const img = new Image()
  img.src = imgSrc
  img.onload = () => {
    el.src = imgSrc
    el.isLoaded = true
  }
}

export default {
  // 这里用inserted和bind都行，因为IntersectionObserver是异步的，以防意外还是用inserted好一点
  // inserted和bind的区别在于inserted时元素已经插入页面，能够直接获取到dom元素的位置信息
  inserted (el, binding, vnode) {
    clearTimeout(timer)
    el.src = baseImg
    // 将需要加载的图片地址绑定在dom上
    el.data_src = binding.value
    observer.observe(el)
    // 防抖 这里在组件卸载的时候停止监听
    const vm = vnode.context
    timer = setTimeout(() => {
      vm.$on('hook:beforeDestory', () => {
        observer.disconnect()
      })
    }, 20)
  },
  // 图片更新触发
  upate (el, binding) {
    el.isLoaded = false
    el.data_src = binding.value
  }
}

// 全局方法

import Vue from 'vue'
let show = () => console.log('全局方法')

Vue.prototype.$show = show // 服务端钩子内部不可以使用  服务端this不会指向vue实例

// 全局锅过滤器
import * as filters from '../assets/js/filter.js'

Object.keys(filters).forEach(key=>Vue.filter(key, filters[key]))

// 全局指令
import direc1 from '../assets/js/directives/directive1.js'
import direc2 from '../assets/js/directives/directive2.js'
Vue.directive('direc1', direc1)
Vue.directive('direc2', direc2)


// 全局组件
import UcButton from '../components/global/uc-button.vue'
Vue.component('uc-button', UcButton)

// 混入methods
Vue.mixin({ // 都会有这个
  methods: {
    $seo(title, content, payload=[]) {
      return {
        title,
        meta: [{
          hid: 'descript',
          name: 'keywords',
          content
        }].concat(payload)
      }
    }
  }
})

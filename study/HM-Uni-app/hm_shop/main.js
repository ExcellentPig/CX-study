import Vue from 'vue'
import App from './App'

// 全局挂载
import { myRequest } from './util/api.js'
Vue.prototype.$myRequest = myRequest

Vue.filter('formaDate', (date) => {
	const newDate = new Date(date)
	const year = newDate.getFullYear()
	const month = newDate.getMonth().toString().padStart(2, 0)
	const day = newDate.getDay().toString().padStart(2, 0) // 是否满足两位 不满足就在前面加0
	return year + '-' + month + '-' + day
})


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

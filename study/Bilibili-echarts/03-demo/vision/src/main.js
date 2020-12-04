import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import './assets/css/global.less'
import './assets/font/iconfont.css'
import SocketService from '@/utils/socket_service'
const app = createApp(App)
// 对服务端进行websocket的连接
SocketService.Instance.connect()
// 其他的组件  this.$socket
app.config.globalProperties.$socket = SocketService.Instance

// 将全局的echarts对象挂载到vue原型对象上
app.config.globalProperties.$echarts = window.echarts

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
app.config.globalProperties.$http = axios

app.use(store).use(router).mount('#app')

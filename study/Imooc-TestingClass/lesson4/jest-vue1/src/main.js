import Vue from 'vue'
import App from './App.vue'
import store from './store.js'

import TodoList from './containers/TodoList/TodoList.vue'
import NotFoundPage from './containers/NotFoundPage/NotFoundPage.vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: TodoList
  },
  {
    path: '*',
    component: NotFoundPage
  }
]

const router = new VueRouter({ routes })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

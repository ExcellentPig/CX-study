import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const auth = {
//   isLogin () {
//     return false
//   }
// }

const routes = [
  {
    path: '/film',
    name: 'Film',
    component: () => import('@/views/Film.vue'),
    children: [
      {
        path: 'nowplaying',
        component: () => import('@/views/Film/NowPlaying.vue')
      },
      {
        path: 'comingsoon',
        component: () => import('@/views//Film/CommingSoon.vue')
      },
      {
        path: '/film',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('@/views/Cinema.vue')
  },
  {
    path: '/center',
    name: 'Center',
    component: () => import('@/views/Center.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/city',
    name: 'City',
    component: () => import('@/views/City.vue')
  },
  {
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫

// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   if (to.path === '/center') {
//     console.log('盘查')
//     if (auth.isLogin()) {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

export default router

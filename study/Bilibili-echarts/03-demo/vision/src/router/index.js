import { createRouter, createWebHashHistory } from 'vue-router'
// import SellerPage from '@/views/SellerPage.vue'
// import TrendPage from '@/views/TrendPage.vue'
// import MapPage from '@/views/MapPage.vue'
// import RankPage from '@/views/RankPage.vue'
// import HotPage from '@/views/HotPage.vue'
// import StockPage from '@/views/StockPage.vue'
import ScreenPage from '@/views/ScreenPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/screen'
  },
  {
    path: '/screen',
    component: ScreenPage
  }
  // {
  //   path: '/sellerpage',
  //   component: SellerPage
  // },
  // {
  //   path: '/trendpage',
  //   component: TrendPage
  // },
  // {
  //   path: '/mappage',
  //   component: MapPage
  // },
  // {
  //   path: '/rankpage',
  //   component: RankPage
  // },
  // {
  //   path: '/hotpage',
  //   component: HotPage
  // },
  // {
  //   path: '/stockpage',
  //   component: StockPage
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

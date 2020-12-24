export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'myapp',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // middleware
  router: {
    middleware: 'auth',
    // 扩展路由
    extendRoutes (routes, resolve) {
      console.log(routes)
      routes.push({
        name: 'root',
        path: '/index',
        component: resolve(__dirname, 'pages/index.vue')
      })
    }
  },
  // 可以设置loading 也可以指定自己的组件
  // loading: {
  //   color: 'red',
  //   height: '3px'
  // },
  loading: '~/components/loading.vue',
  // Global CSS (https://go.nuxtjs.dev/config-css)
  // 全局样式
  css: [
    'assets/css/transition.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/router',
    {
      src: '~/plugins/axios',
      ssr: true // 开启服务端渲染
    },
    {
      src: '~/plugins/element-ui',
      ssr: true,
      // mode: 'server' // or client // v2.4+
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  // 跨域
  axios: {
    proxy: true, // 开启跨域行为
    // prefix: '/api', //baseUrl
  },
  proxy: { // 代理
    '/api/': {
      target: 'http://localhost:3001', //代理转发地址
      changeOrigin: true,
      pathRewrite: {
        // '^/api': ''
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/]
  }
}

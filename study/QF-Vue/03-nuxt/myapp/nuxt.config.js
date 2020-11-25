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

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
 odules: [
   // Doc: https://axios.nuxtjs.org/usage
   '@nuxtjs/axios',
   '@nuxtjs/proxy'
 ],
 /*
 ** Axios module configuration
 ** See https://axios.nuxtjs.org/options
 */
 axios: {
   proxy:true
 },
 proxy:{
   '/ajax': {
     target: 'https://m.maoyan.com',
     ws: true,
     changOrigin: true
   }
 },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [/^element-ui/],
  },
  router: {
    middleware: 'redirect',
    extendRoutes (routes) {
      routes.push({
        path: "/",
        redirect: "/film/nowplaying"
      })
    }
  }
}

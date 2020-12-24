<template>
  <nav>
    <el-menu
     :default-active="activeIndex"
     @select="handleSelect"
     active-text-color="#399"
     mode="horizontal"
    >
        <el-menu-item
          v-for="(item, index) in navs"
          :key="index"
          :index="index+''">
            {{ item.title }}
          </el-menu-item>
    </el-menu>
      <!-- <nuxt-link exact-active-class="app_header" to="/">首页</nuxt-link> -->
      <!-- <nuxt-link active-class="app_header" to="/index">首页</nuxt-link>
      <nuxt-link active-class="app_header" to="/goods">商品</nuxt-link>
      <nuxt-link active-class="app_header" to="/user">用户</nuxt-link>
      <nuxt-link active-class="app_header" to="/login">login</nuxt-link>
      <nuxt-link active-class="app_header" to="/reg">register</nuxt-link> -->
  </nav>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '-1',
      navs: [
        {path: '/index', title: 'home'},
        {path: '/goods', title: 'goods'},
        {path: '/user', title: 'user'},
      ]
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(this.navs[key].path)
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        let find = false
        this.navs.map((item, index) => {
          if (item.path == '/') this.$router.push({name: 'root'})
          if (route.path == item.path) {
            this.activeIndex = index + '';
            find = true
          }
        })
        if (!find) this.activeIndex = "-1"
      }
    }
  }
}
</script>

<style scoped="scoped">
/* .app_header {
  background: #399;
  color: #fff;
} */
</style>

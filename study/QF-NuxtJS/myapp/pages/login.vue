<template>
  <div>
  	<h2>login</h2>
    <el-divider></el-divider>
    <el-input v-model="username" placeholder="请输入" class="mb">
      <template slot="prepend">用户</template>
    </el-input>
    <el-input v-model="password" placeholder="请输入" class="mb">
      <template slot="prepend">密码</template>
    </el-input>
    <el-button type="primary" @click="login">login</el-button>
    <el-button type="default" @click="$router.push('/reg')">register</el-button>
    <button @click="login">登录</button>
    <el-tabs tab-position="right" style="height: 300ox;">
      <el-tab-pane label="栏目">
      </el-tab-pane>
      <el-tab-pane label="关注"></el-tab-pane>
    </el-tabs>
   <!-- {{ date.time | date }}
    {{ date.time | filezero }} -->
    <hr>
    <div v-direc1="'red'">v-direc1</div>
    <div v-direc2>v-direc2 {{ title }}</div>
    <hr>
    <uc-button></uc-button>
    <div class="box">box</div>
     <div class="box2">box</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      title: 'xxx'
    }
  },
  head() { // 页面配置meta
    return {
      meta: [
        {name: 'keywords', conent: 'aaa'}
      ]
    }
  },
  mounted() {
    this.$show()
  },
  // asyncData({query, params, axios}) {
  //   return $axios({})
  // },
  methods: {
    login () {
      this.$axios({
        url: '/api/login',
        method: 'post',
        data: {
          username: 'xxx',
          password: 'xxx'
        }
      }).then(res=> {
        this.$cookies.set('user', res.data)
        this.$store.commit('users/M_UPDATE_USER', res.data)
        if (!this.$route.query.path || /login|reg/.test(this.$route.query.path)) {
          this.$router.replace('/user')
        } else {
          this.$router.replace(this.$route.query.path)
        }
      })
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
$bg: #399;
.box {
  background: $bg;
}
.box2 {
  background: $theme-bg;
}
</style>

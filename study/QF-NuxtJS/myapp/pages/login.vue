<template>
  <div>
  	<h2>login</h2>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
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

<style>
</style>

<template>
  <div>
  	<h2>user</h2>
  </div>
</template>

<script>
  export default {
    middleware({ store, route, redirect, params, query }) {
      // store状态树信息
      // route 一条目标路由信息
      //redirect 路由的强制跳转
      // params query 校验参数的合理性
      // console.log('组件独享 前置守卫')
      // redirect('/login')
    },
    async asyncData ({ $axios }) {
      let res = await $axios({
        url: '/data/list.json'
      })
      console.log('读取到的静态资源', res)
      return { // 合并数据到data
        title: res.data.title
      }

      // 跨域
      // let res2 = await $axios({
      //   url: 'http://localhost:3031/api/hone'
      // })

    },
    // async fetch ({ $axios }) {
    //   let res = await $axios({
    //     url: '/data/list.json'
    //   })
    //   console.log('读取到的静态资源', res)
    // }
  }
</script>

<style>
</style>

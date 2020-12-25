<template>
  <div class="container">
    <h3>首页</h3>

    <h4>vuex操作</h4>
    <button @click="getStore">编程式的操作</button>
    <h1>index getters {{ getNav }}</h1>
    <h1>index state {{ bNav }}</h1>
    <h1>user state {{ data }}</h1>
    <h4>内部资源指向</h4>
    <!--
      相对路径 找到一些需要压缩资源 assets
      绝对路径 找到无需压缩的资源 static
      ~assets ~代表根
      @代表 src
    -->
   <!-- <img src="../assets/xxx.png" alt=""> -->
  <!-- <img src="/static/bg.jpg" alt=""> -->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';
export default {
  data() {
    return {
      a: 1
    };
  },
  // middleware: 'auth'
  middleware(context) {
    console.log('middleware pages');
  },
  validate({ params, query }) {
    // 参数有效性校验
    console.log('validate');
    return true; // true即为通过
  },
  // 读取数据 返回给组件
  asyncData(context) {
    // 异步业务逻辑 读取服务端的数据
    console.log('asyncData');
    return {
      b: 2
    };
  },
  // 读数据 返回vuex
  fetch({ store }) {
    // 异步业务逻辑 读取服务端的数据提交给vuex
    console.log('fetch');
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  // 服务端激活和失活 不存在
  // activated() {
  //   console.log('activated')
  // },
  // deactivated() {
  //   console.log('deactivated')
  // }
  methods: {
    getStore() {
      //   this.$store.dispatch('users/A_UPDATE_USER', {
      //   err:0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: 'user模块的actions提交出来的数据'
      //   }
      // })

      // this.$store.commit('users/M_UPDATE_USER', {
      //   err: 0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: 'user模块的mutations提交出来的数据'
      //   }
      // });

      // this.A_UPDATE_USER({
      //   err: 0,
      //   msg: '登录成功',
      //   token: '假token',
      //   data: {
      //     title: 'user模块的actions提交出来的数据'
      //     }
      //   }
      // )

      this.M_UPDATE_USER({
        err: 0,
        msg: '登录成功',
        token: '假token',
        data: {
          title: 'user模块的mutations提交出来的数据'
         }
        }
      )

    },
    ...mapActions('users', ['A_UPDATE_USER']),
    ...mapMutations('users', ['M_UPDATE_USER'])
  },
  computed: {
    ...mapGetters(['getNav']),
    ...mapState(['bNav']),
    ...mapState('users', ['data'])
    // ...mapState({
    //   home: state => state.home.data // 直接使用home即可
    // })
  },
  // async fetch({ $axios, store, error }) {
  //   let res = await $axios({
  //     url: 'xxx',
  //     params: {
  //       _limit: 1
  //     }
  //   })
  //   res.data && store.commit('home/M_UPDATE_HOME',{
  //     err: 0,
  //     data: res.data
  //   })
  // }
};
</script>

<style scoped="scoped">
  /* css 需要压缩的资源 assets */
 /* .bgimg {
    background: url('../asstes/xxx.png');
  } */
</style>

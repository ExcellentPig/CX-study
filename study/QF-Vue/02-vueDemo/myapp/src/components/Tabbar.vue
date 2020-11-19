<template>
  <div class="tabbar">
    <nav>
      <ul>
          <router-link to="/film" tag="li" active-class="myactive">
            <i class="iconfont icon-form"></i>
            film
          </router-link>
          <router-link to="/cinema" tag="li" active-class="myactive">
            <i class="iconfont icon-form"></i>
            cinema
          </router-link>
          <router-link to="/center" tag="li" active-class="myactive">
            <i class="iconfont icon-form"></i>
            center
          </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
</script>

<style scoped="scoped" lang="scss">
.myactive {
  color: red;
}
nav {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background: #fff;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>

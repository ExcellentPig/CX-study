<template>
  <div class="tabbar">
    <nav>
      <ul>
          <router-link to="/center" tag="li" active-class="myactive">center</router-link>
          <router-link to="/film" tag="li" active-class="myactive">film</router-link>
          <router-link to="/cinema" tag="li" active-class="myactive">cinema</router-link>
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
</style>

<template>
  <div>
    film
    <ul>
    	<nuxt-link tag="li" activeClass="active" to="/film/nowplaying">正在热映</nuxt-link>
      <nuxt-link tag="li" activeClass="active" to="/film/comingsoon">即将上映</nuxt-link>
    </ul>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
</script>

<style scoped="scoped">
.active {
  color: darkgoldenrod;
}
</style>

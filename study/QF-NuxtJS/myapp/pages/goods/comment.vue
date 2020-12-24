<template>
  <div>
  	<h3>评论</h3>
    <nuxt-link 
      :to="{name: 'goods-comment-uid', params: {uid: 3}, query: {a: 111, b: 222}}"
    >张珊</nuxt-link>
    <nuxt-link
      :to="{name: 'goods-comment-uid', params: {uid: 4}, query: {a: 1, b: 5}}"
    >王五</nuxt-link>
    <nuxt />
  </div>
</template>

<script>
</script>

<style>
</style>

<template>
  <div>
  	<h2>商品</h2>
    <nuxt-link to="/goods/1?a=1&b=2">商品列表01</nuxt-link>
    <nuxt-link to="/goods/2?a=11&b=22">商品列表02</nuxt-link>
    <nuxt-link :to="{name: 'goods-id', params: {id: 4}, query: {a: 999, b: 222}}">商品列表03</nuxt-link>
    <nuxt-link :to="{name: 'goods-id', params: {id: 3}, query: {a: 111, b: 222}}">商品列表04</nuxt-link>
    <nuxt-link to="/goods/comment">评论</nuxt-link>
    <nuxt />
  </div>
</template>

<script>
</script>

<style>
</style>

<template>
  <div>
    <van-tabbar v-model="active" active-color="#e5017d">
      <van-tabbar-item icon="shop-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="diamond-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" info="5" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

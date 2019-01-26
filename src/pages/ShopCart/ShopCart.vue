<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar   title="购物车" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cartInfo: [], // 购物车内的商品
      isEmpty: false
    }
  }
}
</script>

<style lang='scss' scoped>

</style>

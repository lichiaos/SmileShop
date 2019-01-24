<template>
  <div class="goods-info">
    <div class="goods-image">
      <img v-lazy="goodsImage" width="90%" />
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">{{goodsPrice | money }}</div>
  </div>
</template>

<script>
export default {
  props: [
    'goodsImage',
    'goodsName',
    'goodsPrice'
  ]
}
</script>

<style scoped>
  .goods-name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 8px;
  }
</style>

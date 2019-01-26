<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar   title="购物车" />
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div class="cart-list" v-for="(item, index) in cartInfo" :key="index">
      <div class="pang-img"><img :src="item.image" width="100%" /></div>
      <div class="pang-text">
        <div class="pang-goods-name">{{item.Name}}</div>
        <div class="pang-control">
          <van-stepper v-model="item.count" />
        </div>
      </div>
      <div class="pang-goods-price">{{item.price | money}}</div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      cartInfo: state => state.Cart.cartInfo
    })
  },
  data () {
    return {
      isEmpty: false
    }
  },
  methods: {
    getCartInfo () {
      // this.cartInfo.length ? this.isEmpty = false : this.isEmpty = true
      console.log(this.cartInfo)
    },
    clearCart () {
      this.$store.commit('/Cart/clearCart')
    }
  },
  created () {
    this.getCartInfo()
  }
}
</script>

<style lang='scss' scoped>
  .card-title{
    height: 2rem;
    line-height:2rem;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
    text-align: right;
  }
</style>

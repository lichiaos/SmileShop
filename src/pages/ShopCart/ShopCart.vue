<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="card-title">
      <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
    </div>
    <div class="cart-list" v-for="(item, index) in cartInfo" :key="index">
      <van-checkbox v-model="checked">
      </van-checkbox>
      <div class="pang-img"><img :src="item.image" width="100%" /></div>
      <div class="pang-text">
        <div class="pang-goods-name">{{item.Name}}</div>
        <div class="pang-control">
          <div class="pang-goods-price">
            <div class="price">
              {{item.price | money}}
            </div>
            <van-stepper v-model="item.count" />
          </div>
        </div>
      </div>
    </div>
    <van-submit-bar
      :price="totalMoney"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      cartInfo: state => state.Cart.cartInfo
    }),
    totalMoney () {
      let allTotal = 0
      this.cartInfo.forEach(item => {
        allTotal += item.price * item.count * 100
      })
      return allTotal
    }
  },
  data () {
    return {
      isEmpty: false,
      checked: true
    }
  },
  methods: {
    getCartInfo () {
      // this.cartInfo.length ? this.isEmpty = false : this.isEmpty = true
      console.log(this.cartInfo)
    },
    clearCart () {
      this.$store.commit('clearCart')
    },
    onSubmit () {}
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
  .cart-list {
    display: flex;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
    .pang-img{
      flex: 6;
      border: 1px solid #E4E7ED;
    }
    .pang-text {
      color: #f55;
      flex: 14;
      padding-left:10px;
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      .pang-goods-name{
        text-align: left;
        padding: 15px;
      }
      .pang-goods-price {
        display: flex;
        justify-content: space-around;
        .price {
          line-height: 30px;
        }
      }
    }
  }
</style>

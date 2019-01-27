<template>
  <div>
    <div class="navBar">
      <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="topimage-div">
      <img :src="goodsInfo.IMAGE1" alt="">
    </div>
    <div class="goods-name">{{goodsInfo.NAME}}</div>
    <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | money}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodsInfo.DETAIL" />
        </van-tab>
        <van-tab title="评价">
          正在制作中
        </van-tab>
      </van-tabs>
    </div>
    <!--底部购物车-->
    <div class="goods-bottom">
      <div>
        <van-button size="large" type="primary" @click="addToCart">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="danger">直接购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      goodsId: '',
      goodsInfo: {}
    }
  },
  created () {
    this.goodsId = this.$route.query.goodsId || this.$route.params.goodsId
    this.getDetail()
  },
  methods: {
    async getDetail () {
      let res = await this.$http.post(this.$URL.getDetail, {
        goodsId: this.goodsId
      })
      this.goodsInfo = res.data
    },
    /**
     * 先判断是否购物车中是否有这个商品,然后添加
     */
    addToCart () {
      let CartInfo = this.$store.state.Cart.cartInfo
      console.log(this.$store.state)
      let isAddToCart = CartInfo.find(item => item.goodsId)
      if (!isAddToCart) {
        let newGoods = {
          goodsId: this.goodsInfo.ID,
          Name: this.goodsInfo.NAME,
          price: this.goodsInfo.PRESENT_PRICE,
          image: this.goodsInfo.IMAGE1,
          count: 1
        }
        this.$store.commit('addGoods', newGoods)
        Toast.success('添加成功')
      } else {
        Toast.success('已有此商品')
      }
      this.$router.push({name: 'cart'})
    }
  }
}
</script>

<style lang='scss' scoped>
  .topimage-div {
    img {
      width: 100%;
    }
  }
  .goods-price {
    color: #FF4500;
  }
  .detail {
    font-size: 0;
  }
  .goods-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    z-index: 1000;
    width: 100%;
    background: #fff;
    div {
      flex: 1;
      padding: 5px;
    }
  }
</style>

<template>
  <div>
    <div class="search-bar">
      <van-row>
        <van-col span="3"><span><i class="iconfont icon-daohangdizhiweizhi"></i></span></van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <button>
            搜索
          </button>
        </van-col>
      </van-row>
    </div>
    <!--// 轮播图-->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(banner,index) in mainData.slides" :key="index">
          <img :src="banner.image" width="100%"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--分类商品-->
    <div class="type-bar">
      <div v-for="(cate,index) in mainData.category" :key="index">
        <img v-lazy="cate.image" width="100%"/>
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!--广告-->
    <div class="ad-banner" v-if="mainData.advertesPicture">
      <img v-lazy="mainData.advertesPicture.PICTURE_ADDRESS" width="100%">
    </div>
    <!--商品推荐-->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper class="swiper">
          <swiper-slide class="swiper-slide" v-for=" (item ,index) in mainData.recommend" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%"/>
              <div>{{item.goodsName}}</div>
              <div>{{item.price | money}} ({{item.mallPrice | money}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!--floor-->
    <div class="floor">
      <div class="floor-anomaly" v-if="mainData.floor1">
        <div class="floor-one"><img :src="mainData.floor1[0].image" width="100%" /></div>
        <div>
          <div class="floor-two"><img :src="mainData.floor1[1].image" width="100%" /></div>
          <div><img :src="mainData.floor1[2].image" width="100%" /></div>
        </div>
      </div>
    </div>

    <div class="floor-rule" v-if="mainData.floor1">
      <div v-for="(item ,index) in mainData.floor1.slice(3)" :key="index">
        <img :src="item.image" width="100%"/>
      </div>
    </div>

    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in mainData.hotGoods" :key="index">
              <good-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></good-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import goodInfo from '../../components/goodsInfoComponent'
import url from '@/serviceAPI.config.js'

export default {
  data () {
    return {
      mainData: {}
    }
  },
  created () {
    console.log(this.$router)
    axios.get(url.getShoppingMallInfo).then(res => {
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
        this.mainData = res.data.data
      }
    })
  },
  components: {
    goodInfo
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    height: 2.2rem;
    background-color: salmon;
    position: fixed;
    line-height: 2rem;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .search-input {
      width: 100%;
      height: 1.3rem;
      border-top: 0px;
      border-left: 0px;
      border-right: 0px;
      border-bottom: 1px solid 1px !important;
      background: salmon;
      color: #000;
    }
  }

  .banner {
    width: 100%;
    clear: both;
    margin-top: 2.2rem;
  }

  .type-bar {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    div {
      padding: .3rem;
      font-size: 12px;
      text-align: center;
      flex: 1;
    }
  }

  .recommend-area {
    background-color: #fff;
    margin-top: .3rem;
    .recommend-title {
      border-bottom: 1px solid #eee;
      font-size: 14px;
      padding: .2rem;
      color: salmon;
    }
    .recommend-body {
      border-bottom: 1px solid #eee;
      .swiper-slide {
        width: 7rem !important;
      }
      .recommend-item {
        width: 99%;
        border-right: 1px solid #eee;
        font-size: 12px;
        text-align: center;
      }
    }
  }

  .floor-anomaly {
    display: flex;
    border-bottom: 1px solid #ddd;
    .floor-anomaly div {
      width: 10rem;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      .floor-one{
        border-right:1px solid #ddd;
      }
      .floor-two{
        border-bottom:1px solid #ddd;
      }
    }
  }

  .floor-rule {
    display: flex;
    flex-flow: row wrap;
    .floor-rule div{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width:10rem;
      border-bottom:1px solid #ddd;
    }
    .floor-rule div:nth-child(odd){
      border-right: 1px solid #ddd;
    }
  }

  .hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
  }
</style>

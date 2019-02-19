<template>
  <div class="center">
    <van-tabs v-model="active">
      <van-tab title="推荐">
        推荐
      </van-tab>
      <van-tab title="图片">
        <van-row class="imgList" ref="imgWrap">
          <van-col span="11" class="imgItem" v-for="(item, index) in imgList" :key="index">
            <img alt="" v-lazy="item.ImgUrl" @click="goImgDetail(item.ImgId)">
            <p class="title">{{item.Title}}</p>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgList: [],
      page: 10,
      active: 1,
      scrollable: false
    }
  },
  created () {
    this.getImgList()
  },
  mounted () {
    window.addEventListener('scroll', this.handleScrollEvent)
  },
  beforeDestroy () {
    window.removeEventListener('scroll')
  },
  methods: {
    async getImgList (pageIndex = this.page) {
      let res = await this.$http.post(this.$URL.getAvatarList, {
        page: pageIndex
      })
      this.imgList = res.data
    },
    goImgDetail (id) {
      this.$router.push({path: 'center/images', query: {detailId: id}})
    },
    loadMoew () {
      this.page++
      this.getImgList(this.page)
    },
    handleScrollEvent () {
      // 滚轮滚动距离
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      // 可视区域高度
      let viewHeight = document.compatMode === 'CSS1Compat' // 标准模式开启
        ? document.documentElement.clientHeight
        : document.body.clientHeight
      // 文档距离
      let docunmentHeight = document.body.scrollHeight
      /**
       * 文档高度 - (可视区域高度 + 滚轮滚动距离) = 距离底部距离
       * 距离底部距离小于50的时候加载下一页数据
       */
      let fromBottom = docunmentHeight - (scrollTop + viewHeight)
      if (fromBottom <= 50 && this.scrollable) {
        this.loadMoew()
        this.scrollable = false
      } else {
        this.scrollable = true
      }
    }
  }
}
</script>

<style lang='scss' scoped>
    .imgList {
      background: #f8f8f8;
      height: 100%;
      margin-bottom: 3rem;
      .imgItem {
        background: #fff;
        margin: 6.5px;
        img {
          width: 90%;
        }
        .title {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0;
          font-size: 13px;
          color: salmon;
        }
      }
    }
</style>

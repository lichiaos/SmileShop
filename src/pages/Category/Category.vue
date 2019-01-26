<template>
  <div class="category">
      <van-nav-bar title="类别列表" fixed style="z-index: 9911111"/>
      <van-row style="margin-top: 46px;">
        <van-col span="6">
          <div id="leftNav">
            <li class="leftTitle" :class="{categoryActive: categoryIndex === index}" v-for="(item, index) in category" :key="index" @click="clickCate(index, item.ID)">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" animated :ellipsis="false" @click="clickSubCateGory">
              <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME">
                <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                  <van-list
                  >
                    <div class="list-item" v-for="(item , index) in contentList" :key="index" @click="goDetail(item.ID)">
                      <div class="list-item-img"><img :src="item.IMAGE1" width="100%" :onerror="errorImg" /></div>
                      <div class="list-item-text">
                        <div>{{item.NAME}}</div>
                        <div class="">{{item.ORI_PRICE | money}}</div>
                      </div>
                    </div>
                  </van-list>
                </van-pull-refresh>
              </van-tab>
            </van-tabs>
          </div>
        </van-col>
      </van-row>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0,
      contentList: [], // 商品信息
      page: 1, // 列表页数
      categorySubId: '', // 子分类id
      loading: false, // 上拉加载使用
      finished: false, // 上拉至底
      isRefresh: false, // 下拉加载
      errorImg: 'this.src="' + require('@/assets/logo.png') + '"'
    }
  },
  created () {
    this.getCategoryList()
    this.getContent()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
  },
  methods: {
    async getCategoryList () {
      let res = await this.$http.get(this.$URL.getCategoryList)
      this.category = res.data
      this.getSubCate(this.category[0].ID)
    },
    clickCate (index, categoryId) {
      this.categoryIndex = index
      this.page = 1
      this.getSubCate(categoryId)
    },
    async getSubCate (index) {
      let res = await this.$http.post(this.$URL.getCategorySubList, {
        categoryId: index
      })
      this.categorySub = res.data
      this.active = 0
      this.categorySubId = this.categorySub[0].ID
      this.getContent() // 默认进入详情
    },
    async getContent () {
      let res = await this.$http.post(this.$URL.getCategoryContent, {
        categoryId: this.categorySubId,
        page: this.page
      })
      if (res) {
        this.page++
        this.contentList = res.data
      } else {
        this.finished = true
      }
      this.loading = false
    },
    clickSubCateGory (index, title) {
      this.categorySubId = this.categorySub[index].ID
      this.getContent()
    },
    // 下拉刷新方法
    onRefresh () {
      setTimeout(() => {
        this.isRefresh = false
        this.finished = false
        this.contentList = []
        this.page = 1
        this.getContent()
      }, 500)
    },
    // 详情页
    goDetail (id) {
      this.$router.push({name: 'goods', params: { goodsId: id }})
    }
  }
}
</script>

<style lang='scss' scoped>
  .categoryActive{
    background-color: #fff;
  }
  .category {
    #leftNav {
      background: #fafafa;
      .leftTitle {
        height: 2.5rem;
        line-height: 2.5rem;
        border-bottom: 1px solid #E4E7ED;
        padding: 3px;
        font-size: 0.8rem;
        text-align: center;
        list-style: none;
      }
    }
    .list-item {
      display: flex;
      height: 6rem;
      font-size:0.8rem;
      border-bottom: 1px solid #f0f0f0;
      padding:5px;
      .list-item-img {
        flex: 1;
      }
      .list-item-text {
        flex: 2;
      }
    }
  }
</style>

<template>
  <div class="category">
      <van-nav-bar title="类别列表" fixed />
      <van-row style="margin-top: 46px;">
        <van-col span="6">
          <div id="leftNav">
            <li class="leftTitle" :class="{categoryActive: categoryIndex === index}" v-for="(item, index) in category" :key="index" @click="clickCate(index)">
              {{item.MALL_CATEGORY_NAME}}
            </li>
          </div>
        </van-col>
        <van-col span="18">右侧列表</van-col>
      </van-row>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      category: [],
      categoryIndex: 0
    }
  },
  created () {
    this.getCategoryList()
  },
  mounted () {
    let winHeight = document.documentElement.clientHeight
    console.log(winHeight)
    document.getElementById('leftNav').style.height = winHeight - 46 + 'px'
  },
  methods: {
    async getCategoryList () {
      let res = await this.$http.get(this.$URL.getCategoryList)
      this.category = res.data
    },
    async clickCate (index) {
      this.categoryIndex = index
      let res = await this.$http.post(this.$URL.getCategorySubList, {
        categoryId: index
      })
      console.log(res)
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
  }
</style>

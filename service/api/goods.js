const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

// 批量插入数据库
router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data-json/newGoods.json', 'utf-8', (err, data) => {
    if (err) return
    data = JSON.parse(data)
    console.log(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败' + saveCount)
        console.log(error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 将分类商品数据插入数据库
router.get('/insertAllCategory', async ctx => {
  fs.readFile('./data-json/category.json', 'utf-8', (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    let count = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map(item => {
      let newCategory = new Category(item)
      newCategory.save().then(() => {
        console.log(`成功插入次数${count}`)
        count++
      }).catch(e => {
        console.log(`失败次数${e}`)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 将分类商品子类目插入shujuku
router.get('/insertCategorySub', async ctx => {
  fs.readFile('./data-json/category_sub.json', 'utf-8', (err, data) => {
    if (err) console.log(err)
    data = JSON.parse(data)
    let count = 1
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map(item => {
      let newCategorySub = new CategorySub(item)
      newCategorySub.save().then(() => {
        count++
        console.log(`成功插入${count}`)
      }).catch(e => {
        console.log(e)
      })
    })
  })
  ctx.body = '开始导入数据'
})

// 根据接受的参数获取详情页数据
router.post('/getDetailGoodsInfo', async ctx => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ID: goodsId}).exec((err, res) => {
    if (err) {
      ctx.body = {
        code: 500,
        message: err
      }
    } else {
      ctx.body = {
        code: 200,
        message: 'success',
        data: res
      }
    }
  })
})

// 获取分类目录
router.get('/getCategoryList', async ctx => {
  try {
    const Category = mongoose.model('Category')
    let res = await Category.find().exec()
    ctx.body = {
      code: 200,
      data: res,
      message: 'success'
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    }
  }
})

// 获取分类下面的子分类
router.post('/getCategorySubList', async ctx => {
  try {
    const Category = mongoose.model('CategorySub')
    let categoryId = ctx.request.body.categoryId
    let res = await Category.find({MALL_CATEGORY_ID: categoryId}).exec()
    ctx.body = {
      code: 200,
      data: res,
      message: 'success'
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    }
  }
})

// 获取商品类别获取商品列表
router.post('/getGoodsListByCategorySubID', async (ctx) => {
  try {
    let categorySubId = ctx.request.body.categoryId
    let page = ctx.request.page.page
    let num = 10 // 每页显示数
    let start = (page - 1) * num
    const Goods = mongoose.model('Goods')
    let result = await Goods.find({SUB_ID: categorySubId}).skip(start).limit(num).exec()
    ctx.body = {code: 200, message: 'success', data: result}
  } catch (err) {
    ctx.body = {code: 500, message: err}
  }
})

module.exports = router

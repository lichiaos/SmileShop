const Router = require('koa-router')
const router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async(ctx) => {
  fs.readFile('./goods.json', 'utf-8', ((err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map(value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败' + saveCount)
      })
    }
  }))
  ctx.body = '开始导入数据'
})

module.exports = router

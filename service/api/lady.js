const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

// 处理爬取的数据
router.post('/insertLady', async (ctx) => {
  let insertData = ctx.request.body
  ctx.body = insertData
  console.log(insertData)
  let count = 1
  const HotGoods = mongoose.model('Lady')
  insertData.map(item => {
    let newHotGoods = new HotGoods(item)
    newHotGoods.save().then(() => {
      count++
      console.log(`成功插入${count}`)
    }).catch(e => {
      console.log(e)
    })
  })
})

module.exports = router

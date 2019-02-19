const Router = require('koa-router')
const router = new Router()
const mongoose = require('mongoose')

// 处理爬取的数据
router.post('/insertLady', async (ctx) => {
  let insertData = ctx.request.body
  ctx.body = insertData
  console.log(insertData)
  let count = 1
  const Ladys = mongoose.model('Lady')
  const LadyDetail = mongoose.model('LadyDetail')
  let LadyArr = [] // 等会做批量插入
  insertData.map(item => {
    LadyArr.push({
      Pid: item.ImgId,
      ImgUrlArr: item.Detail.ImgsArr
    })
    let newLadys = new Ladys(item)
    newLadys.save().then(() => {
      count++
      console.log(`成功插入${count}`)
      LadyDetail.insertMany(LadyArr).then((res) => {
        console.log(res)
        console.log('图片详情插入成功')
      }).catch(e => {
        console.log(e)
      })
    }).catch(e => {
      console.log(e)
    })
  })
})

// 获取头像列表
router.post('/getAvatarList', async ctx => {
  const Lady = mongoose.model('Lady')
  let page = ctx.request.body.page
  let num = 10
  let start = (page - 1) * num
  try {
    let res = await Lady.find().skip(start).limit(num).exec()
    ctx.body = {
      code: 200,
      message: 'success',
      data: res
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    }
  }
})

// 根据头像列表获取头像详情
router.post('/getImgDetail', async ctx => {
  const ImgId = ctx.request.body.imgId
  const LadyDetail = mongoose.model('LadyDetail')
  try {
    let res = await LadyDetail.findOne({Pid: ImgId}).exec()
    ctx.body = {
      code: 200,
      data: res.ImgUrlArr,
      message: 'success'
    }
  } catch (e) {
    ctx.body = {
      code: 500,
      message: e
    }
  }
})

module.exports = router

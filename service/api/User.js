const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = '这是用户操作首页'
})
router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: '注册失败,原因为:' + err
    }
  })
})
router.post('/login', async ctx => {
  let loginBody = ctx.request.body
  let { userName, password } = loginBody
  // 引入集合
  const User = mongoose.model('User')
  await User.findOne({userName: userName}).exec().then(async res => {
    console.log(res)
    if (res) {
      // 创建实例, 调动实例方法
      let newUser = new User()
      await newUser.comparePassword(password, res.password).then(isMatch => {
        ctx.body = {
          code: 200,
          message: isMatch
        }
      }).catch(err => {
        ctx.body = {
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: '用户名未找到, 请检查!'
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

module.exports = router

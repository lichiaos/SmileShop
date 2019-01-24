const Koa = require('koa')
const app = new Koa()
const { connect, initSchemas } = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')

let User = require('./database/schema/User.js')

app.use(bodyParser())
app.use(cors())

let user = require('./api/User.js')
let goods = require('./api/goods')

// 装载所有子路由
let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchemas()
})()

app.listen(3000, () => {
  console.log('[Server] starting at port 3000')
})

const mongoose = require('mongoose')
const db = 'mongodb://127.0.0.1/smile-db'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  mongoose.Promise = global.Promise
  let maxConnectionTimes = 3
  // 连接数据库
  mongoose.connect(db, {useMongoClient: true})
  return new Promise((resolve, reject) => {
    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', (err) => {
      console.log('***********数据库断开***********')
      if (maxConnectionTimes < 3) {
        maxConnectionTimes++
        // 进行重连
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题,程序无法搞定!')
      }
    })
    // 数据库出现错误的时候
    mongoose.connection.on('error', err => {
      console.log('***********数据库错误***********')
      if (maxConnectionTimes < 3) {
        maxConnectionTimes++
        mongoose.connect(db)
      } else {
        reject(err)
        throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
      }
    })
    // 链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
    })
  })
}

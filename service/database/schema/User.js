const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
// 加盐加密操作
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10

// 创建用户schema
const userSchema = new Schema({
  userId: ObjectId,
  userName: { index: { unique: true }, type: String },
  password: String,
  createAt: { type: Date, default: Date.now() },
  lastLoginAt: { type: Date, default: Date.now() }
}, {
  collection: 'user'
})

userSchema.pre('save', function (next) {
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err)
      this.password = hash
      next()
    })
  })
})

userSchema.methods = {
  // 密码对比的方法
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}

const User = mongoose.model('User', userSchema)
exports = User

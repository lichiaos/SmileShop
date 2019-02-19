const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 美女信息
const LadySchema = new Schema({
  Id: String,
  Title: String,
  ImgUrl: String
}, {
  collection: 'Lady'
})

exports.LadySchema = mongoose.model('Lady', LadySchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 美女主图
const LadySchema = new Schema({
  ImgId: Number,
  Title: String,
  ImgUrl: String
}, {
  collection: 'Lady'
})

// 美女详情图片
const LadyDetailSchema = new Schema({
  Pid: Number,
  ImgUrlArr: Array
},{
  collection: 'LadyDetail'
})

exports.LadySchema = mongoose.model('Lady', LadySchema)
exports.LadyDetailSchema = mongoose.model('LadyDetail', LadyDetailSchema)

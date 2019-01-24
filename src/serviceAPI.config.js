const BASEURL = 'https://www.easy-mock.com/mock/5c46b1e0765dc578878eaf0f/smileShop/'
const LOCALURL = 'http://localhost:3000/'
const URL = {
  getShoppingMallInfo: BASEURL + 'getMainData',
  getGoodsInfo: BASEURL + 'getGoodsInfo',
  register: LOCALURL + 'user/register', // 用户注册接口
  login: LOCALURL + 'user/login' // 用户登录接口
}
module.exports = URL

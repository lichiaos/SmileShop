/**
 * axios封装, 请求拦截, 响应拦截统一处理
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

/**
 * 增加一秒的提示蒙层
 * @param msg
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  })
}

/**
 * 跳转登录页
 * 携带当前页面路由
 */

const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRouter.fullPath
    }
  })
}

/**
 * 请求失败后的统一处理
 * @param {Number} status 请求失败的状态码
 */

const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态, 跳转登录页
    case 401:
      toLogin()
      break
    // 403: token过期, 清除token, 并跳转登录页
    case 403:
      tip('登录过期, 请重新登录')
      sessionStorage.removeItem('token')
      store.commit('loginSuccess', null)
      setTimeout(() => {
        toLogin()
      }, 1000)
      break
    // 404 请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      tip(other)
  }
}

// 创建axios实例
let instance = axios.create({ timeout: 1000 * 5 })
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/**
 * 请求拦截器
 * 每次请求前必须在请求头上携带token
 */
// instance.interceptors.request.use(
//   config => {
//     const token = store.state.token
//     token && (config.headers.Authorization = token)
//     return config
//   },
//   error => Promise.error(error)
// )

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功, 只取data里面后台返回的部分
  res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求发出,但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      /*
      *  处理断网的情况, 更新network中的状态
      *  显示断网提示组件
      * */
      // store.commit('changeNetwork', false)
      Toast.fail('断网了')
    }
  }
)
export default instance

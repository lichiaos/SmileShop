// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './utils/filter'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import http from '@/utils/http.js'
import url from '@/serviceAPI.config.js' // 引入所有定义的api接口
import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  TreeSelect,
  Cell,
  PullRefresh
} from 'vant'
Vue
  .use(Button)
  .use(Row)
  .use(Col)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(List)
  .use(Field)
  .use(NavBar)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(TreeSelect)
  .use(Cell)
  .use(PullRefresh)
  .use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.$filter = Object.keys(filters).reduce((s, key) => {
  Vue.filter(key, filters[key])
  s[key] = filters[key]
  return s
}, {})

Vue.prototype.$http = http
Vue.prototype.$URL = url

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

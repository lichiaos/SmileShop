// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as filters from './utils/filter'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import http from '@/utils/http.js'
import { Button, Row, Col, Swipe, SwipeItem, Lazyload, List, Field, NavBar, Tabbar, TabbarItem } from 'vant'
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Field).use(NavBar).use(Tabbar).use(TabbarItem)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.prototype.$filter = Object.keys(filters).reduce((s, key) => {
  Vue.filter(key, filters[key])
  s[key] = filters[key]
  return s
}, {})

Vue.prototype.$http = http

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

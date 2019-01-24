import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'ShoppingMall',
      component: () => import('@/pages/Home/ShoppingMall')
    },
    {
      name: '404',
      path: '/404',
      component: () => import('@/components/notfound.vue')
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/pages/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('@/pages/Category/Category')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/ShopCart/ShopCart')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/pages/Personal/Personal')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

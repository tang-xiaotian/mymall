// import {Vue} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// import VueRouter from 'vue-router';
// const Home =()=> import('../views/home/Home.vue')
// const Category =()=> import('../views/category/category.vue')
// const Cart =()=> import('../views/cart/cart.vue')
// const Profile =()=> import('../views/profile/profile.vue')

import Home from '../views/home/Home.vue'
import Category from '../views/category/category.vue'
import Cart from '../views/cart/cart.vue'
import Profile from '../views/profile/profile.vue'


// Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// const router = new VueRouter({
//   routers,
//   mode:'history'
// })

//3.导出
export default router

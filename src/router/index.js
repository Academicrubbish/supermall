import Vue from 'vue'
import VueRouter from 'vue-router'

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
      path:'/',
      redirect:'/home'
  },
  {
      path: '/home',
      component:() => import('../views/home/Home')
  },
  {
      path: '/profile',
      component:() => import('../views/profile/Profile')
  },
  {
      path: '/shopcart',
      component:() => import('../views/shopcart/Shopcart')
  },
  {
      path: '/detail/:iid',
      component:() => import('../views/detail/Detail')
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//3.导出
export default router

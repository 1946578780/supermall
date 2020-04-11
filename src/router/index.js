import Vue from "vue";
import VueRouter from "vue-router";
import TabBar from '@/components/common/tabbar/TabBar'
Vue.use(VueRouter);

const Home = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const CateGory = () => import('../views/category/CateGory')
const ProFile = () => import('../views/profile/ProFile')
const Detail = () => import('views/detail/Detail')
const routes = [
  {
    path: '/',
    name: 'TabBar',
    component: TabBar
  },
  {
    path: '/Home',
    component: Home
  },
  {
    path: '/Cart',
    component: Cart
  },
  {
    path: '/CateGory',
    component: CateGory
  },
  {
    path: '/ProFile',
    component: ProFile
  },
  {
    path: '/Detail:iid',
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

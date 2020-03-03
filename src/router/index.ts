import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const SystemLayout = () => import('@/layouts/SystemLayout.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const PageSetting = () => import('@/views/PageSetting.vue')

Vue.use(VueRouter)

const ROUTER = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/system',
      name: 'SystemLayout',
      component: SystemLayout,
      children: [
        {
          path: '/',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'page-setting',
          name: 'PageSetting',
          component: PageSetting
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
});

export default ROUTER;

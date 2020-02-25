import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')

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

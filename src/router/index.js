import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Home from '@/views/Home'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DefaultLayout',
      component: DefaultLayout,
      children: [
        {
          path: '/Home',
          name: 'Home',
          component: Home
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})

import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'
const DefaultLayout = () => import('@/layouts/DefaultLayout.vue')
const SystemLayout = () => import('@/layouts/SystemLayout.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const PageSetting = () => import('@/views/PageSetting.vue')
const Roles = () => import('@/views/Roles.vue')
const Groups = () => import('@/views/Groups.vue')
const Users = () => import('@/views/Users.vue')
const Subjects = () => import('@/views/Subjects.vue')
const SubjectEdit = () => import('@/views/SubjectEdit.vue')
const Question = () => import('@/views/Question.vue')
const GenExamination = () => import('@/views/GenExamination.vue')
const QuestionData = () => import('@/views/QuestionData.vue')

Vue.use(VueRouter)

const ROUTE_TREE: RouterOptions = {
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
        },
        {
          path: '/gen-examination/:id',
          name: 'GenExamination',
          component: GenExamination
        },
        {
          path: '/question/:id',
          name: 'QuestionData',
          component: QuestionData
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
        },
        {
          path: 'roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: 'groups',
          name: 'Groups',
          component: Groups
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
        },
        {
          path: 'subjects',
          name: 'Subjects',
          component: Subjects,
        },
        {
          path: 'subjects/edit/:id',
          name: 'SubjectEdit',
          component: SubjectEdit,
        },
        {
          path: 'subjects/add',
          name: 'SubjectEdit',
          component: SubjectEdit,
        },
        {
          path: 'question',
          name: 'Question',
          component: Question
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
}
const ROUTER = new VueRouter(ROUTE_TREE);

export default ROUTER;
export {
  ROUTE_TREE
};
export * from 'vue-router'
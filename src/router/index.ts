import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Persons from '../views/Persons.vue'
import CV from '../views/CV.vue'
import Account from '../views/Account.vue'
import Invite from '../views/Invite.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/persons',
    name: 'Persons',
    component: Persons
  },
  {
    path: '/persons/:id',
    name: 'CV',
    component: CV
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/invite',
    name: 'Invite',
    component: Invite
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

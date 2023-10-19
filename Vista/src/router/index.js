import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/adminMenu',
    name: 'adminMenu',
    component: () => import('../views/AdminMenuView.vue') 
  },
  {
    path: '/userMenu',
    name: 'userMenu',
    component: () => import('../views/UserMenuView.vue')
  },
  {
    path: '/crearVotacion',
    name: 'crearVotacion',
    component: () => import('../views/CrearVotacionView.vue')
  },
  {
    path: '/votar',
    name: 'votar',
    component: () => import('../views/VotarView.vue')
  },
  {
    path: '/detenerVotacion',
    name: 'detenerVotacion',
    component: () => import('../views/DetenerVotacionView.vue')
  }


]

const router = new VueRouter({
  routes
})

export default router

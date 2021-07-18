import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/feed',
    name: 'Feed',
    component: () => import('../views/Feed.vue')
  },
  {
    path: '/pageperso',
    name: 'Pageperso',
    component: () => import('../views/Pageperso.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
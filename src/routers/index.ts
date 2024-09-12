import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/views/Home.vue'

const routes = [
  { path: '/:pathMatch(.*)*', component: Home }
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
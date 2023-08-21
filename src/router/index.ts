import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/:catchAll(.*)', // 使用动态参数和通配符
      component: () => import('@/views/home.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/home.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("@/views/new.vue"),
    },
    // 其他路由配置...
    {
      path: '/:catchAll(.*)', // 使用动态参数和通配符
      component: () => import("@/views/home.vue"),
    }
  ],
})

export default router

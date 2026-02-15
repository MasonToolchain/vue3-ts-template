import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export const installRouter = (app: App) => {
  app.use(router)
}

export default router

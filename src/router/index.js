import useAuth from '@/plugins/authServices'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
const { isAuthenticated } = useAuth()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
  scrollBehavior() {
    return { top: 0 }
  },
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !isAuthenticated()) {
    next('/login')
  } else if (to.name == 'login' && isAuthenticated()) {
    next('/')
  }
  next()
})
export default router

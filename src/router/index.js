import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Anfitrion from '../views/Anfitrion.vue'
import AdminView from '../views/AdminView.vue'
import Turista from '../views/Turista.vue'
import Home from '../views/Home.vue'

import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/turista',
    name: 'turista',
    component: Turista,
    meta: { requiresAuth: true, role: 'turista' },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/anfitrion',
    name: 'anfitrion',
    component: Anfitrion,
    meta: { requiresAuth: true, role: 'anfitrion' },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 🚦 Protección global de rutas
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role
  const isLoggedIn = userStore.isAuthenticated

  if (requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (requiredRole && userStore.user?.role !== requiredRole) {
    return next('/')
  }

  next()
})

export default router

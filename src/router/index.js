import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Navegador from '@/components/Navegador.vue'
import PlacesView from '@/views/anfitrion/PlacesView.vue'
import PlaceDetail from '@/components/PlaceDetail.vue'
// Importación de vistas autenticadas
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
// Importación de vistas admin
import AdminView from '../views/admin/AdminView.vue'
import CrudPueblos from '@/views/admin/CrudPueblos.vue'
import mainAdmin from '@/views/admin/dashboardAdmin/mainAdmin.vue'
// Importación de vistas de usuario
import Anfitrion from '../views/user/Anfitrion.vue'
import Turista from '../views/user/Turista.vue'
import VistaPueblos from '@/views/user/VistaPueblos.vue'
// Importación de la vista principal
import Home from '../views/Home.vue'
// Importacion del main pueblos
import TownMain from '@/views/towns/TownMain.vue'

import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  {
    path: '/',
    redirect: '/Home',
  },
  {
    path: '/Home',
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
    path: '/pueblos',
    name: 'VistaPueblos',
    component: VistaPueblos,
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
    path: '/pueblos',
    name: 'VistaPueblos',
    component: VistaPueblos,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/pueblos',
    name: 'CrudPueblos',
    component: CrudPueblos,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/main',
    name: 'mainAdmin',
    component: mainAdmin,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/towns/:id',
    name: 'town-detail',
    component: TownMain,
  },
  {
    path: '/towns/:id/places',
    name: 'places',
    component: PlacesView,
    meta: { requiresAuth: true, roles: ['anfitrion', 'admin'] },
  },
  {
    path: '/places/:id',
    name: 'place-detail',
    component: PlaceDetail,
    meta: { requiresAuth: true, roles: ['anfitrion', 'admin', 'turista'] },
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

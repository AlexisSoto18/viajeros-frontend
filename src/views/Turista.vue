<template>
  <div>
    <h1>Bienvenido, Turista</h1>
    <p>Aquí puedes explorar experiencias, productos y rutas disponibles.</p>
    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>

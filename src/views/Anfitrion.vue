<template>
  <div>
    <h1>Panel de Anfitrion</h1>
    <p>Sólo para usuarios logueados.</p>
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

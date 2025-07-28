<template>
  <nav>
    <router-link to="/Home">Inicio</router-link>
    <router-link to="/dashboard" v-if="userStore.isAuthenticated">Panel</router-link>
    <router-link to="/login" v-if="!userStore.isAuthenticated">Login</router-link>
    <router-link to="/register" v-if="!userStore.isAuthenticated">Registro</router-link>
    <button @click="userStore.logout" v-if="userStore.isAuthenticated">Cerrar sesión</button>
  </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import NavbarAdmin from './components/NavbarAdmin.vue';
import { useUserStore } from './stores/user.js';
import { computed } from 'vue';

const userStore = useUserStore();
const isAdmin = computed(() => userStore.isAdmin);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar siempre visible -->
    <Navbar />
    <NavbarAdmin v-if="isAdmin" />
    <!-- Contenido de vistas -->
    <main class="flex-1 flex items-center justify-center p-4">
      <RouterView />
    </main>
  </div>
</template>

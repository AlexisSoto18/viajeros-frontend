<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import ViajerosMsm from './components/ViajerosMsm.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar siempre visible -->
    <Navbar />
    <!-- Contenido de vistas -->
    <main class="flex-1 flex items-center justify-center p-4">
      <RouterView />
    </main>
  </div>
</template>

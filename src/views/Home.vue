<script setup>
import { ref, onMounted } from 'vue'

const mensaje = ref('')
const texto = 'Bienvenido, viajero 🌍, dev'

onMounted(() => {
  let i = 0
  const velocidad = 80
  const animar = () => {
    if (i < texto.length) {
      mensaje.value += texto.charAt(i)
      i++
      setTimeout(animar, velocidad)
    }
  }
  animar()
})
</script>

<template>
  <main class="flex flex-col items-center justify-center text-center py-12 px-4">
    <h1 class="text-5xl font-extrabold tracking-wide mb-6 text-gray-900 dark:text-white drop-shadow-md">
      {{ mensaje }}
    </h1>
    <p class="text-lg text-gray-700 dark:text-gray-300 max-w-xl">
      Esta es una plataforma para descubrir experiencias únicas, conectar con comunidades locales y explorar los
      Pueblos Mágicos de México.
    </p>
  </main>
</template>

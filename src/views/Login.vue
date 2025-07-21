<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br bg-grey-100 from-gray-200 to-gray-300"
  >
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          required
        />

        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          required
        />

        <button
          type="submit"
          class="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300"
        >
          Ingresar
        </button>
      </form>

      <p v-if="error" class="mt-4 text-center text-red-600 text-sm">
        Correo o contraseña incorrectos
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref(false)

const userStore = useUserStore()
const router = useRouter()

const handleLogin = async () => {
  const success = await userStore.login(email.value, password.value)
  if (success) {
    const role = userStore.user.role
    if (role === 'admin') {
      router.push('/admin')
    } else if (role === 'anfitrion') {
      router.push('/dashboard')
    } else {
      router.push('/turista')
    }
  } else {
    error.value = true
  }
}
</script>

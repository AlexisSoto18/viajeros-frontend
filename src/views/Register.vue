<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br bg-grey-100 from-gray-200 to-gray-300"
  >
    <div class="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Crear cuenta</h2>
      <form @submit.prevent="handleRegister" class="space-y-4">
        <input
          v-model="full_name"
          type="text"
          placeholder="Nombre completo"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          required
        />
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
        <input
          v-model="passwordConfirmation"
          type="password"
          placeholder="Confirmar contraseña"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
          required
        />

        <!-- Selector personalizado -->
        <div class="relative w-full">
          <button
            type="button"
            @click="isDropdownOpen = !isDropdownOpen"
            class="w-full px-4 py-2 text-left bg-white border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
          >
            {{ selectedLabel }}
          </button>

          <ul
            v-if="isDropdownOpen"
            class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-md"
          >
            <li
              v-for="option in options"
              :key="option.value"
              @click="selectOption(option)"
              class="px-4 py-2 cursor-pointer hover:bg-indigo-100 text-gray-700"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-blue-900 transition duration-300"
        >
          Registrarse
        </button>
      </form>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import api from '@/services/api'

const full_name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const role = ref('')
const error = ref('')

const isDropdownOpen = ref(false)
const selectedLabel = ref('Selecciona un rol')

const options = [
  { value: 'turista', label: 'Turista' },
  { value: 'anfitrion', label: 'Anfitrión' },
]

function selectOption(option) {
  role.value = option.value
  selectedLabel.value = option.label
  isDropdownOpen.value = false
}

const router = useRouter()
const userStore = useUserStore()

const handleRegister = async () => {
  try {
    const response = await api.post('/api/register', {
      full_name: full_name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
      role: role.value,
    })

    userStore.token = response.data.token
    userStore.user = response.data.user
    localStorage.setItem('token', userStore.token)
    localStorage.setItem('user', JSON.stringify(userStore.user))
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.error?.[0] || 'Registro fallido'
    console.error(err)
  }
}
</script>

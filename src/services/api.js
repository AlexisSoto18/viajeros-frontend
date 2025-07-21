import axios from 'axios'
import { useUserStore } from '@/stores/user'
const api = axios.create({
  baseURL: 'http://localhost:3000', // Cambia por el host en producción
  headers: {
    'Content-Type': 'application/json',
  },
})

// Agrega token automáticamente si existe
api.interceptors.request.use((config) => {
  const userStore = useUserStore()
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`
  }
  return config
})

export default api

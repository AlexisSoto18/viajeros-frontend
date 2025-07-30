import { defineStore } from 'pinia'
import api from '@/services/api' // asumimos que ya configuraste axios aquí

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.token
    },
    isAdmin(state) {
      return state.user?.role === 'admin'
    },
    isAnfitrion(state) {
      return state.user?.role === 'anfitrion'
    },
    isTurista(state) {
      return state.user?.role === 'turista'
    },
  },

  actions: {
    async login(email, password) {
      try {
        const response = await api.post('/login', { email, password })
        this.token = response.data.token
        this.user = response.data.user

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))
        return true
      } catch (error) {
        console.error('Login failed:', error)
        return false
      }
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    async validateToken() {
      try {
        const response = await api.get('/validate', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = response.data.user
        return true
      } catch (error) {
        this.logout()
        return false
      }
    },
  },
})

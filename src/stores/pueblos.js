import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePueblosStore = defineStore('pueblos', {
    state: () => ({
        lista: [],
    }),
    actions: {
        async fetchAll() {
            const res = await api.get('/pueblo_magicos')
            this.lista = res.data
        }
    }
})

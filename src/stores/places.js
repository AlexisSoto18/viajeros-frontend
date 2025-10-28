import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePueblosStore = defineStore('places', {
  state: () => ({
    lista: [],
  }),
  actions: {
    async fetchAll() {
      const res = await api.get('/places')
      this.lista = res.data
    },
  },
})
export const listPlaces = (puebloId, params = {}) =>
  api.get(`/pueblo_magicos/${puebloId}/places`, { params })

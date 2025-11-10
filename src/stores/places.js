import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePlacesStore = defineStore('places', {
  state: () => ({
    lista: [],
  }),

  actions: {
    // Obtener todos los lugares de un pueblo mágico
    async fetchAll(puebloId) {
      const res = await api.get(`/pueblo_magicos/${puebloId}/places`)
      this.lista = res.data
    },

    // Crear un nuevo lugar
    async create(puebloId, placeData) {
      await api.post(`/pueblo_magicos/${puebloId}/places`, { place: placeData })
      await this.fetchAll(puebloId)
    },

    // Actualizar un lugar existente
    async update(id, placeData, puebloId) {
      await api.put(`/places/${id}`, { place: placeData })
      await this.fetchAll(puebloId)
    },

    // Eliminar un lugar
    async delete(id, puebloId) {
      await api.delete(`/places/${id}`)
      await this.fetchAll(puebloId)
    },
    //  Aprobar lugar
    async approve(id, puebloId) {
      await api.post(`/admin/places/${id}/approve`)
      await this.fetchAll(puebloId)
    },

    //  Desaprobar lugar
    async unapprove(id, puebloId) {
      await api.post(`/admin/places/${id}/unapprove`)
      await this.fetchAll(puebloId)
    },
  },
})

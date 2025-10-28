import api from './api'

// GET /api/pueblo_magicos/:id
export const getTown = (id) => api.get(`/pueblo_magicos/${id}`)

export const listPlaces = (puebloId, params = {}) =>
  api.get(`/pueblo_magicos/${puebloId}/places`, { params })

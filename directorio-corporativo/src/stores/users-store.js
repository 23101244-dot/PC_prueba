import { defineStore, acceptHMRUpdate } from 'pinia'
import api from '@/services/api'

// Guarda TODOS los usuarios una sola vez (Dashboard, Filtros y Comparar)
export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    loading: false,
    loaded: false,
  }),

  actions: {
    async fetchAll() {
      if (this.loaded) return // ya están en memoria, no se vuelve a llamar a la API
      this.loading = true
      try {
        // limit=0 trae todos los usuarios (por defecto la API solo devuelve 30)
        const { data } = await api.get('/users', { params: { limit: 0 } })
        this.users = data.users
        this.loaded = true
      } finally {
        this.loading = false
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot))
}

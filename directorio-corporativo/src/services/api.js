import axios from 'axios'

// Instancia única de axios: si cambia la API, solo se modifica aquí
const api = axios.create({
  baseURL: 'https://dummyjson.com',
})

export default api

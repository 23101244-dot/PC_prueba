<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Directorio de empleados</div>
    <UserSearch v-model="search" />
    <UserTable :search="search" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import UserSearch from '@/components/users/UserSearch.vue'
import UserTable from '@/components/users/UserTable.vue'

// Texto de búsqueda compartido entre la caja (P2) y la tabla (P1)
const search = ref('')
</script>

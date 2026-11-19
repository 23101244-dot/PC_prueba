<template>
  <q-page class="q-pa-md">
    <q-btn flat icon="arrow_back" label="Volver al directorio" to="/" no-caps class="q-mb-md" />

    <!-- Loading -->
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <!-- Error -->
    <q-banner v-else-if="errorMessage" class="bg-red-1 text-negative" rounded>
      {{ errorMessage }}
    </q-banner>

    <!-- Detalle con pestañas -->
    <q-card v-else-if="user" flat>
      <q-tabs v-model="tab" align="left" active-color="primary" indicator-color="primary" no-caps>
        <q-tab name="info" icon="badge" label="Información" />
      </q-tabs>
      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="info" class="q-px-none">
          <UserDetail :user="user" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import UserDetail from '@/components/users/UserDetail.vue'

const route = useRoute()

const user = ref(null)
const loading = ref(false)
const errorMessage = ref('')
const tab = ref('info')

// P3: GET /users/{id}
async function loadUser(id) {
  loading.value = true
  errorMessage.value = ''
  user.value = null

  try {
    const { data } = await api.get(`/users/${id}`)
    user.value = data
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'No se pudo cargar el usuario.'
  } finally {
    loading.value = false
  }
}

// Se ejecuta al entrar y cada vez que cambia el id de la URL
watch(
  () => route.params.id,
  (id) => {
    if (id) loadUser(id)
  },
  { immediate: true },
)
</script>

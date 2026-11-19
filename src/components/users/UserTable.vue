<template>
  <div>
    <q-banner v-if="errorMessage" class="bg-red-1 text-negative q-mb-md" rounded>
      {{ errorMessage }}
    </q-banner>

    <!-- P1: QTable con paginación del lado del servidor (limit / skip) -->
    <q-table
      title="Empleados"
      :rows="rows"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      :rows-per-page-options="[5, 10, 20, 50]"
      :loading="loading"
      loading-label="Cargando usuarios..."
      no-data-label="No hay usuarios para mostrar"
      rows-per-page-label="Filas por página"
      flat
      bordered
      @request="onRequest"
    >
      <!-- Fotografía -->
      <template #body-cell-image="props">
        <q-td :props="props">
          <q-avatar size="40px">
            <img :src="props.value" :alt="props.row.firstName" />
          </q-avatar>
        </q-td>
      </template>

      <!-- Género con color -->
      <template #body-cell-gender="props">
        <q-td :props="props">
          <q-badge :color="props.row.gender === 'male' ? 'blue' : 'pink'">
            {{ props.value }}
          </q-badge>
        </q-td>
      </template>

      <!-- Acción: ver detalle -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="visibility"
            :to="`/usuarios/${props.row.id}`"
          >
            <q-tooltip>Ver detalle</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const columns = [
  { name: 'image', label: 'Foto', field: 'image', align: 'center' },
  {
    name: 'fullName',
    label: 'Nombre completo',
    field: (row) => `${row.firstName} ${row.lastName}`,
    align: 'left',
  },
  { name: 'age', label: 'Edad', field: 'age', align: 'center' },
  {
    name: 'gender',
    label: 'Género',
    field: 'gender',
    align: 'center',
    format: (val) => (val === 'male' ? 'Masculino' : 'Femenino'),
  },
  { name: 'email', label: 'Correo', field: 'email', align: 'left' },
  { name: 'company', label: 'Empresa', field: (row) => row.company.name, align: 'left' },
  { name: 'title', label: 'Cargo', field: (row) => row.company.title, align: 'left' },
  { name: 'city', label: 'Ciudad', field: (row) => row.address.city, align: 'left' },
  { name: 'country', label: 'País', field: (row) => row.address.country, align: 'left' },
  { name: 'actions', label: 'Acción', field: 'id', align: 'center' },
]

const rows = ref([])
const loading = ref(false)
const errorMessage = ref('')

// rowsNumber = total de registros en el servidor (lo exige la paginación remota)
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
})

// QTable llama a esta función cada vez que cambia la página o las filas por página
async function onRequest(props) {
  const { page, rowsPerPage } = props.pagination

  loading.value = true
  errorMessage.value = ''

  try {
    const { data } = await api.get('/users', {
      params: {
        limit: rowsPerPage,
        skip: (page - 1) * rowsPerPage,
      },
    })

    rows.value = data.users
    pagination.value = { ...props.pagination, rowsNumber: data.total }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'No se pudo cargar la lista de usuarios.'
  } finally {
    loading.value = false
  }
}

// Primera carga: ?limit=10&skip=0
onMounted(() => {
  onRequest({ pagination: pagination.value })
})
</script>

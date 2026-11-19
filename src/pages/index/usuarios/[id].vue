<template>
  <q-page class="q-pa-md">
    <div class="text-h5">Detalle del usuario {{ route.params.id }}</div>
    <div class="text-grey-7">Pendiente: P3 (detalle) y P4 (compras)</div>
  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

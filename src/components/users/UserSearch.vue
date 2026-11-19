<template>
  <!-- P2: caja de búsqueda por nombre o apellido -->
  <q-input
    :model-value="modelValue"
    outlined
    dense
    clearable
    debounce="400"
    placeholder="Buscar por nombre o apellido..."
    class="q-mb-md"
    style="max-width: 400px"
    @update:model-value="(val) => emit('update:modelValue', val ?? '')"
  >
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup>
// v-model: el texto escrito se envía al padre (debounce = espera 400 ms antes de buscar)
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

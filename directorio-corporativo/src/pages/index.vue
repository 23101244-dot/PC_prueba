<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Directorio Corporativo</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menú</q-item-label>

        <q-item
          v-for="link in linksList"
          :key="link.to"
          clickable
          :to="link.to"
          exact
          active-class="text-primary bg-blue-1"
        >
          <q-item-section avatar>
            <q-icon :name="link.icon" />
          </q-item-section>
          <q-item-section>{{ link.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const linksList = [
  { label: 'Directorio', icon: 'people', to: '/' },
  { label: 'Dashboard', icon: 'dashboard', to: '/dashboard' },
  { label: 'Filtros', icon: 'filter_alt', to: '/filtros' },
  { label: 'Comparar', icon: 'compare_arrows', to: '/comparar' },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

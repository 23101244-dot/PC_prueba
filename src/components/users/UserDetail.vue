<template>
  <div>
    <!-- Imagen del usuario + datos principales -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="row items-center q-gutter-md">
        <q-avatar size="110px" class="bg-grey-2">
          <img :src="user.image" :alt="user.firstName" />
        </q-avatar>
        <div>
          <div class="text-h5">{{ user.firstName }} {{ user.lastName }}</div>
          <div class="text-subtitle1 text-grey-8">{{ user.company?.title }}</div>
          <div class="text-grey-7">@{{ user.username }} · {{ user.email }}</div>
          <q-badge color="primary" class="q-mt-xs">{{ user.role }}</q-badge>
        </div>
      </q-card-section>
    </q-card>

    <!-- Secciones de información -->
    <div class="row q-col-gutter-md">
      <div v-for="section in sections" :key="section.title" class="col-12 col-md-6 col-lg-4">
        <q-card flat bordered class="full-height">
          <q-card-section class="row items-center q-pb-none">
            <q-icon :name="section.icon" color="primary" size="sm" class="q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">{{ section.title }}</div>
          </q-card-section>

          <q-list dense>
            <q-item v-for="item in section.items" :key="item.label">
              <q-item-section>
                <q-item-label caption>{{ item.label }}</q-item-label>
                <q-item-label>{{ item.value ?? '—' }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// P3: recibe el usuario completo obtenido de GET /users/{id}
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
})

// Cada sección es una tarjeta con su lista de campos
const sections = computed(() => {
  const u = props.user
  return [
    {
      title: 'Datos personales',
      icon: 'person',
      items: [
        { label: 'Nombre completo', value: `${u.firstName} ${u.maidenName} ${u.lastName}` },
        { label: 'Edad', value: u.age },
        { label: 'Género', value: u.gender === 'male' ? 'Masculino' : 'Femenino' },
        { label: 'Fecha de nacimiento', value: u.birthDate },
        { label: 'Correo', value: u.email },
        { label: 'Teléfono', value: u.phone },
        { label: 'Usuario', value: u.username },
      ],
    },
    {
      title: 'Información laboral',
      icon: 'work',
      items: [
        { label: 'Empresa', value: u.company?.name },
        { label: 'Cargo', value: u.company?.title },
        { label: 'Departamento', value: u.company?.department },
        {
          label: 'Dirección de la empresa',
          value: `${u.company?.address?.address}, ${u.company?.address?.city}, ${u.company?.address?.country}`,
        },
        { label: 'EIN', value: u.ein },
      ],
    },
    {
      title: 'Dirección',
      icon: 'home',
      items: [
        { label: 'Dirección', value: u.address?.address },
        { label: 'Ciudad', value: u.address?.city },
        { label: 'Estado', value: `${u.address?.state} (${u.address?.stateCode})` },
        { label: 'Código postal', value: u.address?.postalCode },
        { label: 'País', value: u.address?.country },
        {
          label: 'Coordenadas',
          value: `${u.address?.coordinates?.lat}, ${u.address?.coordinates?.lng}`,
        },
      ],
    },
    {
      title: 'Universidad',
      icon: 'school',
      items: [{ label: 'Universidad', value: u.university }],
    },
    {
      title: 'Banco',
      icon: 'account_balance',
      items: [
        { label: 'Tipo de tarjeta', value: u.bank?.cardType },
        { label: 'Número de tarjeta', value: u.bank?.cardNumber },
        { label: 'Vencimiento', value: u.bank?.cardExpire },
        { label: 'Moneda', value: u.bank?.currency },
        { label: 'IBAN', value: u.bank?.iban },
      ],
    },
    {
      title: 'Información física',
      icon: 'accessibility',
      items: [
        { label: 'Altura', value: `${u.height} cm` },
        { label: 'Peso', value: `${u.weight} kg` },
        { label: 'Grupo sanguíneo', value: u.bloodGroup },
        { label: 'Color de ojos', value: u.eyeColor },
        { label: 'Cabello', value: `${u.hair?.color} · ${u.hair?.type}` },
      ],
    },
    {
      title: 'Criptomonedas',
      icon: 'currency_bitcoin',
      items: [
        { label: 'Moneda', value: u.crypto?.coin },
        { label: 'Red', value: u.crypto?.network },
        { label: 'Billetera', value: u.crypto?.wallet },
      ],
    },
  ]
})
</script>

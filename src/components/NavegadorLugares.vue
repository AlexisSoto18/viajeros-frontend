<template>
  <div class="container mx-auto px-4">
    <!-- Barra de pestañas -->
    <div class="flex gap-4 border-b-2 pb-2 mb-6">
      <button
        @click="activeTab = 'map'"
        :class="tabCls('map')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Mapa
      </button>
      <button
        @click="activeTab = 'tourism'"
        :class="tabCls('tourism')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Turismo
      </button>
      <button
        @click="activeTab = 'events'"
        :class="tabCls('events')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Eventos
      </button>
      <button
        @click="activeTab = 'commerce'"
        :class="tabCls('commerce')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Comercio Local
      </button>
      <button
        @click="activeTab = 'jobs'"
        :class="tabCls('jobs')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Bolsa de Trabajo
      </button>
    </div>

    <!-- Contenido dinámico -->
    <div class="space-y-6">
      <!-- 🌎 Mapa -->
      <div v-if="activeTab === 'map'">
        <div class="text-gray-500">Mapa (por implementar aquí tu componente)</div>
      </div>

      <!-- 🏞 Turismo -->
      <div v-if="activeTab === 'tourism'">
        <PlacesList />
      </div>

      <!-- 🎉 Eventos -->
      <div v-if="activeTab === 'events'">
        <div class="text-gray-500">Eventos (pendiente de conectar)</div>
      </div>

      <!-- 🛍 Comercio local -->
      <div v-if="activeTab === 'commerce'">
        <div class="text-gray-500">Comercio Local (pendiente de conectar)</div>
      </div>

      <!-- 💼 Bolsa de trabajo -->
      <div v-if="activeTab === 'jobs'">
        <div class="text-gray-500">Bolsa de Trabajo (pendiente de conectar)</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePlacesStore } from '@/stores/places'
import { useUserStore } from '@/stores/user'
import PlacesList from './PlacesList.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const placesStore = usePlacesStore() // ✅ instancia del store

const puebloId = computed(() => Number(route.params.id))
const userRole = computed(() => userStore.user?.role || 'tourist')

const activeTab = ref('tourism')
const loading = ref(false)

const tabCls = (key) => [
  'px-4 py-2 border-b-2',
  activeTab.value === key
    ? 'border-blue-600 text-blue-600 font-semibold'
    : 'border-transparent text-gray-500',
]

// ✅ Obtener lugares del pueblo mágico actual
const fetchPlaces = async () => {
  loading.value = true
  try {
    await placesStore.fetchAll(puebloId.value)
  } finally {
    loading.value = false
  }
}

// ✅ Filtrar lugares por tipo (attraction, restaurant, lodging, commerce)
const filtered = (kind) => {
  const lista = placesStore.lista || []
  return lista.filter((p) => p.kind === kind)
}

// ✅ Navegar al formulario para crear nuevo lugar
const goToCreate = () => {
  router.push({ name: 'places', params: { id: puebloId.value } })
}

// Montar y recargar cuando cambie el id del pueblo
onMounted(fetchPlaces)
watch(puebloId, fetchPlaces)
</script>

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

    <!-- Contenido de las pestañas -->
    <div class="space-y-6">
      <!-- Mapa -->
      <div v-if="activeTab === 'map'">
        <div class="text-gray-500">Mapa (por implementar aquí tu componente)</div>
      </div>

      <!-- Turismo -->
      <div v-if="activeTab === 'tourism'">
        <div class="mb-4 font-semibold text-xl">Lugares aprobados</div>
        <div v-if="loading" class="text-gray-500">Cargando...</div>
        <div v-else-if="places.length === 0" class="text-gray-500">No hay lugares por mostrar.</div>

        <ul v-else class="space-y-3">
          <li
            v-for="p in places"
            :key="p.id"
            class="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div class="font-medium text-lg text-gray-900">{{ p.name }}</div>
            <div class="text-sm text-gray-600">
              Tipo: {{ p.kind }} • Cupo: {{ p.slots_available }}
            </div>
            <div class="text-sm text-gray-500 mt-2" v-if="p.description">{{ p.description }}</div>
          </li>
        </ul>
      </div>

    <!-- Eventos -->
<div v-if="activeTab === 'events'" class="mt-4">
  <div v-if="userRole === 'host'">
    <EventosAnfitrion :puebloId="puebloId" />
  </div>

  <div v-else>
    <EventosTurista :puebloId="puebloId" />
  </div>
</div>

      <!-- Comercio Local -->
      <div v-if="activeTab === 'commerce'">
        <div class="text-gray-500">Comercio Local (luego conectamos)</div>
      </div>

      <!-- Bolsa de Trabajo -->
      <div v-if="activeTab === 'jobs'">
        <div class="text-gray-500">Bolsa de Trabajo (luego conectamos)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { listPlaces } from '@/stores/places'
import { useUserStore } from '@/stores/user'
import EventosAnfitrion from '@/views/eventos/EventosAnfitrion.vue'
import EventosTurista from '@/views/eventos/EventosTurista.vue'

//import Turismo from '@/components/Turismo.vue'

const route = useRoute()
const userStore = useUserStore()

const puebloId = computed(() => Number(route.params.id))
const userRole = computed(() => userStore.user?.role || 'tourist')

const activeTab = ref('tourism')
const tabCls = (key) => [
  'px-4 py-2 border-b-2',
  activeTab.value === key
    ? 'border-blue-600 text-blue-600 font-semibold'
    : 'border-transparent text-gray-500',
]

// Datos “mock” básicos del encabezado (si ya los traes en otro lado, sustitúyelos)
const townTitle = ref('Pueblo')
const townRegion = ref('—')

// Turismo
const places = ref([])
const loading = ref(false)

const fetchPlaces = async () => {
  loading.value = true
  try {
    const { data } = await listPlaces(puebloId.value)
    places.value = data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPlaces()
})
watch(puebloId, fetchPlaces)
</script>

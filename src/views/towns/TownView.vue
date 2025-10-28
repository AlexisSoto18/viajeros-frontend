<template>
  <div class="container mx-auto px-4">
    <!-- Encabezado simple (puedes reemplazar con tu UI actual) -->
    <div class="mt-6 mb-4">
      <router-link to="/pueblos" class="text-sm text-blue-600 hover:underline">← Volver a todos los pueblos</router-link>
      <h1 class="text-2xl font-semibold mt-2">{{ townTitle }}</h1>
      <p class="text-gray-600">Región: {{ townRegion || '—' }}</p>
    </div>

    <!-- Barra de pestañas -->
    <div class="flex gap-3 border-b">
      <button @click="activeTab='map'"      :class="tabCls('map')">Mapa</button>
      <button @click="activeTab='tourism'"  :class="tabCls('tourism')">Turismo</button>
      <button @click="activeTab='events'"   :class="tabCls('events')">Eventos</button>
      <button @click="activeTab='commerce'" :class="tabCls('commerce')">Comercio Local</button>
      <button @click="activeTab='jobs'"     :class="tabCls('jobs')">Bolsa de Trabajo</button>
    </div>

    <!-- Contenido de las pestañas -->
    <div class="py-6">
      <div v-if="activeTab==='map'">
        <div class="text-gray-500">Mapa (por implementar aquí tu componente)</div>
      </div>

      <div v-if="activeTab==='tourism'">
        <div class="mb-4 font-semibold">Lugares aprobados</div>
        <div v-if="loading" class="text-gray-500">Cargando...</div>
        <div v-else-if="places.length === 0" class="text-gray-500">No hay lugares por mostrar.</div>

        <ul v-else class="space-y-3">
          <li v-for="p in places" :key="p.id" class="p-3 border rounded">
            <div class="font-medium">{{ p.name }}</div>
            <div class="text-sm text-gray-600">Tipo: {{ p.kind }} • Cupo: {{ p.slots_available }}</div>
            <div class="text-sm text-gray-500" v-if="p.description">{{ p.description }}</div>
          </li>
        </ul>
      </div>

      <div v-if="activeTab==='events'">
        <div class="text-gray-500">Eventos (luego conectamos)</div>
      </div>

      <div v-if="activeTab==='commerce'">
        <div class="text-gray-500">Comercio Local (luego conectamos)</div>
      </div>

      <div v-if="activeTab==='jobs'">
        <div class="text-gray-500">Bolsa de Trabajo (luego conectamos)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { listPlaces } from '@/services/places'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const userStore = useUserStore()

const puebloId = computed(() => Number(route.params.id))
const userRole = computed(() => userStore.user?.role || 'tourist')

const activeTab = ref('tourism')
const tabCls = (key) => [
  'px-4 py-2 -mb-px border-b-2',
  activeTab.value === key ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent text-gray-500'
]

// Datos “mock” básicos del encabezado (si ya los traes en otro lado, sustitúyelos)
const townTitle  = ref('Pueblo')
const townRegion = ref('—')

// Turismo
const places  = ref([])
const loading = ref(false)

const fetchPlaces = async () => {
  loading.value = true
  try {
    const { data } = await listPlaces(puebloId.value)
    // Si el usuario es turista, el backend ya filtra aprobados; admin/host verán todos
    places.value = data
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // TODO: aquí puedes hidratar townTitle/Region con tu store de pueblos si ya lo tienes
  fetchPlaces()
})
watch(puebloId, fetchPlaces)
</script>

<style scoped>
/* utilitario mínimo si no usas tailwind */
.border-b { border-bottom: 1px solid #e5e7eb; }
.border-b-2 { border-bottom-width: 2px; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-blue-600 { color: #2563eb; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }
.border { border: 1px solid #e5e7eb; }
.rounded { border-radius: 0.5rem; }
.p-3 { padding: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.mt-6 { margin-top: 1.5rem; }
.mb-4 { margin-bottom: 1rem; }
.gap-3 { gap: 0.75rem; }
.container { max-width: 1100px; }
.-mb-px { margin-bottom: -1px; }
</style>

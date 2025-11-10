<template>
  <div class="container mx-auto px-4">
    <header class="flex justify-between items-center mb-3">
      <h2 class="text-2xl font-semibold">🏞 Atracciones Turísticas</h2>
      <button
        @click="goToCreate('attraction')"
        class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Agregar lugar
      </button>
    </header>
    <div class="flex gap-4 pb-2 mb-6">
      <button
        @click="activeTab = 'tourism1'"
        :class="tabCls('tourism1')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Lugares Turísticos
      </button>
      <button
        @click="activeTab = 'restaurant'"
        :class="tabCls('restaurant')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Restaurantes
      </button>
      <button
        @click="activeTab = 'hotels'"
        :class="tabCls('hotels')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Alojamiento
      </button>
      <button
        @click="activeTab = 'commerce'"
        :class="tabCls('commerce')"
        class="py-2 px-4 text-base rounded-md transition-colors hover:bg-blue-100"
      >
        Comercio Local
      </button>
    </div>

    <div class="space-y-6">
      <!-- 🏞 Turismo -->
      <div v-if="activeTab === 'tourism1'">
        <div class="flex gap-4 border-b-2 pb-2 mb-6">
          <section>
            <PlaceGrid :items="places.attraction" tipo="atracción" />
          </section>
        </div>
      </div>

      <!-- 🎉 Eventos -->
      <div v-if="activeTab === 'restaurant'">
        <div class="flex gap-4 border-b-2 pb-2 mb-6">
          <section>
            <PlaceGrid :items="places.restaurant" tipo="restaurante" />
          </section>
        </div>
      </div>

      <!-- 🛍 Comercio local -->
      <div v-if="activeTab === 'hotels'">
        <div class="flex gap-4 border-b-2 pb-2 mb-6">
          <section>
            <PlaceGrid :items="places.lodging" tipo="hospedaje" />
          </section>
        </div>
      </div>

      <!-- 💼 Bolsa de trabajo -->
      <div v-if="activeTab === 'commerce'">
        <div class="flex gap-4 border-b-2 pb-2 mb-6">
          <section>
            <PlaceGrid :items="places.commerce" tipo="comercio" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import PlaceGrid from './PlaceGrid.vue' // componente auxiliar opcional

const route = useRoute()
const router = useRouter()
const puebloId = ref(route.params.id)

const activeTab = ref('tourism')

const tabCls = (key) => [
  'px-4 py-2 border-b-2',
  activeTab.value === key
    ? 'border-blue-600 text-blue-600 font-semibold'
    : 'border-transparent text-gray-500',
]

const places = ref({
  attraction: [],
  restaurant: [],
  lodging: [],
  commerce: [],
})

const fetchPlaces = async (kind) => {
  const { data } = await api.get(`/pueblo_magicos/${puebloId.value}/places`, {
    params: { kind },
  })
  places.value[kind] = data
}

onMounted(() => {
  fetchPlaces('attraction')
  fetchPlaces('restaurant')
  fetchPlaces('lodging')
  fetchPlaces('commerce')
})

watch(
  () => route.params.id,
  (newId) => {
    puebloId.value = newId
    fetchPlaces('attraction')
    fetchPlaces('restaurant')
    fetchPlaces('lodging')
    fetchPlaces('commerce')
  },
)

// 👉 botón “Agregar lugar”
const goToCreate = (kind) => {
  router.push({ name: 'places', params: { id: puebloId.value }, query: { kind } })
}
</script>

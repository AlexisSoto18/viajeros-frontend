<template>
  <div class="min-h-screen bg-white">
    <section v-if="place" class="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
      <!-- IZQUIERDA -->
      <aside class="lg:col-span-5 space-y-6">
        <button
          @click="goBack"
          class="inline-flex items-center text-blue-600 hover:text-blue-700 transition"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a los lugares
        </button>

        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ place.name }}</h1>
          <p class="text-gray-600 mt-1 capitalize">Tipo: {{ place.kind }}</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <p class="text-gray-700 whitespace-pre-line">{{ place.description }}</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-xl p-4 border text-sm">
            <p class="font-semibold text-gray-700">🕒 Horario</p>
            <p>{{ place.opens_at || '—' }} - {{ place.closes_at || '—' }}</p>
          </div>
          <div class="bg-gray-50 rounded-xl p-4 border text-sm">
            <p class="font-semibold text-gray-700">📍 Dirección</p>
            <p>{{ place.address || 'No especificada' }}</p>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="save" class="btn-secondary">❤ Guardar</button>
          <button @click="openMap" class="btn-primary">📍 Ver mapa</button>
        </div>
      </aside>

      <!-- DERECHA -->
      <div class="lg:col-span-7 relative">
        <div class="overflow-hidden rounded-2xl shadow border border-gray-100">
          <img :src="currentImage" :alt="place.name" class="w-full h-[420px] object-cover" />
        </div>

        <!-- Controles -->
        <button
          @click="prev"
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
        >
          <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          @click="next"
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition"
        >
          <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        <!-- Indicadores -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          <span
            v-for="(_, i) in place.images"
            :key="i"
            @click="goTo(i)"
            :class="[
              'w-2 h-2 rounded-full cursor-pointer transition',
              i === currentIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white',
            ]"
          ></span>
        </div>
      </div>
    </section>
    <div class="max-screen-lg mx-auto mt-10">
      <NavegadorLugares />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import NavegadorLugares from './NavegadorLugares.vue'

const route = useRoute()
const router = useRouter()
const place = ref(null)

const currentIndex = ref(0)
const currentImage = ref('')

const fetchPlace = async () => {
  const { data } = await api.get(`/places/${route.params.id}`)
  place.value = data
  currentImage.value = data.images?.[0] || ''
}

const goBack = () => router.back()
const next = () => {
  if (!place.value.images?.length) return
  currentIndex.value = (currentIndex.value + 1) % place.value.images.length
  currentImage.value = place.value.images[currentIndex.value]
}
const prev = () => {
  if (!place.value.images?.length) return
  currentIndex.value =
    (currentIndex.value - 1 + place.value.images.length) % place.value.images.length
  currentImage.value = place.value.images[currentIndex.value]
}
const goTo = (i) => {
  currentIndex.value = i
  currentImage.value = place.value.images[i]
}

const openMap = () => {
  if (place.value.lat && place.value.lon) {
    window.open(`https://www.google.com/maps?q=${place.value.lat},${place.value.lon}`, '_blank')
  }
}

onMounted(fetchPlace)
</script>
<style scoped>
.btn-primary {
  @apply bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg;
}

.btn-secondary {
  @apply bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg;
}
</style>

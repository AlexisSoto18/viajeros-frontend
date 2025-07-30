<template>
  <div class="items-center min-h-scree">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900">Pueblos Mágicos de México</h1>
      <p class="text-gray-600 mt-1">Descubre la magia de nuestros destinos tradicionales</p>
    </div>
    <!-- Header con filtros -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <!-- Filtros -->
          <div class="flex flex-col sm:flex-row gap-3">
            <select v-model="filtroRegion" @change="filtrarPueblos"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Todas las regiones</option>
              <option v-for="region in regiones" :key="region" :value="region">{{ region }}</option>
            </select>

            <div class="relative">
              <input v-model="busqueda" @input="filtrarPueblos" type="text" placeholder="Buscar pueblo..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Estadísticas rápidas -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Grid de pueblos -->
      <div class="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        <div v-for="pueblo in pueblosFiltrados" :key="pueblo.id"
          class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
          <!-- Carrusel de imágenes -->
          <div class="relative h-64 overflow-hidden" v-if="pueblo.imagenes && pueblo.imagenes.length">
            <!-- Imagen actual -->
            <div class="relative w-full h-full">
              <img :src="pueblo.imagenes[currentImageIndex[pueblo.id] || 0]" :alt="`Imagen de ${pueblo.nombre}`"
                class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" />

              <!-- Overlay con controles -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between px-4">
                <!-- Botón anterior -->
                <button @click.stop="previousImage(pueblo.id, pueblo.imagenes.length)"
                  class="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110"
                  v-if="pueblo.imagenes.length > 1">
                  <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                </button>

                <!-- Botón siguiente -->
                <button @click.stop="nextImage(pueblo.id, pueblo.imagenes.length)"
                  class="bg-white/80 backdrop-blur-sm hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 transform hover:scale-110"
                  v-if="pueblo.imagenes.length > 1">
                  <svg class="w-4 h-4 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Indicadores -->
            <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1"
              v-if="pueblo.imagenes.length > 1">
              <button v-for="(img, index) in pueblo.imagenes" :key="index"
                @click.stop="setCurrentImage(pueblo.id, index)" class="w-2 h-2 rounded-full transition-all duration-200"
                :class="(currentImageIndex[pueblo.id] || 0) === index ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/75'"></button>
            </div>

            <!-- Badge de región -->
            <div class="absolute top-4 left-4">
              <span class="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                {{ pueblo.region }}
              </span>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {{ pueblo.nombre }}
              </h3>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                  </path>
                </svg>
                {{ pueblo.poblacion?.toLocaleString() }}
              </div>
            </div>

            <p class="text-gray-600 mb-4 leading-relaxed">{{ pueblo.descripcion_corta }}</p>

            <!-- Ubicación -->
            <div class="flex items-center text-sm text-gray-500 mb-4">
              <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span>{{ pueblo.latitud }}, {{ pueblo.longitud }}</span>
            </div>

            <!-- Botones de acción -->
            <div class="flex gap-3">
              <button @click="verDetalles(pueblo)"
                class="flex-1 bg-slateCustom hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                Explorar
              </button>
              <button @click="verEnMapa(pueblo)"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado vacío -->
      <div v-if="pueblosFiltrados.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 15c-2.34 0-4.484.673-6.318 1.832M12 2.25c5.385 0 9.75 4.365 9.75 9.75 0 1.33-.266 2.598-.748 3.75A9.753 9.753 0 0112 21.75c-1.33 0-2.598-.266-3.75-.748A9.754 9.754 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75z">
          </path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No se encontraron pueblos</h3>
        <p class="mt-1 text-sm text-gray-500">Intenta ajustar los filtros de búsqueda.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { usePueblosStore } from '@/stores/pueblos'

const router = useRouter()
const pueblosStore = usePueblosStore()

// Estados reactivos
const busqueda = ref('')
const filtroRegion = ref('')
const puebloSeleccionado = ref(null)
const currentImageIndex = reactive({})
const intervals = reactive({})

// Computed properties
const regiones = computed(() => {
  const regionesUnicas = [...new Set(pueblosStore.lista.map(p => p.region))]
  return regionesUnicas.sort()
})

const poblacionTotal = computed(() => {
  return pueblosStore.lista.reduce((total, pueblo) => total + (pueblo.poblacion || 0), 0)
})

const pueblosFiltrados = computed(() => {
  let filtrados = pueblosStore.lista

  // Filtrar por región
  if (filtroRegion.value) {
    filtrados = filtrados.filter(pueblo => pueblo.region === filtroRegion.value)
  }

  // Filtrar por búsqueda
  if (busqueda.value) {
    const termino = busqueda.value.toLowerCase()
    filtrados = filtrados.filter(pueblo =>
      pueblo.nombre.toLowerCase().includes(termino) ||
      pueblo.region.toLowerCase().includes(termino) ||
      pueblo.descripcion_corta.toLowerCase().includes(termino)
    )
  }

  return filtrados
})

// Funciones para carrusel
const nextImage = (puebloId, totalImages) => {
  if (!currentImageIndex[puebloId]) currentImageIndex[puebloId] = 0
  currentImageIndex[puebloId] = (currentImageIndex[puebloId] + 1) % totalImages
}

const previousImage = (puebloId, totalImages) => {
  if (!currentImageIndex[puebloId]) currentImageIndex[puebloId] = 0
  currentImageIndex[puebloId] = currentImageIndex[puebloId] === 0 ? totalImages - 1 : currentImageIndex[puebloId] - 1
}

const setCurrentImage = (puebloId, index) => {
  currentImageIndex[puebloId] = index
}

const startAutoCarousel = (puebloId, totalImages) => {
  if (totalImages <= 1) return

  intervals[puebloId] = setInterval(() => {
    nextImage(puebloId, totalImages)
  }, 5000) // Cambia cada 5 segundos
}

const stopAutoCarousel = (puebloId) => {
  if (intervals[puebloId]) {
    clearInterval(intervals[puebloId])
    delete intervals[puebloId]
  }
}

const initializeCarousels = () => {
  pueblosStore.lista.forEach(pueblo => {
    if (pueblo.imagenes && pueblo.imagenes.length > 1) {
      currentImageIndex[pueblo.id] = 0
      startAutoCarousel(pueblo.id, pueblo.imagenes.length)
    }
  })
}

// Funciones de interacción
const filtrarPueblos = () => {
  // La reactividad se encarga automáticamente
}

const verDetalles = (pueblo) => {
  router.push('/towns/' + pueblo.id)
}

const verEnMapa = (pueblo) => {
  const url = `https://www.google.com/maps?q=${pueblo.latitud},${pueblo.longitud}`
  window.open(url, '_blank')
}

// Lifecycle hooks
onMounted(async () => {
  await pueblosStore.fetchAll()
  setTimeout(initializeCarousels, 100)
})

onUnmounted(() => {
  Object.keys(intervals).forEach(puebloId => {
    stopAutoCarousel(puebloId)
  })
})
</script>

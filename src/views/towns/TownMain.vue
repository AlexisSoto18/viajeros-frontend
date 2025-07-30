<template>
    <div class="min-h-screen bg-white">
        <section v-if="showDetail" class="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-12 gap-8">
            <!-- IZQUIERDA: INFO -->
            <aside class="lg:col-span-5 space-y-6">
                <button v-if="showDetail" @click="goBack"
                    class="inline-flex items-center text-blue-600 hover:text-blue-700 transition">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver a todos los pueblos
                </button>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">{{ title }}</h1>
                    <p class="text-gray-600 mt-1">{{ subtitle }}</p>
                </div>
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                    <div class="flex items-center text-sm text-gray-600 space-x-2">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 15l5-5 4 4 8-8" />
                        </svg>
                        <span>{{ region }}</span>
                        <span class="text-gray-300">•</span>
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{{ coords }}</span>
                    </div>
                    <p class="mt-4 text-gray-700">{{ description }}</p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div v-for="m in metrics" :key="m.label"
                        class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center gap-3">
                        <div class="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center" v-html="m.icon">
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">{{ m.label }}</p>
                            <p class="font-semibold text-gray-900">{{ m.value }}</p>
                        </div>
                    </div>
                </div>

                <div class="flex gap-3">
                    <button @click="save" class="btn-secondary">❤ Guardar</button>
                    <button @click="openMap" class="btn-primary">📍 Ver mapa</button>
                </div>
            </aside>

            <!-- DERECHA: CARRUSEL -->
            <div class="lg:col-span-7 relative">
                <div class="overflow-hidden rounded-2xl shadow-sm border border-gray-100">
                    <img :src="currentImage" :alt="`Imagen ${currentIndex + 1} de ${pueblo.nombre}`"
                        class="w-full h-[420px] object-cover" />
                </div>
                <!-- Controles -->
                <button @click="prev"
                    class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
                    <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button @click="next"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow hover:bg-white transition">
                    <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <!-- Indicadores -->
                <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <span v-for="(_, i) in images" :key="i" @click="goTo(i)" :class="[
                        'w-2 h-2 rounded-full cursor-pointer transition',
                        i === currentIndex ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white'
                    ]"></span>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePueblosStore } from '@/stores/pueblos'

const route = useRoute()
const router = useRouter()
const store = usePueblosStore()

// Estado detalle
const showDetail = computed(() => !!route.params.id)
const pueblo = computed(() => store.lista.find(p => p.id == route.params.id) || {})

// Header
const title = computed(() => pueblo.value.nombre)
const subtitle = computed(() => `Pueblo Mágico de ${pueblo.value.region}`)

// Info
const region = computed(() => pueblo.value.subregion || pueblo.value.region || '—')
const coords = computed(() => {
    const lat = Number(pueblo.value.latitud).toFixed(2)
    const lng = Number(pueblo.value.longitud).toFixed(2)
    return `${lat}°, ${lng}°`
})
const description = computed(() => pueblo.value.descripcion || pueblo.value.descripcion_corta)

// Carrusel
const currentIndex = ref(0)
const images = computed(() => pueblo.value.imagenes || [])
const currentImage = computed(() => images.value[currentIndex.value] || '')

const next = () => {
    if (!images.value.length) return
    currentIndex.value = (currentIndex.value + 1) % images.value.length
}
const prev = () => {
    if (!images.value.length) return
    currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length
}
const goTo = i => { currentIndex.value = i }

// Reiniciar cuando cambias de pueblo
watch(pueblo, () => { currentIndex.value = 0 })

// Métricas
const fmt = n =>
    n != null
        ? new Intl.NumberFormat('es-MX', { notation: 'compact', maximumFractionDigits: 1 }).format(n)
        : '—'

const metrics = computed(() => [
    {
        label: 'Población',
        value: `~${fmt(pueblo.value.poblacion)}`,
        icon: `<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M17 20h5v-2a3 3 0 00-5.356-1.857M7 20v-2a3 3 0 015.356-1.857"/>
           </svg>`
    },
    {
        label: 'Latitud',
        value: coords.value.split('°,')[0] + '°',
        icon: `<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z"/>
           </svg>`
    },
    {
        label: 'Longitud',
        value: coords.value.split('°, ')[1] || '—',
        icon: `<svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
           </svg>`
    }
])

// Acciones
const goBack = () => router.push('/pueblos')
const save = () => console.log('Guardar:', pueblo.value.nombre)
const openMap = () =>
    window.open(`https://www.google.com/maps?q=${pueblo.value.latitud},${pueblo.value.longitud}`, '_blank')

// Carga inicial
onMounted(() => { if (!store.lista.length) store.fetchAll() })
</script>

<style scoped>
.btn-primary {
    @apply bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg;
}

.btn-secondary {
    @apply bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg;
}
</style>

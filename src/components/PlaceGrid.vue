<template>
  <div>
    <div v-if="!items?.length" class="text-gray-500">No hay {{ tipo }}s registrados.</div>

    <div v-else class="grid md:grid-cols-3 gap-4">
      <div
        v-for="place in items"
        :key="place.id"
        class="border rounded-lg shadow-sm hover:shadow-md p-4 transition flex flex-col justify-between"
      >
        <!-- Imagen -->
        <img
          v-if="place.images?.length"
          :src="place.images[0]"
          alt="Imagen del lugar"
          class="w-full h-40 object-cover rounded-md mb-3"
        />

        <!-- Información -->
        <div>
          <h3 class="font-bold text-lg">{{ place.name }}</h3>
          <p class="text-sm text-gray-600">
            {{ place.description?.slice(0, 100) }}
            <span v-if="place.description?.length > 100">...</span>
          </p>
          <p class="text-gray-500 text-xs mt-1">
            📍 {{ place.address || 'Ubicación no especificada' }}
          </p>
          <div class="mt-2">
            <span
              v-if="place.approved"
              class="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold"
            >
              @ Verificado
            </span>
          </div>
        </div>

        <!-- Botones -->
        <div class="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
          <button
            @click="verMas(place)"
            class="text-blue-600 hover:text-blue-800 text-sm font-semibold"
          >
            🔍 Ver más
          </button>

          <!-- Solo admin o anfitrión -->
          <button
            v-if="userRole === 'admin' || userRole === 'anfitrion'"
            @click="editar(place)"
            class="text-gray-600 hover:text-gray-800 text-sm font-semibold"
          >
            ✏️ Editar
          </button>
          <!-- Estado de aprobación -->
          <div class="mt-2" v-if="userRole === 'admin' || userRole === 'anfitrion'">
            <span
              v-if="place.approved"
              class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold"
            >
              ✅ Aprobado
            </span>
            <span
              v-else
              class="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-semibold"
            >
              ⏳ Pendiente
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// ✅ Props
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  tipo: {
    type: String,
    default: 'lugar',
  },
})

// ✅ Dependencias
const router = useRouter()
const userStore = useUserStore()
const userRole = userStore.user?.role || 'turista'

// ✅ Navegar al detalle
const verMas = (place) => {
  if (!place?.id) return
  router.push({ name: 'place-detail', params: { id: place.id } })
}

// ✅ Navegar a editar (usa la misma vista del CRUD)
const editar = (place) => {
  if (!place?.id) return
  router.push({ name: 'places', params: { id: place.pueblo_magico_id }, query: { edit: place.id } })
}
</script>

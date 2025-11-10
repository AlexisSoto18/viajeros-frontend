<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Gestión de Lugares</h2>

    <!-- Formulario -->
    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input v-model="form.name" placeholder="Nombre del lugar" class="input" required />
      <select v-model="form.kind" class="input" required>
        <option disabled value="">Selecciona tipo</option>
        <option value="attraction">Atracción turística</option>
        <option value="restaurant">Restaurante</option>
        <option value="lodging">Alojamiento</option>
        <option value="commerce">Comercio</option>
      </select>

      <input v-model="form.address" placeholder="Dirección" class="input" />
      <input v-model="form.lat" type="number" step="any" placeholder="Latitud" class="input" />
      <input v-model="form.lon" type="number" step="any" placeholder="Longitud" class="input" />

      <input v-model="form.opens_at" type="time" class="input" />
      <input v-model="form.closes_at" type="time" class="input" />

      <textarea
        v-model="form.description"
        placeholder="Descripción"
        class="input col-span-full"
        a
      ></textarea>

      <input
        v-model="imagenes"
        type="text"
        placeholder="URLs separadas por coma (máx 5)"
        class="input col-span-full"
      />
      <!-- Mensaje visual -->
      <div v-if="mensaje" class="col-span-full mt-2">
        <div
          class="px-4 py-3 rounded-md text-sm font-medium"
          :class="{
            'bg-green-100 text-green-700': mensaje.includes('✅'),
            'bg-yellow-100 text-yellow-800': mensaje.includes('⚠️'),
            'bg-red-100 text-red-700': mensaje.includes('❌'),
          }"
        >
          {{ mensaje }}
        </div>
      </div>

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded col-span-full">
        Guardar
      </button>
    </form>

    <!-- Tabla de Lugares -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full border-collapse border border-gray-200">
        <thead class="bg-gray-100">
          <tr>
            <th class="p-3 text-left">Nombre</th>
            <th class="p-3 text-left">Tipo</th>
            <th class="p-3 text-left">Dirección</th>
            <th class="p-3 text-left">Estado</th>
            <th v-if="userRole === 'admin'" class="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="place in store.lista"
            :key="place.id"
            class="border-t hover:bg-gray-50 transition"
          >
            <td class="p-3 font-medium">{{ place.name }}</td>
            <td class="p-3 capitalize">{{ place.kind }}</td>
            <td class="p-3">{{ place.address || '—' }}</td>

            <!-- ✅ Estado -->
            <td class="p-3">
              <span
                v-if="place.approved"
                class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 font-semibold"
              >
                ✅ Aprobado
              </span>
              <span
                v-else
                class="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 font-semibold"
              >
                ⏳ Pendiente
              </span>
              <button @click="edit(place)" class="text-blue-600 hover:text-blue-800 font-medium">
                ✏️ Editar
              </button>
            </td>

            <!-- ✅ Solo visible si es admin -->
            <td v-if="userRole === 'admin'" class="p-3 space-x-2">
              <!-- Botones condicionales -->
              <button
                v-if="!place.approved"
                @click="aprobar(place.id)"
                class="text-green-600 hover:text-green-800 font-medium"
              >
                ✅ Aprobar
              </button>

              <button
                v-else
                @click="desaprobar(place.id)"
                class="text-yellow-600 hover:text-yellow-800 font-medium"
              >
                🚫 Desaprobar
              </button>

              <button
                @click="eliminar(place.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                🗑 Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlacesStore } from '@/stores/places'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userRole = computed(() => userStore.user?.role || 'tourist')
const mensaje = ref('')
const store = usePlacesStore()
const route = useRoute()
const puebloId = ref(route.params.id)

onMounted(() => {
  if (puebloId.value) store.fetchAll(puebloId.value)
})

watch(
  () => route.params.id,
  (nuevoId) => {
    puebloId.value = nuevoId
    store.fetchAll(nuevoId)
  },
)

const form = ref({
  id: null,
  name: '',
  kind: '',
  description: '',
  address: '',
  lat: null,
  lon: null,
  opens_at: '',
  closes_at: '',
  images: [],
})

const imagenes = ref('')

// ✅ Reset formulario
const reset = () => {
  form.value = {
    id: null,
    name: '',
    kind: '',
    description: '',
    address: '',
    lat: null,
    lon: null,
    opens_at: '',
    closes_at: '',
    images: [],
  }
  imagenes.value = ''
}

// Guardar (crear o actualizar)
const submit = async () => {
  form.value.images = imagenes.value
    .split(',')
    .map((i) => i.trim())
    .slice(0, 5)

  const id = puebloId.value
  mensaje.value = '' // limpia mensaje previo

  try {
    if (form.value.id) {
      // Si está editando
      await store.update(form.value.id, form.value, puebloId.value)

      if (userRole.value === 'anfitrion' || userRole.value === 'host') {
        mensaje.value =
          '⚠️ Tu lugar fue actualizado y está pendiente de aprobación del administrador.'
      } else {
        mensaje.value = '✅ Lugar actualizado correctamente.'
      }
    } else {
      // Si está creando
      await store.create(id, form.value)
      mensaje.value = '✅ Lugar creado correctamente.'
    }

    reset()
  } catch (error) {
    console.error(error)
    mensaje.value = '❌ Ocurrió un error al guardar el lugar.'
  }

  // Oculta el mensaje después de 5 segundos
  setTimeout(() => {
    mensaje.value = ''
  }, 5000)
}

const formatTime = (value) => {
  if (!value) return '' // si viene null, undefined o vacío

  // Si el valor ya es tipo "HH:mm" o "HH:mm:ss", lo usamos directo
  const regex = /^\d{2}:\d{2}(:\d{2})?$/
  if (regex.test(value)) {
    return value.slice(0, 5) // recortamos a HH:mm
  }

  // Si viene en formato ISO (2000-01-01T08:00:00.000Z)
  const date = new Date(value)
  if (isNaN(date)) return '' // evita NaN:NaN
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// Editar
const edit = (place) => {
  form.value = { ...place }
  if (place.opens_at) {
    form.value.opens_at = formatTime(place.opens_at)
  }
  if (place.closes_at) {
    form.value.closes_at = formatTime(place.closes_at)
  }
  imagenes.value = place.images.join(', ')
}

// Eliminar
const eliminar = async (id) => {
  await store.delete(id, puebloId.value)
}

const aprobar = async (id) => {
  if (confirm('¿Deseas aprobar este lugar?')) {
    await store.approve(id, puebloId.value)
    alert('✅ Lugar aprobado correctamente')
  }
}

const desaprobar = async (id) => {
  if (confirm('¿Deseas quitar la aprobación de este lugar?')) {
    await store.unapprove(id, puebloId.value)
    alert('❌ Lugar desaprobado')
  }
}
</script>

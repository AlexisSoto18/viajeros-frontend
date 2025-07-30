<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Gestión de Pueblos Mágicos</h2>

    <!-- Formulario -->
    <form @submit.prevent="submit" class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <input v-model="form.nombre" placeholder="Nombre" class="input" required />
      <input v-model="form.region" placeholder="Región" class="input" required />
      <input v-model="form.descripcion_corta" placeholder="Descripción corta" class="input" required />
      <input v-model="form.latitud" type="number" step="any" placeholder="Latitud" class="input" required />
      <input v-model="form.longitud" type="number" step="any" placeholder="Longitud" class="input" required />
      <input v-model="form.poblacion" type="number" placeholder="Población" class="input" required />
      <textarea v-model="form.descripcion" placeholder="Descripción completa" class="input col-span-full" required></textarea>
      <input v-model="imagenes" type="text" placeholder="URLs separadas por coma (máx 5)" class="input col-span-full" />

      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded col-span-full">Guardar</button>
    </form>

    <!-- Tabla -->
    <div class="overflow-x-auto">
      <table class="table-auto w-full">
        <thead>
          <tr class="bg-gray-100">
            <th class="p-2">Nombre</th>
            <th class="p-2">Región</th>
            <th class="p-2">Población</th>
            <th class="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pueblo in pueblosStore.lista" :key="pueblo.id">
            <td class="p-2">{{ pueblo.nombre }}</td>
            <td class="p-2">{{ pueblo.region }}</td>
            <td class="p-2">{{ pueblo.poblacion }}</td>
            <td class="p-2 space-x-2">
              <button @click="edit(pueblo)" class="text-blue-600">Editar</button>
              <button @click="eliminar(pueblo.id)" class="text-red-600">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePueblosStore } from '@/stores/pueblos'
import api from '@/services/api'

const pueblosStore = usePueblosStore()
onMounted(() => pueblosStore.fetchAll())

const form = ref({
  id: null,
  nombre: '',
  region: '',
  descripcion: '',
  descripcion_corta: '',
  imagenes: [],
  latitud: null,
  longitud: null,
  poblacion: null,
})

const imagenes = ref('')

const reset = () => {
  form.value = {
    id: null,
    nombre: '',
    region: '',
    descripcion: '',
    descripcion_corta: '',
    imagenes: [],
    latitud: null,
    longitud: null,
    poblacion: null,
  }
  imagenes.value = ''
}

const submit = async () => {
  form.value.imagenes = imagenes.value.split(',').map(i => i.trim()).slice(0, 5)
  if (form.value.id) {
    await api.put(`/pueblo_magicos/${form.value.id}`, { pueblo_magico: form.value })
  } else {
    await api.post('/pueblo_magicos', { pueblo_magico: form.value })
  }
  await pueblosStore.fetchAll()
  reset()
}

const edit = (pueblo) => {
  form.value = { ...pueblo }
  imagenes.value = pueblo.imagenes.join(', ')
}

const eliminar = async (id) => {
  await api.delete(`/pueblo_magicos/${id}`)
  await pueblosStore.fetchAll()
}
</script>

<style scoped>
.input {
  @apply border p-2 rounded w-full;
}
</style>

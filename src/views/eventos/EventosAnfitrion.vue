<template>
  <div class="p-4">
    <form @submit.prevent="crearEvento" class="mb-6 space-y-3 bg-gray-50 p-4 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-2">Agregar evento</h2>
      <input v-model="nuevo.nombre" placeholder="Nombre del evento" class="border rounded p-2 w-full" />
      <textarea v-model="nuevo.descripcion" placeholder="Descripción" class="border rounded p-2 w-full"></textarea>
      <input type="date" v-model="nuevo.fecha" class="border rounded p-2 w-full" />
      <input type="number" v-model="nuevo.cupo" placeholder="Cupo" class="border rounded p-2 w-full" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Crear evento
      </button>
    </form>

    <EventoCard
      v-for="evento in eventos"
      :key="evento.id"
      :evento="evento"
      rol="host"
      @editar="editarEvento"
      @eliminar="eliminarEvento"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import EventoCard from '@/components/eventos/EventoCard.vue'

// ✅ Recibimos el ID del pueblo desde Navegador.vue
const props = defineProps({
  puebloId: [String, Number]
})

const eventos = ref([])
const nuevo = ref({ nombre: '', descripcion: '', fecha: '', cupo: 0 })

// 🔹 Cargar eventos del pueblo actual
const cargarEventos = async () => {
  try {
    const { data } = await axios.get(`/api/pueblos/${props.puebloId}/eventos`)
    eventos.value = data
  } catch (err) {
    console.error('Error al cargar eventos:', err)
  }
}

// 🔹 Crear un nuevo evento
const crearEvento = async () => {
  try {
    await axios.post(`/api/pueblos/${props.puebloId}/eventos`, nuevo.value)
    nuevo.value = { nombre: '', descripcion: '', fecha: '', cupo: 0 }
    cargarEventos()
  } catch (err) {
    console.error('Error al crear evento:', err)
  }
}

// 🔹 Editar evento
const editarEvento = async (evento) => {
  const actualizado = prompt('Nuevo nombre del evento:', evento.nombre)
  if (actualizado) {
    await axios.put(`/api/eventos/${evento.id}`, { nombre: actualizado })
    cargarEventos()
  }
}

// 🔹 Eliminar evento
const eliminarEvento = async (id) => {
  if (confirm('¿Eliminar este evento?')) {
    await axios.delete(`/api/eventos/${id}`)
    cargarEventos()
  }
}

onMounted(cargarEventos)
</script>

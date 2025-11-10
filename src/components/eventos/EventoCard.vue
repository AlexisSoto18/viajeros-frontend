<template>
  <div class="bg-white rounded-2xl shadow-md p-4 w-full max-w-md mx-auto my-4">
    <h2 class="text-xl font-bold mb-2">{{ evento.nombre }}</h2>
    <p class="text-gray-600">{{ evento.descripcion }}</p>
    <p class="mt-2"><strong>Fecha:</strong> {{ evento.fecha }}</p>
    <p><strong>Cupo:</strong> {{ evento.cupo }}</p>

    <div class="mt-4 flex justify-between">
      <template v-if="rol === 'host'">
        <button @click="$emit('editar', evento)" class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Editar</button>
        <button @click="$emit('eliminar', evento.id)" class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">Eliminar</button>
      </template>
      <template v-else-if="rol === 'tourist'">
        <div>
          <input type="number" v-model="lugares" min="1" :max="evento.cupo" class="border rounded-md w-20 p-1 mr-2" />
          <button @click="reservar" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
            Reservar
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  evento: Object,
  rol: String
})

const lugares = ref(1)

const reservar = async () => {
  try {
    await axios.post(`/api/eventos/${props.evento.id}/reservas`, { cantidad: lugares.value })
    alert('Reserva enviada. Espera la confirmación del anfitrión.')
  } catch (err) {
    console.error(err)
    alert('Error al reservar')
  }
}
</script>

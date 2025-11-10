<template>
  <div class="p-4">
    <h2 class="text-xl font-semibold mb-4">Eventos disponibles</h2>
    <EventoCard v-for="evento in eventos" :key="evento.id" :evento="evento" rol="tourist" />
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

// 🔹 Cargar eventos de ese pueblo
const cargarEventos = async () => {
  try {
    const { data } = await axios.get(`/api/pueblos/${props.puebloId}/eventos`)
    eventos.value = data
  } catch (err) {
    console.error('Error al cargar eventos:', err)
  }
}

onMounted(cargarEventos)
</script>

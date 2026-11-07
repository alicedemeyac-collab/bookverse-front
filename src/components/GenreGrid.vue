<script setup>
import { ref, onMounted } from 'vue'
import { fetchGenres } from '../api/catalog'
import GenreCard from './GenreCard.vue'
import StatusMessage from './StatusMessage.vue'

const genres = ref([])
const state = ref('loading') // loading | ready | error

async function load() {
  state.value = 'loading'
  try {
    genres.value = await fetchGenres()
    state.value = 'ready'
  } catch {
    state.value = 'error'
  }
}

onMounted(load)
</script>

<template>
  <StatusMessage v-if="state === 'loading'" />
  <StatusMessage v-else-if="state === 'error'" type="error" @retry="load" />
  <StatusMessage v-else-if="!genres.length" type="empty" message="Aucun genre pour le moment." />
  <div v-else class="grid">
    <GenreCard v-for="genre in genres" :key="genre.id" :genre="genre" />
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
</style>
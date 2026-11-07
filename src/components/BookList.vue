<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchBooks, fetchGenreBooks } from '../api/catalog'
import BookCard from './BookCard.vue'
import Pagination from './Pagination.vue'
import StatusMessage from './StatusMessage.vue'

const props = defineProps({
  genreSlug: { type: String, default: null },
  emptyMessage: { type: String, default: 'Aucun livre pour le moment.' },
})

const route = useRoute()
const router = useRouter()
const routeName = route.name // pour ignorer les changements d'URL quand on quitte la page

const books = ref([])
const meta = ref(null)
const state = ref('loading') // loading | ready | error
let requestId = 0

// Page lue dans l'URL, avec repli sur 1 si la valeur est absente ou invalide
const page = computed(() => {
  const value = parseInt(route.query.page, 10)
  return Number.isInteger(value) && value > 0 ? value : 1
})

function goTo(newPage, replace = false) {
  const query = { ...route.query, page: newPage > 1 ? newPage : undefined }
  replace ? router.replace({ query }) : router.push({ query })
}

async function load() {
  const current = ++requestId
  state.value = 'loading'

  try {
    const params = { page: page.value, per_page: 12 }
    const response = props.genreSlug
        ? await fetchGenreBooks(props.genreSlug, params)
        : await fetchBooks(params)

    // Une réponse plus ancienne que la dernière requête est ignorée
    if (current !== requestId) return

    // Page demandée au-delà de la dernière : on revient sur la dernière
    if (!response.data.length && page.value > response.meta.last_page) {
      goTo(response.meta.last_page, true)
      return
    }

    books.value = response.data
    meta.value = response.meta
    state.value = 'ready'
  } catch {
    if (current === requestId) state.value = 'error'
  }
}

watch(
    [page, () => props.genreSlug],
    () => { if (route.name === routeName) load() },
    { immediate: true },
)

onBeforeUnmount(() => { requestId++ })
</script>

<template>
  <StatusMessage v-if="state === 'loading'" />
  <StatusMessage v-else-if="state === 'error'" type="error" @retry="load" />
  <StatusMessage v-else-if="!books.length" type="empty" :message="emptyMessage" />

  <template v-else>
    <p class="count" aria-live="polite">{{ meta.total }} livre(s)</p>
    <div class="book-grid">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
    <Pagination :current="meta.current_page" :last="meta.last_page" @change="goTo" />
  </template>
</template>

<style scoped>
.count { color: var(--text-muted); margin-bottom: var(--space-4); }
</style>
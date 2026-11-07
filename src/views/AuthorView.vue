<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { fetchAuthor } from '../api/catalog'
import { formatDate } from '../utils/format'
import AuthorAvatar from '../components/AuthorAvatar.vue'
import BookCard from '../components/BookCard.vue'
import StatusMessage from '../components/StatusMessage.vue'

const route = useRoute()

const author = ref(null)
const state = ref('loading') // loading | ready | notfound | error
let requestId = 0

async function load(id) {
  const current = ++requestId
  state.value = 'loading'

  try {
    const data = await fetchAuthor(id)
    if (current !== requestId) return
    author.value = data
    state.value = 'ready'
  } catch (error) {
    if (current !== requestId) return
    state.value = error.response?.status === 404 ? 'notfound' : 'error'
  }
}

watch(() => route.params.id, (id) => { if (id) load(id) }, { immediate: true })
onBeforeUnmount(() => { requestId++ })
</script>

<template>
  <div class="container page">
    <StatusMessage v-if="state === 'loading'" />
    <StatusMessage v-else-if="state === 'error'" type="error" @retry="load(route.params.id)" />
    <StatusMessage v-else-if="state === 'notfound'" type="empty" message="Cet auteur n'existe pas." />

    <template v-else>
      <header class="author">
        <AuthorAvatar :name="author.name" :url="author.photo_url" :size="140" />
        <div>
          <h1>{{ author.name }}</h1>
          <p v-if="author.nationality || author.birth_date" class="meta">
            <span v-if="author.nationality">{{ author.nationality }}</span>
            <span v-if="author.nationality && author.birth_date"> · </span>
            <span v-if="author.birth_date">né(e) le {{ formatDate(author.birth_date) }}</span>
          </p>
          <p v-if="author.bio" class="bio">{{ author.bio }}</p>
          <p v-else class="meta">Aucune biographie disponible.</p>

          <ul v-if="author.genres?.length" class="chips">
            <li v-for="genre in author.genres" :key="genre.id">
              <RouterLink :to="{ name: 'genre', params: { slug: genre.slug } }" class="chip">{{ genre.name }}</RouterLink>
            </li>
          </ul>
        </div>
      </header>

      <section class="section">
        <h2>Livres ({{ author.books_count }})</h2>
        <div v-if="author.books?.length" class="book-grid">
          <BookCard v-for="book in author.books" :key="book.id" :book="book" />
        </div>
        <p v-else class="meta">Aucun livre de cet auteur dans le catalogue.</p>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page { padding: var(--space-6) 0 var(--space-7); }
.author { display: flex; gap: var(--space-5); align-items: center; flex-wrap: wrap; }
.author > div { flex: 1; min-width: 260px; }
.meta { color: var(--text-muted); }
.bio { max-width: 70ch; }
.section { margin-top: var(--space-6); }
</style>
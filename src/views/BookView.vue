<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { fetchBook } from '../api/catalog'
import { useThemeStore } from '../stores/theme'
import { formatDate, languageName } from '../utils/format'
import BookCover from '../components/BookCover.vue'
import BookCard from '../components/BookCard.vue'
import AuthorCard from '../components/AuthorCard.vue'
import StatusMessage from '../components/StatusMessage.vue'

const route = useRoute()
const theme = useThemeStore()

const book = ref(null)
const state = ref('loading') // loading | ready | notfound | error
let requestId = 0

async function load(id) {
  const current = ++requestId
  state.value = 'loading'
  theme.reset()

  try {
    const data = await fetchBook(id)
    if (current !== requestId) return

    book.value = data
    // La fiche prend les couleurs de son genre principal, s'il existe
    if (data.primary_genre) theme.apply(data.primary_genre.theme)
    state.value = 'ready'
  } catch (error) {
    if (current !== requestId) return
    state.value = error.response?.status === 404 ? 'notfound' : 'error'
  }
}

watch(() => route.params.id, (id) => { if (id) load(id) }, { immediate: true })

onBeforeUnmount(() => {
  requestId++
  theme.reset()
})

// Seules les informations présentes sont affichées
const details = computed(() => {
  const b = book.value
  return [
    ['Publication', formatDate(b.publication_date)],
    ['Éditeur', b.publisher],
    ['Pages', b.page_count],
    ['Langue', languageName(b.language)],
    ['ISBN', b.isbn13 ?? b.isbn10],
  ].filter(([, value]) => value)
})

const genres = computed(() => book.value.genres.filter((g) => g.parent_id === null))
const subgenres = computed(() => book.value.genres.filter((g) => g.parent_id !== null))
</script>

<template>
  <div class="container page">
    <StatusMessage v-if="state === 'loading'" />
    <StatusMessage v-else-if="state === 'error'" type="error" @retry="load(route.params.id)" />
    <StatusMessage v-else-if="state === 'notfound'" type="empty" message="Ce livre n'existe pas." />

    <template v-else>
      <article class="book">
        <div class="book__cover">
          <BookCover :url="book.cover_url" :title="book.title" />
        </div>

        <div class="book__main">
          <h1>{{ book.title }}</h1>
          <p v-if="book.subtitle" class="subtitle">{{ book.subtitle }}</p>

          <p class="authors">
            <template v-if="book.authors.length">
              par
              <template v-for="(author, index) in book.authors" :key="author.id">
                <RouterLink :to="{ name: 'author', params: { id: author.id } }">{{ author.name }}</RouterLink><span v-if="index < book.authors.length - 1">, </span>
              </template>
            </template>
            <template v-else>Auteur inconnu</template>
          </p>

          <p class="rating">
            <template v-if="book.avg_rating !== null">
              ★ {{ book.avg_rating.toFixed(1) }} <span>({{ book.ratings_count }} avis)</span>
            </template>
            <template v-else>Pas encore noté</template>
          </p>

          <ul v-if="genres.length || subgenres.length" class="chips">
            <li v-for="genre in genres" :key="genre.id">
              <RouterLink :to="{ name: 'genre', params: { slug: genre.slug } }" class="chip">{{ genre.name }}</RouterLink>
            </li>
            <li v-for="genre in subgenres" :key="genre.id">
              <RouterLink :to="{ name: 'genre', params: { slug: genre.slug } }" class="chip chip--sub">{{ genre.name }}</RouterLink>
            </li>
          </ul>

          <dl v-if="details.length" class="details">
            <div v-for="[label, value] in details" :key="label">
              <dt>{{ label }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>

          <h2>Résumé</h2>
          <p v-if="book.synopsis" class="synopsis">{{ book.synopsis }}</p>
          <p v-else class="muted">Aucun résumé disponible pour ce livre.</p>
        </div>
      </article>

      <section v-if="book.authors.length" class="section">
        <h2>{{ book.authors.length > 1 ? 'Les auteurs' : "L'auteur" }}</h2>
        <div class="author-grid">
          <AuthorCard v-for="author in book.authors" :key="author.id" :author="author" />
        </div>
      </section>

      <section v-if="book.similar?.length" class="section">
        <h2>Livres similaires</h2>
        <div class="book-grid">
          <BookCard v-for="similar in book.similar" :key="similar.id" :book="similar" />
        </div>
      </section>
    </template>
  </div>
</template>

<style scoped>
.page { padding: var(--space-6) 0 var(--space-7); }

.book {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: minmax(200px, 300px) 1fr;
  align-items: start;
}
.book__cover { width: 100%; }

.subtitle { font-size: 1.2rem; color: var(--text-muted); }
.authors { color: var(--text-muted); }
.rating { color: var(--accent); font-weight: 600; }
.rating span { color: var(--text-muted); font-weight: 400; }

.chips { margin-bottom: var(--space-4); }
.chip--sub { border-style: dashed; }

.details {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin: 0 0 var(--space-5);
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
}
.details dt { font-size: 0.8rem; color: var(--text-muted); }
.details dd { margin: 0; font-weight: 600; }

.synopsis { white-space: pre-line; max-width: 70ch; }
.muted { color: var(--text-muted); }

.section { margin-top: var(--space-6); }
.author-grid {
  display: grid;
  gap: var(--space-3);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

@media (max-width: 720px) {
  .book { grid-template-columns: 1fr; }
  .book__cover { max-width: 240px; margin-inline: auto; }
}
</style>
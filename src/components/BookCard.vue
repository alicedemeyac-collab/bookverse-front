<script setup>
import BookCover from './BookCover.vue'

defineProps({ book: { type: Object, required: true } })
</script>

<template>
  <article class="book-card">
    <RouterLink :to="{ name: 'book', params: { id: book.id } }" class="book-card__link">
      <BookCover :url="book.cover_url" :title="book.title" />
      <h3>{{ book.title }}</h3>
    </RouterLink>

    <p class="book-card__authors">
      <template v-if="book.authors.length">
        <template v-for="(author, index) in book.authors" :key="author.id">
          <RouterLink :to="{ name: 'author', params: { id: author.id } }">{{ author.name }}</RouterLink><span v-if="index < book.authors.length - 1">, </span>
        </template>
      </template>
      <span v-else>Auteur inconnu</span>
    </p>

    <p v-if="book.primary_genre" class="book-card__genre">{{ book.primary_genre.name }}</p>

    <p class="book-card__rating">
      <template v-if="book.avg_rating !== null">★ {{ book.avg_rating.toFixed(1) }}</template>
      <template v-else>Pas encore noté</template>
    </p>
  </article>
</template>

<style scoped>
.book-card { display: flex; flex-direction: column; gap: var(--space-1); }
.book-card__link { color: var(--text); text-decoration: none; }
.book-card__link:hover h3 { color: var(--accent); }
.book-card h3 {
  margin: var(--space-2) 0 0;
  font-size: 1rem;
  transition: color 0.2s;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.book-card p { margin: 0; font-size: 0.875rem; color: var(--text-muted); }
.book-card__authors a { color: var(--text-muted); }
.book-card__authors a:hover { color: var(--accent); }
.book-card__genre {
  align-self: flex-start;
  padding: 2px var(--space-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
}
.book-card__rating { color: var(--accent); font-weight: 600; }
</style>
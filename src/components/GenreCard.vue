<script setup>
import { computed } from 'vue'
import { textColors } from '../utils/color'

const props = defineProps({ genre: { type: Object, required: true } })

const cardStyle = computed(() => {
  const t = props.genre.theme
  return {
    '--card-bg': t.secondary_color,
    '--card-primary': t.primary_color,
    '--card-accent': t.accent_color,
    '--card-text': textColors(t.secondary_color).text,
    '--card-font': `'${t.heading_font}', serif`,
  }
})
</script>

<template>
  <RouterLink
      :to="{ name: 'genre', params: { slug: genre.slug } }"
      class="genre-card"
      :style="cardStyle"
  >
    <h3>{{ genre.name }}</h3>
    <p v-if="genre.theme.mood" class="genre-card__mood">{{ genre.theme.mood }}</p>
    <p class="genre-card__count">{{ genre.books_count ?? 0 }} livre(s)</p>
  </RouterLink>
</template>

<style scoped>
.genre-card {
  /* Valeurs par défaut, remplacées par le style en ligne du composant */
  --card-bg: #1f1a2e;
  --card-primary: #8b5cf6;
  --card-accent: #f472b6;
  --card-text: #f5f0e8;
  --card-font: 'Playfair Display', serif;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 180px;
  padding: var(--space-4);
  border: 1px solid var(--card-accent);
  border-radius: var(--radius-md);
  background: linear-gradient(
      145deg,
      var(--card-bg) 40%,
      color-mix(in srgb, var(--card-primary) 55%, var(--card-bg))
  );
  color: var(--card-text);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.genre-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 180px;
  padding: var(--space-4);
  border: 1px solid var(--card-accent);
  border-radius: var(--radius-md);
  background: linear-gradient(
      145deg,
      var(--card-bg) 40%,
      color-mix(in srgb, var(--card-primary) 55%, var(--card-bg))
  );
  color: var(--card-text);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.genre-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--card-primary) 40%, transparent);
}
.genre-card h3 {
  font-family: var(--card-font);
  font-size: 1.5rem;
  margin: 0;
  color: var(--card-text);
}
.genre-card p { margin: var(--space-1) 0 0; font-size: 0.9rem; opacity: 0.85; }
.genre-card__count { font-weight: 600; opacity: 1; color: var(--card-accent); }
</style>
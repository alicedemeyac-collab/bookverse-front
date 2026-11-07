<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { fetchGenre } from '../api/catalog'
import { useThemeStore } from '../stores/theme'
import StatusMessage from '../components/StatusMessage.vue'

const route = useRoute()
const theme = useThemeStore()

const genre = ref(null)
const state = ref('loading') // loading | ready | notfound | error

async function load(slug) {
  state.value = 'loading'
  theme.reset()
  try {
    genre.value = await fetchGenre(slug)
    theme.apply(genre.value.theme)
    state.value = 'ready'
  } catch (error) {
    state.value = error.response?.status === 404 ? 'notfound' : 'error'
  }
}

// Se relance aussi quand on passe d'un genre à un sous-genre (même composant réutilisé)
watch(() => route.params.slug, (slug) => load(slug), { immediate: true })

// En quittant la page, retour au thème neutre
onBeforeUnmount(() => theme.reset())

const bannerStyle = computed(() => {
  const url = genre.value?.theme.banner_url
  return {
    backgroundImage: url
        ? `linear-gradient(to top, var(--bg), transparent), url("${url}")`
        : 'linear-gradient(135deg, var(--primary), var(--bg))',
  }
})
</script>

<template>
  <StatusMessage v-if="state === 'loading'" />
  <StatusMessage v-else-if="state === 'error'" type="error" @retry="load(route.params.slug)" />
  <StatusMessage v-else-if="state === 'notfound'" type="empty" message="Ce genre n'existe pas." />

  <template v-else>
    <header class="banner" :style="bannerStyle">
      <div class="container banner__content">
        <RouterLink
            v-if="genre.parent"
            :to="{ name: 'genre', params: { slug: genre.parent.slug } }"
            class="back"
        >
          ← {{ genre.parent.name }}
        </RouterLink>
        <h1>{{ genre.name }}</h1>
        <p v-if="genre.description" class="description">{{ genre.description }}</p>
        <p class="count">{{ genre.books_count }} livre(s)</p>
      </div>
    </header>

    <section v-if="genre.children?.length" class="container subgenres">
      <h2>Sous-genres</h2>
      <ul>
        <li v-for="child in genre.children" :key="child.id">
          <RouterLink :to="{ name: 'genre', params: { slug: child.slug } }" class="chip">
            {{ child.name }} <span>({{ child.books_count }})</span>
          </RouterLink>
        </li>
      </ul>
    </section>

    <section class="container books-placeholder">
      <p>La liste des livres de ce genre arrive à l'étape suivante.</p>
    </section>
  </template>
</template>

<style scoped>
.banner {
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  background-size: cover;
  background-position: center;
  padding: var(--space-6) 0 var(--space-5);
}
.banner__content { max-width: 1200px; }
.description { max-width: 640px; font-size: 1.1rem; }
.count { color: var(--accent); font-weight: 600; margin: 0; }
.back { display: inline-block; margin-bottom: var(--space-3); }

.subgenres { padding: var(--space-5) 0; }
.subgenres ul { display: flex; flex-wrap: wrap; gap: var(--space-2); list-style: none; padding: 0; margin: 0; }
.chip {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  color: var(--text);
  text-decoration: none;
  transition: background-color 0.2s;
}
.chip:hover { background: color-mix(in srgb, var(--accent) 20%, transparent); }
.chip span { color: var(--text-muted); }

.books-placeholder { padding: var(--space-5) 0 var(--space-7); color: var(--text-muted); }
</style>
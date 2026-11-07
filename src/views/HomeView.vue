<script setup>
import GenreGrid from '../components/GenreGrid.vue'
</script>

<template>
  <section class="hero container">
    <h1>Chaque livre ouvre un univers.</h1>
    <p>Découvre des livres par genre, suis ta lecture et rejoins une communauté de passionnés.</p>
    <RouterLink :to="{ name: 'genres' }" class="btn">Explorer les genres</RouterLink>
  </section>

  <section class="container section">
    <h2>Les genres</h2>
    <GenreGrid />
  </section>
</template>

<style scoped>
.hero { padding: var(--space-7) 0 var(--space-5); max-width: 720px; margin-inline: 0; }
.hero p { color: var(--text-muted); font-size: 1.15rem; }
.section { padding-bottom: var(--space-7); }
</style>
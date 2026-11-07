<script setup>
import GenreGrid from '../components/GenreGrid.vue'
</script>

<template>
  <section class="container page">
    <h1>Les genres littéraires</h1>
    <p class="intro">Chaque genre a son identité visuelle. Choisis ton univers.</p>
    <GenreGrid />
  </section>
</template>

<style scoped>
.page { padding: var(--space-6) 0 var(--space-7); }
.intro { color: var(--text-muted); margin-bottom: var(--space-5); }
</style>
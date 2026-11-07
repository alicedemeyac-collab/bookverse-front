<script setup>
import BookList from '../components/BookList.vue'
</script>

<template>
  <section class="container page">
    <h1>Tous les livres</h1>
    <p class="intro">Le catalogue BookVerse, classé par ordre alphabétique.</p>
    <BookList empty-message="Le catalogue est vide pour le moment." />
  </section>
</template>

<style scoped>
.page { padding: var(--space-6) 0 var(--space-7); }
.intro { color: var(--text-muted); margin-bottom: var(--space-4); }
</style>
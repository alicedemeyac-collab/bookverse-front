<template>
  <section class="container page">
    <h1>Page introuvable</h1>
    <p>Cette page n'existe pas ou a été déplacée.</p>
    <RouterLink :to="{ name: 'home' }" class="btn">Retour à l'accueil</RouterLink>
  </section>
</template>

<style scoped>
.page { padding: var(--space-7) 0; text-align: center; }
</style>
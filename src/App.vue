<script setup>
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <RouterLink :to="{ name: 'home' }" class="logo" aria-label="BookVerse, accueil">
        Book<span>Verse</span>
      </RouterLink>
      <nav aria-label="Navigation principale">
        <RouterLink :to="{ name: 'home' }">Accueil</RouterLink>
        <RouterLink :to="{ name: 'genres' }">Genres</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer class="site-footer">
    <div class="container">© 2026 BookVerse · Projet étudiant BUT Informatique</div>
  </footer>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
}
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
.logo {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
}
.logo span {
  background: linear-gradient(90deg, var(--primary), var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
nav { display: flex; gap: var(--space-4); }
nav a { color: var(--text-muted); text-decoration: none; padding: var(--space-1) 0; }
nav a:hover, nav a.router-link-exact-active {
  color: var(--text);
  border-bottom: 2px solid var(--accent);
}
.site-footer {
  padding: var(--space-5) 0;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
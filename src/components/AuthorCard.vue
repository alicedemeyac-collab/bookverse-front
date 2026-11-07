<script setup>
import AuthorAvatar from './AuthorAvatar.vue'

defineProps({ author: { type: Object, required: true } })
</script>

<template>
  <RouterLink :to="{ name: 'author', params: { id: author.id } }" class="author-card">
    <AuthorAvatar :name="author.name" :url="author.photo_url" :size="72" />
    <div>
      <h3>{{ author.name }}</h3>
      <p v-if="author.nationality" class="meta">{{ author.nationality }}</p>
      <p v-if="author.bio" class="bio">{{ author.bio }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
.author-card {
  display: flex;
  gap: var(--space-3);
  align-items: flex-start;
  padding: var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  transition: transform 0.2s, box-shadow 0.2s;
}
.author-card:hover { transform: translateY(-2px); box-shadow: var(--shadow); }
.author-card h3 { margin: 0; font-size: 1.1rem; }
.author-card p { margin: var(--space-1) 0 0; font-size: 0.9rem; color: var(--text-muted); }
.bio {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
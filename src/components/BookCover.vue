<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  url: { type: String, default: null },
  title: { type: String, required: true },
})

const failed = ref(false)
watch(() => props.url, () => { failed.value = false })
</script>

<template>
  <div class="cover">
    <img
        v-if="url && !failed"
        :src="url"
        :alt="`Couverture de ${title}`"
        loading="lazy"
        @error="failed = true"
    />
    <div
        v-else
        class="cover__placeholder"
        role="img"
        :aria-label="`Pas de couverture pour ${title}`"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<style scoped>
.cover {
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--surface);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.3);
}
.cover img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover__placeholder {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: var(--space-3);
  background: linear-gradient(160deg, var(--primary), var(--bg));
  color: var(--text);
  font-family: var(--font-heading);
  font-size: 1.1rem;
  text-align: center;
}
.cover__placeholder span {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
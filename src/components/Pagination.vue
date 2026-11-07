<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  last: { type: Number, required: true },
})
const emit = defineEmits(['change'])

const pages = computed(() => {
  const wanted = new Set([1, props.last, props.current - 1, props.current, props.current + 1])
  const sorted = [...wanted].filter((p) => p >= 1 && p <= props.last).sort((a, b) => a - b)

  const result = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) result.push('…')
    result.push(page)
  })
  return result
})
</script>

<template>
  <nav v-if="last > 1" class="pagination" aria-label="Pagination">
    <button class="pagination__btn" :disabled="current <= 1" @click="emit('change', current - 1)">
      ← Précédent
    </button>

    <template v-for="(page, index) in pages" :key="index">
      <span v-if="page === '…'" class="pagination__gap">…</span>
      <button
          v-else
          class="pagination__btn"
          :class="{ 'is-current': page === current }"
          :aria-current="page === current ? 'page' : undefined"
          @click="emit('change', page)"
      >
        {{ page }}
      </button>
    </template>

    <button class="pagination__btn" :disabled="current >= last" @click="emit('change', current + 1)">
      Suivant →
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-5);
}
.pagination__btn {
  min-width: 44px;
  min-height: 44px;
  padding: 0 var(--space-3);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  cursor: pointer;
}
.pagination__btn:hover:not(:disabled) { border-color: var(--accent); }
.pagination__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pagination__btn.is-current {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
}
.pagination__gap { align-self: center; color: var(--text-muted); }
</style>
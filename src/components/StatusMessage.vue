<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'loading' }, // loading | error | empty
  message: { type: String, default: '' },
})
defineEmits(['retry'])

const defaults = {
  loading: 'Chargement…',
  error: "Impossible de joindre l'API. Vérifie que le serveur est lancé.",
  empty: 'Aucun résultat.',
}
const text = computed(() => props.message || defaults[props.type])
</script>

<template>
  <div class="status" :role="type === 'error' ? 'alert' : 'status'">
    <span v-if="type === 'loading'" class="status__spinner" aria-hidden="true"></span>
    <p :class="{ 'status__error': type === 'error' }">{{ text }}</p>
    <button v-if="type === 'error'" class="btn" @click="$emit('retry')">Réessayer</button>
  </div>
</template>

<style scoped>
.status {
  display: grid;
  justify-items: center;
  gap: var(--space-3);
  padding: var(--space-6) 0;
  text-align: center;
  color: var(--text-muted);
}
.status__error { color: var(--error); }
.status__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
<script setup>
import { ref, watch } from 'vue'
import { initials } from '../utils/format'

const props = defineProps({
  name: { type: String, required: true },
  url: { type: String, default: null },
  size: { type: Number, default: 96 },
})

const failed = ref(false)
watch(() => props.url, () => { failed.value = false })
</script>

<template>
  <div class="avatar" :style="{ '--size': `${size}px` }">
    <img
        v-if="url && !failed"
        :src="url"
        :alt="`Portrait de ${name}`"
        loading="lazy"
        @error="failed = true"
    />
    <span v-else aria-hidden="true">{{ initials(name) }}</span>
  </div>
</template>

<style scoped>
.avatar {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: var(--on-accent);
  font-family: var(--font-heading);
  font-size: calc(var(--size) / 3);
  font-weight: 700;
}
.avatar img { width: 100%; height: 100%; object-fit: cover; }
</style>
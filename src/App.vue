<script setup>
import { ref, onMounted } from 'vue'
import { http } from './api/http'

const status = ref('Vérification…')

onMounted(async () => {
  try {
    const { data } = await http.get('/health')
    status.value = `API OK, base : ${data.database}`
  } catch {
    status.value = 'API injoignable'
  }
})
</script>

<template>
  <h1>BookVerse</h1>
  <p>{{ status }}</p>
</template>
<template>
  <button
    @click="store.addIp"
    class="add-button"
  >
    + Add
  </button>
</template>

<script setup lang="ts">
import { useIpStore } from '@/stores/ipStore'

const store = useIpStore()
</script>

<style scoped>
.add-button {
  background: var(--color-button);
  color: var(--color-button-text);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}
.add-button:hover {
  background: var(--color-button-hover);
}
.add-button:focus {
  outline: 2px solid var(--color-button-hover);
  outline-offset: 2px;
}
.add-button:focus:not(:focus-visible) {
  outline: none;
}
.add-button:focus-visible {
  outline: 2px solid var(--color-button-hover);
  outline-offset: 2px;
}
</style>

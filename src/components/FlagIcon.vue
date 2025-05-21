<template>
  <span class="flag">
    {{ getCountryFlag(country_code) }}
  </span>
</template>

<script setup lang="ts">
import { getCountryFlag } from '@/utils/getCountryFlag'
defineProps<{ country_code: string }>()
</script>

<style scoped>
.flag {
  font-size: 1.9em;
  line-height: 20px;
}
</style>

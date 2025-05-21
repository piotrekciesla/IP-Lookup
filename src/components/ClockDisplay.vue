<template>
  <span class="clock">
    {{ timeUTC }}
  </span>
</template>

<script setup lang="ts">
import { useUTCTime } from '@/utils/useUTCTime'

const props = defineProps<{ utc_offset: string }>()

const timeUTC = useUTCTime(props.utc_offset)
</script>

<template>
  <div class="ip-row">
    <span class="ipOrderNumber">{{ ipRow.id }}</span>
    <div class="ip-row-content">
      <div class="ip-row-input-container">
        <input
          :value="ipRow.ip"
          @blur="handleBlur"
          :disabled="ipRow.status === 'loading'"
          placeholder="IP address"
          class="ip-row-input"
          :class="{ 'input-error': ipRow.status === 'error' }"
        />
        <spinner-loader v-if="ipRow.status === 'loading'" class="spinner-position" />
      </div>
      <div class="ip-row-info" v-if="ipRow.status !== 'initial'">
        <flag-icon v-if="ipRow.country_code" :country_code="ipRow.country_code" />
        <clock-display v-if="ipRow.utc_offset" :utc_offset="ipRow.utc_offset" />
        <span v-else-if="ipRow.status === 'error'" class="error-message">
          {{ ipRow.errorMessage }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClockDisplay from '@/components/ClockDisplay.vue'
import FlagIcon from '@/components/FlagIcon.vue'
import { type IpRow } from '@/stores/ipStore'
import SpinnerLoader from '@/components/SpinnerLoader.vue'

const props = defineProps<{ ipRow: IpRow }>()
const emit = defineEmits<{
  update: [value: string]
}>()

function handleBlur(event) {
  if (event.target.value !== props.ipRow.ip) emit('update', event.target.value)
}
</script>

<style>
.ip-row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;
  overflow: hidden;
  animation: fadeIn 0.5s ease-in-out;
  will-change: opacity, transform;
}

.ip-row-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ip-row-input-container {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}

.ip-row-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (min-width: 500px) {
  .ip-row-content {
    flex-direction: row;
    align-items: center;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.ip-row .ipOrderNumber {
  background: var(--color-circle);
  color: var(--color-circle-text);
  text-align: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  line-height: 28px;
  flex-shrink: 0;
}

.ip-row .ip-row-input {
  width: 200px;
  padding: 10px;
  padding-right: 40px; /* Add extra padding on the right for the spinner */
  border: 1px solid var(--color-circle);
  background: var(--color-input-background);
  color: var(--color-input-text);
  border-radius: 5px;
  flex-grow: 1;
}

.ip-row .ip-row-input:focus {
  outline: none;
  border: 1px solid var(--color-input-focus-border);
}

.spinner-position {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.input-error {
  border: 1px solid var(--color-error) !important;
}

.error-message {
  color: var(--color-error);
}
</style>

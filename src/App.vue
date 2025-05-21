<script setup lang="ts">
import AddIpRowButton from '@/components/AddIpRowButton.vue'
import IpRows from '@/components/IpRows.vue'
</script>

<template>
  <div class="wrapper">
    <div>
      <h1>IP Lookup</h1>
      <p>Enter one or more IP adresses and get their country</p>
      <add-ip-row-button />
    </div>
    <ip-rows />
  </div>
</template>

<style>
.wrapper {
  width: 700px;
  min-width: 300px;
  padding: 20px 40px;
  background: var(--color-background-soft);
  border-radius: 10px;
}
</style>

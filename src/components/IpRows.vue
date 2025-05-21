<template>
  <div class="ip-rows-container">
    <transition-group name="list" tag="ul">
      <li v-for="(ip, rowindex) in store.ipList" :key="ip.id">
        <ip-row :ip-row="ip" @update="store.updateIp(rowindex, $event)" />
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import IpRow from '@/components/IpRow.vue'
import { useIpStore } from '@/stores/ipStore'

const store = useIpStore()
</script>

<style>
.ip-rows-container {
  transition: height 0.5s ease-in-out;
  border-top: thin solid var(--color-input-border);
  margin-top: 15px;
  will-change: height;
  overflow: hidden;
}

ul {
  margin-top: 15px;
  padding: 0;
}

ul li {
  list-style: none;
  margin-bottom: 6px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease-in-out;
  max-height: 40px;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-30px);
  max-height: 0;
  margin-bottom: 0;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
  max-height: 0;
  margin-bottom: 0;
}
</style>

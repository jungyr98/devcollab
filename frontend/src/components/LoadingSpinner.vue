<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div class="w-12 h-12 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
const { isLoading: visible } = storeToRefs(loadingStore)
</script>

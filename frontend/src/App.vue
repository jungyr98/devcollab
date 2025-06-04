<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
</script>

<template>
  <!-- Loading Component -->
  <LoadingSpinner />

  <!-- Base View -->
  <RouterView />
</template>

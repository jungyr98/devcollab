<script setup lang="ts">
defineProps<{
  title: string
  content: string
}>()
</script>

<template>
  <div class="pt-16 px-8 pb-11 border-b">
    <div>
      <h1 class="text-4xl text-white">{{ title }}</h1>
      <p class="pt-2 text-lg">{{ content }}</p>
    </div>
    <!-- Button -->
    <div class="mt-8">
      <slot />
    </div>
  </div>
</template>

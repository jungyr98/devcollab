<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <span class="inline-block pl-2 pr-2 font-medium text-sm">
    {{ content }}
  </span>
</template>

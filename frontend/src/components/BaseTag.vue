<script setup lang="ts">
defineProps<{
  content: string
}>()
</script>

<template>
  <span
    class="inline-block pl-2 pr-2 mr-0.5 font-medium text-sm text-black bg-white rounded border"
  >
    {{ content }}
  </span>
</template>

<template>
  <label class="inline-block font-semibold">{{ title }}</label>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

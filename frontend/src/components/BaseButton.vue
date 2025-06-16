<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center w-fit min-w-30 min-h-10 px-4 py-2 rounded font-medium transition text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
  >
    <svg v-if="loading" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l5-5-5-5v4a10 10 0 100 20v-4l-5 5 5 5v-4a8 8 0 01-8-8z"
      />
    </svg>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  loading?: boolean
  disabled?: boolean
  type?: 'submit' | 'button'
}>()
</script>

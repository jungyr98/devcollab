<template>
  <div class="flex justify-center gap-2 mt-4">
    <button
      v-for="n in totalPages"
      :key="n"
      @click="() => emit('update:modelValue', n)"
      :class="['px-4 py-2 rounded', modelValue === n ? 'bg-blue-600 text-white' : 'bg-gray-900']"
    >
      {{ n }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: number
  total: number
  limit?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const totalPages = computed(() => Math.ceil(props.total / (props.limit || 10)))
</script>
